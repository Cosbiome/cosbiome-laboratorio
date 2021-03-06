import { Typography } from "antd";
import { useState } from "react";
import AlmacenReplicable, { IColumsProps } from "../../components/AlmacenReplicable";
import useFiltersTables from "../../hooks/useFiltersTables";
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
  const dropMenuFilter = useFiltersTables();
  const [table] = useState<IColumsProps[]>([
    {
      dataIndex: "nombre",
      key: "nombre",
      title: "NOMBRE",
      ...dropMenuFilter("nombre"),
    },
    {
      dataIndex: "cantidad",
      key: "cantidad",
      title: "CANTIDAD",
    },
    {
      dataIndex: "precio",
      key: "precio",
      title: "PRECIO",
    },
    {
      dataIndex: "caducidad",
      key: "caducidad",
      title: "CADUCIDAD",
    },
  ]);
  return (
    <div className="container">
      <Title className="text-center">INVENTARIO DE MATERIA PRIMA</Title>

      <AlmacenReplicable
        tablaPeticiones="materiasprimas"
        tablaSocket="updateMateriaPrima"
        clasificaciones={categorias}
        addColums={table}
        calculator={false}
      />
    </div>
  );
};

export default InventarioMateriaPrima;
