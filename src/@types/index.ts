interface IDataExtraBackend {
  createdAt: string;
  id: string;
  _id: string;
  published_at: string;
  __v: number;
}

export interface IProductosDB extends IDataExtraBackend {
  nombre: string;
  clasificacion: string;
  materiales: { materia: string; cantidad: number }[];
  precio: number;
  codigo: string;
  caducidad: string;
  creacion: string;
  precioUnitario: number;
  cantidad: number;
  sobras: object;
  terminados: 0;
}

export interface IFormatSelectsForms {
  nombre: string;
  value: string;
}

export interface IContenidoProductosRequisicion {
  producto: string;
  cantidad: number;
  completados: number;
}

export interface IFormRequisiciones {
  fechaDeRequisicion: string;
  fechaDeEntrega: string;
  solicito: string | null;
  entrego: string;
  productos: IFormatSelectsForms[];
  terminado: boolean;
  idRequisicion: string;
}

export interface IRequisicionesDB extends IDataExtraBackend {
  fechaDeRequisicion: string;
  fechaDeEntrega: string;
  solicito: string | null;
  entrego: string;
  productos: IContenidoProductosRequisicion[];
  terminado: boolean;
  idRequisicion: string;
}

export interface IMateriaPrimaDB extends IDataExtraBackend {
  nombre: string;
  clasificacion: string;
  caducidad: string;
  cantidad?: number;
  precio: number;
  factura: string;
}
