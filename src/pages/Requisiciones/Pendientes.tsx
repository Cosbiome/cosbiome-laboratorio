import React, { useContext, useEffect, useState } from "react";
import { IProductosDB, IRequisicionesDB, IMateriaPrimaDB } from "../../@types";
import CardForRequest from "../../components/CardForRequest";
import { http } from "../../libs/http";
import CircularProgress from "@material-ui/core/CircularProgress";
import { SocketContext } from "../../provider/SocketContext";

const Pendientes = () => {
  const [requisiciones, setRequisiciones] = useState<IRequisicionesDB[]>([]);
  const [productos, setProductos] = useState<IProductosDB[]>([]);
  const [materiasPrimas, setMateriaPrimas] = useState<IMateriaPrimaDB[]>([]);

  useEffect(() => {
    handleGetRequisiciones();
  }, []);

  useEffect(() => {}, [materiasPrimas, materiasPrimas]);

  const { socket } = useContext(SocketContext);

  const handleGetRequisiciones = async () => {
    let materialConjunto: Array<IMateriaPrimaDB> = [];
    const requisicionesDB: IRequisicionesDB[] = await http.get("requisiciones?terminado=false");
    const productosDB: IProductosDB[] = await http.get("productos?_limit=1000000");
    const materiasPrimasDB: IMateriaPrimaDB[] = await http.get("materiasprimas?_limit=1000000");
    const envasesDB: IMateriaPrimaDB[] = await http.get("envases?_limit=1000000");

    setRequisiciones(requisicionesDB);
    setProductos(productosDB);
    materiasPrimasDB.forEach((a) => materialConjunto.push(a));
    envasesDB.forEach((a) => materialConjunto.push(a));
    setMateriaPrimas(materialConjunto);

    socket.on("requisiciones", async (reqs: IRequisicionesDB[]) => {
      setRequisiciones(reqs);
      const materiasPrimasDB1: IMateriaPrimaDB[] = await http.get("materiasprimas?_limit=1000000");
      const envasesDB1: IMateriaPrimaDB[] = await http.get("envases?_limit=1000000");

      materiasPrimasDB1.forEach((a) => materialConjunto.push(a));
      envasesDB1.forEach((a) => materialConjunto.push(a));
      setMateriaPrimas(materialConjunto);
    });
  };

  return (
    <div className="container">
      <h1 className="text-center">REQUISICIONES PENDIENTES</h1>

      <div className="row mt-5">
        {productos.length > 0 && materiasPrimas.length > 0 ? (
          requisiciones.map((reqs) => {
            return (
              <div key={reqs.id} className=" mb-5 d-flex justify-content-center col-md-12">
                <CardForRequest
                  idRequisicion={reqs.idRequisicion}
                  fechaDeRequisicion={reqs.fechaDeRequisicion}
                  productos={reqs.productos}
                  productosDB={productos}
                  materiasPrimasDB={materiasPrimas}
                  fechaDeEntrega={reqs.fechaDeEntrega}
                  id={reqs.id}
                />
              </div>
            );
          })
        ) : (
          <div className=" mb-5 d-flex justify-content-center col-md-12">
            <CircularProgress />
          </div>
        )}
      </div>
    </div>
  );
};

export default Pendientes;
