let numMes = document.querySelector("#numMes");
let totalDias = document.querySelector("#totalDias");
let diaInicial = document.querySelector("#inicioMes");
let anoDesejado = document.querySelector("#ano");
let numPessoas = document.querySelector("#pessoas");
let resultadoDatas = document.querySelector("#resultado-datas");

let containerPessoas = document.querySelector("#container-input-pessoas");
let resultadoPessoas = document.querySelector("#resultado-pessoas");
let gerarListaPessoas = document.querySelector("#gerar-lista-pessoas");
let copiarPessoasContainer = document.querySelector(
  "#copiar-container-pessoas"
);

let podeGerarPessoas = false;
let esconderGerarPessoa = false;

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
  // Checar campo número do mês
  if (Number(numMes.value) < 1 || Number(numMes.value) > 12) {
    mensagemErro += "número do mês está inválido!";
    formato += "1 até 12";

    // Checar campo total de dias do mês
  } else if (Number(totalDias.value) < 1 || Number(totalDias.value) > 31) {
    mensagemErro += "total de dias do mês está inválido!";
    formato += "1 até 31";

    // Checar campo dia inicial
  } else if (
    Number(diaInicial.value) < 1 ||
    Number(diaInicial.value) > Number(totalDias.value)
  ) {
    mensagemErro += "dia inicial do mês está inválido!";
    formato += "1 até total de dias no mês";
  }

  // Checar campo total de dias do mês
  else if (
    Number(anoDesejado.value) < 2000 ||
    Number(anoDesejado.value) > anoAtual + 3
  ) {
    mensagemErro += `ano está fora do permitido, coloque um ano de no máximo 3 anos a mais do ano atual`;
    formato += `2000 até ${anoAtual + 3}`;

    // Checar quantidade de pessoas
  } else if (Number(numPessoas.value) < 1 || Number(numPessoas.value) > 10) {
    mensagemErro += "número de pessoas está inválido";
    formato += "1 até 10";

    // Sem erros
  } else {
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
  let inputNumCriancas = Number(numPessoas.value);
  let inputAnoDesejado = Number(anoDesejado.value);
  let inicioMes = Number(diaInicial.value);

  // Checar validade dos dados
  if (checarErros()) {
    alert("[ERRO] Erros encontrados, corriga-os e tente Gerar novamente!");
    return;
  }

  let mes = inputMes < 10 ? `0${inputMes}` : inputMes;

  resultadoDatas.innerHTML = "";
  for (let j = inicioMes; j <= inputTotalDias; j++) {
    for (let i = 1; i <= inputNumCriancas; i++) {
      if (j < 10) {
        resultadoDatas.innerHTML += `0${j}/${mes}/${inputAnoDesejado}<br>`;
      } else {
        resultadoDatas.innerHTML += `${j}/${mes}/${inputAnoDesejado}<br>`;
      }
    }
  }

  copiarContainerDatas.style.display = "block";
  podeGerarPessoas = true;
  esconderGerarPessoa = true;
  if (esconderGerarPessoa) {
    toggleDisplay();
  }
}

function gerarPessoas() {
  if (!podeGerarPessoas) {
    alert("Favor gerar datas primeiro");
    return;
  }

  containerPessoas.style.display = "block";

  let quantidadePessoas = document.querySelector("#pessoas").value;

  containerPessoas.innerHTML = "";
  for (let i = 1; i <= Number(quantidadePessoas); i++) {
    containerPessoas.innerHTML += `
      <p>
        <label for="nome${i}">Pessoa ${i}:</label>
        <input
          type="text"
          name="nome${i}"
          id="nome${i}"
          minlength="3"
          maxlength="50"
        />
      </p>
      `;
  }

  gerarListaPessoas.style.display = "block";
}

function gerarListaPessoasFunc() {
  let quantidadeFilhos = containerPessoas.childElementCount;

  let quantidadeGerada =
    Number(diaInicial.value) == 1
      ? Number(totalDias.value) + 1 - Number(diaInicial.value)
      : Number(totalDias.value) - Number(diaInicial.value);

  let nomes = [];

  for (let i = 1; i <= quantidadeFilhos; i++) {
    let nome = document.querySelector(`#nome${i}`).value;
    nomes.push(nome);
  }

  resultadoPessoas.innerHTML = "";
  for (let j = 0; j < quantidadeGerada; j++) {
    for (i in nomes) {
      resultadoPessoas.innerHTML += `${nomes[i]}<br>`;
    }
  }

  resultadoPessoas.style.display = "block";
  copiarPessoasContainer.style.display = "block";
}

function copiarDatas(dado) {
  let texto;

  if (dado == "datas") {
    texto = resultadoDatas.innerHTML;
  } else if (dado == "pessoas") {
    texto = resultadoPessoas.innerHTML;
  } else {
    alert("Erro ao tentar copiar, informe o Desenvolvedor.");
  }

  // Cria um elemento de área de texto temporário
  let areaDeTransferencia = document.createElement("textarea");

  texto = texto.replace(/<br>/g, "\n");

  // Define o valor do elemento de área de transferência como o texto a ser copiado
  areaDeTransferencia.value = texto;

  // Adiciona o elemento de área de transferência ao documento
  document.body.appendChild(areaDeTransferencia);

  navigator.clipboard
    .writeText(areaDeTransferencia.value)
    .then(() => {
      alert("Conteúdo copiado para sua área de transferência!");
    })
    .catch((error) => {
      alert("Houve um erro ao copiar, informe ao Desenvolvedor");
      alert("ERRO: " + error);
    });

  // Seleciona o texto dentro do elemento de área de transferência
  //areaDeTransferencia.select();

  // Copia o texto selecionado para a área de transferência
  //document.execCommand("copy"); execCommand está obsoleto

  // Remove o elemento de área de transferência do documento
  document.body.removeChild(areaDeTransferencia);
}

function toggleDisplay() {
  gerarListaPessoas.style.display = "none";
  containerPessoas.style.display = "none";
  resultadoPessoas.style.display = "none";
  copiarPessoasContainer.style.display = "none";
}
