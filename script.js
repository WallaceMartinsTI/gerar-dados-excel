let anoDesejado = document.querySelector("#ano");
let numMes = document.querySelector("#numMes");
let totalDias = document.querySelector("#totalDias");
let numCriancas = document.querySelector("#pessoas");
let resultadoDatas = document.querySelector("#resultado-datas");

let containerPessoas = document.querySelector("#container-pessoas");

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
  let copiarContainerDatas = document.querySelector("#copiar-container-datas");
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

  resultadoDatas.innerHTML = "";
  for (let j = 1; j <= inputTotalDias; j++) {
    for (let i = 1; i <= inputNumCriancas; i++) {
      if (j < 10) {
        resultadoDatas.innerHTML += `0${j}/${mes}/${inputAnoDesejado}<br>`;
      } else {
        resultadoDatas.innerHTML += `${j}/${mes}/${inputAnoDesejado}<br>`;
      }
    }
  }

  copiarContainerDatas.style.display = "block";
}

function gerarPessoas() {
  let quantidadePessoas = document.querySelector("#numPes");
  let gerarListaPessoas = document.querySelector("#gerar-lista-pessoas");
  let containerPessoasFilhos = containerPessoas.childElementCount;

  // Checar erros
  if (
    Number(quantidadePessoas.value) < 1 ||
    Number(quantidadePessoas.value) > 10
  ) {
    alert(
      `
        [ERRO] Dados inválidos, favor checar e tentar novamente!
        Provavelmente a quantidade de pessoas está inválida!
        Dado aceito de 1 até 10
      `
    );
    alert("[ERRO] Erros encontrados, corriga-os e tente Gerar novamente!");
    return;
  }

  for (let i = 1; i <= Number(quantidadePessoas.value); i++) {
    containerPessoas.innerHTML += `
      <p>
        <label for="nome${i + containerPessoasFilhos}">Pessoa ${
      i + containerPessoasFilhos
    }:</label>
        <input
          type="text"
          name="nome${i + containerPessoasFilhos}"
          id="nome${i + containerPessoasFilhos}"
          minlength="3"
          maxlength="50"
        />
      </p>
      `;
  }

  gerarListaPessoas.style.display = "block";
}

function gerarListaPessoas() {
  let quantidadeFilhos = containerPessoas.childElementCount; // 2
  let nomes = [];

  for (let i = 1; i <= quantidadeFilhos; i++) {
    let nome = document.querySelector(`#nome${i}`).value;
    nomes.push(nome);
  }

  let resultadoPessoas = document.querySelector("#resultado-pessoas");

  for (i in nomes) {
    resultadoPessoas.innerHTML += `${nomes[i]}<br>`;
  }
}

function copiarDatas() {
  let texto = resultadoDatas.innerHTML;

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
