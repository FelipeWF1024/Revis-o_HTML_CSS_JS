let produtos = [];
 
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
 
 
// Carregar produtos JSON
 
fetch("produtos.json")
 
.then(resposta => resposta.json())
 
.then(dados => {
 
    produtos = dados;
 
    mostrarProdutos(produtos);
 
    atualizarCarrinho();
 
});
 
 
 
// Mostrar produtos
 
function mostrarProdutos(lista) {
 
 
const grid = document.getElementById("product-grid");
 
 
grid.innerHTML = "";
 
 
 
lista.forEach(produto => {
 
 
grid.innerHTML += `
 
 
<div class="bg-white rounded-3xl shadow p-4 card-produto">
 
 
<img src="${produto.imagem}"
 
class="rounded-2xl w-full h-40 object-cover">
 
 
<h3 class="text-xl font-bold mt-3">
 
${produto.nome}
 
</h3>
 
 
<p class="text-slate-500">
 
${produto.categoria}
 
</p>
 
 
 
<p class="font-bold text-blue-600 text-lg">
 
R$ ${produto.preco.toFixed(2)}
 
</p>
 
 
 
<button onclick="adicionarCarrinho(${produto.id})"
 
class="btn-comprar bg-blue-600 text-white px-4 py-2 rounded-full mt-3 w-full">
 
Adicionar ao carrinho
 
</button>
 
 
 
</div>
 
 
`;
 
});
 
 
}
 
 
 
 
// Filtrar produtos
 
function filtrarProdutos(){
 
 
let texto = document
.getElementById("busca")
.value
.toLowerCase();
 
 
 
let filtrados = produtos.filter(produto =>
 
 
produto.nome.toLowerCase().includes(texto)
 
);
 
 
mostrarProdutos(filtrados);
 
 
}
 
 
 
 
// Adicionar ao carrinho
 
function adicionarCarrinho(id){
 
 
let produto = produtos.find(p => p.id === id);
 
 
 
carrinho.push(produto);
 
 
 
localStorage.setItem(
 
"carrinho",
 
JSON.stringify(carrinho)
 
);
 
 
 
atualizarCarrinho();
 
 
}
 
 
 
 
// Atualizar contador
 
function atualizarCarrinho(){
 
 
document.getElementById("contador-carrinho")
 
.innerText = carrinho.length;
 
 
}
 
 
 
 
// Mostrar carrinho
 
function mostrarCarrinho(){
 
 
document
 
.getElementById("modal-carrinho")
 
.classList.remove("hidden");
 
 
 
let area = document.getElementById("carrinho-itens");
 
 
 
area.innerHTML = "";
 
 
 
let total = 0;
 
 
 
carrinho.forEach((produto,index)=>{
 
 
total += produto.preco;
 
 
 
area.innerHTML += `
 
 
<div class="flex justify-between items-center">
 
 
<div>
 
<h3 class="font-bold">
 
${produto.nome}
 
</h3>
 
 
<p>
 
R$ ${produto.preco.toFixed(2)}
 
</p>
 
 
</div>
 
 
<button onclick="removerItem(${index})"
 
class="text-red-500">
 
Remover
 
</button>
 
 
</div>
 
 
`;
 
 
});
 
 
 
document.getElementById("carrinho-total")
 
.innerText =
 
"R$ " + total.toFixed(2);
 
 
}
 
 
 
 
 
// Fechar carrinho
 
function fecharCarrinho(){
 
 
document
 
.getElementById("modal-carrinho")
 
.classList.add("hidden");
 
 
}
 
 
 
 
// Remover item
 
function removerItem(index){
 
 
carrinho.splice(index,1);
 
 
 
localStorage.setItem(
 
"carrinho",
 
JSON.stringify(carrinho)
 
);
 
 
 
mostrarCarrinho();
 
atualizarCarrinho();
 
 
}
 
 
 
 
 
// Finalizar compra
 
function finalizarCompra(){
 
 
alert("Compra realizada com sucesso!");
 
 
 
carrinho = [];
 
 
 
localStorage.removeItem("carrinho");
 
 
 
fecharCarrinho();
 
atualizarCarrinho();
 
 
}