/************************** Abrir gerador **************************/
function scriptAbrirGeradorCPF() {
    abrirEfechar('modal-cpf');
    criarComboUf('uf');
    criarComboFormatacaoCpfCnpj('formatacao');
};

function scriptAbrirGeradorNome() {
    abrirEfechar('modal-nome');
    criarComboSexo('sexo');
    criarComboFormatacaoNome('tipo-nome');
};

function scriptAbrirGeradorCNPJ() {
    abrirEfechar('modal-cnpj');
    criarComboFormatacaoCpfCnpj('formatacao-cnpj');
};


/************************** Fechar gerador **************************/
function scriptsFecharGeradorCPF() {
    limparCampo('quantidade-cpf');
    limparCampo('retorno-cpf');
    removerCombobox('#uf');
    removerCombobox('#formatacao');
};

function scriptsFecharGeradorNome() {
    limparCampo('quantidade-nome');
    limparCampo('retorno-nome');
    removerCombobox('#sexo');
    removerCombobox('#tipo-nome');
};

function scriptsFecharGeradorCNPJ() {
    limparCampo('quantidade-matriz');
    limparCampo('quantidade-cnpj');
    limparCampo('retorno-cnpj');
    removerCombobox('#formatacao-cnpj')
};





/************************** Funções auxiliares **************************/
function abrirEfechar(elemento) {
    let element = document.getElementById(elemento);
    let propriedade = window.getComputedStyle(element);
    let atributo = propriedade.getPropertyValue('display');
    if (atributo == "none") {
        document.getElementById(elemento).style.display = "flex";
    } else {
        document.getElementById(elemento).style.display = "none";
    }
};


function limitarCaracteres(elemento) {
    const element = document.getElementById(elemento);
    if (element.value.length > element.maxLength) {
        element.value = element.value.slice(0, element.maxLength);
    }
};

function transformarNumeroParaPositivo(elemento) {
    const campoParaObservar = document.getElementById(elemento);
    if (campoParaObservar.value < 0) {
        campoParaObservar.value = (campoParaObservar.value * (-1));
    }
};

function limitarNumeroMinimo(elemento) {
    transformarNumeroParaPositivo(elemento);
    const campoParaObservar = document.getElementById(elemento);
    const min = 1;
    if (campoParaObservar.value <= min) {
        campoParaObservar.value = min;
    }
};

function limitarNumeroMaximo(element, maximo) {
    const max = maximo;
    limitarNumeroMinimo(element);
    const campoParaObservar = document.getElementById(element);
    if (campoParaObservar.value > max) {
        campoParaObservar.value = max;
    }
};

function criarPrimeiraOptionInativa(seletorCampo, primeiroElemento) {
    const select = document.getElementById(seletorCampo);
    select.appendChild(new Option(primeiroElemento, "0")).setAttribute("disabled", "disabled");
};

function criarOptionsSelectValorIgualTexto(seletorCampo, listaElementos) {
    const select = document.getElementById(seletorCampo);
    listaElementos.forEach(function (chave) {
        select.appendChild(new Option(chave, chave));
    });
};

function criarOptionsSelectValorDiferenteTexto(seletorCampo, listaElementos) {
    const select = document.getElementById(seletorCampo);
    listaElementos.forEach(function (chave, elemento) {
        select.appendChild(new Option(chave, elemento + 1));
    });
};

function criarComboUf(selectorCampo) {
    const uf = ['AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO'];
    const primeiroElemento = ['UF'];
    criarPrimeiraOptionInativa(selectorCampo, primeiroElemento);
    criarOptionsSelectValorIgualTexto(selectorCampo, uf);
};

function criarComboSexo(selecorCampo) {
    const sexo = ['Feminino', 'Masculino', 'Indiferente'];
    const primeiroElemento = ['Selecione o sexo']
    criarPrimeiraOptionInativa(selecorCampo, primeiroElemento);
    criarOptionsSelectValorDiferenteTexto(selecorCampo, sexo);
};

function criarComboFormatacaoCpfCnpj(selectorCampo) {
    const formatacao = ['Sem formatação', 'Pontos e traço', 'Apenas pontos', 'Apenas traço'];
    const primeiroElemento = ['Formatação']
    criarPrimeiraOptionInativa(selectorCampo, primeiroElemento);
    criarOptionsSelectValorDiferenteTexto(selectorCampo, formatacao);
};

function criarComboFormatacaoNome(selectorCampo) {
    const formatacao = ['Apenas o primeiro nome', 'Nome e sobrenome completo', 'Nome e sobrenome abreviado'];
    const primeiroElemento = ['Selecione a formatação'];
    criarPrimeiraOptionInativa(selectorCampo, primeiroElemento);
    criarOptionsSelectValorDiferenteTexto(selectorCampo, formatacao);
};


function removerCombobox(selectorCampo) {
    const select = document.querySelector(selectorCampo);
    let options = select.getElementsByTagName('OPTION');
    while (options.length>0){
        select.remove(options[0]);
    };
};

function limparCampo(selectorCampo) {
    const campo = document.getElementById(selectorCampo);
    campo.value = '';
};
