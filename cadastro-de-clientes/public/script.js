const API_URL = "http://localhost:3000/clientes";

// Carregar clientes ao abrir a página
document.addEventListener("DOMContentLoaded", carregarClientes);

const form = document.getElementById("cliente-form");
form.addEventListener("submit", salvarCliente);

// Buscar e exibir clientes
async function carregarClientes(){
  const resposta = await fetch(API_URL);
  const clientes = await resposta.json();
  
  const lista = document.getElementById("clientes-lista");
  lista.innerHTML = "";

  clientes.forEach(cliente => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${cliente.nome}</td>
      <td>${cliente.email}</td>
      <td>${cliente.telefone}</td>
      <td>
        <button onclick="editarCliente('${cliente._id}', '${cliente.nome}', '${cliente.email}', '${cliente.telefone}')">Editar</button>
        <button onclick="excluirCliente('${cliente._id}')">Excluir</button>
      </td>
    `;

    lista.appendChild(tr);
  });
}

// Salvar cliente (novo ou atualização)
async function salvarCliente(e) {
  e.preventDefault();

  const id = document.getElementById("cliente-id").value;
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const telefone = document.getElementById("telefone").value;

  const cliente = { nome, email, telefone };

  if(id){
    // Alterar (PUT)
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cliente)
    });
  } else {
    // Criar (POST)
    await fetch (API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(cliente)
    });
  }

  form.reset();
  carregarClientes();
}

// Preencher formulário para editar cliente
function editarCliente(id, nome, email, telefone){
  document.getElementById("cliente-id").value = id;
  document.getElementById("nome").value = nome;
  document.getElementById("email").value = email;
  document.getElementById("telefone").value = telefone;
}

// Excluir cliente
async function excluirCliente(id) {
  if(confirm("Deseja realmente excluir este cliente?")){
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    carregarClientes();
  }
}