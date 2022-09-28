import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import Layout from "./components/Layout";
import Index, { loader as clientesLoader } from "./pages/Index";
import NuevoCliente, {
  action as nuevoClienteAction,
} from "./pages/NuevoCliente";
import EditarCliente, {
  loader as editarClienteLoader,
  action as editarClienteAction,
} from "./pages/EditarCliente";
import ErrorPage from "./components/ErrorPage";
import { action as eliminarClienteAction } from "./components/Cliente";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Index />,
        // Se asigna el loader que se va a ejecutar al renderizar el componente
        loader: clientesLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: "/clientes/nuevo",
        element: <NuevoCliente />,
        action: nuevoClienteAction,
        errorElement: <ErrorPage />,
      },
      {
        path: "/clientes/:clienteId/editar",
        element: <EditarCliente />,
        loader: editarClienteLoader,
        action: editarClienteAction,
        errorElement: <ErrorPage />,
      },
      {
        path: "/clientes/:clienteId/eliminar",
        action: eliminarClienteAction,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
