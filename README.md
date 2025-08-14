# Catálogo Semilla en Flor

Este repositorio contiene un catálogo de productos estático con un panel de administración simple.

## Estrategia de carga de productos

El panel de administración intenta cargar los productos almacenados en `localStorage`. Si no encuentra ninguno, tratará de recuperar un archivo `products.json` opcional con datos iniciales y lo guardará en el almacenamiento local para usos posteriores.
