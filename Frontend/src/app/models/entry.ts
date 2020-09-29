export interface Entry {
  id: number;
  idUsuarioAdmin: number;
  idProveedorEntrada: number;
  detalles: Array<DetailEntry>;
}
export interface DetailEntry {
  idProductoEntrada: number;
  costoProducto: number;
  cantidadEntrada: number;
}