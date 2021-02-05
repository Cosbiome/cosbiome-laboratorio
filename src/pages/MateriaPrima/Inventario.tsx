import { Table, Space, Typography, Input } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { http } from "../../libs/http";
const { Column } = Table;
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

const InventarioMateriaPrima = () => {
  const [materiaPrima, setMateriaPrima] = useState<IDataMateriaPrima[]>([]);

  useEffect(() => {
    getMateriaPrima();
  }, []);

  const [classi, changeClassi] = useForm<{ [key: string]: string }>({});

  const getMateriaPrima = async () => {
    const materiaPrimaDB: IDataMateriaPrima[] = await http.get("materiasprimas?_limit=10000");
    const materiaPrimaDBWhitKey: IDataMateriaPrima[] = materiaPrimaDB.map((a, i) => ({
      ...a,
      key: `${i}-${a.nombre}`,
    }));

    setMateriaPrima(materiaPrimaDBWhitKey);
  };

  const handleChangeClasificacion = async (
    e: React.KeyboardEvent<HTMLInputElement>,
    name: string,
    id: string
  ) => {
    console.log(e.key);

    if (e.key === "Enter") {
      console.log(id);

      await http.update(`materiasprimas/${id}`, {
        clasificacion: classi[name],
      });
    }
  };

  return (
    <div className="container">
      <Title className="text-center">INVENTARIO DE MATERIA PRIMA</Title>

      <div className="row mt-5">
        <div className="col-md-12">
          <Table dataSource={materiaPrima}>
            <Column title="NOMBRE" dataIndex="nombre" key="nombre" />
            <Column title="CANTIDAD" dataIndex="cantidad" key="cantidad" />
            <Column title="PRECIO" dataIndex="precio" key="precio" />
            <Column title="CADUCIDAD" dataIndex="caducidad" key="caducidad" />
            <Column
              title="CLASIFICACION"
              dataIndex="clasificacion"
              key="clasificacion"
              render={(text: string, record: IDataMateriaPrima) => {
                const { nombre, id } = record;
                return (
                  <Input
                    value={record.clasificacion}
                    name={record.nombre}
                    onChange={changeClassi}
                    onKeyPress={(e) => handleChangeClasificacion(e, nombre, id)}
                    placeholder="clasificaion"
                  />
                );
              }}
            />
            <Column
              title="Action"
              key="action"
              render={() => (
                <Space size="middle">
                  <a>Agregar</a>
                  <a>Borrar</a>
                </Space>
              )}
            />
          </Table>
        </div>
      </div>
    </div>
  );
};

export default InventarioMateriaPrima;
