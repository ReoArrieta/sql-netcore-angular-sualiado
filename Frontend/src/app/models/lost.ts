export interface Lost {
  id: number;
  idUsuarioAdmin: number;
  detalles: Array<DetailLost>;
}
export interface DetailLost {
  idProductoPerdida: number;
  costoProducto: number;
  cantidadPerdida: number;
  descripcionPerdida: string;
}