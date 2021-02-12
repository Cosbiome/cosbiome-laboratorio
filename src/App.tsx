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
          </MenuRouterMain>
        </SocketProvider>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
