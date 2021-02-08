import { Button, Form, Input } from "antd";
import { ChangeFormFun } from "../../hooks/useForm";
import { IDataModalFormMercancia } from "../../pages/MateriaPrima/Inventario";

interface IPropsModalIngresoMercancia {
  onChange: ChangeFormFun;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  form: IDataModalFormMercancia;
}

const ModalIngresoMercancia = ({ onChange, onSubmit, form }: IPropsModalIngresoMercancia) => {
  const { caducidad, cantidad, precio, factura } = form;

  return (
    <Form onSubmitCapture={(e) => onSubmit(e)} layout={"vertical"}>
      <Form.Item label="Cantidad">
        <Input
          required
          value={cantidad}
          type="number"
          onChange={onChange}
          name="cantidad"
          placeholder="Cantidad 0.0"
        />
      </Form.Item>
      <Form.Item label="Precio">
        <Input
          value={precio}
          required
          type="number"
          onChange={onChange}
          name="precio"
          placeholder="Precio 0.0"
        />
      </Form.Item>
      <Form.Item label="Factura">
        <Input value={factura} required onChange={onChange} name="factura" placeholder="Factura" />
      </Form.Item>
      <Form.Item label="Caducidad">
        <Input
          value={caducidad}
          required
          type="date"
          onChange={onChange}
          name="caducidad"
          placeholder="Caducidad"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Surtir Materia Prima
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ModalIngresoMercancia;
