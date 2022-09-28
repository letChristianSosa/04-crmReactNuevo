import { useLoaderData } from "react-router-dom";

import Cliente from "../components/Cliente";
import { obtenerClientes } from "../data/clientes";

// Este loader hace que al cargarse el componente, se ejecute esta funcion. En este caso, simula el fetch de datos.
export async function loader() {
  const clientes = obtenerClientes();

  return clientes;
}

const Index = () => {
  // useLoaderData hace que se pueda leer los datos pasados por el loader
  const clientes = useLoaderData();

  return (
    <>
      <h1 className="font-black text-4xl text-cyan-900">Clientes</h1>
      <p className="mt-3">Administra tus clientes</p>
      {clientes.length ? (
        <table className="w-full bg-white shadow mt-5 table-auto">
          <thead className="bg-cyan-800 text-white">
            <tr>
              <th className="p-2">Cliente</th>
              <th className="p-2">Contacto</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <Cliente key={cliente.id} cliente={cliente} />
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center mt-10">No hay clientes aun</p>
      )}
    </>
  );
};

export default Index;
