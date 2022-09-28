import {
  Form,
  useNavigate,
  useLoaderData,
  useActionData,
  redirect,
} from "react-router-dom";

import Formulario from "../components/Formulario";
import Error from "../components/Error";
import { obtenerCliente, editarCliente } from "../data/clientes";

export async function loader({ params }) {
  const cliente = await obtenerCliente(params.clienteId);
  if (Object.values(cliente).length === 0) {
    throw new Response("", {
      status: 404,
      statusText: "Cliente no encontrado",
    });
  }
  return cliente;
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const datos = Object.fromEntries(formData);
  const email = formData.get("email");

  // Validacion
  const errores = [];
  if (Object.values(datos).includes("")) {
    errores.push("Todos los campos son obligatorios");
  }

  let regex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );
  if (!regex.test(email)) {
    errores.push("Email no valido");
  }

  if (Object.keys(errores).length) {
    return errores;
  }

  await editarCliente(datos, params.clienteId);
  return redirect("/");
}

const EditarCliente = () => {
  const navigate = useNavigate();
  const cliente = useLoaderData();
  const errores = useActionData();

  return (
    <>
      <h1 className="font-black text-4xl text-cyan-900">Editar Cliente</h1>
      <p className="mt-3">Llena todos los campos para editar el cliente</p>
      <div className="flex justify-end">
        <button
          className="bg-cyan-800 text-white px-3 py-1 font-bold uppercase"
          onClick={() => navigate(-1)}
        >
          Volver
        </button>
      </div>

      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">
        {errores?.length &&
          errores.map((error, i) => <Error key={i}>{error}</Error>)}
        <Form method="post" noValidate>
          <Formulario cliente={cliente} />
          <input
            type="submit"
            className="mt-5 w-full bg-cyan-800 hover:bg-cyan-600 transition-colors p-3 font-bold uppercase text-white text-lg cursor-pointer "
            value="Actualizar Cliente"
          />
        </Form>
      </div>
    </>
  );
};

export default EditarCliente;
