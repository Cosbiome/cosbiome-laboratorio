import { http } from "../libs/http";
import { IDataEnvases } from "../pages/Envases/InventarioEnvases";
import { IDataMateriaPrima } from "../pages/MateriaPrima/Inventario";

export const calculaProduccionProducto = async (productos: any[]): Promise<any[]> => {
  let materialConjunto: Array<IDataMateriaPrima | IDataEnvases> = [];
  let materiasPrimas: IDataMateriaPrima[] = await http.get("materiasprimas?_limit=10000000");
  let envases: IDataEnvases[] = await http.get("envases?_limit=10000000");

  materiasPrimas.forEach((a) => materialConjunto.push(a));
  envases.forEach((a) => materialConjunto.push(a));

  let final: any[] = productos.map((a) => {
    let cantidadesDisponibles: number[] = [];
    let sobras: { producto: string; sobra: number; canitdad: string; precio: number }[] = [];
    let precioUnitario: number = 0;

    // PRODUCTOS QUE SE PUEDEN CREAR
    a.materiales.forEach((material: any) => {
      const materiaP = materialConjunto.filter((ma) => ma.id === material.materia)[0];
      const calculoMateria: number = Math.floor(materiaP.cantidad / material.cantidad);

      cantidadesDisponibles.push(calculoMateria);
    });

    // OBTENER LA CANTIDAD MENOR DE PRODUCTOS
    const minprod = Math.min(...cantidadesDisponibles);

    // SOBRAS
    a.materiales.forEach((material: any) => {
      const materiaP = materialConjunto.filter((ma) => ma.id === material.materia)[0];
      const sobra = materiaP.cantidad - minprod * material.cantidad;
      precioUnitario += materiaP.precio;

      if (sobra > 0) {
        sobras.push({
          producto: materiaP.nombre,
          sobra: sobra,
          canitdad: material.cantidad,
          precio: materiaP.precio,
        });
      } else {
        sobras.push({
          producto: materiaP.nombre,
          sobra: sobra,
          canitdad: material.cantidad,
          precio: materiaP.precio,
        });
      }
    });

    a.cantidad = minprod;
    a.sobras = sobras;
    a.precioUnitario = precioUnitario;

    return a;
  });

  return final;
};
