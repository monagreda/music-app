import numpy as np
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import os
import json

def cargar_datos_json():
        ruta_json = os.path.join('data', 'canciones.json')
        
        # Leer el archivo JSON usando Pandas
        if os.path.exists(ruta_json):
                df = pd.read_json(ruta_json)
                print('Datos cargados desde JSON exitosamente.')
                return df
        else:
                print('Error: No se encontro el archivo de canciones.')
                return None

# Generar Dashboard 
def generar_visualizaciones():
        df = cargar_datos_json() 
        if df is None: return

        #Agrupar por artista y suma de reproducciones
        df_agrupado = df.groupby('artista')['reproducciones'].sum().reset_index()

        # Configurar estilo Seaborn
        sns.set_theme(style='darkgrid')

        # Crear un lienzo con 2 grafico (1 fila, 2 columnas)
        fig, ax = plt.subplots(1, 2, figsize=(15,6))

        # Grafico 1: Barras de Reproducciones de Artistas
        sns.barplot(data=df_agrupado, x='artista', y='reproducciones', hue='artista',palette='viridis', ax=ax[0])
        ax[0].set_title('Total de Reproducciones por Artista', fontsize=14)

        # Grafico 2: Distribucion de duracion (curva KDE)
        sns.histplot(df['duracion_min'], kde=True, color='purple', ax=ax[1])
        ax[1].set_title('Distribución de Duración de Canciones', fontsize=14)

        #Asegurar que la carpeta reports existe
        if not os.path.exists('reports'):
                os.makedirs('reports')

        # Guardar en la carpeta de reportes
        path_report = os.path.join('reports', 'dashboard_json.png')
        plt.tight_layout()
        plt.savefig(path_report)
        print(f"Dashboard generado con exito en: {path_report}")



# Reutilizamos tu clase KMeans que programaste
class KMeansPersonalizado:
    def __init__(self, n_clusters=2, max_iters=300):
        self.n_clusters = n_clusters
        self.max_iters = max_iters
        self.centroids = None

    def fit(self, X):
        # Inicialización aleatoria de centroides
        idx = np.random.choice(X.shape[0], self.n_clusters, replace=False)
        self.centroids = X[idx, :]

        for _ in range(self.max_iters):
            # Calcular distancias y asignar etiquetas
            distances = np.linalg.norm(X[:, np.newaxis] - self.centroids, axis=2)
            labels = np.argmin(distances, axis=1)
            
            # Calcular nuevos centroides
            new_centroids = np.array([X[labels == i].mean(axis=0) for i in range(self.n_clusters)])
            
            if np.all(self.centroids == new_centroids):
                break
            self.centroids = new_centroids
        return labels

def aplicar_clustering_y_guardar():
    ruta_json = os.path.join('data', 'canciones.json')
    if not os.path.exists(ruta_json): return

    df = pd.read_json(ruta_json)

    # 1. Seleccionamos las columnas numéricas para el modelo
    # Escalamos un poco los datos para que tengan peso similar
    X = df[['reproducciones', 'duracion_min']].values
    
    # 2. Aplicamos tu K-Means (crearemos 2 grupos: Populares vs Largas/Nicho)
    model = KMeansPersonalizado(n_clusters=2)
    df['cluster'] = model.fit(X)

    # 3. Guardar el resultado para la App de React
    # Este es el archivo que subirás a tu carpeta 'public' o 'src/data' en React
    ruta_react = os.path.join('..', 'src', 'data', 'canciones_ready.json')
    df.to_json(ruta_react, orient='records', indent=4)
    
    print(f"✅ ¡Éxito! Datos para React actualizados en: {ruta_react}")

if __name__ == "__main__":
    aplicar_clustering_y_guardar() 
    generar_visualizaciones()