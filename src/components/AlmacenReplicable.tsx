import { Table, Space, Button } from "antd";
import Modal from "antd/lib/modal/Modal";
import { useContext, useEffect, useState } from "react";
import moment from "moment";
import { IDataModalFormMercancia } from "../pages/MateriaPrima/Inventario";
import { SocketContext } from "../provider/SocketContext";
import { useForm } from "../hooks/useForm";
import useFiltersTables from "../hooks/useFiltersTables";
import { http } from "../libs/http";
import ModalIngresoMercancia from "./MateriaPrima/ModalIngresoMercancia";
import { Select } from "antd";
import { SelectValue } from "antd/lib/select";
import { calculaProduccionProducto } from "../utils/calculators";
const { Option } = Select;

interface IPropsAlmacenReplicable {
  tablaPeticiones: string;
  tablaSocket: string;
  clasificaciones: { value: string; nombre: string }[];
  addColums: IColumsProps[];
  calculator: boolean;
}
export interface IColumsProps {
  key: string;
  title: string;
  dataIndex?: string;
  render?: (record: any) => JSX.Element;
  filterDropdown?: ({
    setSelectedKeys,
    selectedKeys,
    confirm,
    clearFilters,
  }: {
    setSelectedKeys: any;
    selectedKeys: any;
    confirm: any;
    clearFilters: any;
  }) => JSX.Element;
  filterIcon?: () => JSX.Element;
  onFilter?: (value: any, record: any) => any;
}

type TypeStateInterfaces = any;

const AlmacenReplicable = ({
  tablaPeticiones,
  tablaSocket,
  clasificaciones,
  addColums,
  calculator,
}: IPropsAlmacenReplicable) => {
  const dropMenuFilter = useFiltersTables();
  const [materiaPrima, setMateriaPrima] = useState<any[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isModalVisibleDetalle, setIsModalVisibleDetalle] = useState<boolean>(false);
  const [idMateriaSurtir, setIdMateriaSurtir] = useState<string>("");
  const [columnasTabla] = useState<IColumsProps[]>([
    ...addColums,
    {
      key: "clasificacion",
      title: "CLASIFICACION",
      ...dropMenuFilter("clasificacion"),
      render: (record: TypeStateInterfaces) => {
        return (
          <>
            <Select
              value={record.clasificacion}
              onChange={(e) => handleChangeCategoria(e, record)}
              style={{ width: "100%" }}
            >
              {clasificaciones.length > 0 &&
                clasificaciones.map((clasi) => {
                  return <Option value={clasi.value}> {clasi.nombre.toUpperCase()} </Option>;
                })}
            </Select>
          </>
        );
      },
    },
    {
      key: "acciones",
      title: "ACCIONES",
      render: (record: TypeStateInterfaces) => {
        return (
          <Space size="middle">
            <Button onClick={() => handleAdd(record.id)} type="primary">
              Agregar
            </Button>
            {calculator && (
              <Button
                style={{ backgroundColor: "green" }}
                onClick={() => handleVueDetalle(record.id)}
                type="primary"
              >
                Detalle
              </Button>
            )}
            <Button
              onClick={() => {
                handleDelete(record.id);
              }}
              type="primary"
              danger
            >
              Eliminar
            </Button>
          </Space>
        );
      },
    },
  ]);

  useEffect(() => {
    getMateriaPrima();
    socket.on(tablaSocket, (data: TypeStateInterfaces[]) => {
      handleFormatForTable(data);
    });

    // eslint-disable-next-line
  }, []);

  const { socket } = useContext(SocketContext);
  const [
    formModalIngreso,
    setTormModalIngreso,
    resetFormModalIngreso,
  ] = useForm<IDataModalFormMercancia>({
    caducidad: "",
    cantidad: 0.0,
    factura: "",
    precio: 0.0,
  });

  const handleFormatForTable = async (arr: TypeStateInterfaces[]) => {
    const materiaPrimaDBWhitKey: TypeStateInterfaces[] = arr.map((a, i) => ({
      ...a,
      key: `${i}-${a.nombre}`,
    }));

    if (calculator) {
      const data = await calculaProduccionProducto(materiaPrimaDBWhitKey);
      setMateriaPrima(data);
    } else {
      setMateriaPrima(materiaPrimaDBWhitKey);
    }
  };

  const getMateriaPrima = async () => {
    const materiaPrimaDB: TypeStateInterfaces[] = await http.get(`${tablaPeticiones}?_limit=10000`);
    handleFormatForTable(materiaPrimaDB);
  };

  const handleAdd = (id: string) => {
    setIsModalVisible(true);
    setIdMateriaSurtir(id);
  };

  const handleVueDetalle = (id: string) => {
    setIsModalVisibleDetalle(true);
    setIdMateriaSurtir(id);
  };

  const handleOk = async () => {
    setIsModalVisible(false);
    setIdMateriaSurtir("");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIdMateriaSurtir("");
    resetFormModalIngreso();
  };

  const handleCancelDetalle = () => {
    setIsModalVisibleDetalle(false);
    setIdMateriaSurtir("");
  };

  const handleChangeCategoria = async (e: SelectValue, record: TypeStateInterfaces) => {
    await http.update(`${tablaPeticiones}/${record.id}`, {
      clasificacion: e,
    });
  };

  const handleSubmitMateriaPrima = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      formModalIngreso.caducidad = moment(formModalIngreso.caducidad).format("L");

      await http.update(`${tablaPeticiones}/${idMateriaSurtir}`, formModalIngreso);

      handleOk();
      resetFormModalIngreso();
    } catch (error) {}
  };

  const handleDelete = async (id: string) => {
    await http.delete(`${tablaPeticiones}/${id}`);
  };

  return (
    <>
      <div className="row mt-5">
        <div className="col-md-12">
          <Table className="text-center" columns={columnasTabla} dataSource={materiaPrima} />
        </div>
      </div>
      <Modal
        okButtonProps={{ disabled: true, hidden: true }}
        cancelButtonProps={{ danger: true, type: "primary" }}
        width={1000}
        visible={isModalVisible}
        onCancel={handleCancel}
      >
        <ModalIngresoMercancia
          form={formModalIngreso}
          onSubmit={handleSubmitMateriaPrima}
          onChange={setTormModalIngreso}
        />
      </Modal>
      <Modal
        okButtonProps={{ disabled: true, hidden: true }}
        cancelButtonProps={{ disabled: true, hidden: true }}
        width={1000}
        visible={isModalVisibleDetalle}
        onCancel={handleCancelDetalle}
      >
        <table className="table table-hover text-center">
          <thead>
            <tr>
              <th scope="col">MATERIA</th>
              <th scope="col">CANTIDAD NECESARIA</th>
              <th scope="col">SOBRA</th>
            </tr>
          </thead>
          <tbody>
            {materiaPrima
              .filter((a) => a.id === idMateriaSurtir)[0]
              ?.sobras.map((a: any) => {
                return (
                  <tr>
                    <td> {a.producto} </td>
                    <td> {a.canitdad} GR / PZA </td>
                    <td> {a.sobra} GR / PZA </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </Modal>
    </>
  );
};

export default AlmacenReplicable;
