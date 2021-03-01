import React, { useEffect, useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { IContenidoProductosRequisicion, IMateriaPrimaDB, IProductosDB } from "../@types";
import { useTimer } from "react-timer-hook";
import { Button, CardHeader } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import moment from "moment";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: "100%",
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    avatar: {
      backgroundColor: red[500],
    },
  })
);

interface iPropsCardForRequest {
  idRequisicion: string;
  fechaDeRequisicion: string;
  fechaDeEntrega: string;
  productos: IContenidoProductosRequisicion[];
  productosDB: IProductosDB[];
  materiasPrimasDB: IMateriaPrimaDB[];
  id: string;
}

interface IMateriasPrimasAComprar {
  nombre: string;
  cantidad: number;
  tienes: number | undefined;
}

const CardForRequest = ({
  idRequisicion,
  fechaDeRequisicion,
  productos,
  productosDB,
  materiasPrimasDB,
  fechaDeEntrega,
  id,
}: iPropsCardForRequest) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(true);
  const [materiaComprar, setMateriComprar] = React.useState<IMateriasPrimasAComprar[]>([]);
  const [progressLine, setProgressLine] = React.useState<number | undefined>(0);
  const [productosDBS, setProductosDBS] = useState<IProductosDB[]>([]);
  const [materiasPrimasDBS, setMateriasPrimasDBS] = useState<IMateriaPrimaDB[]>([]);

  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp: new Date(fechaDeEntrega).getTime(),
  });

  useEffect(() => {
    handleGenFilter();

    // eslint-disable-next-line
  }, [productos, productosDBS, materiasPrimasDBS]);

  useEffect(() => {
    setMateriasPrimasDBS(materiasPrimasDB);
    setProductosDBS(productosDB);
  }, [productosDB, materiasPrimasDB]);

  useEffect(() => {
    handleGetProgressInitial();
    // eslint-disable-next-line
  }, [minutes]);

  const history = useHistory();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleGenFilter = () => {
    if (productosDBS.length > 0) {
      let materiasPrimasAcomprar: IMateriasPrimasAComprar[] = [];
      productos.forEach((prod) => {
        const { producto, cantidad } = prod;
        const detalle = productosDBS.filter((a) => a.id === producto)[0];
        detalle.materiales.forEach((mate) => {
          let mat = materiasPrimasDBS.filter((a) => a.id === mate.materia)[0];
          let entradaMateria = {
            nombre: mat.nombre,
            cantidad: 0,
            tienes: mat.cantidad,
          };
          let indexEntrada = materiasPrimasAcomprar.findIndex(
            (e) => e.nombre === entradaMateria.nombre
          );
          if (indexEntrada === -1) {
            entradaMateria.cantidad = mate.cantidad * cantidad;
            materiasPrimasAcomprar.push(entradaMateria);
          } else {
            materiasPrimasAcomprar[indexEntrada].cantidad += mate.cantidad * cantidad;
          }
        });
      });
      setMateriComprar(materiasPrimasAcomprar);
    }
  };

  const handleGetProgressInitial = () => {
    let incio = moment(fechaDeRequisicion);
    let final = moment(fechaDeEntrega);
    let actual = moment(new Date().getTime());

    let entrega = final.diff(incio, "minutes");
    let falta = final.diff(actual, "minutes");
    let diferencial = entrega - falta;

    console.log(diferencial);
    console.log(entrega);
    console.log(falta);

    setProgressLine((diferencial * 100) / entrega);
  };

  const handleViewRequisicion = (id: string) => {
    history.push(`/requisiciones/pendientes/${id}`);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        title={"Requisicion: " + idRequisicion}
        subheader={`${days < 10 ? "0" + days : days}:${hours < 10 ? "0" + hours : hours}:${
          minutes < 10 ? "0" + minutes : minutes
        }:${seconds < 10 ? "0" + seconds : seconds}`}
      />
      <CardContent>
        <div className="row mb-3">
          <div className="col-md-12">
            <LinearProgress variant="determinate" value={progressLine} />
          </div>
        </div>
        <table className="table text-center">
          <thead>
            <tr>
              <th scope="col">PRODUCTO</th>
              <th scope="col">TERMINADO</th>
              <th scope="col">REQUERIDO</th>
            </tr>
          </thead>
          <tbody>
            {productosDBS.length > 0 &&
              productos.map((prod, ind) => {
                const { producto, cantidad, completados } = prod;
                const detalle = productosDBS.filter((a) => a.id === producto)[0];
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
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <Button onClick={() => handleViewRequisicion(id)} variant="contained" color="primary">
            SURTIR REQUISICION
          </Button>
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <h3 className="text-center">NECESITAS PARA FABRICAR</h3>
          <div style={{ width: "100%" }} className="row d-flex justify-content-center">
            <div className="col-md-12 table-responsive">
              <table className="table text-center table-success table-striped">
                <thead>
                  <tr>
                    <th scope="col">MATERIA PRIMA</th>
                    <th scope="col">CANTIDAD NECESARIA GR/PZA</th>
                    <th scope="col">CANTIDAD EN ALAMACEN GR/PZA</th>
                    <th scope="col">NECESITAS PEDIR GR/PZA</th>
                    <th scope="col">SOBRAS GR/PZA</th>
                  </tr>
                </thead>
                <tbody>
                  {materiaComprar.length > 0 &&
                    materiaComprar.map((mat) => {
                      return (
                        <tr key={mat.nombre}>
                          <td>{mat.nombre}</td>
                          <td>{mat.cantidad}</td>
                          <td>{mat.tienes}</td>
                          {(mat.tienes || mat.tienes === 0) && (
                            <td>{mat.cantidad - mat.tienes > 0 ? mat.cantidad - mat.tienes : 0}</td>
                          )}
                          {(mat.tienes || mat.tienes === 0) && (
                            <td>{mat.tienes - mat.cantidad < 0 ? 0 : mat.tienes - mat.cantidad}</td>
                          )}
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default CardForRequest;
