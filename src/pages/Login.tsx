import { FormEvent } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { http } from "../libs/http";

const Login = (): JSX.Element => {
  const [form, handleChange] = useForm({
    identifier: "",
    password: "",
  });

  const history = useHistory();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      let dataLogin = await http.login("auth/local", form);

      sessionStorage.setItem("token", dataLogin.jwt);
      sessionStorage.setItem("roleUsuario", dataLogin.user.role.name);
      sessionStorage.setItem("nombreUsuario", dataLogin.user.username);

      history.push("/menu");
    } catch (error) {
      alert("Usuario o Contraseña mal ingresados intente de nuevo");
    }
  };

  return (
    <div className="container">
      <h1 className="text-center">COSBIOME LABORATORIO</h1>

      <form className="mt-5" onSubmit={(e) => handleSubmit(e)}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Nombre De Usuario
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="identifier"
            required
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Contraseña
          </label>
          <input
            required
            type="password"
            name="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Inciar Sesion
        </button>
      </form>
    </div>
  );
};

export default Login;
