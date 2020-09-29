export interface Product {
  id: number;
  nombreProducto: string;
  idCategoriaProducto: string;
  costoProducto: number;
  precioProducto: number;
  existenciaProducto: number;
  imagenProducto: string | ArrayBuffer;
  descripcionProducto: string;
}
