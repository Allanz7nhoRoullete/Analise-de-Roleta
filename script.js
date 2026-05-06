let historico = [];

// CORES
const vermelhos = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36];

// REGIÕES
const voisins = [25,2,21,4,19,15,32,0,26,3,35,12,28,7,29,18,22];
const orphelins = [9,31,14,20,1,17,34,6];
const tiers = [33,16,24,5,10,23,8,30,11,36,13,27];

// COLUNAS MODULARES
const colunas = {
  "1-4-7": [1,4,7],
  "2-5-8": [2,5,8],
  "3-6-9": [3,6,9]
};

// IRMÃOS
const irmaos = [
  [9,12],[16,19],[18,21],[27,30],
  [8,11],[10,13],[17,20],[26,29],[28,31]
];

// SINGULARES
const singularesLista = [1,2,3,4,5,6,7,14,15,22,23,24,25,32,33,34,35,36];

// RACETRACK
const roda = [
0,26,3,35,12,28,7,29,18,22,
9,31,14,20,1,17,34,6,27,13,
36,11,30,8,23,10,5,24,16,33
];

// CRIAR BOTÕES
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

// ADICIONAR NÚMERO
function addNumero(n){
  historico.push(n);
  if(historico.length>100) historico.shift();
  atualizar();
}

function ultimos30(){
  return historico.slice(-30);
}

// FUNÇÕES
function getRegiao(n){
  if(voisins.includes(n)) return "Voisins";
  if(orphelins.includes(n)) return "Orphelins";
  return "Tiers";
}

function getDuzia(n){
  if(n===0) return "Zero";
  if(n<=12) return "1ª";
  if(n<=24) return "2ª";
  return "3ª";
}

function getColuna(n){
  for(let k in colunas){
    if(colunas[k].includes(n%10)) return k;
  }
}

function getIrmao(n){
  for(let p of irmaos){
    if(p.includes(n)) return p.join("-");
  }
  return null;
}

function isSingular(n){
  return singularesLista.includes(n);
}

function soma(n){
  if(n<10) return n;
  return Math.floor(n/10)+(n%10);
}

function diff(n){
  if(n<10) return 0;
  let a=Math.floor(n/10),b=n%10;
  return Math.abs(a-b);
}

// CONTAGEM
function contar(arr, fn){
  let res={};
  arr.forEach(n=>{
    let k=fn(n);
    res[k]=(res[k]||0)+1;
  });
  return res;
}

// ATUALIZAR
function atualizar(){

  document.getElementById("historico").innerText =
    historico.join(" - ");

  let dados = ultimos30();

  document.getElementById("regioes").innerText =
    JSON.stringify(contar(dados,getRegiao),null,2);

  document.getElementById("duzias").innerText =
    JSON.stringify(contar(dados,getDuzia),null,2);

  document.getElementById("terminais").innerText =
    JSON.stringify(contar(dados,n=>n%10),null,2);

  document.getElementById("camuflados").innerText =
    JSON.stringify(contar(dados,n=>soma(n)+"|"+diff(n)),null,2);

  document.getElementById("colunas").innerText =
    JSON.stringify(contar(dados,getColuna),null,2);

  document.getElementById("irmaos").innerText =
    JSON.stringify(contar(dados,n=>getIrmao(n)||"Nenhum"),null,2);

  document.getElementById("singulares").innerText =
    JSON.stringify(contar(dados,n=>isSingular(n)?"Sim":"Não"),null,2);
}

criarRoleta();
