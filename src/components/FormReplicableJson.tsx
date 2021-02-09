import { Button, Form, Input } from "antd";
import { ChangeFormFun } from "../hooks/useForm";
import { IDataFormEnvase } from "../pages/Envases/CreacionEnvases";
import { IDataFormMateriaPrima } from "../pages/MateriaPrima/CreacionMateriaPrima";

interface IPorpsFromReplicableJson {
  inputsForm: { key: string; redired: boolean; type: string; options: string[] }[];
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  onChange: ChangeFormFun;
  form: IDataFormMateriaPrima | IDataFormEnvase;
}

// ["i", "s", "d", "in", "in", "i"];

const FormReplicableJson = ({
  inputsForm,
  handleSubmit,
  onChange,
  form,
}: IPorpsFromReplicableJson) => {
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
                console.log(form[a.key]);
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
                            <option key={`${i} - ${opt} - opt`} value={opt}>
                              {opt}
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

              default:
                break;
            }

            return [];
          })}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Surtir Materia Prima
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default FormReplicableJson;
