import React, { useEffect, useState } from "react";
import { Typography } from "antd";
import FormReplicableJson from "../../components/FormReplicableJson";
import { useForm } from "../../hooks/useForm";
import { handleParseInput } from "../../utils/Parses";
import opciones from "../../json/materiaCategorias.json";
import { http } from "../../libs/http";
import moment from "moment";
import { IDataEnvases } from "../Envases/InventarioEnvases";
import { IDataMateriaPrima } from "../MateriaPrima/Inventario";

const { Title } = Typography;

interface IDataMaterial {
  materia: string;
  cantidad: number;
}
export interface IDataFormPropuctos {
  [key: string]: any;
  nombre: string;
  clasificacion: string;
  materiales: IDataMaterial[];
}

const CreacionProductos = () => {
  const [insumos, setInsumos] = useState<{ value: string; nombre: string }[]>([]);
  useEffect(() => {
    handleGetPorductos();
  }, []);

  const handleGetPorductos = async () => {
    let insumosDB: { value: string; nombre: string }[] = [];
    let materiasDB: IDataMateriaPrima[] = await http.get("materiasprimas?_limit=10000");
    let envasesDB: IDataEnvases[] = await http.get("envases?_limit=10000");
    materiasDB.forEach((a) => insumosDB.push({ value: a.id, nombre: a.nombre }));
    envasesDB.forEach((a) => insumosDB.push({ value: a.id, nombre: a.nombre }));
    setInsumos(insumosDB);
  };

  const [formMateriaCreate, formChange, resetForm, setForm] = useForm<IDataFormPropuctos>({
    nombre: "",
    clasificacion: "",
    materiales: [],
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

  const defaultOption: { value: string; nombre: string }[] = [{ nombre: "", value: "" }];
  const keys = Object.keys(formMateriaCreate);
  const requireds = [true, true, false];
  const types = ["i", "s", "li"];
  const options: { value: string; nombre: string }[][] = [defaultOption, opciones, insumos];

  const inputs = handleParseInput(keys, requireds, types, options);

  return (
    <div className="container">
      <Title className="text-center">AGREGAR UN PRODUCTO NUEVO</Title>

      <FormReplicableJson
        form={formMateriaCreate}
        onChange={formChange}
        handleSubmit={handleSubmit}
        inputsForm={inputs}
        textoBoton="Surtir materia prima"
        setForm={setForm}
      />
    </div>
  );
};

export default CreacionProductos;
