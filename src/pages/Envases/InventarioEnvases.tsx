import AlmacenReplicableSinCaducidad from "../../components/AlmacenReplicableSinCaducidad";
import { Typography } from "antd";
import categorias from "../../json/envasesCategorias.json";
const { Title } = Typography;

export interface IDataEnvases {
  clasificacion: string;
  createdAt: string;
  id: string;
  nombre: string;
  published_at: string;
  updatedAt: string;
  _id: string;
  precio: number;
  __v: number;
  cantidad: number;
}

const InventarioEnvases = () => {
  return (
    <div className="container">
      <Title className="text-center">INVENTARIO DE ENVASES</Title>

      <AlmacenReplicableSinCaducidad
        tablaPeticiones="envases"
        tablaSocket="envases"
        clasificaciones={categorias}
      />
    </div>
  );
};

export default InventarioEnvases;
