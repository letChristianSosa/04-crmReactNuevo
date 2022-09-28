export async function obtenerClientes() {
  const respuesta = await fetch(import.meta.env.VITE_API_URL);
  const clientes = await respuesta.json();
  return clientes;
}

export async function obtenerCliente(id) {
  const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`);
  const clientes = await respuesta.json();
  return clientes;
}

export async function agregarCliente(datos) {
  try {
    const respuesta = await fetch(import.meta.env.VITE_API_URL, {
      method: "POST",
      body: JSON.stringify(datos),
      headers: {
        "Content-Type": "application/json",
      },
    });
    await respuesta.json();
  } catch (error) {
    console.error(error);
  }
}

export async function editarCliente(datos, id) {
  try {
    const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
      method: "PUT",
      body: JSON.stringify(datos),
      headers: {
        "Content-Type": "application/json",
      },
    });
    await respuesta.json();
  } catch (error) {
    console.error(error);
  }
}

export async function eliminarCliente(id) {
  try {
    const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
      method: "DELETE",
    });
    await respuesta.json();
  } catch (error) {
    console.error(error);
  }
}
