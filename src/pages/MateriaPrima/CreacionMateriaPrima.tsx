import React from "react";
import { Typography } from "antd";
import FormReplicableJson from "../../components/FormReplicableJson";
import { useForm } from "../../hooks/useForm";
import { handleParseInput } from "../../utils/Parses";
import opciones from "../../json/materiaCategorias.json";
import { http } from "../../libs/http";
import moment from "moment";

const { Title } = Typography;

export interface IDataFormMateriaPrima {
  [key: string]: any;
  nombre: string;
  clasificacion: string;
  caducidad: string;
  cantidad: number;
  precio: number;
  factura: string;
}

const CreacionMateriaPrima = () => {
  const [formMateriaCreate, formChange, resetForm] = useForm<IDataFormMateriaPrima>({
    nombre: "",
    clasificacion: "",
    caducidad: "",
    cantidad: 0.0,
    precio: 0.0,
    factura: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      if (formMateriaCreate.caducidad !== "") {
        formMateriaCreate.caducidad = moment(formMateriaCreate.caducidad).format("L");
      }

      await http.post("materiasprimas", formMateriaCreate);
      resetForm();
    } catch (error) {}
  };

  const keys = Object.keys(formMateriaCreate);
  const requireds = [true, true, false, false, false, false];
  const types = ["i", "s", "d", "in", "in", "i"];
  const options = [[], opciones, [], [], [], []];

  const inputs = handleParseInput(keys, requireds, types, options);

  return (
    <div className="container">
      <Title className="text-center">AGREGAR NUEVA MATERIA PRIMA</Title>

      <FormReplicableJson
        form={formMateriaCreate}
        onChange={formChange}
        handleSubmit={handleSubmit}
        inputsForm={inputs}
        textoBoton="Surtir materia prima"
        multiParamName="material"
      />
    </div>
  );
};

export default CreacionMateriaPrima;
