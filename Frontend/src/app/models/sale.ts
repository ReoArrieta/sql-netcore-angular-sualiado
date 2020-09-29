export interface Sale {
  // id: number;
  idUsuarioAdmin: number;
  idUsuarioCliente: number;
  detalles: Array<DetailSale>;
}
export interface DetailSale {
  idProductoVenta: number;
  cantidadVenta: number;
  precioProducto: number;
  descuentoVenta: number;
}
