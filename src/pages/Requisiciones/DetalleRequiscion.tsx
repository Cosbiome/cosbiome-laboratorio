import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IMateriaPrimaDB, IProductosDB, IRequisicionesDB } from "../../@types";
import { http } from "../../libs/http";
import QrReader from "react-qr-reader";
import { Button, Input } from "antd";

const DetalleRequiscion = () => {
  const [requisicion, setRequisicion] = useState<IRequisicionesDB>({
    fechaDeRequisicion: "",
    fechaDeEntrega: "",
    entrego: "",
    idRequisicion: "",
    solicito: "",
    terminado: false,
    productos: [],
    createdAt: "",
    id: "",
    _id: "",
    published_at: "",
    __v: 0,
  });
  const [productos, setProductos] = useState<IProductosDB[]>([]);
  const [registroP, setRegistroP] = useState<string>("");
  const [materiasPrimas, setMateriaPrimas] = useState<IMateriaPrimaDB[]>([]);
  const [submitProd, setSubmitProd] = useState<boolean>(false);

  useEffect(() => {
    handleGetRequisiciones();
    // eslint-disable-next-line
  }, []);

  const params = useParams<{ id: string }>();

  const handleGetRequisiciones = async () => {
    const { id } = params;
    let materialConjunto: Array<IMateriaPrimaDB> = [];
    const requisicionDB: IRequisicionesDB = await http.get("requisiciones/" + id);
    const productosDB: IProductosDB[] = await http.get("productos?_limit=1000000");
    const materiasPrimasDB: IMateriaPrimaDB[] = await http.get("materiasprimas?_limit=1000000");
    const envasesDB: IMateriaPrimaDB[] = await http.get("envases?_limit=1000000");
    materiasPrimasDB.forEach((a) => materialConjunto.push(a));
    envasesDB.forEach((a) => materialConjunto.push(a));
    setMateriaPrimas(materialConjunto);

    setRequisicion(requisicionDB);
    setProductos(productosDB);
  };

  const handleGetRequisicionesPostAdd = async () => {
    let materialConjunto: Array<IMateriaPrimaDB> = [];
    const productosDB: IProductosDB[] = await http.get("productos?_limit=1000000");
    const materiasPrimasDB: IMateriaPrimaDB[] = await http.get("materiasprimas?_limit=1000000");
    const envasesDB: IMateriaPrimaDB[] = await http.get("envases?_limit=1000000");
    materiasPrimasDB.forEach((a) => materialConjunto.push(a));
    envasesDB.forEach((a) => materialConjunto.push(a));
    setMateriaPrimas(materialConjunto);

    setProductos(productosDB);
  };

  const handleScan = (data: string | null) => {
    if (data) {
      setRegistroP(data);
    }
  };

  const handleError = (err: any) => {
    console.error(err);
  };

  const handleAdd = async () => {
    setSubmitProd(true);
    let requisicionCop = requisicion;
    let productoFind = productos.filter((po) => po.nombre === registroP)[0];
    let productoInReq = requisicion.productos.filter((po) => po.producto === productoFind.id)[0];
    let indexProdInReq = requisicion.productos.findIndex((po) => po.producto === productoFind.id);

    if (productoInReq.completados < productoInReq.cantidad) {
      productoFind.materiales.forEach(async (a) => {
        let materiaRestante = materiasPrimas.filter((b) => b.id === a.materia)[0].cantidad;
        try {
          if (materiaRestante) {
            await http.update("materiasprimas/" + a.materia, {
              cantidad: materiaRestante - a.cantidad * 1,
            });
          }
        } catch (error) {
          if (materiaRestante) {
            await http.update("envases/" + a.materia, {
              cantidad: materiaRestante - a.cantidad * 1,
            });
          }
        }
      });
      productoInReq.completados += 1;
      requisicionCop.productos[indexProdInReq] = productoInReq;

      await http.update("productos/" + productoFind.id, {
        terminados: productoFind.terminados + 1,
      });

      let newRequisicion = await http.update("requisiciones/" + requisicion.id, requisicion);

      handleGetRequisicionesPostAdd();
      setRequisicion(newRequisicion);
      setRegistroP("");
      setSubmitProd(false);
    } else {
      alert("TODOS LOS PRODUCTOS HAN SIDO CARGADOS");
      setRegistroP("");
      setSubmitProd(false);
    }
  };

  const previewStyle = {
    height: "100%",
    width: "50%",
  };

  return (
    <div className="container">
      <h1 className="text-center">DETALLE DE REQUISICION: {requisicion.idRequisicion}</h1>

      <div className="row mt-5">
        <div className="col-md-6 mb-5">
          <table className="table table text-center  table-bored">
            <thead>
              <tr>
                <th scope="col">PRODUCTO</th>
                <th scope="col">TERMINADO</th>
                <th scope="col">REQUERIDO</th>
              </tr>
            </thead>
            <tbody>
              {productos.length > 0 &&
                requisicion.productos.map((prod, ind) => {
                  const { producto, cantidad, completados } = prod;
                  const detalle = productos.filter((a) => a.id === producto)[0];
                  return (
                    <tr key={producto + ind}>
                      <td>{detalle.nombre}</td>
                      <td>{completados}</td>
                      <td>{cantidad}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <div className="col-md-6 mb-5 d-flex justify-content-center">
          <QrReader delay={1000} style={previewStyle} onError={handleError} onScan={handleScan} />
        </div>
        <div className="col-md-12 mb-5">
          <Input disabled={true} value={registroP} placeholder="PRODUCTO A REGISTRAR ENTRADA" />
          <Button loading={submitProd} className="mt-2" type="primary" onClick={() => handleAdd()}>
            AGREGAR
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DetalleRequiscion;
