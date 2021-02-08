import { Typography } from "antd";
import AlmacenReplicable from "../../components/AlmacenReplicable";
import categorias from "../../json/materiaCategorias.json";
const { Title } = Typography;
export interface IDataMateriaPrima {
  caducidad: string;
  clasificacion: string;
  createdAt: string;
  id: string;
  nombre: string;
  published_at: string;
  updatedAt: string;
  _id: string;
  cantidad: number;
  precio: number;
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
