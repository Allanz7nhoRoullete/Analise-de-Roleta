let historico = [];

const vermelhos = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36];

// REGIÕES
const voisins = [25,2,21,4,19,15,32,0,26,3,35,12,28,7,29,18,22];
const orphelins = [9,31,14,20,1,17,34,6];
const tiers = [33,16,24,5,10,23,8,30,11,36,13,27];

// CORES DINÂMICAS
const cores = [
  "#e74c3c","#3498db","#f1c40f","#2ecc71",
  "#9b59b6","#1abc9c","#e67e22","#95a5a6",
  "#ff00ff","#00ffff"
];

// CRIAR ROLETA
function criarRoleta(){
  const div = document.getElementById("roleta");

  for(let i=0;i<=36;i++){
    let btn = document.createElement("button");
    btn.innerText = i;
    btn.className = cor(i);
    btn.onclick = ()=>addNumero(i);
    div.appendChild(btn);
  }
}

function cor(n){
  if(n===0) return "zero";
  return vermelhos.includes(n) ? "vermelho":"preto";
}

// ADD
function addNumero(n){
  historico.push(n);
  if(historico.length>100) historico.shift();
  atualizar();
}

function ultimos30(){
  return historico.slice(-30);
}

// FILTRO
function mostrarFiltro(fn){
  let dados = ultimos30().filter(fn);
  document.getElementById("filtro").innerText =
    dados.length ? dados.join(" - ") : "Nenhum número";
}

// GERAR ITENS COLORIDOS
function gerarGrupo(container, itens, fnLabel, fnFiltro){

  const div = document.getElementById(container);
  div.innerHTML = "";

  itens.forEach((item, i)=>{

    let el = document.createElement("div");
    el.className = "item";
    el.style.background = cores[i % cores.length];
    el.innerText = fnLabel(item);

    el.onclick = ()=>{
      mostrarFiltro(n => fnFiltro(n,item));
    };

    div.appendChild(el);
  });
}

// ATUALIZAR
function atualizar(){

  document.getElementById("historico").innerText =
    historico.join(" - ");

  let dados = ultimos30();

  // TERMINAIS
  gerarGrupo(
    "terminais",
    [0,1,2,3,4,5,6,7,8,9],
    t => "T" + t,
    (n,t)=> n%10===t
  );

  // DUZIAS
  gerarGrupo(
    "duzias",
    ["1ª","2ª","3ª","Zero"],
    d=>d,
    (n,d)=>{
      if(n===0) return d==="Zero";
      if(n<=12) return d==="1ª";
      if(n<=24) return d==="2ª";
      return d==="3ª";
    }
  );

  // REGIÕES
  gerarGrupo(
    "regioes",
    ["Voisins","Orphelins","Tiers"],
    r=>r,
    (n,r)=>{
      if(r==="Voisins") return voisins.includes(n);
      if(r==="Orphelins") return orphelins.includes(n);
      return tiers.includes(n);
    }
  );

  // COLUNAS
  gerarGrupo(
    "colunas",
    ["1-4-7","2-5-8","3-6-9"],
    c=>c,
    (n,c)=>{
      let t = n%10;
      if(c==="1-4-7") return [1,4,7].includes(t);
      if(c==="2-5-8") return [2,5,8].includes(t);
      return [3,6,9].includes(t);
    }
  );
}

criarRoleta();
