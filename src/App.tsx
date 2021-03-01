import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import { SocketProvider } from "./provider/SocketContext";
import "./App.css";
import MenuRouterMain from "./pages/MenuRouterMain";
import Home from "./pages/Home";
import InventarioMateriaPrima from "./pages/MateriaPrima/Inventario";
import CreacionMateriaPrima from "./pages/MateriaPrima/CreacionMateriaPrima";
import CreacionEnvases from "./pages/Envases/CreacionEnvases";
import InventarioEnvases from "./pages/Envases/InventarioEnvases";
import CreacionProductos from "./pages/Productos/CreacionProductos";
import InventarioProductos from "./pages/Productos/InventarioProductos";
import Requisiciones from "./pages/Requisiciones";
import Pendientes from "./pages/Requisiciones/Pendientes";
import DetalleRequiscion from "./pages/Requisiciones/DetalleRequiscion";
import ProductoTerminado from "./pages/ProductoTerminado";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <SocketProvider>
          <MenuRouterMain>
            <Route path="/home" component={Home} />
            <Route path="/matariaprima/inventario" component={InventarioMateriaPrima} />
            <Route path="/matariaprima/creacion" component={CreacionMateriaPrima} />
            <Route path="/envases/creacion" component={CreacionEnvases} />
            <Route path="/envases/inventario" component={InventarioEnvases} />
            <Route path="/productos/creacion" component={CreacionProductos} />
            <Route path="/productos/inventario" component={InventarioProductos} />
            <Route exact path="/requisiciones" component={Requisiciones} />
            <Route exact path="/requisiciones/pendientes" component={Pendientes} />
            <Route exact path="/requisiciones/pendientes/:id" component={DetalleRequiscion} />
            <Route exact path="/productoTerminado" component={ProductoTerminado} />
          </MenuRouterMain>
        </SocketProvider>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
