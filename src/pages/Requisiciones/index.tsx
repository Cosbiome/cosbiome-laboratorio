import React, { useEffect, useState } from "react";
import {
  IFormatSelectsForms,
  IFormRequisiciones,
  IProductosDB,
  IRequisicionesDB,
} from "../../@types";
import FormReplicableJson from "../../components/FormReplicableJson";
import { useForm } from "../../hooks/useForm";
import { http } from "../../libs/http";
import { handleParseInput } from "../../utils/Parses";
import moment from "moment";
import { useHistory } from "react-router-dom";

const Requisiciones = () => {
  const [usuario] = useState<string | null>(sessionStorage.getItem("nombreUsuario"));
  const [productos, setProductos] = useState<IFormatSelectsForms[]>([]);

  useEffect(() => {
    handleGetProductos();
  }, []);

  const history = useHistory();

  // eslint-disable-next-line
  const [formMateriaCreate, formChange, resetForm, setForm] = useForm<IFormRequisiciones>({
    fechaDeEntrega: "",
    productos: [],
    entrego: "",
    solicito: usuario,
    fechaDeRequisicion: moment().format("L"),
    terminado: false,
    idRequisicion: "",
  });

  const handleGetProductos = async () => {
    const productosDB: IProductosDB[] = await http.get("productos");
    const productosFormatSelects: IFormatSelectsForms[] = productosDB.map((prod) => {
      return {
        nombre: prod.nombre,
        value: prod.id,
      };
    });

    setProductos(productosFormatSelects);
  };

  const parseFormToRequisicionesDB = (data: any): IRequisicionesDB => {
    const formFinal: IRequisicionesDB = data;
    formFinal.productos = data.productos.map((a: any) => {
      return {
        producto: a.materia,
        cantidad: a.cantidad,
        completados: 0,
      };
    });
    formFinal.fechaDeEntrega = moment(formFinal.fechaDeEntrega).format("L");

    return formFinal;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const requisicionesConteo = await http.get("requisiciones/count");
      const formFinal = parseFormToRequisicionesDB(formMateriaCreate);
      formFinal.idRequisicion = `${requisicionesConteo + 1}R`;
      await http.post("requisiciones", formFinal);
      history.go(0);
    } catch (error) {
      alert("Error al geenerar la requisicion");
    }
  };

  const defaultOption: IFormatSelectsForms[] = [{ nombre: "", value: "" }];
  const keys = Object.keys(formMateriaCreate);
  const requireds = [true, true];
  const types = ["d", "li"];
  const options: IFormatSelectsForms[][] = [defaultOption, productos];

  const inputs = handleParseInput(keys, requireds, types, options);

  return (
    <div className="container">
      <h1 className="text-center">REQUISICIONES</h1>

      <FormReplicableJson
        form={formMateriaCreate}
        onChange={formChange}
        handleSubmit={handleSubmit}
        inputsForm={inputs}
        textoBoton="Mandar requisicion"
        setForm={setForm}
        multiParamName="productos"
        labelMultiForm="PRODUCTOS"
      />
    </div>
  );
};

export default Requisiciones;
