import React from "react";
import { Typography } from "antd";
import FormReplicableJson from "../../components/FormReplicableJson";
import { useForm } from "../../hooks/useForm";
import { handleParseInput } from "../../utils/Parses";
import opciones from "../../json/envasesCategorias.json";
import { http } from "../../libs/http";

const { Title } = Typography;

export interface IDataFormEnvase {
  [key: string]: any;
  nombre: string;
  clasificacion: string;
  cantidad: number;
  precio: number;
  factura: string;
}

const CreacionEnvases = () => {
  const [formEnvaseCreate, formChange, resetForm] = useForm<IDataFormEnvase>({
    nombre: "",
    clasificacion: "",
    cantidad: 0,
    precio: 0.0,
    factura: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      await http.post("envases", formEnvaseCreate);
      resetForm();
    } catch (error) {}
  };

  const defaultOption: { value: string; nombre: string }[] = [{ nombre: "", value: "" }];
  const keys = Object.keys(formEnvaseCreate);
  const requireds = [true, true, false, false, false];
  const types = ["i", "s", "in", "in", "i"];
  const options: { value: string; nombre: string }[][] = [
    defaultOption,
    opciones,
    defaultOption,
    defaultOption,
    defaultOption,
  ];

  const inputs = handleParseInput(keys, requireds, types, options);

  return (
    <div className="container">
      <Title className="text-center">AGREGAR UN NUEVO ENVASE</Title>

      <FormReplicableJson
        form={formEnvaseCreate}
        onChange={formChange}
        handleSubmit={handleSubmit}
        inputsForm={inputs}
        textoBoton="Surtir envase"
        multiParamName="material"
      />
    </div>
  );
};

export default CreacionEnvases;
