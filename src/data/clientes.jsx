export async function obtenerClientes() {
  const url = "http://localhost:3000/clientes";
  const data = await fetch(url);
  const clientes = await data.json();
}
