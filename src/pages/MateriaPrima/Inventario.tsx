import { Table, Space, Typography, Input, Button } from "antd";
import Modal from "antd/lib/modal/Modal";
import { useContext, useEffect, useState } from "react";
import ModalIngresoMercancia from "../../components/MateriaPrima/ModalIngresoMercancia";
import { useForm } from "../../hooks/useForm";
import { http } from "../../libs/http";
import { SocketContext } from "../../provider/SocketContext";
import moment from "moment";

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

export interface IDataModalFormMercancia {
  cantidad: number;
  caducidad: string;
  precio: number;
  factura: string;
}

const InventarioMateriaPrima = () => {
  const [materiaPrima, setMateriaPrima] = useState<IDataMateriaPrima[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [idMateriaSurtir, setIdMateriaSurtir] = useState<string>("");

  useEffect(() => {
    getMateriaPrima();
    socket.on("updateMateriaPrima", (data: IDataMateriaPrima[]) => {
      setMateriaPrima(data);
    });

    // eslint-disable-next-line
  }, []);

  const [classi, changeClassi] = useForm<{ [key: string]: string }>({});
  const { socket } = useContext(SocketContext);
  const [formModalIngreso, setTormModalIngreso] = useForm<IDataModalFormMercancia>({
    caducidad: "",
    cantidad: 0.0,
    factura: "",
    precio: 0.0,
  });

  const handleFormatForTable = (arr: IDataMateriaPrima[]) => {
    const materiaPrimaDBWhitKey: IDataMateriaPrima[] = arr.map((a, i) => ({
      ...a,
      key: `${i}-${a.nombre}`,
    }));

    setMateriaPrima(materiaPrimaDBWhitKey);
  };

  const getMateriaPrima = async () => {
    const materiaPrimaDB: IDataMateriaPrima[] = await http.get("materiasprimas?_limit=10000");
    handleFormatForTable(materiaPrimaDB);
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

  const handleAdd = (id: string) => {
    setIsModalVisible(true);
    setIdMateriaSurtir(id);
  };

  const handleOk = async () => {
    setIsModalVisible(false);
    setIdMateriaSurtir("");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIdMateriaSurtir("");
  };

  const handleSubmitMateriaPrima = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      formModalIngreso.caducidad = moment(formModalIngreso.caducidad).format("L");

      await http.update(`materiasprimas/${idMateriaSurtir}`, formModalIngreso);

      handleOk();
    } catch (error) {}
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
                  <>
                    <Input
                      name={record.nombre}
                      onChange={changeClassi}
                      onKeyPress={(e) => handleChangeClasificacion(e, nombre, id)}
                      placeholder="clasificaion"
                    />
                    <p>{record.clasificacion}</p>
                  </>
                );
              }}
            />
            <Column
              title="Action"
              key="action"
              render={(text: string, record: IDataMateriaPrima) => (
                <Space size="middle">
                  <Button onClick={() => handleAdd(record.id)} type="primary">
                    Agregar
                  </Button>
                  <Button type="primary" danger>
                    Eliminar
                  </Button>
                </Space>
              )}
            />
          </Table>
        </div>
      </div>

      <Modal
        okButtonProps={{ disabled: true, hidden: true }}
        cancelButtonProps={{ danger: true, type: "primary" }}
        width={1000}
        visible={isModalVisible}
        onCancel={handleCancel}
      >
        <ModalIngresoMercancia onSubmit={handleSubmitMateriaPrima} onChange={setTormModalIngreso} />
      </Modal>
    </div>
  );
};

export default InventarioMateriaPrima;
