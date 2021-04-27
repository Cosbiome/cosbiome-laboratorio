import React, { useContext, useEffect, useState } from "react";
import { IProductosDB } from "../../@types";
import { http } from "../../libs/http";
import { Table, Space, Button } from "antd";
import useFiltersTables from "../../hooks/useFiltersTables";
import { SocketContext } from "../../provider/SocketContext";

const ProductoTerminado = () => {
  const dropMenuFilter = useFiltersTables();
  const [productos, setProductos] = useState<IProductosDB[]>([]);
  const [columnasTabla] = useState([
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
      dataIndex: "terminados",
      key: "terminados",
      title: "TERMINADOS",
    },
    {
      key: "acciones",
      title: "ACCIONES",
      render: () => {
        return (
          <Space size="middle">
            <Button type="primary">ENTREGAR</Button>
          </Space>
        );
      },
    },
  ]);

  const { socket } = useContext(SocketContext);

  useEffect(() => {
    handleGetProductos();
    // eslint-disable-next-line
  }, []);

  const handleGetProductos = async () => {
    const productosDB: IProductosDB[] = await http.get("productos?terminados_gt=0");
    setProductos(productosDB);

    socket.on("productos", async () => {
      const productosDB: IProductosDB[] = await http.get("productos?terminados_gt=0");
      setProductos(productosDB);
    });
  };

  return (
    <div className="container">
      <h1 className="text-center">ALMACEN DE PRODUCTO TERMINADO</h1>
      <div className="row mt-5">
        <div className="col-md-12">
          <Table className="text-center" columns={columnasTabla} dataSource={productos} />
        </div>
      </div>
    </div>
  );
};

export default ProductoTerminado;
