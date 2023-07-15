let anoDesejado = document.querySelector("#ano");
let numMes = document.querySelector("#numMes");
let totalDias = document.querySelector("#totalDias");
let numCriancas = document.querySelector("#pessoas");
let resultado = document.querySelector("#resultado");

let date = new Date();
let anoAtual = date.getFullYear();

function setarAnoAtual() {
  anoDesejado.setAttribute("max", anoAtual + 1);
}

function checarErros() {
  let houveErro = true;
  let mensagemErro =
    "[ERRO] Dados inválidos, favor checar e tentar novamente!\nProvavelmente o ";
  let formato = "\nDado aceito de ";
  if (Number(numMes.value) < 1 || Number(numMes.value) > 12) {
    // Checar campo número do mês
    mensagemErro += "número do mês está inválido!";
    formato += "1 até 12";
  } else if (Number(totalDias.value) < 1 || Number(totalDias.value) > 31) {
    // Checar campo total de dias do mês
    mensagemErro += "total de dias do mês está inválido!";
    formato += "1 até 31";
  } else if (
    Number(anoDesejado.value) < 2000 ||
    Number(anoDesejado.value) > anoAtual + 3
  ) {
    // Checar campo total de dias do mês
    mensagemErro += `ano está fora do permitido, coloque um ano de no máximo 3 anos a mais do ano atual`;
    formato += `2000 até ${anoAtual + 3}`;
  } else if (Number(numCriancas.value) < 1 || Number(numCriancas.value) > 10) {
    // Checar quantidade de pessoas
    mensagemErro += "número de pessoas está inválido";
    formato += "1 até 10";
  } else {
    // Sem erros
    houveErro = false;
  }

  if (houveErro) {
    alert(mensagemErro + formato);
    return houveErro;
  } else {
    houveErro = false;
    return houveErro;
  }
}

function gerarMes() {
  let copiarContainer = document.querySelector("#copiar-container");
  let inputMes = Number(numMes.value);
  let inputTotalDias = Number(totalDias.value);
  let inputNumCriancas = Number(numCriancas.value);
  let inputAnoDesejado = Number(anoDesejado.value);

  // Checar validade dos dados
  if (checarErros()) {
    alert("[ERRO] Erros encontrados, corriga-os e tente Gerar novamente!");
    return;
  }

  let mes = inputMes < 10 ? `0${inputMes}` : inputMes;

  resultado.innerHTML = "";
  for (let j = 1; j <= inputTotalDias; j++) {
    for (let i = 1; i <= inputNumCriancas; i++) {
      if (j < 10) {
        resultado.innerHTML += `0${j}/${mes}/${inputAnoDesejado}<br>`;
      } else {
        resultado.innerHTML += `${j}/${mes}/${inputAnoDesejado}<br>`;
      }
    }
  }

  copiarContainer.style.display = "block";
}

function copiarDatas() {
  let texto = resultado.innerHTML;

  // Cria um elemento de área de texto temporário
  let areaDeTransferencia = document.createElement("textarea");

  texto = texto.replace(/<br>/g, "\n");

  // Define o valor do elemento de área de transferência como o texto a ser copiado
  areaDeTransferencia.value = texto;

  // Adiciona o elemento de área de transferência ao documento
  document.body.appendChild(areaDeTransferencia);

  // Seleciona o texto dentro do elemento de área de transferência
  areaDeTransferencia.select();

  // Copia o texto selecionado para a área de transferência
  document.execCommand("copy");

  // Remove o elemento de área de transferência do documento
  document.body.removeChild(areaDeTransferencia);

  // Exibe uma mensagem
  alert("Conteúdo copiado para sua área de transferência!");
}
