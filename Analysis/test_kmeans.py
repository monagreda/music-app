import numpy as np
import pytest
from app import KMeansPersonalizado # Importamos tu clase

def test_kmeans_agrupamiento_basico():
    # 1. Creamos datos de prueba muy obvios
    # Grupo A: Valores bajos | Grupo B: Valores altos
    X = np.array([
        [1, 1], [1.2, 1.1], [0.9, 0.8],  # Grupo 0
        [10, 10], [10.2, 10.1], [9.8, 9.9] # Grupo 1
    ])
    
    # 2. Inicializamos tu modelo
    model = KMeansPersonalizado(n_clusters=2, max_iters=10)
    labels = model.fit(X)
    
    # 3. Verificaciones (Assertions)
    # Verificamos que los primeros 3 pertenecen al mismo grupo
    assert labels[0] == labels[1] == labels[2]
    # Verificamos que los últimos 3 pertenecen al mismo grupo
    assert labels[3] == labels[4] == labels[5]
    # Verificamos que los grupos son diferentes entre sí
    assert labels[0] != labels[3]

def test_kmeans_centroides_existen():
    X = np.array([[1, 2], [3, 4], [5, 6]])
    model = KMeansPersonalizado(n_clusters=2)
    model.fit(X)
    # Verificamos que el modelo generó centroides
    assert model.centroids is not None
    assert len(model.centroids) == 2