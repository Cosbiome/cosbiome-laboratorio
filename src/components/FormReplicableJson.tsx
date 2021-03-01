import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space } from "antd";
import { ChangeEvent } from "react";
import { ChangeFormFun } from "../hooks/useForm";

interface IPorpsFromReplicableJson {
  inputsForm: {
    key: string;
    redired: boolean;
    type: string;
    options: { value: string; nombre: string }[];
  }[];
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  onChange: ChangeFormFun;
  form: { [key: string]: any };
  textoBoton: string;
  setForm?: React.Dispatch<React.SetStateAction<any>>;
  multiParamName: string;
  labelMultiForm?: string;
}

const FormReplicableJson = ({
  inputsForm,
  handleSubmit,
  onChange,
  form,
  textoBoton,
  setForm,
  multiParamName,
  labelMultiForm,
}: IPorpsFromReplicableJson) => {
  const handleAddCampoInForm = (add: any) => {
    const materiales: any[] = form[multiParamName];

    materiales.push({ materia: "", cantidad: 0 });
    if (setForm) {
      setForm({
        ...form,
        [multiParamName]: materiales,
      });
    }

    add();
  };

  const handleChangeMateria = (
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    let materiales: any[] = form[multiParamName];

    materiales[i] = { ...materiales[i], materia: e.target.value };
    if (setForm) {
      setForm({
        ...form,
        [multiParamName]: materiales,
      });
    }
  };

  const handleChangeCantidad = (
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    let materiales: any[] = form[multiParamName];

    materiales[i] = { ...materiales[i], cantidad: parseFloat(e.target.value) };
    if (setForm) {
      setForm({
        ...form,
        [multiParamName]: materiales,
      });
    }
  };

  const handleDelteMultiForm = (remove: any, name: any, i: number) => {
    let materiales: any[] = form[multiParamName];

    materiales = materiales.filter((a) => a !== materiales[i]);

    if (setForm) {
      setForm({
        ...form,
        [multiParamName]: materiales,
      });
      remove(name);
    }
  };

  return (
    <div className="row mt-5">
      <div className="col-md-12">
        <Form onSubmitCapture={handleSubmit} layout="vertical">
          {inputsForm.map((a, i) => {
            switch (a.type) {
              case "i":
                return (
                  <Form.Item key={`${i} - ${a.key}`} label={a.key.toUpperCase()}>
                    <Input
                      value={form[a.key]}
                      onChange={onChange}
                      name={a.key}
                      required={a.redired}
                    />
                  </Form.Item>
                );

              case "s":
                return (
                  <Form.Item key={`${i} - ${a.key}`} label={a.key.toUpperCase()}>
                    <select
                      value={form[a.key]}
                      required={a.redired}
                      name={a.key}
                      className="form-select"
                      onChange={onChange}
                    >
                      <option value=""></option>
                      {a.options.length > 0 &&
                        a.options.map((opt) => {
                          return (
                            <option key={`${i} - ${opt.value} - opt`} value={opt.value}>
                              {opt.nombre}
                            </option>
                          );
                        })}
                    </select>
                  </Form.Item>
                );

              case "in":
                return (
                  <Form.Item key={`${i} - ${a.key}`} label={a.key.toUpperCase()}>
                    <Input
                      value={form[a.key]}
                      onChange={onChange}
                      type="number"
                      name={a.key}
                      min={0}
                      required={a.redired}
                    />
                  </Form.Item>
                );

              case "d":
                return (
                  <Form.Item key={`${i} - ${a.key}`} label={a.key.toUpperCase()}>
                    <Input
                      value={form[a.key]}
                      onChange={onChange}
                      type="date"
                      name={a.key}
                      required={a.redired}
                    />
                  </Form.Item>
                );
              case "li":
                return (
                  <Form.List key={i + "milto"} name="prueba">
                    {(fileds: any[], { add, remove }: any) => (
                      <div>
                        {fileds.map((field, i) => (
                          <Space
                            key={field.key}
                            style={{ display: "flex", marginBottom: 8, width: "100%" }}
                            align="baseline"
                          >
                            <Form.Item
                              label={labelMultiForm ? labelMultiForm : "MATERIA PRIMA"}
                              {...field}
                              name={[field.name, "first"]}
                              fieldKey={[field.fieldKey, "first"]}
                              rules={[{ required: true, message: "Missing first name" }]}
                            >
                              <select
                                value={form[multiParamName][i].materia}
                                style={{ width: 300 }}
                                required={a.redired}
                                className="form-select"
                                onChange={(e) => handleChangeMateria(e, i)}
                              >
                                <option value=""></option>
                                {a.options.length > 0 &&
                                  a.options.map((opt) => {
                                    return (
                                      <option key={`${i} - ${opt.value} - opt`} value={opt.value}>
                                        {opt.nombre}
                                      </option>
                                    );
                                  })}
                              </select>
                            </Form.Item>
                            <Form.Item
                              label="CANTIDAD"
                              {...field}
                              name={[field.name, "second"]}
                              fieldKey={[field.fieldKey, "first"]}
                              rules={[{ required: true, message: "Missing first name" }]}
                            >
                              <Input
                                value={form[multiParamName][i].cantidad}
                                style={{ width: 200, height: 38 }}
                                type="number"
                                required={a.redired}
                                placeholder="Cantidad"
                                onChange={(e) => handleChangeCantidad(e, i)}
                              />
                            </Form.Item>
                            <Form.Item label="ELIMINAR CAMPO">
                              <MinusCircleOutlined
                                onClick={() => handleDelteMultiForm(remove, field.name, i)}
                              />
                            </Form.Item>
                          </Space>
                        ))}
                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => handleAddCampoInForm(add)}
                            block
                            icon={<PlusOutlined />}
                          >
                            Add field
                          </Button>
                        </Form.Item>
                      </div>
                    )}
                  </Form.List>
                );

              default:
                break;
            }

            return [];
          })}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {textoBoton}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default FormReplicableJson;
