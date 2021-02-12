import React, { useState } from "react";
import AlmacenReplicable, { IColumsProps } from "../../components/AlmacenReplicable";
import { Typography } from "antd";
import categorias from "../../json/materiaCategorias.json";
import useFiltersTables from "../../hooks/useFiltersTables";
const { Title } = Typography;

const InventarioProductos = () => {
  const dropMenuFilter = useFiltersTables();
  const [table] = useState<IColumsProps[]>([
    {
      dataIndex: "codigo",
      key: "codigo",
      title: "CODIGO",
      ...dropMenuFilter("codigo"),
    },
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
      dataIndex: "precioUnitario",
      key: "precioUnitario",
      title: "PRECIO UNITARIO",
    },
    {
      dataIndex: "caducidad",
      key: "caducidad",
      title: "CADUCIDAD",
    },
  ]);

  return (
    <div className="container">
      <Title className="text-center">INVENTARIO DE PRODUCTOS</Title>

      <AlmacenReplicable
        tablaPeticiones="productos"
        tablaSocket="productos"
        clasificaciones={categorias}
        addColums={table}
        calculator={true}
      />
    </div>
  );
};

export default InventarioProductos;
