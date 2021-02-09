import { Typography } from "antd";
import AlmacenReplicable from "../../components/AlmacenReplicable";
import categorias from "../../json/materiaCategorias.json";
const { Title } = Typography;
export interface IDataMateriaPrima {
  nombre: string;
  clasificacion: string;
  caducidad: string;
  cantidad: number;
  precio: number;
  factura: string;
  id: string;
  createdAt: string;
  published_at: string;
  updatedAt: string;
  _id: string;
  __v: number;
  key?: string;
}

export interface IDataModalFormMercancia {
  cantidad: number;
  caducidad: string;
  precio: number;
  factura: string;
}

const InventarioMateriaPrima = () => {
  return (
    <div className="container">
      <Title className="text-center">INVENTARIO DE MATERIA PRIMA</Title>

      <AlmacenReplicable
        tablaPeticiones="materiasprimas"
        tablaSocket="updateMateriaPrima"
        clasificaciones={categorias}
      />
    </div>
  );
};

export default InventarioMateriaPrima;
