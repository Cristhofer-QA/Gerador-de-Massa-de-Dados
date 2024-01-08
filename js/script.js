

function abrirEfechar(elemento) {
    var element = document.getElementById(elemento);
    var propriedade = window.getComputedStyle(element);
    var atributo = propriedade.getPropertyValue('display');
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

function limitarNumeroMaximo(element) {
    const max = 400000;
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

function criarComboFormatacaoCPF(selectorCampo) {
    const formatacao = ['Sem formatação', 'Pontos e traço', 'Apenas pontos', 'Apenas traço'];
    const primeiroElemento = ['Formatação']
    criarPrimeiraOptionInativa(selectorCampo, primeiroElemento);
    criarOptionsSelectValorDiferenteTexto(selectorCampo, formatacao);
};

function criarComboFormatacaoNome(selectorCampo) {
    const formatacao = ['Apenas o primeiro nome', 'Nome e sobrenome completo', 'Nome e sobrenome abreviado'];
    const primeiroElemento = ['Selecione a formatação']
    criarPrimeiraOptionInativa(selectorCampo, primeiroElemento);
    criarOptionsSelectValorDiferenteTexto(selectorCampo, formatacao);
};


function removerCombobox(selectorCampo) {
    const select = document.getElementById(selectorCampo);
    var options = select.getElementsByTagName('OPTION');
    for (var i = 1; options.length; i++) {
        select.remove(options[i]);;
    }
};

function limparCampo(selectorCampo) {
    const campo = document.getElementById(selectorCampo);
    campo.value = '';
}

function scriptsFecharGeradorCPF() {
    limparCampo('quantidade-cpf');
    limparCampo('retorno-cpf');
    removerCombobox('uf');
    removerCombobox('formatacao')
}

function scriptsFecharGeradorNome() {
    limparCampo('quantidade-nome');
    limparCampo('retorno-nome');
    removerCombobox('sexo');
    removerCombobox('tipo-nome')
}

function scriptAbrirGeradorCPF() {
    abrirEfechar('modal-cpf');
    criarComboUf('uf');
    criarComboFormatacaoCPF('formatacao');
};

function scriptAbrirGeradorNome() {
    abrirEfechar('modal-nome');
    criarComboSexo('sexo');
    criarComboFormatacaoNome('tipo-nome');
};

function gerarCpf() {
    const uf = document.querySelector('#uf').value;
    const formatacao = document.querySelector('#formatacao').value;
    const quantidade = document.querySelector('#quantidade-cpf').value;
    const imprimir = document.querySelector('#retorno-cpf');

    if (formatacao != 0 && quantidade != '' && uf != 0) {
        const cpf = new MultiplosCpf(uf, formatacao, quantidade);
        cpf.gerarMultiplosCpf();
        imprimir.value = cpf.listaCpf;
    } else {
        debugger
        validarDadosFiltroCpf(uf, formatacao, quantidade)
    }
};

function validarDadosFiltroCpf(uf, formatacao, quantidade) {
    let listaInconsistencias = [];
    let mensagemErroUmItemIncorreto = 'Informe o filtro: ';
    let mensagemErroMultiplosItensIncorretos = 'Informe os filtros: ';

    if (uf == 0) {
        listaInconsistencias.push('UF')
    } if (formatacao == 0) {
        listaInconsistencias.push('Formatação')
    } if (quantidade == '') {
        listaInconsistencias.push('Quantidade')
    };

    switch (listaInconsistencias.length) {
        case 1:
            window.alert(mensagemErroUmItemIncorreto + listaInconsistencias[0]);
            break;
        case 2:
            window.alert(mensagemErroMultiplosItensIncorretos + listaInconsistencias[0] + ' e ' + listaInconsistencias[1]);
            break;

        case 3:
            window.alert(mensagemErroMultiplosItensIncorretos + listaInconsistencias[0] + ', ' + listaInconsistencias[1] + ' e ' + listaInconsistencias[2]);
            break;
    }
};



function gerarNome() {

    const sexo = document.querySelector('#sexo').value;
    const formatação = document.querySelector('#tipo-nome').value;
    const quantidade = document.querySelector('#quantidade-nome').value;
    const imprimir = document.querySelector('#retorno-nome');

    if (sexo != 0 && quantidade != '' && formatação != 0) {
        const nomes = new MultiplosNomes(sexo, formatação, quantidade)
        imprimir.value = nomes.listaDeNomesGerados;
    } else{
        validarDadosFiltroNome(sexo, formatação, quantidade);
    }
};

function validarDadosFiltroNome(sexo, formatacao, quantidade) {
    let listaInconsistencias = [];
    let mensagemErroUmItemIncorreto = 'Informe o filtro: ';
    let mensagemErroMultiplosItensIncorretos = 'Informe os filtros: ';

    if (sexo == 0) {
        listaInconsistencias.push('Sexo')
    } if (formatacao == 0) {
        listaInconsistencias.push('Formatação')
    } if (quantidade == '') {
        listaInconsistencias.push('Quantidade')
    };

    switch (listaInconsistencias.length) {
        case 1:
            window.alert(mensagemErroUmItemIncorreto + listaInconsistencias[0]);
            break;
        case 2:
            window.alert(mensagemErroMultiplosItensIncorretos + listaInconsistencias[0] + ' e ' + listaInconsistencias[1]);
            break;

        case 3:
            window.alert(mensagemErroMultiplosItensIncorretos + listaInconsistencias[0] + ', ' + listaInconsistencias[1] + ' e ' + listaInconsistencias[2]);
            break;
    }
};




/*************************GERADOR DE CPF *************************/
class Cpf {
    digitosCpf = [];

    constructor(regiaoFiscal) {
        this.digitosCpf[0] = this.gerarDigitosAleatorios();
        this.digitosCpf[1] = this.gerarDigitosAleatorios();
        this.digitosCpf[2] = this.gerarDigitosAleatorios();
        this.digitosCpf[3] = this.gerarDigitosAleatorios();
        this.digitosCpf[4] = this.gerarDigitosAleatorios();
        this.digitosCpf[5] = this.gerarDigitosAleatorios();
        this.digitosCpf[6] = this.gerarDigitosAleatorios();
        this.digitosCpf[7] = this.gerarDigitosAleatorios();
        this.digitosCpf[8] = this.digitoRegiaoFiscal(regiaoFiscal);
        this.digitosCpf[9] = this.geradorDigitoVerificador(0);
        this.digitosCpf[10] = this.geradorDigitoVerificador(1);
    }

    digitoRegiaoFiscal(regiaoFiscal) {
        switch (regiaoFiscal) {
            case "DF": case "GO": case "MS": case "MT": case "TO":
                return 1;
            case "AC": case "AM": case "AP": case "PA": case "RR": case "RO":
                return 2;
            case "CE": case "MA": case "PI":
                return 3;
            case "AL": case "PB": case "PE": case "RN":
                return 4;
            case "BA": case "SE":
                return 5;
            case "MG":
                return 6;
            case "ES": case "RJ":
                return 7;
            case "SP":
                return 8;
            case "PR": case "SC":
                return 9;
            case "RS":
                return 0;
        };
    };

    geradorDigitoVerificador(posiçãoInicial) {
        let somaDigitos = 0;
        let multiplicadorDigitos = 10;

        for (let i = posiçãoInicial; i < 9 + posiçãoInicial; i++) {
            somaDigitos = somaDigitos + (this.digitosCpf[i] * multiplicadorDigitos);
            multiplicadorDigitos--;
        };

        if (somaDigitos % 11 == 0 || somaDigitos % 11 == 1) {
            return 0;
        }
        return (11 - (somaDigitos % 11));
    };

    gerarDigitosAleatorios() {
        return Math.floor(Math.random() * 10);
    };
};

class GerarCpf {
    cpf_valido;

    constructor(regiaoFiscal, tipoPontuacao) {
        const cpf = new Cpf(regiaoFiscal)
        this.cpf_valido = this.escolherTipoPontuacao(tipoPontuacao, cpf);
    }

    escolherTipoPontuacao(tipoPontuacao, cpf) {
        if (tipoPontuacao == 1) {
            return this.gerarCpfSemPontuacao(cpf);
        } if (tipoPontuacao == 2) {
            return this.gerarCpfComPontuacao(cpf);
        } if (tipoPontuacao == 3) {
            return this.gerarCpfApenasPontos(cpf);
        } if (tipoPontuacao == 4) {
            return this.gerarCpfApenasTraço(cpf);
        }
    };

    gerarCpfComPontuacao(cpf) {
        return `${cpf.digitosCpf[0]}${cpf.digitosCpf[1]}${cpf.digitosCpf[2]}.${cpf.digitosCpf[3]}${cpf.digitosCpf[4]}${cpf.digitosCpf[5]}.${cpf.digitosCpf[6]}${cpf.digitosCpf[7]}${cpf.digitosCpf[8]}-${cpf.digitosCpf[9]}${cpf.digitosCpf[10]}`
    };

    gerarCpfSemPontuacao(cpf) {
        return `${cpf.digitosCpf[0]}${cpf.digitosCpf[1]}${cpf.digitosCpf[2]}${cpf.digitosCpf[3]}${cpf.digitosCpf[4]}${cpf.digitosCpf[5]}${cpf.digitosCpf[6]}${cpf.digitosCpf[7]}${cpf.digitosCpf[8]}${cpf.digitosCpf[9]}${cpf.digitosCpf[10]}`
    };

    gerarCpfApenasPontos(cpf) {
        return `${cpf.digitosCpf[0]}${cpf.digitosCpf[1]}${cpf.digitosCpf[2]}.${cpf.digitosCpf[3]}${cpf.digitosCpf[4]}${cpf.digitosCpf[5]}.${cpf.digitosCpf[6]}${cpf.digitosCpf[7]}${cpf.digitosCpf[8]}${cpf.digitosCpf[9]}${cpf.digitosCpf[10]}`
    };

    gerarCpfApenasTraço(cpf) {
        return `${cpf.digitosCpf[0]}${cpf.digitosCpf[1]}${cpf.digitosCpf[2]}${cpf.digitosCpf[3]}${cpf.digitosCpf[4]}${cpf.digitosCpf[5]}${cpf.digitosCpf[6]}${cpf.digitosCpf[7]}${cpf.digitosCpf[8]}-${cpf.digitosCpf[9]}${cpf.digitosCpf[10]}`
    };
};

class MultiplosCpf {
    listaCpf = '';

    constructor(regiaoFiscal, tipoPontuacao, quantidades) {
        this.gerarMultiplosCpf(regiaoFiscal, tipoPontuacao, quantidades);
    }

    gerarMultiplosCpf(regiaoFiscal, tipoPontuacao, quantidades) {
        for (let i = 0; i < quantidades; i++) {
            const cpf = new GerarCpf(regiaoFiscal, tipoPontuacao);
            this.listaCpf = this.listaCpf + cpf.cpf_valido + "\n";
        }
    }
};





/************************* GERADOR DE NOMES *************************/
class Nome {
    nome;

    constructor(sexo, formatação) {
        this.gerarNomeCompleto(sexo, formatação);
    }

    gerarNomeCompleto(sexo, formatação) {
        const nomeGerado = this.gerarPrimeiroNome(sexo);
        const sobrenomeGerado = this.gerarSobrenome(formatação);
        this.nome = nomeGerado + ' ' + sobrenomeGerado
    };

    gerarPrimeiroNome(sexo) {
        const primeiraLetra = this.buscarPrimeiraLetra();
        switch (sexo) {
            case '1':
                return this.gerarNomeFeminino(primeiraLetra);
            case '2':
                return this.gerarNomeMasculino(primeiraLetra);
            case '3':
                return this.gerarNomeMasculinoOuFeminino(primeiraLetra);
        };
    };



    gerarSobrenome(formatação) {
        switch (formatação) {
            case '1':
                //apenas primeiro nome
                return ''
            case '2':
                //nome e sobrenome completo
                return this.gerarSobreNomeUnitario() + ' ' + this.gerarSobreNomeUnitario() + ' ' + this.gerarSobreNomeUnitario();
            case '3':
                //nome e sobrenome abreviado
                return this.gerarSobrenomeResumido() + ' ' + this.gerarSobrenomeResumido() + ' ' + this.gerarSobreNomeUnitario()
        }
    };


    gerarNomeMasculino(primeiraLetra) {
        return this.listaNome.listaNomeMasculino[primeiraLetra][this.escolherPosicaoArrayNomeMasculino(primeiraLetra)];
    };

    gerarNomeFeminino(primeiraLetra) {
        return this.listaNome.listaNomeFeminino[primeiraLetra][this.escolherPosicaoArrayNomeFeminino(primeiraLetra)];
    };

    gerarNomeMasculinoOuFeminino(primeiraLetra) {
        const sexoDoNome = this.gerarNumeroIntervalo(2)
        if (sexoDoNome === 0) {
            return this.gerarNomeMasculino(primeiraLetra);
        }
        return this.gerarNomeFeminino(primeiraLetra);
    };

    escolherPosicaoArrayNomeMasculino(letraInicial) {
        return this.gerarNumeroIntervalo(this.contarTamanhoArrayNomesMasculinos(letraInicial));
    };

    contarTamanhoArrayNomesMasculinos(letraInicial) {
        return this.contarTamanhoArray(this.listaNome.listaNomeMasculino[letraInicial])
    };

    escolherPosicaoArrayNomeFeminino(letraInicial) {
        return this.gerarNumeroIntervalo(this.contarTamanhoArrayNomesFeminino(letraInicial));
    };

    contarTamanhoArrayNomesFeminino(letraInicial) {
        return this.contarTamanhoArray(this.listaNome.listaNomeFeminino[letraInicial])
    };

    gerarSobreNomeUnitario() {
        const primeiraLetra = this.buscarPrimeiraLetra();
        return this.listaSobrenome.sobrenomeCompleto[primeiraLetra][this.escolherPosiçãoArraySobrenome(primeiraLetra)];
    };


    gerarSobrenomeResumido() {
        return this.listaSobrenome.sobrenomeAbreviado[this.escolherPosiçãoArraySobrenomeResumido()];
    };

    escolherPosiçãoArraySobrenomeResumido() {
        return this.gerarNumeroIntervalo(this.contarTamanhoArraySobrenomeResumido());
    };

    contarTamanhoArraySobrenomeResumido() {
        return this.contarTamanhoArray(this.listaSobrenome.sobrenomeAbreviado);
    };

    escolherPosiçãoArraySobrenome(letraInicial) {
        return this.gerarNumeroIntervalo(this.contarTamanhoArraySobrenome(letraInicial));
    };

    contarTamanhoArraySobrenome(letraInicial) {
        return this.contarTamanhoArray(this.listaSobrenome.sobrenomeCompleto[letraInicial]);
    };

    contarTamanhoArray(nomeArray) {
        return nomeArray.length;
    };

    gerarNumeroIntervalo(maximo) {
        let min = 0;
        let max = (maximo - 1);
        let contador = Math.floor(Math.random() * (max - min + 1) + min);
        return contador
    };

    buscarPrimeiraLetra() {
        const listaIniciais = [
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
            'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',
            's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
        ];
        const primeiraLetra = listaIniciais[this.gerarNumeroIntervalo(this.contarTamanhoArray(listaIniciais))];
        return primeiraLetra;
    };

    listaNome = {
        listaNomeFeminino: {
            a: ['Aadhya', 'Abby', 'Abelita', 'Abigail', 'Acácia', 'Acália', 'Açucena', 'Ada', 'Addie', 'Adela', 'Adelaide', 'Adele', 'Adélia', 'Adelina', 'Adelinda', 'Adeline', 'Adelita', 'Adelma', 'Adhara', 'Adília', 'Adilma', 'Adineia', 'Adoração', 'Adosinda', 'Adriana', 'Adriane', 'Adriele', 'Adrielly', 'Adrienne', 'Afra', 'Ágata', 'Agatha', 'Agda', 'Aglaia', 'Agna', 'Agnes', 'Águeda', 'Aida', 'Aidé', 'Aileen', 'Ailen', 'Aimee', 'Aisha', 'Aixa', 'Alaíde', 'Alana', 'Alanis', 'Alba', 'Albana', 'Albanita', 'Alberta', 'Albertina', 'Albina', 'Alcina', 'Alcione', 'Alda', 'Aldara', 'Aldina', 'Alegria', 'Alejandra', 'Alésia', 'Alessandra', 'Alessandrina', 'Alessia', 'Alexa', 'Alexandra', 'Alexandria', 'Alexandrina', 'Aléxia', 'Alexia', 'Alexina', 'Alexis', 'Aléxis', 'Alfreda', 'Ália', 'Aliana', 'Alice', 'Alicia', 'Alícia', 'Alida', 'Alina', 'Aline', 'Alisa', 'Alisha', 'Alisia', 'Alison', 'Álison', 'Alissa', 'Alita', 'Alix', 'Allie', 'Allison', 'Allyson', 'Alma', 'Almudena', 'Alta', 'Althea', 'Altina', 'Aluísa', 'Alva', 'Alvina', 'Alya', 'Alyson', 'Alyssa', 'Alzira', 'Amabília', 'Amada', 'Amalia', 'Amália', 'Amalteia', 'Amanda', 'Amandina', 'Amara', 'Amarílis', 'Amber', 'Ambrósia', 'Ambrosina', 'Amelia', 'Amélia', 'Amelie', 'Amena', 'América', 'Amie', 'Amira', 'Amora', 'Amparo', 'Amy', 'Ana', 'Anabel', 'Anabela', 'Anabelle', 'Anaíce', 'Anair', 'Anaíra', 'Anaís', 'Anaisa', 'Anaísa', 'Analice', 'Analisa', 'Analu', 'Anamar', 'Ananya', 'Anastácia', 'Anastasia', 'Andrea', 'Andréa', 'Andreia', 'Andréia', 'Andreína', 'Andrelina', 'Andresa', 'Andresca', 'Andressa', 'Andreza', 'Ândria', 'Andrielly', 'Andrômeda', 'Ane', 'Angel', 'Angela', 'Ângela', 'Angelia', 'Angelica', 'Angélica', 'Angelina', 'Angelina', 'Angeline', 'Angelique', 'Angelita', 'Angie', 'Ânia', 'Anita', 'Ann', 'Anna', 'Annabel', 'Annabelle', 'Anne', 'Annette', 'Annie', 'Annmarie', 'Anouk', 'Antoinette', 'Antonela', 'Antonella', 'Antonia', 'Antônia', 'Antonieta', 'Antonina', 'Anunciação', 'Anunciada', 'Any', 'Aparecida', 'Apra', 'April', 'Arabela', 'Araceli', 'Araci', 'Argentina', 'Ária', 'Ariadna', 'Ariadne', 'Ariana', 'Ariane', 'Ariel', 'Ariela', 'Ariele', 'Arlene', 'Arlete', 'Arlinda', 'Arline', 'Armanda', 'Armandina', 'Arminda', 'Aroa', 'Artemisa', 'Artemísia', 'Ashlee', 'Ashley', 'Ásia', 'Aspásia', 'Assunção', 'Assunta', 'Astrid', 'Atena', 'Athena', 'Audra', 'Audrey', 'Augusta', 'Aura', 'Áurea', 'Aurelia', 'Aurélia', 'Aureliana', 'Aurora', 'Ausenda', 'Autumn', 'Auxiliadora', 'Ava', 'Avis', 'Avni', 'Ayla', 'Azul'],
            b: ['Balbina', 'Barbara', 'Bárbara', 'Bárbora', 'Barbra', 'Bartolina', 'Basia', 'Basília', 'Basilisa', 'Basilissa', 'Beanina', 'Beatrice', 'Beatriz', 'Bebiana', 'Becca', 'Becky', 'Bela', 'Beladora', 'Belanice', 'Belanísia', 'Belara', 'Belarmina', 'Belém', 'Belenice', 'Belina', 'Belinda', 'Belisa', 'Belísia', 'Belita', 'Bella', 'Belle', 'Belmira', 'Benardete', 'Benedicta', 'Benedita', 'Benícia', 'Benigna', 'Benilde', 'Benita', 'Benjamina', 'Benvinda', 'Berengária', 'Berenice', 'Berna', 'Bernadete', 'Bernadette', 'Bernadine', 'Bernarda', 'Bernardete', 'Bérnia', 'Bernice', 'Berta', 'Bertha', 'Bertie', 'Bertila', 'Bertilde', 'Bertina', 'Beryl', 'Bessie', 'Betânia', 'Beth', 'Beth', 'Bethany', 'Bétia', 'Betina', 'Betsabé', 'Betsy', 'Bette', 'Bettie', 'Betty', 'Bettye', 'Beulah', 'Beverley', 'Beverly', 'Bia', 'Bianca', 'Bibiana', 'Billie', 'Bina', 'Blanca', 'Blanche', 'Blandina', 'Blásia', 'Bobbi', 'Bobbie', 'Bonifácia', 'Bonita', 'Bonnie', 'Bora', 'Branca', 'Brandi', 'Brandie', 'Brandy', 'Brásia', 'Brázia', 'Brena', 'Brenda', 'Briana', 'Brianna', 'Brícia', 'Brida', 'Bridget', 'Bridgett', 'Bridgette', 'Brígida', 'Brigite', 'Brigitte', 'Brisa', 'Brisa', 'Brites', 'Britney', 'Brittany', 'Brittney', 'Brízida', 'Brooke', 'Bruna', 'Brunilde'],
            c: ['Cacelina', 'Cácia', 'Cacilda', 'Caetana', 'Caia', 'Caila', 'Cailane', 'Cailany', 'Cailin', 'Caitiane', 'Caitlin', 'Callie', 'Camélia', 'Camila', 'Camille', 'Camilly', 'Candace', 'Candelária', 'Candice', 'Candida', 'Cândida', 'Candy', 'Cara', 'Carela', 'Cáren', 'Carey', 'Cárin', 'Carina', 'Carine', 'Carisa', 'Carísia', 'Carissa', 'Carla', 'Carlene', 'Carlinda', 'Carlota', 'Carly', 'Carma', 'Carmel', 'Carmela', 'Carmélia', 'Carmelina', 'Carmelinda', 'Carmelita', 'Carmella', 'Carmen', 'Cármen', 'Carmezinda', 'Carmina', 'Carminda', 'Carminho', 'Caro', 'Carol', 'Carole', 'Carolina', 'Caroline', 'Carolyn', 'Carrie', 'Casandra', 'Casey', 'Cassandra', 'Cássia', 'Cassie', 'Cassilda', 'Casta', 'Catalina', 'Catarina', 'Caterina', 'Catharine', 'Catherine', 'Cathleen', 'Cathryn', 'Cathy', 'Cátia', 'Cecelia', 'Cecile', 'Cecilia', 'Cecília', 'Celeste', 'Celia', 'Célia', 'Celina', 'Celine', 'Celinia', 'Celisia', 'Celsa', 'Cereja', 'Ceres', 'Cesaltina', 'Cesária', 'Cesarina', 'Chandra', 'Chantal', 'Charity', 'Charlene', 'Charlotte', 'Charmaine', 'Chasity', 'Cheila', 'Chelsea', 'Chema', 'Chenoa', 'Cheri', 'Cherie', 'Cherry', 'Cheryl', 'Chiara', 'Chloe', 'Chris', 'Christa', 'Christi', 'Christian', 'Christiana', 'Christiane', 'Christie', 'Christina', 'Christine', 'Christy', 'Chrystal', 'Ciara', 'Cibele', 'Cibelly', 'Cida', 'Cidália', 'Cidalina', 'Cidalisa', 'Cinara', 'Cinderela', 'Cindy', 'Cinira', 'Cíntia', 'Cipora', 'Circe', 'Círia', 'Cirila', 'Cita', 'Cizina', 'Claire', 'Clara', 'Clare', 'Clarice', 'Clarina', 'Clarinda', 'Clarinha', 'Clarissa', 'Clarisse', 'Claudette', 'Claudia', 'Cláudia', 'Claudiana', 'Claudina', 'Claudine', 'Cleia', 'Cleide', 'Cleidiane', 'Clélia', 'Clemência', 'Clementina', 'Cleo', 'Cléo', 'Cleodice', 'Cleonice', 'Cleópatra', 'Clésia', 'Cleyde', 'Clícia', 'Climénia', 'Clívia', 'Cloe', 'Cloé', 'Clorinda', 'Clotilde', 'Coleen', 'Colete', 'Colette', 'Colleen', 'Conceição', 'Concepcion', 'Concetta', 'Connie', 'Consolação', 'Constança', 'Constance', 'Constância', 'Consuelo', 'Cora', 'Corália', 'Coralina', 'Cordélia', 'Corina', 'Corine', 'Corinne', 'Córita', 'Cornelia', 'Cornélia', 'Corrine', 'Cosete', 'Courtney', 'Covadonga', 'Cremilda', 'Cremilde', 'Cressida', 'Cris', 'Crisália', 'Crisálida', 'Crisanta', 'Crisante', 'Cristal', 'Cristela', 'Cristele', 'Cristene', 'Cristiana', 'Cristiane', 'Cristina', 'Cristolinda', 'Crystal', 'Custódia', 'Cynthia'],
            d: ['Dacelina', 'Daci', 'Dácia', 'Dádiva', 'Dafne', 'Dagmar', 'Daiana', 'Daiane', 'Daina', 'Daine', 'Daisi', 'Daisy', 'Dale', 'Dália', 'Daliana', 'Dalila', 'Dalinda', 'Dalira', 'Dalma', 'Dalmara', 'Dalva', 'Damaris', 'Dana', 'Dandara', 'Dânia', 'Daniana', 'Daniela', 'Danielle', 'Danielly', 'Danila', 'Danis', 'Daphne', 'Dara', 'Darci', 'Darcília', 'Darcy', 'Daria', 'Darla', 'Darlene', 'Dawa', 'Dawn', 'Dayane', 'Deana', 'Deann', 'Deanna', 'Deanne', 'Debbie', 'Debora', 'Débora', 'Deborah', 'Debra', 'Dee', 'Deena', 'Deidre', 'Deirdre', 'Dejanira', 'Delfina', 'Delia', 'Della', 'Delma', 'Delores', 'Deloris', 'Demétria', 'Dena', 'Denisa', 'Denise', 'Deolinda', 'Deonilde', 'Deotília', 'Dercy', 'Desiré', 'Desiree', 'Deusa', 'Dialina', 'Diana', 'Diane', 'Diann', 'Dianna', 'Dianne', 'Digna', 'Dilar', 'Diliana', 'Dilma', 'Dilsa', 'Dina', 'Diná', 'Dinah', 'Dinara', 'Dinora', 'Dinorah', 'Dione', 'Dionia', 'Dionísia', 'Dionne', 'Dirce', 'Diva', 'Dixie', 'Diya', 'Doce', 'Dollie', 'Dolly', 'Dolores', 'Domênica', 'Domicília', 'Domingas', 'Dominica', 'Dominique', 'Dona', 'Donatela', 'Donatella', 'Donia', 'Donna', 'Dora', 'Doralice', 'Doreen', 'Dores', 'Doris', 'Dóris', 'Doroteia', 'Dorothea', 'Dorothy', 'Dorthy', 'Dulce', 'Dulcina', 'Dulcineia', 'Dyne'],
            e: ['Earlene', 'Earline', 'Earnestine', 'Ebere', 'Ebony', 'Ecila', 'Eddie', 'Eden', 'Edênia', 'Edilene', 'Edina', 'Edite', 'Edith', 'Edna', 'Edneia', 'Eduarda', 'Edvânia', 'Edviges', 'Edwina', 'Effie', 'Eglantina', 'Eglé', 'Eileen', 'Eirene', 'Eladia', 'Elaine', 'Elana', 'Elara', 'Elba', 'Elda', 'Eleanor', 'Electra', 'Eleine', 'Elena', 'Eleonor', 'Eleonora', 'Elia', 'Élia', 'Eliana', 'Eliane', 'Élin', 'Elina', 'Elinor', 'Elis', 'Élis', 'Elisa', 'Elisabeta', 'Elisabete', 'Elisabeth', 'Elisângela', 'Elise', 'Elisete', 'Eliza', 'Elizabete', 'Elizabeth', 'Ella', 'Ellen', 'Elma', 'Elmina', 'Elnora', 'Eloá', 'Eloah', 'Eloisa', 'Eloísa', 'Eloise', 'Elsa', 'Elsie', 'Elva', 'Elvia', 'Elvira', 'Elza', 'Ema', 'Emanuela', 'Emanuelle', 'Emilia', 'Emília', 'Emiliana', 'Emily', 'Emma', 'Enara', 'Encarnação', 'Eneida', 'Engraçado', 'Engrácia', 'Enia', 'Enid', 'Enif', 'Eponina', 'Ercília', 'Erica', 'Érica', 'Ericka', 'Eridani', 'Erika', 'Erin', 'Eris', 'Éris', 'Erlea', 'Erma', 'Erna', 'Ernestine', 'Ersa', 'Esme', 'Esmeralda', 'Esperança', 'Esperanza', 'Essie', 'Estéfana', 'Estefani', 'Estefânia', 'Estela', 'Estella', 'Estelle', 'Ester', 'Esteva', 'Esther', 'Estibaliz', 'Estrela', 'Ethel', 'Etta', 'Eudora', 'Eufêmia', 'Eugenia', 'Eugênia', 'Eula', 'Eulália', 'Eunice', 'Eurica', 'Eva', 'Evangelina', 'Evangeline', 'Evania', 'Eve', 'Evelin', 'Evelina', 'Eveline', 'Evelyn', 'Excelsa'],
            f: ['Fábia', 'Fabiana', 'Fabíola', 'Fabrícia', 'Fabrízia', 'Fada', 'Faith', 'Fani', 'Fannie', 'Fanny', 'Fara', 'Fátima', 'Fay', 'Faye', 'Febe', 'Federica', 'Fedora', 'Felecia', 'Felicia', 'Felícia', 'Feliciana', 'Felicidade', 'Felipa', 'Felisa', 'Felisbela', 'Fern', 'Fernanda', 'Fernandina', 'Fidélia', 'Filipa', 'Filomena', 'Fiona', 'Firmina', 'Flávia', 'Flor', 'Flora', 'Florbela', 'Florença', 'Florence', 'Florência', 'Florentina', 'Florinda', 'Florine', 'Flossie', 'Formosa', 'Fran', 'Franca', 'Frances', 'Francesca', 'Franciele', 'Franciely', 'Francília', 'Francine', 'Francis', 'Francisca', 'Frankie', 'Freda', 'Frederica', 'Freida', 'Frida', 'Frieda'],
            g: ['Gabriela', 'Gabriele', 'Gabrieli', 'Gabrielle', 'Gaby', 'Gaetana', 'Gaia', 'Gail', 'Galdência', 'Galdina', 'Gale', 'Gardênia', 'Gasparina', 'Gay', 'Gayle', 'Gema', 'Gemma', 'Gena', 'Genebra', 'Generosa', 'Geneva', 'Genevieve', 'Genezia', 'Genoveva', 'Genuzia', 'Georgete', 'Georgette', 'Georgia', 'Geórgia', 'Georgiana', 'Georgina', 'Geovana', 'Geralda', 'Geraldine', 'Gertrude', 'Gertrudes', 'Gerusa', 'Geruza', 'Gia', 'Giana', 'Giena', 'Gilda', 'Gina', 'Ginette', 'Ginger', 'Gioconda', 'Giorgia', 'Giovana', 'Giovanna', 'Girlene', 'Gisela', 'Gisele', 'Giselle', 'Gislaine', 'Gisleine', 'Gislene', 'Giulia', 'Giuliana', 'Gladys', 'Glaúcia', 'Glenda', 'Glenna', 'Glicéria', 'Gloria', 'Glória', 'Goldie', 'Gonzaga', 'Graça', 'Grace', 'Gracie', 'Graciela', 'Gracília', 'Gracinda', 'Graziela', 'Graziele', 'Grazielly', 'Greta', 'Gretchen', 'Gretel', 'Guadalupe', 'Guia', 'Guilhermina', 'Guiomar', 'Gwen', 'Gwendolyn'],
            h: ['Hadassa', 'Haidé', 'Haimi', 'Haley', 'Hallie', 'Hannah', 'Harriet', 'Harriett', 'Hasna', 'Hattie', 'Hayla', 'Hazel', 'Heather', 'Hebe', 'Hedviges', 'Heidi', 'Helen', 'Helena', 'Helene', 'Helga', 'Heli', 'Heloísa', 'Heloise', 'Henrietta', 'Henriqueta', 'Hera', 'Herminia', 'Hester', 'Hilary', 'Hilda', 'Hillary', 'Hollie', 'Holly', 'Hope'],
            i: ['Iana', 'Iara', 'Iasmin', 'Iasmine', 'Ibbie', 'Ida', 'Idalina', 'Idalis', 'Idara', 'Idonna', 'Ikea', 'Ila', 'Ilda', 'Ileana', 'Ilene', 'Ilse', 'Imaculada', 'Imaculado', 'Imelda', 'Imogen', 'Imogene', 'Ina', 'Inácia', 'Inara', 'India', 'Indina', 'Indira', 'Indo', 'Ines', 'Inês', 'Inez', 'Ingrid', 'Iola', 'Iolanda', 'Ioná', 'Ione', 'Iracema', 'Irene', 'Irenilda', 'Iria', 'Iride', 'Irina', 'Iris', 'Íris', 'Irma', 'Isabel', 'Isabela', 'Isabeli', 'Isabella', 'Isabelle', 'Isadora', 'Isaura', 'Isidora', 'Isis', 'Isla', 'Ismara', 'Isolda', 'Ítala', 'Iva', 'Ivana', 'Ivandra', 'Ivani', 'Ivete', 'Ivone', 'Ivonete', 'Ivy', 'Izabel', 'Izaira'],
            j: ['Jaciane', 'Jaciara', 'Jacinta', 'Jacira', 'Jacirene', 'Jackie', 'Jacklyn', 'Jaclyn', 'Jacobina', 'Jacqueline', 'Jacquelyn', 'Jada', 'Jade', 'Jaime', 'James', 'Jami', 'Jamie', 'Jamila', 'Jan', 'Jana', 'Janaína', 'Jandira', 'Jane', 'Janell', 'Janelle', 'Janet', 'Janete', 'Janette', 'Jani', 'Janice', 'Janie', 'Janilce', 'Janina', 'Janine', 'Janis', 'Janna', 'Jannie', 'Jaqueline', 'Jasmim', 'Jasmin', 'Jasmine', 'Jayne', 'Jean', 'Jeane', 'Jeanette', 'Jeanie', 'Jeanine', 'Jeanne', 'Jeannette', 'Jeannie', 'Jeannine', 'Jena', 'Jeni', 'Jenifer', 'Jénifer', 'Jenna', 'Jennie', 'Jennifer', 'Jenny', 'Jeri', 'Jerri', 'Jerry', 'Jerusa', 'Jessia', 'Jessica', 'Jéssica', 'Jessie', 'Jewel', 'Jewell', 'Jill', 'Jillian', 'Jimena', 'Jimmie', 'Jo', 'Joan', 'Joana', 'Joann', 'Joanna', 'Joanne', 'Joaquina', 'Jocelyn', 'Jodi', 'Jodie', 'Jody', 'Joelly', 'Joelma', 'Johanna', 'John', 'Johnnie', 'Joice', 'Jolene', 'Joni', 'Jordan', 'Jorgina', 'Joseane', 'Josefa', 'Josefina', 'Joselene', 'Joselina', 'Josephine', 'Josiane', 'Josie', 'Jossara', 'Josuana', 'Joy', 'Joyce', 'Juana', 'Juanita', 'Jucele', 'Jucélia', 'Juciele', 'Juciene', 'Judite', 'Judith', 'Judy', 'Julia', 'Júlia', 'Juliana', 'Juliane', 'Julianne', 'Julie', 'Juliet', 'Julieta', 'Juliette', 'June', 'Juraci', 'Jurema', 'Jussara', 'Justine'],
            k: ['Kaie', 'Kaitlin', 'Kaline', 'Kamila', 'Kamile', 'Kamily', 'Kara', 'Karen', 'Kari', 'Karin', 'Karina', 'Karine', 'Karla', 'Karol', 'Karolina', 'Karoline', 'Karyn', 'Kasey', 'Katarina', 'Kate', 'Katelyn', 'Katharina', 'Katharine', 'Kathelyn', 'Katherine', 'Katheryn', 'Kathie', 'Kathleen', 'Kathrine', 'Kathryn', 'Kathy', 'Katia', 'Kátia', 'Katie', 'Katina', 'Katrina', 'Katy', 'Kauane', 'Kauani', 'Kauany', 'Kavya', 'Kay', 'Kayanne', 'Kaye', 'Kayla', 'Kaylane', 'Keila', 'Keira', 'Keisha', 'Kelley', 'Kelli', 'Kellie', 'Kelly', 'Kelma', 'Kelsey', 'Kendra', 'Kenya', 'Keri', 'Kerri', 'Kerry', 'Késia', 'Keyla', 'Khushi', 'Kiara', 'Kim', 'Kimberley', 'Kimberly', 'Kirsten', 'Kitty', 'Kris', 'Krista', 'Kristen', 'Kristi', 'Kristie', 'Kristin', 'Kristina', 'Kristine', 'Kristy', 'Krystal', 'Kyara'],
            l: ['Lacey', 'Lacy', 'Ladonna', 'Laiane', 'Laila', 'Laira', 'Lais', 'Laís', 'Laisa', 'Lakeisha', 'Lakisha', 'Lana', 'Lara', 'Larissa', 'Latasha', 'Latisha', 'Latonya', 'Latoya', 'Lauany', 'Laura', 'Laurel', 'Lauren', 'Lauri', 'Laurie', 'Lauryn', 'Laverne', 'Lavínia', 'Lavonne', 'Lawanda', 'Layane', 'Layla', 'Layra', 'Lea', 'Léa', 'Leah', 'Leana', 'Leandra', 'Leann', 'Leanna', 'Leanne', 'Leda', 'Lediane', 'Lee', 'Leia', 'Leigh', 'Leila', 'Leilani', 'Lela', 'Lelia', 'Lélia', 'Lena', 'Leni', 'Lenora', 'Lenore', 'Leola', 'Leona', 'Leônia', 'Leonie', 'Leonor', 'Leonora', 'Lesa', 'Lesath', 'Lesley', 'Leslie', 'Lessie', 'Leta', 'Letha', 'Leticia', 'Letícia', 'Letitia', 'Letízia', 'Leya', 'Lia', 'Liana', 'Liane', 'Liara', 'Líbia', 'Lícia', 'Lidia', 'Lídia', 'Lidiane', 'Lígia', 'Lila', 'Lilia', 'Lília', 'Lilian', 'Liliana', 'Liliane', 'Lillian', 'Lillie', 'Lilly', 'Lily', 'Lina', 'Linda', 'Lindalva', 'Lindsay', 'Lindsey', 'Lira', 'Lis', 'Lisa', 'Lisandra', 'Livânia', 'Lívia', 'Liz', 'Liza', 'Lizzie', 'Lohana', 'Lohane', 'Lois', 'Lola', 'Lolita', 'Lora', 'Loraine', 'Lorany', 'Lorena', 'Lorene', 'Lorenza', 'Loretta', 'Lori', 'Lorie', 'Lorna', 'Lorraine', 'Lorrie', 'Lottie', 'Lou', 'Louella', 'Louisa', 'Louise', 'Lourdes', 'Lua', 'LuaAba', 'Luana', 'Luane', 'Luann', 'Luara', 'Lucélia', 'Lucena', 'Lucia', 'Lúcia', 'Luciana', 'Luciane', 'Luciene', 'Lucienne', 'Lucile', 'Lucília', 'Lucille', 'Lucinda', 'Lucrécia', 'Lucy', 'Ludmila', 'Luella', 'Luisa', 'Luísa', 'Luiza', 'Lujan', 'Lula', 'Luma', 'Lumena', 'Luna', 'Lupe', 'Lurdes', 'Lusitânia', 'Luz', 'Luzia', 'Luzinira', 'Lydia', 'Lynda', 'Lynette', 'Lynn', 'Lynne', 'Lynnette', 'Lyra'],
            m: ['Mab', 'Mabel', 'Mabelly', 'Mable', 'Macy', 'Madalena', 'Madel', 'Madeleine', 'Madeline', 'Madelyn', 'Madge', 'Madison', 'Mae', 'Maeva', 'Mafalda', 'Magali', 'Magda', 'Magdalena', 'Maggie', 'Mai', 'Maia', 'Maiara', 'Maira', 'Maíra', 'Maísa', 'Maitê', 'Malena', 'Malinda', 'Mallory', 'Malu', 'Malva', 'Malvina', 'Mamie', 'Mandy', 'Manoela', 'Manon', 'Manuela', 'Mar', 'Mara', 'Marcela', 'Marcella', 'Marci', 'Marcia', 'Márcia', 'Marcie', 'Marcy', 'Margaret', 'Margarett', 'Margarida', 'Margarita', 'Margery', 'Margie', 'Margo', 'Margret', 'Marguerite', 'Mari', 'Maria', 'Maria Carmem', 'Mariáh', 'Marian', 'Mariana', 'Marianne', 'Maribel', 'Maricela', 'Marie', 'Mariela', 'Marieta', 'Marietta', 'Marilda', 'Marileide', 'Marilene', 'Marília', 'Marilyn', 'Marilza', 'Marina', 'Marion', 'Marisa', 'Marise', 'Marisol', 'Marissa', 'Maristela', 'Maritza', 'Mariza', 'Marjolene', 'Marjorie', 'Marla', 'Marlene', 'Marli', 'Marlisa', 'Marlise', 'Marly', 'Marquita', 'Marsha', 'Marta', 'Martha', 'Martina', 'Marva', 'Mary', 'Maryann', 'Maryanne', 'Maryellen', 'Marylou', 'Mathilda', 'Matilda', 'Matilde', 'Mattie', 'Maude', 'Maura', 'Maureen', 'Mavis', 'Máxima', 'Maxine', 'May', 'Maya', 'Mayara', 'Mayla', 'Mayra', 'Mayse', 'Meagan', 'Megan', 'Meghan', 'Mel', 'Melânia', 'Melanie', 'Mélanie', 'Melba', 'Mélcia', 'Melina', 'Melinda', 'Melisa', 'Melissa', 'Melody', 'Melva', 'Mencia', 'Mercedes', 'Meredith', 'Merle', 'Mérope', 'Mia', 'Micaela', 'Michael', 'Michaela', 'Michele', 'Michelle', 'Mila', 'Milagres', 'Milagros', 'Mildred', 'Milena', 'Millicent', 'Millie', 'Mindy', 'Minerva', 'Minnie', 'Miranda}', 'Mirela', 'Mirella', 'Miriã', 'Miriam', 'Misty', 'Mitzi', 'Moema', 'Moira', 'Mollie', 'Molly', 'Mona', 'Monica', 'Mônica', 'Monique', 'Monise', 'Morena', 'Morgan', 'Morgana', 'Multar', 'Muriel', 'Muriela', 'Myra', 'Myriam', 'Myrna', 'Myrtle'],
            n: ['Nadia', 'Nádia', 'Nadine', 'Nadir', 'Nadja', 'Naiara', 'Naíde', 'Naima', 'Nair', 'Nakia', 'Nancy', 'Nanette', 'Nannie', 'Naomi', 'Nara', 'Naraiana', 'Narci', 'Narcisa', 'Narel', 'Nashira', 'Natacha', 'Natalia', 'Natália', 'Natalie', 'Natalina', 'Natasha', 'Nathaly', 'Nathiely', 'Natielly', 'Nauria', 'Nayane', 'Nayara', 'Nayla', 'Nayra', 'Nazaré', 'Neci', 'Neda', 'Neida', 'Neide', 'Neize', 'Nela', 'Nelda', 'Neli', 'Nélia', 'Nélida', 'Nell', 'Nellie', 'Nelma', 'Nelsa', 'Nely', 'Nereida', 'Nettie', 'Neusa', 'Neuza', 'Neva', 'Neyde', 'Nice', 'Nichole', 'Nicole', 'Nídia', 'Nikki', 'Nilma', 'Nilsa', 'Nilse', 'Nilza', 'Nina', 'Nita', 'Nívea', 'Nízia', 'Noa', 'Noélia', 'Noelle', 'Noemi', 'Noémia', 'Nola', 'Nona', 'Nora', 'Norah', 'Norberta', 'Norlise', 'Norma', 'Núbia', 'Núria'],
            o: ['Oceana', 'Odaria', 'Odele', 'Odete', 'Odila', 'Odineide', 'Ofelia', 'Ofélia', 'Ola', 'Olália', 'Olaya', 'Olena', 'Olga', 'Olímpia', 'Olinda', 'Olive', 'Olivia', 'Olívia', 'Ollie', 'Ondina', 'Opal', 'Ophelia', 'Oriana', 'Orlandina', 'Ortelina', 'Osmarina', 'Osneide', 'Otilia', 'Otília', 'Ozeneide'],
            p: ['Padma', 'Paige', 'Palma', 'Palmira', 'Palmyra', 'Paloma', 'Pam', 'Pamela', 'Pandora', 'Pansy', 'Paola', 'Paquita', 'Pari', 'Paris', 'Pat', 'Patrica', 'Patrice', 'Patricia', 'Patrícia', 'Patsy', 'Patti', 'Patty', 'Paula', 'Paulette', 'Paulina', 'Pauline', 'Paz', 'Pearl', 'Pearlie', 'Pedrina', 'Peggy', 'Penelope', 'Penélope', 'Penha', 'Penny', 'Perla', 'Pérola', 'Perpétua', 'Pérsia', 'Pétala', 'Petra', 'Petula', 'Petúnia', 'Philippa', 'Phoebe', 'Phyllis', 'Piedade', 'Pietra', 'Pihu', 'Pilar', 'Poliana', 'Polly', 'Polyanna', 'Poppy', 'Primavera', 'Priscila', 'Priscilla', 'Proteção'],
            q: ['Quênia', 'Quezia', 'Quinn', 'Quintina', 'Quirina', 'Quitéria'],
            r: ['Rachael', 'Rachel', 'Rachelle', 'Radija', 'Rae', 'Rafaela', 'Raica', 'Raimunda', 'Raina', 'Raisa', 'Raissa', 'Ramona', 'Randi', 'Rania', 'Ranielle', 'Raphaela', 'Raquel', 'Ravena', 'Rayane', 'Rayssa', 'Reba', 'Rebeca', 'Rebecca', 'Rebeka', 'Rebekah', 'Regiane', 'Regina', 'Reina', 'Rejane', 'Reka', 'Rena', 'Renata', 'Rene', 'Renee', 'Renée', 'Renesmée', 'Reva', 'Reyna', 'Rhea', 'Rhianna', 'Rhoda', 'Rhonda', 'Rihanna', 'Rima', 'Risoleta', 'Rita', 'Robbie', 'Robert', 'Roberta', 'Robin', 'Robyn', 'Rochelle', 'Rogéria', 'Roma', 'Romilda', 'Romina', 'Romy', 'Ronda', 'Rosa', 'Rosalba', 'Rosália', 'Rosalice', 'Rosalie', 'Rosalina', 'Rosalind', 'Rosalinda', 'Rosalyn', 'Rosana', 'Rosane', 'Rosângela', 'Rosanna', 'Rosanne', 'Rosario', 'Rosário', 'Rosaura', 'Rose', 'Roseane', 'Roseann', 'Roseli', 'Rosella', 'Roselyn', 'Rosemar', 'Rosemarie', 'Rosemary', 'Rosetta', 'Rosiane', 'Rosie', 'Rosilda', 'Rosilene', 'Rosinete', 'Rosita', 'Roslyn', 'Rowena', 'Roxane', 'Roxanne', 'Roxie', 'Rúbia', 'Rubina', 'Ruby', 'Runa', 'Rute', 'Ruth', 'RuthieSabrina'],
            s: ['Saanvi', 'Sabik', 'Sabina', 'Sabine', 'Sabrina', 'Sacha', 'Sadie', 'Safira', 'Sahara', 'Salete', 'Sallie', 'Sally', 'Salma', 'Salomé', 'Samanta', 'Samantha', 'Samara', 'Sami', 'Samia', 'Samira', 'Sância', 'Sandra', 'Sandrina', 'Sandy', 'Sansa', 'Sara', 'Sarah', 'Saray', 'Sari', 'Sarida', 'Saril', 'Sasha', 'Saundra', 'Savana', 'Savanah', 'Savannah', 'Scarlett', 'Selena', 'Selene', 'Selina', 'Selma', 'Seomara', 'Serafina', 'Seraphina', 'Serena', 'Severina', 'Shana', 'Shanna', 'Shannon', 'Shari', 'Sharlene', 'Sharon', 'Sharron', 'Shauna', 'Shawn', 'Shawna', 'Shayla', 'Sheena', 'Sheila', 'Shelby', 'Shelia', 'Shelley', 'Shelly', 'Sheree', 'Sheri', 'Sherri', 'Sherrie', 'Sherry', 'Sheryl', 'Shirley', 'Siena', 'Sienna', 'Sierra', 'Silene', 'Silvana', 'Silvia', 'Sílvia', 'Simara', 'Simone', 'Sira', 'Socorro', 'Sofia', 'Sol', 'Solana', 'Solange', 'Solene', 'Sondra', 'Sonia', 'Sônia', 'Sonja', 'Sonya', 'Sophia', 'Sophie', 'Soraia', 'Soraya', 'Stacey', 'Staci', 'Stacie', 'Stacy', 'Stefanie', 'Stela', 'Stella', 'Stephanie', 'Suave', 'Sue', 'Suéli', 'Suellen', 'Suki', 'Summer', 'Suri', 'Suria', 'Surya', 'Susan', 'Susana', 'Susanna', 'Susanne', 'Susie', 'Suzana', 'Suzanna', 'Suzanne', 'Suzette', 'Suzy', 'Sybil', 'Sydney', 'Sylvia'],
            t: ['Tabatha', 'Tabita', 'Tabitha', 'Tabito', 'Taciana', 'Tafne', 'Taila', 'Tainá', 'Tainara', 'Tais', 'Taís', 'Taísa', 'Taíssa', 'Talia', 'Talita', 'Talullah', 'Tamar', 'Tamara', 'Tamára', 'Tâmara', 'Tameka', 'Tamera', 'Tami', 'Tamika', 'Tammi', 'Tammie', 'Tammy', 'Tamra', 'Tania', 'Tânia', 'Tanisha', 'Tanya', 'Tara', 'Tasha', 'Tássia', 'Tatiana', 'Tatiane', 'Tauane', 'Tauany', 'Tavia', 'Tayla', 'Taylor', 'Tayná', 'Taynara', 'Telma', 'Teodora', 'Teresa', 'Teresinha', 'Tereza', 'Teri', 'Terra', 'Terri', 'Terrie', 'Terry', 'Tessa', 'Thabata', 'Thabita', 'Thaila', 'Thaís', 'Thaíssa', 'Thalia', 'Thalita', 'Thelma', 'Theodora', 'Theresa', 'Therese', 'Thuanny', 'Thuyla', 'Tia', 'Tiare', 'Ticiana', 'Tiffany', 'Tina', 'Tirsa', 'Tisha', 'Tocha', 'Tommie', 'Toni', 'Tonia', 'Tonya', 'Tracey', 'Traci', 'Tracie', 'Tracy', 'Tricia', 'Trina', 'Trindade', 'Trisha', 'Trudy', 'Tulane', 'Túlia', 'Twila'],
            u: ['Uda', 'Ula', 'Urânia', 'Uriela', 'Ursula', 'Úrsula', 'Urzuri', 'Uxia'],
            v: ['Valarie', 'Valdete', 'Valência', 'Valentina', 'Valeria', 'Valéria', 'Valerie', 'Valesca', 'Valquíria', 'Vanda', 'Vanessa', 'Vânia', 'Vanina', 'Vanusa', 'Vanuza', 'Veda', 'Veja', 'Vela', 'Velia', 'Velma', 'Venice', 'Vênus', 'Venusa', 'Vera', 'Verena', 'Veridiana', 'Verna', 'Veronica', 'Verônica', 'Vesa', 'Vicenzia', 'Vicki', 'Vickie', 'Vicky', 'Victoria', 'Victória', 'Vida', 'Vienna', 'Vilma', 'Vinícia', 'Viola', 'Violante', 'Violet', 'Violeta', 'Virgie', 'Virginia', 'Virgínia', 'Virtudes', 'Vitória', 'Vivian', 'Viviana', 'Viviane', 'Vivienne', 'Vonda'],
            w: ['Wanda', 'Wanessa', 'Wendi', 'Wendy', 'West', 'Whitney', 'Wila', 'Wilda', 'Willa', 'Willie', 'Willow', 'Wilma', 'Winifred', 'Winnie'],
            x: ['Xana', 'Xandra', 'Xena', 'Xenia', 'Xênia', 'Xia', 'Ximena', 'Xiomara'],
            y: ['Yael', 'Yaiza', 'Yane', 'Yara', 'Yasmin', 'Yesenia', 'Yilda', 'Yngrid', 'Yohanna', 'Yolanda', 'Young', 'Ysabel', 'Ysabella', 'Yvette', 'Yvone', 'Yvonne'],
            z: ['Zahara', 'Zahra', 'Zaida', 'Zaira', 'Zamy', 'Zana', 'Zaniah', 'Zara', 'Zará', 'Zarina', 'Zayda', 'Zeferina', 'Zelda', 'Zélia', 'Zelinda', 'Zelma', 'Zena', 'Zenaida', 'Zenaide', 'Zénia', 'Zila', 'Zilá', 'Zilda', 'Zília', 'Zilma', 'Zínia', 'Zita', 'Ziza', 'Zoa', 'Zobaida', 'Zoe', 'Zoé', 'Zola', 'Zora', 'Zoraida', 'Zubaida', 'Zubeida', 'Zulaia', 'Zuleica', 'Zuri']
        },
        listaNomeMasculino: {
            a: ['Aladino', 'Alan', 'Afonso', 'Aires', 'Aitor', 'Aléxis', 'Amaro', 'Alfredo', 'Abelardo', 'Alírio', 'Artur', 'Assis', 'Álvaro', 'Áser', 'Amadeu', 'António', 'Aarão', 'Aron', 'Ariel', 'Augusto', 'Alexandre', 'Arcanjo', 'Alberto', 'André', 'Adamastor', 'Abdul', 'Aziz', 'Ari', 'Ary', 'Abdénago', 'Abdias', 'Abel', 'Abelâmio', 'Abiel', 'Abílio', 'Abraão', 'Abraim', 'Abrão', 'Absalão', 'Abssilão', 'Acácio', 'Acilino', 'Acílio', 'Acúrsio', 'Adail', 'Adalberto', 'Adalsindo', 'Adalsino', 'Adam', 'Adamantino', 'Adão', 'Adauto', 'Adelindo', 'Adelino', 'Adélio', 'Adelmiro', 'Adelmo', 'Adelson', 'Ademar', 'Ademir', 'Adeodato', 'Aderico', 'Adério', 'Adérito', 'Adiel', 'Adil', 'Adílio', 'Adner', 'Adolfo', 'Adonai', 'Adonias', 'Adónias', 'Adonilo', 'Adónis', 'Adorino', 'Adosindo', 'Adrian', 'Adriano', 'Adrião', 'Adriel', 'Adrien', 'Ádrien', 'Adrualdo', 'Adruzilo', 'Ady', 'Afonsino', 'Afonso Henriques', 'Afrânio', 'Afre', 'Africano', 'Agapito', 'Agenor', 'Agnelo', 'Agostinho', 'Aguinaldo', 'Agustino', 'Aidan', 'Aidé', 'Aiden', 'Aimar', 'Airton', 'Alain', 'Alamiro', 'Alano', 'Alão', 'Alarico', 'Albano', 'Alberico', 'Albertino', 'Albino', 'Alcibíades', 'Alcides', 'Alcindo', 'Alcino', 'Aldaír', 'Aldemar', 'Alder', 'Aldo', 'Aldónio', 'Alec', 'Aleixo', 'Alejandro', 'Áleph', 'Alessandro', 'Alessio', 'Aleu', 'Alex', 'Alexander', 'Alexandrino', 'Alexandro', 'Alexandros', 'Alexandru', 'Alexei', 'Alexey', 'Aléxio', 'Alfa', 'Alfeu', 'Alfonso', 'Alfred', 'Alfredinho', 'Ali', 'Alípio', 'Alítio', 'Alito', 'Alivar', 'Alívio', 'Allan', 'Allen', 'Allister', 'Almerindo', 'Almiro', 'Almirodo', 'Aloís', 'Aloísio', 'Alonso', 'Alpha', 'Alpoim', 'Altino', 'Alvarim', 'Alvarino', 'Alvário', 'Alvim', 'Alvin', 'Alvino', 'Aly', 'Amadeo', 'Amadis', 'Amado', 'Amador', 'Amâncio', 'Amândio', 'Amarildo', 'Amarílio', 'Amauri', 'Amável', 'Ambrósio', 'Américo', 'Amílcar', 'Amin', 'Aminadabe', 'Amir', 'Ámon', 'Amor', 'Amorim', 'Amós', 'Anacleto', 'Anael', 'Anaim', 'Analide', 'Anania', 'Ananias', 'Anaquim', 'Anastácio', 'Anatol', 'Anatólio', 'Anderson', 'Andrea', 'Andreas', 'Andrei', 'Andreias', 'Andreo', 'Andrés', 'Andrew', 'Andy', 'Ângel', 'Angélico', 'Angelino', 'Ângelo', 'Aníbal', 'Aniceto', 'Anielo', 'Anis', 'Anísio', 'Anolido', 'Ansel', 'Anselmo', 'Antão', 'Antelmo', 'Antenor', 'Antero', 'Anthony', 'Antoine', 'Anton', 'Antonelo', 'Antonino', 'Antônio', 'Aparício', 'Ápio', 'Apolinário', 'Apollo', 'Apolo', 'Apolónio', 'Aprígio', 'Aquil', 'Aquila', 'Áquila', 'Aquiles', 'Aquilino', 'Aquino', 'Aquira', 'Aramis', 'Arão', 'Arcádio', 'Arcelino', 'Arcélio', 'Archie', 'Arcílio', 'Ardingue', 'Argemiro', 'Argentino', 'Arian', 'Arin', 'Arine', 'Arion', 'Ariosto', 'Arisberto', 'Aristides', 'Aristóteles', 'Arius', 'Arjun', 'Arley', 'Arlindo', 'Arlo', 'Armandino', 'Armando', 'Armelim', 'Arménio', 'Armindo', 'Arnaldo', 'Arnoldo', 'Arquibaldo', 'Arquimedes', 'Arquimínio', 'Arquimino', 'Arsénio', 'Arthur', 'Arturo', 'Ascenso', 'Asdrúbal', 'Asélio', 'Aser', 'Asher', 'Ashley', 'Ataíde', 'Atanásio', 'Atão', 'Athos', 'Átila', 'Atílio', 'Atlas', 'Aubri', 'Augustin', 'Aureliano', 'Aurelino', 'Aurélio', 'Áureo', 'Ausendo', 'Austin', 'Austrelino', 'Avelino', 'Aventino', 'Axel', 'Ayres', 'Azélio', 'Aziel', 'Azuil'],
            b: ['Baguandas', 'Balbino', 'Baldemar', 'Baldomero', 'Balduíno', 'Baltasar', 'Baltazar', 'Balthazar', 'Bambo', 'Baptista', 'Baqui', 'Barac', 'Barack', 'Barão', 'Bárbaro', 'Barcino', 'Barnabé', 'Bártolo', 'Bartolomeu', 'Bartolomeu Perestrelo', 'Basil', 'Basílio', 'Bassarme', 'Bastian', 'Bastião', 'Batista', 'Bebiano', 'Belarmino', 'Belchior', 'Bélcio', 'Belisário', 'Belmiro', 'Belmonte', 'Ben', 'Bendavid', 'Benedito', 'Benevenuto', 'Benício', 'Benjamim', 'Benjamin', 'Benny', 'Bentley', 'Bento', 'Benvindo', 'Berardo', 'Berilo', 'Bernardim', 'Bernardino', 'Bernard', 'Bernardo', 'Bértil', 'Bertino', 'Berto', 'Bertoldo', 'Bertolino', 'Betino', 'Beto', 'Bianor', 'Bibiano', 'Bilal', 'Billy', 'Blake', 'Bless', 'Bo', 'Boanerges', 'Boaventura', 'Boavida', 'Bohdi', 'Bogdan', 'Bonifácio', 'Bóris', 'Bosco', 'Bradley', 'Brandon', 'Brandão', 'Brás', 'Bráulio', 'Breno', 'Breyner', 'Brian', 'Brice', 'Brígido', 'Briolanjo', 'Brooklyn', 'Bruce', 'Bruno', 'Bryan', 'Bryant'],
            c: ['Cael', 'Caetano', 'Caíco', 'Caiel', 'Caim', 'Caio', 'Caíque', 'Caires', 'Cairo', 'Caleb', 'Calebe', 'Calisto', 'Calixto', 'Calvin', 'Calvino', 'Cameron', 'Camilo', 'Cândido', 'Canto', 'Carl', 'Carlindo', 'Carlinhos', 'Carlo', 'Carlos', 'Carmério', 'Carmim', 'Carsta', 'Carter', 'Casimiro', 'Cassiano', 'Cássio', 'Cassius', 'Castelino', 'Castiel', 'Castor', 'Catarino', 'Catilina', 'Cauã', 'Cauê', 'Cecílio', 'Cedric', 'Cédric', 'Cedrico', 'Celestino', 'Celino', 'Célio', 'Celísio', 'Célsio', 'Celso', 'Celto', 'Cesaltino', 'César', 'Cesário', 'Césaro', 'Chan', 'Charbel', 'Charles', 'Charlie', 'Cheng', 'Chester', 'Chi', 'Chico', 'Chris', 'Christian', 'Christophe', 'Christopher', 'Cícero', 'Cid', 'Cidalino', 'Cidálio', 'Cildo', 'Cílio', 'Cíntio', 'Cipriano', 'Cireneu', 'Cirilo', 'Ciro', 'Clarindo', 'Claro', 'Claudemiro', 'Claudiano', 'Cláudio', 'Clayton', 'Cleber', 'Clemêncio', 'Clemente', 'Clésio', 'Clídio', 'Clife', 'Clodomiro', 'Clóvis', 'Colin', 'Connor', 'Conrado', 'Constâncio', 'Constantino', 'Consulino', 'Cooper', 'Cornélio', 'Corsino', 'Cosme', 'Cris', 'Cristian', 'Crisna', 'Crispim', 'Cristiano', 'Cristofe', 'Cristóforo', 'Cristóvão', 'Cruz', 'Cursino', 'Custódio', 'Cyro', 'Cyrus'],
            d: ['Dácio', 'Dagmar', 'Dalton', 'Damas', 'Damasceno', 'Dâmaso', 'Damian', 'Damião', 'Damien', 'Damon', 'Dan', 'Dani', 'Daniel', 'Danilo', 'Danny', 'Dante', 'Dani', 'Darci', 'Dárcio', 'Dario', 'Dário', 'Darius', 'Darque', 'Dave', 'Davi', 'David', 'Davide', 'Davino', 'Dean', 'Décimo', 'Décio', 'Declan', 'Deivid', 'Dejalme', 'Délcio', 'Delfim', 'Delfino', 'Délio', 'Delmano', 'Delmar', 'Delmiro', 'Demétrio', 'Dener', 'Denil', 'Denis', 'Dénis', 'Denzel', 'Deodato', 'Deolindo', 'Dércio', 'Derek', 'Derick', 'Desejado', 'Desidério', 'Deusdedito', 'Dev', 'Devin', 'Devon', 'Dhruva', 'Diamantino', 'Dias', 'Didaco', 'Diego', 'Dieter', 'Dilan', 'Dilermando', 'Dimas', 'Dimitri', 'Dinarte', 'Dinis', 'Diniz', 'Dino', 'Dioclécio', 'Diogo', 'Diomar', 'Dion', 'Díon', 'Dionísio', 'Diotil', 'Dírio', 'Dirque', 'Divo', 'Djalma', 'Djalme', 'Djalmo', 'Dom', 'Domingos', 'Dominic', 'Domínico', 'Dominik', 'Dominique', 'Donaldo', 'Donato', 'Donovan', 'Donzílio', 'Dorian', 'Dóriclo', 'Dorico', 'Dositeu', 'Douglas', 'Dragos', 'Druso', 'Duarte', 'Duílio', 'Dulcínio', 'Dúlio', 'Dúnio', 'Durbalino', 'Durval', 'Durvalino'],
            e: ['Eanes', 'Eberardo', 'Eda', 'Eddie', 'Eden', 'Éden', 'Eder', 'Éder', 'Edgar', 'Edgard', 'Edi', 'Édi', 'Édipo', 'Edir', 'Edmero', 'Edmundo', 'Edmur', 'Edo', 'Edoardo', 'Edson', 'Eduardo', 'Eduartino', 'Eduíno', 'Edvaldo', 'Edvino', 'Edward', 'Efraim', 'Egas', 'Egídio', 'Egil', 'Eládio', 'Eleazar', 'Eleutério', 'Elgar', 'Eli', 'Eliab', 'Eliabe', 'Eliano', 'Elias', 'Eliezer', 'Eliézer', 'Elijah', 'Élio', 'Elioenai', 'Eliseo', 'Eliseu', 'Elisiário', 'Elísio', 'Elliott', 'Elmano', 'Elmar', 'Elmer', 'Elói', 'Eloy', 'Elpídio', 'Élsio', 'Élson', 'Elton', 'Élton', 'Elvino', 'Elzeário', 'Elzo', 'Emanuel', 'Emaús', 'Emerson', 'Emídio', 'Emiliano', 'Emílio', 'Emmanuel', 'Emo', 'Eneias', 'Enes', 'Engrácio', 'Enio', 'Énio', 'Enoque', 'Enrico', 'Enrique', 'Enzo', 'Erasmo', 'Ercílio', 'Eric', 'Erico', 'Érico', 'Erik', 'Erique', 'Ermitério', 'Ernani', 'Ernâni', 'Ernest', 'Ernesto', 'Esaú', 'Esdras', 'Esmeraldo', 'Estácio', 'Estanislau', 'Esteban', 'Estefânio', 'Estéfano', 'Estélio', 'Estevão', 'Estêvão', 'Ethan', 'Etiene', 'Étienne', 'Euclides', 'Eufrásio', 'Eugénio', 'Eulógio', 'Eurico', 'Eusébio', 'Eusínio', 'Eustácio', 'Eustáquio', 'Evaldo', 'Evan', 'Evandro', 'Evangelino', 'Evangelista', 'Evaristo', 'Evelácio', 'Evelásio', 'Evélio', 'Evêncio', 'Everaldo', 'Everardo', 'Expedito', 'Ezekiel', 'Ezequias', 'Ezequiel', 'Ezra'],
            f: ['Fabian', 'Fabiano', 'Fabião', 'Fabien', 'Fábio', 'Fabrício', 'Fabrízio', 'Faia', 'Faiz', 'Faizan', 'Falcão', 'Falco', 'Faustino', 'Fausto', 'Federico', 'Feliciano', 'Felício', 'Felicíssimo', 'Felipe', 'Felisberto', 'Felismino', 'Félix', 'Feliz', 'Ferdinando', 'Fernandino', 'Fernando', 'Fernão', 'Fernão de Magalhães ', 'Ferrer', 'Fidel', 'Fidélio', 'Figo', 'Filémon', 'Filino', 'Filinto', 'Filipe', 'Filipe', 'Filipo', 'Filomeno', 'Filoteu', 'Finn', 'Firmino', 'Firmo', 'Flávio', 'Florêncio', 'Florentino', 'Floriano', 'Florival', 'Flyn', 'Fortunato', 'Foster', 'Fradique', 'Francesco', 'Francis', 'Francisco', 'Franclim', 'Franco', 'François', 'Frank', 'Franklim', 'Franklin', 'Franklino', 'Fred', 'Freddie', 'Freddy', 'Frede', 'Frederick', 'Frédérick', 'Frederico', 'Fredo', 'Fredy', 'Fulgêncio', 'Fúlvio'],
            g: ['Gabínio', 'Gabino', 'Gabriel', 'Gadiel', 'Gael', 'Gaetano', 'Gaio', 'Galiano', 'Galileu', 'Galo', 'Gamaliel', 'Garcia', 'Gareth', 'Garibaldo', 'Gary', 'Gascão', 'Gaspar', 'Gaspard', 'Gastão', 'Gaudêncio', 'Gavin', 'Gávio', 'Gedeão', 'Genaro', 'Genésio', 'Génesis', 'Gentil', 'Geoffrey', 'George', 'Georgino', 'Geraldo', 'Gerard', 'Gerardo', 'Gerberto', 'Germano', 'Gersão', 'Gerson', 'Gervásio', 'Getúlio', 'Giacomo', 'Gian', 'Giancarlo', 'Giani', 'Gianluca', 'Gil', 'Gilberto', 'Gildásio', 'Gildo', 'Gileade', 'Gimeno', 'Ginestal', 'Gino', 'Giovani', 'Giovanni', 'Girão', 'Giuseppe', 'Glaúcia', 'Gláucio', 'Glauco', 'Glenn', 'Goa', 'Godofredo', 'Golden', 'Goma', 'Gomes', 'Gonçalo', 'Gonzaga', 'Gonzalo', 'Graciano', 'Graciliano', 'Grácio', 'Greg', 'Gregório', 'Greyson', 'Griffin', 'Guadalberto', 'Gualdim', 'Gualdino', 'Gualter', 'Guarani', 'Gueir', 'Guga', 'Gui', 'Guido', 'Guildo', 'Guilherme', 'Guilhermino', 'Guillaume', 'Guillermo', 'Guimar', 'Gumersindo', 'Gumesindo', 'Gusmão', 'Gustaf', 'Gustav', 'Gustavo', 'Guterre', 'Guy'],
            h: ['Habacuc', 'Habacuque', 'Hamilton', 'Hansel', 'Haraldo', 'Haroldo', 'Harper', 'Harry', 'Hayden', 'Hazael', 'Heaven', 'Héber', 'Hector', 'Heitor', 'Heldemaro', 'Hélder', 'Heldo', 'Heleno', 'Helier', 'Hélio', 'Heliodoro', 'Hélmut', 'Hélvio', 'Hemaxi', 'Hemetério', 'Hemitério', 'Hendrix', 'Henoch', 'Henrik', 'Henrique', 'Henry', 'Heraldo', 'Herberto', 'Herculano', 'Hércules', 'Herédia', 'Herédio', 'Heriberto', 'Herlander', 'Herman', 'Hérman', 'Hermano', 'Hermenegildo', 'Hermes', 'Hermínio', 'Hermitério', 'Hernâni', 'Hervê', 'Higino', 'Hilário', 'Hildeberto', 'Hildebrando', 'Hildegardo', 'Hipólito', 'Hirondino', 'Hólger', 'Homero', 'Honorato', 'Honório', 'Horácio', 'Horus', 'Huberto', 'Hugo', 'Humberto', 'Hunter'],
            i: ['Iacob', 'Iag', 'Iago', 'Ian', 'Ianis', 'Ibérico', 'Ibrahim', 'Ícaro', 'Idalécio', 'Idálio', 'Idário', 'Idavide', 'Idelso', 'Idriss', 'Ignacio', 'Ignácio', 'Igor', 'Iker', 'Ildefonso', 'Ildo', 'Ilídio', 'Inácio', 'Indalécio', 'Indigo', 'Indra', 'Indro', 'Infante', 'Ingo', 'Íngue', 'Inocêncio', 'Ioannis', 'Ion', 'Ioque', 'Iran', 'Irineu', 'Irmino', 'Isaac', 'Isac', 'Isael', 'Isaí', 'Isaías', 'Isaltino', 'Isandro', 'Isaque', 'Isauro', 'Isidoro', 'Isidro', 'Isildo', 'Ismael', 'Isolino', 'Israel', 'Issa', 'Ítalo', 'Iuri', 'Iúri', 'Ivaldo', 'Ivan', 'Ivandro', 'Ivanoel', 'Íven', 'Ivo', 'Izalino'],
            j: ['Jabes', 'Jabim', 'Jace', 'Jacinto', 'Jack', 'Jackson', 'Jacó', 'Jacob', 'Jácome', 'Jacques', 'Jader', 'Jadir', 'Jaime', 'Jair', 'Jairo', 'Jake', 'Jamal', 'James', 'Jamie', 'Jamim', 'Jan', 'Janai', 'Janardo', 'Janique', 'Jansénio', 'Januário', 'Jaque', 'Jaques', 'Jarbas', 'Jardel', 'Jarod', 'Jasão', 'Jasmim', 'Jason', 'Jaume', 'Javier', 'Jax', 'Jay', 'Jazz', 'Jean', 'Jeremias', 'Jeremy', 'Jerónimo', 'Jesse', 'Jessé', 'Jesualdo', 'Jesus', 'Jetro', 'Jitendra', 'Jó', 'Joabe', 'Joachim', 'João', 'João Bosco', 'João Pedro', 'Joaquim', 'Joás', 'Job', 'Jocelino', 'Jociano', 'Joe', 'Joel', 'Jofre', 'John', 'Johnson', 'Jon', 'Jonah', 'Jonas', 'Jonatã', 'Jonatas', 'Jónatas', 'Jonathan', 'Jonathas', 'Jóni', 'Jordan', 'Jordano', 'Jordão', 'Jordi', 'Jorge', 'Jório', 'Joscelino', 'José', 'Josefino', 'Josefo', 'Joselindo', 'Joselino', 'Joseph', 'Josh', 'Joshua', 'Josias', 'Josselino', 'Josué', 'Jovelino', 'Jovito', 'Joy', 'Juan', 'Judá', 'Judas', 'Jude', 'Júdice', 'Jules', 'Julian', 'Juliano', 'Julião', 'Julien', 'Júlio', 'Júnio', 'Junior', 'Júnior', 'Juno', 'Jupiter', 'Justin', 'Justiniano', 'Justino', 'Justo', 'Juvenal', 'Juventino'],
            k: ['Kael', 'Kai', 'Kairo', 'Kaiser', 'Kane', 'Kanye', 'Kauã', 'Kay', 'Keanu', 'Ken', 'Kendrick', 'Kennedy', 'Kenny', 'Kenzo', 'Kévim', 'Kevin', 'Kiko', 'Kingston', 'Kion', 'Kiro', 'Klaus', 'Kyle'],
            l: ['Ladislau', 'Lael', 'Laércio', 'Laertes', 'Laudelino', 'Laureano', 'Laurénio', 'Laurent', 'Laurentino', 'Lauriano', 'Laurindo', 'Lauro', 'Lawrence', 'Lázaro', 'Leal', 'Leandro', 'Leão', 'Léccio', 'Lécio', 'Lemuel', 'Lenine', 'Lénio', 'Lenny', 'Leo', 'Léo', 'Leoberto', 'Leon', 'Léon', 'Leonardo', 'Leôncio', 'Leone', 'Leonel', 'Leonício', 'Leónidas', 'Leonídio', 'Leonildo', 'Leopoldo', 'Lev', 'Levi', 'Leví', 'Levy', 'Liam', 'Libânio', 'Liberal', 'Libertário', 'Liberto', 'Lícidas', 'Liciniano', 'Licínio', 'Lício', 'Lídio', 'Lidório', 'Liev', 'Lígio', 'Liliano', 'Lincoln', 'Lindorfo', 'Lindoro', 'Lineu', 'Lino', 'Línton', 'Linus', 'Lionel', 'Lisandro', 'Lisuarte', 'Lito', 'Livramento', 'Lobo', 'Logan', 'Lok', 'Lopo', 'Lorenzo', 'Loreto', 'Lorival', 'Lótus', 'Louis', 'Lourenço', 'Lourival', 'Luan', 'Luca', 'Lucas', 'Lucenzo', 'Luciano', 'Lucílio', 'Lucínio', 'Lúcio', 'Ludgério', 'Ludgero', 'Ludovice', 'Ludovico', 'Ludovino', 'Luigi', 'Luís', 'Luiz', 'Lukas', 'Luke', 'Lupicino', 'Lutero', 'Luzio', 'Lyrics'],
            m: ['Macário', 'Maceo', 'Maciel', 'Madail', 'Madaleno', 'Madate', 'Maddox', 'Madjer', 'Madu', 'Mael', 'Magdo', 'Magno', 'Magnus', 'Mago', 'Mair', 'Malachi', 'Malaquias', 'Malik', 'Mamede', 'Manassés', 'Manel', 'Manoel', 'Manu', 'Manuel', 'Mapril', 'Mar', 'Marc', 'Marcel', 'Marcelino', 'Marcello', 'Marcelo', 'Marcial', 'Marcílio', 'Márcio', 'Marco', 'Marcos', 'Marcus', 'Margarido', 'Mariano', 'Marílio', 'Marinho', 'Marino', 'Mário', 'Marito', 'Marius', 'Mark', 'Markus', 'Marley', 'Marlon', 'Márlon', 'Marolo', 'Marques', 'Martim', 'Martin', 'Martinho', 'Martiniano', 'Martino', 'Martins', 'Marto', 'Marvão', 'Marvin', 'Márvio', 'Mason', 'Mateo', 'Mateus', 'Matheus', 'Mathias', 'Mathieu', 'Mathis', 'Mathys', 'Matias', 'Mátio', 'Matteo', 'Matthew', 'Matti', 'Matusalém', 'Maui', 'Mauri', 'Maurício', 'Maurílio', 'Mauro', 'Mavi', 'Max', 'Maxim', 'Maximiano', 'Maximiliano', 'Maximino', 'Máximo', 'Maxwell', 'Mel', 'Melchior', 'Melco', 'Melquisedeque', 'Melvin', 'Mélvin', 'Mem', 'Mendo', 'Mesaque', 'Messias', 'Micael', 'Micah', 'Michael', 'Michel', 'Mickael', 'Miguel', 'Mikael', 'Mike', 'Milan', 'Mileu', 'Milo', 'Milton', 'Mílton', 'Mimon', 'Mimoso', 'Ming', 'Miqueias', 'Mirco', 'Miro', 'Mis', 'Misael', 'Moa', 'Modesto', 'Mogli', 'Moisés', 'Montgomery', 'Mor', 'Morgan', 'Múcio', 'Munir'],
            n: ['Nabor', 'Nádege', 'NadirNapoleão', 'NaodNarciso', 'Narsélio', 'Nascimento', 'Nasser', 'Natã', 'Natalício', 'Natalino', 'Natálio', 'Natanael', 'Nataniel', 'Natão', 'Natércio', 'Nazário', 'Neil', 'Nélio', 'Nelmo', 'Nelo', 'Nelson', 'Nélson', 'Nembrode', 'Nemésio', 'Nemo', 'Nenrode', 'Neo', 'Neon', 'Neóteles', 'Neotero', 'Nereu', 'Nero', 'Nestor', 'Neutel', 'Nêuton', 'Neymar', 'Nicásio', 'Nichal', 'Nicholas', 'Nick', 'Nico', 'Nicodemos', 'Nicola', 'Nicolas', 'Nicolau', 'Nídio', 'Niete', 'Níger', 'Nikita', 'Nil', 'Nilo', 'Nilson', 'Nilton', 'Nino', 'Nísio', 'Nivaldo', 'Noa', 'Noah', 'Noame', 'Nobre', 'Noé', 'Noel', 'Nói', 'Nolan', 'Nonato', 'Norberto', 'Norival', 'Normano', 'Nuno', 'Nuri', 'Nuriel', 'Núrio'],
            o: ['Oceano', 'Octaviano', 'Octávio', 'Odair', 'Odeberto', 'Odin', 'Ódin', 'Olavo', 'Olegário', 'Olímpio', 'Olindo', 'Olinto', 'Olivar', 'Oliveiros', 'Oliver', 'Olivério', 'Olivier', 'Omar', 'Omer', 'Onassis', 'Ondino', 'Onildo', 'Onofre', 'Orandino', 'Orêncio', 'Orestes', 'Oriel', 'Orion', 'Orlandino', 'Orlando', 'Orlindo', 'Orósio', 'Oscar', 'Óscar', 'Oseas', 'Oseias', 'Oséias', 'Osiris', 'Osmano', 'Osmar', 'Osório', 'Osvaldo', 'Otacílio', 'Otávio', 'Otelo', 'Otniel', 'Oto', 'Otoniel', 'Otto', 'Ovídio', 'Owen'],
            p: ['Pablo', 'Pacal', 'Paco', 'Paio', 'Pantaleão', 'Paolo', 'Parcidio', 'Parcídio', 'Páris', 'Pascoal', 'Patrício', 'Patrick', 'Paul', 'Paulino', 'Paulo', 'Pavel', 'Pavlo', 'Pedrino', 'Pedro', 'Pelágio', 'Pelaio', 'Peniel', 'Pepe', 'Pépio', 'Perfeito', 'Péricles', 'Perpétuo', 'Pérsio', 'Peter', 'Peterson', 'Phillip', 'Piedade', 'Pierre', 'Pietro', 'Pio', 'Pitágoras', 'Plácido', 'Plínio', 'Policarpo', 'Pompeu', 'Porfírio', 'Pracídio', 'Prado', 'Priam', 'Prião', 'Primitivo', 'Primo', 'Prince', 'Principiano', 'Priteche', 'Procópio', 'Próspero', 'Prudêncio', 'Purificação'],
            q: ['Quaresma', 'Quéli', 'Quentin', 'Querubim', 'Quévin', 'Quiliano', 'Quim', 'Quintino', 'Quirilo', 'Quirino', 'Quírio'],
            r: ['Râdamas', 'Rafa', 'Rafaello', 'Rafaelo', 'Ragendra', 'Rai', 'Raimundo', 'Rainier', 'Ralfe', 'Ralph', 'Ramberto', 'Ramires', 'Ramiro', 'Ramna', 'Ramon', 'Ramon', 'Randolfo', 'Raoni', 'Rapaz', 'Raphael', 'Raven', 'Ravi', 'Raví', 'Reece', 'Reeve', 'Regan', 'Reginaldo', 'Regino', 'Reinaldo', 'Reinamor', 'Reis', 'Remédios', 'Remígio', 'Remízio', 'Remus', 'Renan', 'Renato', 'René', 'Reno', 'Requerino', 'Rex', 'Reyes', 'Rian', 'Ribca', 'Richard', 'Rick', 'Ricky', 'Rigoberto', 'Ringo', 'Rio', 'Riu', 'Rivelino', 'River', 'Robert', 'Roberto', 'Robim', 'Robin', 'Roboredo', 'Rocco', 'Rodolfo', 'Rogélio', 'Roger', 'Rogério', 'Rói', 'Rolando', 'Roli', 'Rolim', 'Romã', 'Roman', 'Romão', 'Romarico', 'Romarigo', 'Romário', 'Romeo', 'Rómulo', 'Ronaldo', 'Roque', 'Roriz', 'Rosano', 'Rosário', 'Rosil', 'Rossano', 'Rubi', 'Rubim', 'Rúbio', 'Ruby', 'Ruca', 'Rudesindo', 'Rudi', 'Rúdi', 'Rudolfo', 'Rudy', 'Rumi', 'Ruperto', 'Rúpio', 'Rurique', 'Ruy', 'Ryan'],
            s: ['Sabino', 'Sacha', 'Sacramento', 'Sadi', 'Sadraque', 'Sadrudine', 'Sage', 'Salazar', 'Salemo', 'Sales', 'Sáli', 'Salma', 'Salustiano', 'Salustiniano', 'Salvação', 'Salvatore', 'Salviano', 'Sálvio', 'Sam', 'Samaritano', 'Sami', 'Samir', 'Sândalo', 'Sandiego', 'Sandrino', 'Sandy', 'Sansão', 'Santa Ana', 'Santa Maria', 'Santana', 'Santelmo', 'Santino', 'Sário', 'Sasha', 'Sátiro', 'Saúl', 'Saulo', 'Sauro', 'Saverio', 'Sávio', 'Scott', 'Sean', 'Sebastian', 'Sebastien', 'Secundino', 'Segismundo', 'Selésio', 'Seleso', 'Selmo', 'Sena', 'Sénio', 'Sertório', 'Sesinando', 'Seth', 'Severiano', 'Severino', 'Severo', 'Shane', 'Shawn', 'Sidnei', 'Sidónio', 'Sidraque', 'Sifredo', 'Silas', 'Silvano', 'Silvério', 'Silviano', 'Sílvio', 'Simauro', 'Simon', 'Simplício', 'Sindulfo', 'Sinésio', 'Sisenando', 'Sisínio', 'Sisnando', 'Sívio', 'Sixto', 'Sky', 'Skyler', 'Sócrates', 'Soeiro', 'Soki', 'Solano', 'Sotero', 'Spencer', 'Stanislav', 'Stanley', 'Stefan', 'Stefano', 'Steve', 'Steven', 'Sun', 'Suraje', 'Susano', 'Sven'],
            t: ['Taciano', 'Tácio', 'Tadeu', 'Tálio', 'Tâmiris', 'Tarcísio', 'Tarik', 'Tarsício', 'Tasso', 'Tatiano', 'Taylor', 'Teliano', 'Telmo', 'Telo', 'Tenório', 'Teo', 'Téo', 'Teobaldo', 'Teodemiro', 'Teodomiro', 'TeodorTeodorico', 'Teodósio', 'Teófilo', 'Teotónio', 'Tércio', 'Terêncio', 'Terry', 'Theo', 'Théo', 'Theodore', 'Theodoro', 'Thiago', 'Thomas', 'Thor', 'Tibério', 'Ticiano', 'Tim', 'Timo', 'Timóteo', 'Timur', 'Tino', 'Tirso', 'Tito', 'Tobi', 'Toby', 'Toledo', 'Tolentino', 'Tom', 'Tomaz', 'Tommy', 'Toni', 'Tony', 'Torcato', 'Torquato', 'Trajano', 'Travis', 'Trevor', 'Trindade', 'Tristan', 'Troy', 'Tude', 'Tudor', 'Túlio', 'Turgo', 'Tyler'],
            u: ['Ubaldo', 'Udo', 'Ulisses', 'Ulrico', 'Urbano', 'Urbino', 'Urias', 'Uriel', 'Urien', 'Uxío', 'Uziel'],
            v: ['Vaíse', 'Valdemar', 'Valdir', 'Valdo', 'Valdomiro', 'Valente', 'Valentim', 'Valentin', 'Valentino', 'Valério', 'Valgi', 'Válter', 'Vando', 'Vânio', 'Varo', 'Vasco', 'Venâncio', 'Venceslau', 'Vêndel', 'Ventura', 'Verdi', 'Vergílio', 'Veridiano', 'Veríssimo', 'Vero', 'Vérter', 'Vianei', 'Vicêncio', 'Vicente', 'Victor', 'Victoriano', 'Vidal', 'Vidálio', 'Vidaúl', 'Viktor', 'Vilar', 'Vilator', 'Vili', 'Vílmar', 'Vílson', 'Vincent', 'Vincenzo', 'Vinício', 'Vinicius', 'Virgílio', 'Virgínio', 'Virgulino', 'Viriato', 'Vital', 'Vitaliano', 'Vitálio', 'Vitiza', 'Vito', 'Vítor', 'Vitorino', 'Vitório', 'Vittorio', 'Vivaldo', 'Viveque', 'Vlad', 'Vladimir', 'Vladimiro'],
            w: ['Wade', 'Wagner', 'Walker', 'Warren', 'Wayne', 'Wellington', 'Wendell', 'Wesley', 'William', 'Wilson', 'Wolf', 'Wyatt'],
            x: ['Xavier', 'Xénio', 'Xenócrates', 'Xénon', 'Xerxes', 'Xico', 'Xin', 'Xisto', 'Xoel'],
            y: ['Yago', 'Yan', 'Yannick', 'Youssef', 'Yuran', 'Yuri', 'Yves'],
            z: ['Zac', 'Zacarias', 'Zachary', 'Zafir', 'Zahir', 'Zaid', 'Zaido', 'Zaíro', 'Zander', 'Zaqueu', 'Zará', 'Zardilaque', 'Zayn', 'Zeferino', 'Zéfiro', 'Zeke', 'Zélio', 'Zerá', 'Zeus', 'Zidane', 'Zion', 'Zito', 'Ziza', 'Zola', 'Zyon']
        }
    }

    listaSobrenome = {
        sobrenomeAbreviado: [
            'A.', 'B.', 'C.', 'D.', 'E.', 'F.', 'G.', 'H.', 'I.',
            'J.', 'K.', 'L.', 'M.', 'N.', 'O.', 'P.', 'Q.', 'R.',
            'S.', 'T.', 'U.', 'V.', 'W.', 'X.', 'Y.', 'Z.'
        ],

        sobrenomeCompleto: {
            a: ['Abreu', 'Aguado', 'Aguiar', 'Aguilar', 'Aguirre', 'Almeida', 'Alonso', 'Alvarado', 'Alvarez', 'Alves', 'Amaral', 'Amarante', 'Amaro', 'Ambrosio', 'Amorim', 'Anderson', 'Andrade', 'Andre', 'Anjos', 'Antonio', 'António', 'Antunes', 'Anunciacao', 'Aparecida', 'Aparecido', 'Apolinario', 'Aquilani', 'Aquilanti', 'Aquino', 'Araboni', 'Aragao', 'Aragazzi', 'Aranha', 'Arantes', 'Araujo', 'Araújo', 'Arcadio', 'Arcanjo', 'Ardito', 'Ardizzone', 'Argilli', 'Ariatti', 'Aridit', 'Armani', 'Armenise', 'Arnaldi', 'Aronica', 'Arrais', 'Arruda', 'Artipoli', 'Ascenzi', 'Ascoli', 'Assis', 'Assumpcao', 'Assuncao', 'Ataide', 'Augusto', 'Avelar', 'Avelino', 'Averlino', 'Avila', 'Ayres', 'Azeredo', 'Azevedo'],
            b: ['Barbosa', 'Bernal', 'Bernardi', 'Bernardino', 'Bernardo', 'Berto', 'Beserra', 'Bessa', 'Bezerra', 'Bianchi', 'Bianchini', 'Bicalho', 'Bispo', 'Bitencourt', 'Bittencourt', 'Blanco', 'Boaventura', 'Bocchini', 'Bolgheri', 'Bombardini', 'Bomfim', 'Bommarito', 'Bonamoni', 'Bonanni', 'Bonazzi', 'Bonazzoli', 'Bonera', 'Bonetto', 'Bonfim', 'Bonomi', 'Borba', 'Borges', 'Borgobello', 'Borriello', 'Bortolotto', 'Bortoluzzi', 'Bosco', 'Boscolo', 'Botelho', 'Botta', 'Botticella', 'Bovo', 'Braga', 'Brambilla', 'Branco', 'Brandao', 'Brandão', 'Brasil', 'Brasileiro', 'Bravo', 'Braz', 'Breda', 'Brena', 'Brenna', 'Bresciani', 'Bressan', 'Brevi', 'Briano', 'Bricca', 'Brienza', 'Brighi', 'Brito', 'Britto', 'Brivio', 'Brocchi', 'Brum', 'Brunetti', 'Bruni', 'Brunner', 'Bruno', 'Bucchi', 'Budel', 'Bueno', 'Buffon', 'Bugnard', 'Bulgarini', 'Burla'],
            c: ['Campos', 'Cardoso', 'Carmona', 'Carvalho', 'Castro', 'Cervantes', 'Cervantes', 'Chagas', 'Chaves', 'Chavier', 'Cintra', 'Cipriano', 'Claro', 'Claudino', 'Clemente', 'Coelho', 'Coimbra', 'Colares', 'Colombo', 'Conceição', 'Conde', 'Constantino', 'Conte', 'Conti', 'Cordeiro', 'Cordero', 'Córdoba', 'Correa', 'Corrêa', 'Correia', 'Cortes', 'Cortez', 'Corvia', 'Cosenza', 'Coser', 'Cosini', 'Cossato', 'Cossu', 'Cossutta', 'Costa', 'Costacurta', 'Costanzo', 'Cottafava', 'Coutinho', 'Couto', 'Covallini', 'Cozza', 'Creanza', 'Crisci', 'Crisostomo', 'Crispim', 'Cristallini', 'Cristante', 'Cristiano', 'Cristina', 'Croce', 'Crovari', 'Cruz', 'Cucciari', 'Cudicini', 'Cudini', 'Cuenca', 'Cumani', 'Cunha', 'Cunzi', 'Cupi', 'Cury', 'Custodio', 'Cutrim'],
            d: ['Della Morte', 'Delli Carri', 'Delvecchio', 'Denicola', 'Di Biagio', 'Di Canio', 'Di Cesare', 'Di Donato', 'Di Flumeri', 'Di Francesco', 'Di Livio', ' Di Loreto', 'Di Michele', ' Di Napoli', 'di Salvo', 'Di Stefano', 'Di Vaio', 'Di Vicino', 'Di Zenzo', 'Diamanti', 'Diamoutene', 'Diana', 'Dias', 'Diaz', 'Dicara', 'Didomenico', 'Digenti', 'Diliso', 'Dionigi', 'Disanti', 'Do Prado', 'do Socorro', 'do Vale', 'do Valle', 'Doga', 'Domingos', 'Domingues', 'Domizzi', 'Donadel', 'Donati', 'Donelli', 'Doni', 'Donizetti', 'Donzella', 'Dornelas', 'Dorneles', 'Dornelles', 'Dorso', 'dos Anjos', 'dos Passos', 'dos Prazeres', 'dos Reis', 'dos Santos', 'Dossantos', 'Dossena', 'Dourado', 'Drascek', 'Drumond', 'Duarte', 'Duque', 'Duraes', 'Durán', 'Dutra'],
            e: ['Eccelino', 'Eduardo', 'Elia', 'Elias', 'Emiliano', 'Escobar', 'Esini', 'Espindola', 'Esposito', 'Estevam', 'Estevao', 'Esteves', 'Estrela', 'Euzebio', 'Evangelista', 'Evangelisti'],
            f: ['Fernandes', 'Fernandez', 'Fernández', 'Ferreira', 'Fiuza', 'Florencio', 'Flores', 'Floriano', 'Fogaca', 'Fonseca', 'Fonsêca', 'Fontana', 'Fontanesi', 'Fontenele', 'Fontes', 'Fontoura', 'Forte', 'Fortes', 'Fortichiari', 'Fortin', 'Fortunato', 'Fraga', 'Fragoso', 'Franca', 'França', 'Francelino', 'Franceschini', 'Franchini', 'Franchitti', 'Francioso', 'Francisco', 'Franco', 'Franzone', 'Frara', 'Frassetto', 'Frazao', 'Freire', 'Freires', 'Freitas', 'Fresi', 'Frezza', 'Frezzolini', 'Frigeri', 'Friuli', 'Froes', 'Frota', 'Frutuoso', 'Fugosi', 'Funaro', 'Furlan', 'Furtado', 'Fusani', 'Fusco', 'Fuseli'],
            g: ['Gabriel', 'Gadelha', 'Galdino', 'Galindo', 'Gallego', 'Gallo', 'Galvao', 'Galvâo', 'Gálvez', 'Gama', 'Garcez', 'Garcia', 'García', 'Garrido', 'Gaspar', 'Geraldo', 'Germano', 'Giancola', 'Gianello', 'Giannichedda', 'Giannone', 'Giardiola', 'Gil', 'Gilardino', 'Gimenes', 'Gimenez', 'Gimmelli', 'Ginestra', 'Giosa', 'Girardi', 'Girotto', 'Giubilato', 'Giugliano', 'Giunti', 'Gobbi', 'Godeas', 'Godinho', 'Godoi', 'Godoy', 'Goes', 'Gois', 'Gomes', 'Gomes da Silva', 'Gomez', 'Gómez', 'Gon Alves', 'Gonçalves', 'Gondim', 'Gonnella', 'Gonsalves', 'Gontijo', 'Gonzaga', 'Gonzales', 'Gonzalez', 'González', 'Goracci', 'Goretti', 'Gori', 'Gorini', 'Gorzegno', 'Gottardi', 'Goulart', 'Gouvea', 'Gouveia', 'Gozzoli', 'Gracia', 'Graffiedi', 'Grando', 'Grandoni', 'Grassadonia', 'Grauso', 'Grava', 'Greco', 'Gregori', 'Gregorio', 'Grieco', 'Griffo', 'Groppi', 'Grossi', 'Grosso', 'Guana', 'Guardalben', 'Guarente', 'Guarna', 'Guastalvino', 'Guatelli', 'Gubellini', 'Guedes', 'Guerra', 'Guerreiro', 'Guicciardini', 'Guidoni', 'Guilherme', 'Guimaraes', 'Guimarães', 'Gurgel', 'Gusmao', 'Gutierrez', 'Gutiérrez', 'Guttuso'],
            h: ['Haddad', 'Harrasser', 'Henrique', 'Henrique da Silva', 'Henriques', 'Hernandes', 'Hernandez', 'Herrera', 'Hoffmann', 'Holanda', 'Honorato', 'Honorio', 'Hoppe', 'Horta'],
            i: ['Iandoli', 'Iaquinta', 'Iezzo', 'Ignoffo', 'Immersi', 'Inacio', 'Indiveri', 'Ingrosso', 'Innocenti', 'Inzaghi', 'Iodice', 'Italiano', 'Ito', 'Iuliano', 'Iunco', 'Izidoro', 'Izzo'],
            j: ['Jacinto', 'Jacob', 'Januario', 'Jaques', 'Jardim', 'Jelmorini', 'Jesus', 'Jimenez', 'Jiménez', 'Joaquim', 'Jordao', 'Jorge', 'Jose', 'José', 'Juliao', 'Julião', 'Junio', 'Junior', 'Junqueira', 'Justino'],
            k: ['Klein', 'Konan', 'Kruger', 'Kuhn'],
            l: ['La Rocca', 'Labraccio', 'Lacerda', 'Ladeira', 'Lafuenti', 'Lage', 'Lago', 'Lagomarsino', 'Lamacchi', 'Lamborghini', 'Langella', 'Langushi', 'Lanna', 'Lanzaro', 'Lanzillotta', 'Lara', 'Laureano', 'Laurindo', 'Lauro', 'Layeni', 'Lazaro', 'Lazzarali', 'Lazzari', 'Leal', 'Leandro', 'Legrottaglie', 'Leitao', 'Leite', 'Leme', 'Lemes', 'Lemos', 'Leonardo', 'Leonetti', 'Leopoldino', 'Lessa', 'Lima', 'Limeira', 'Linhares', 'Lino', 'Lins', 'Lira', 'Lisboa', 'Liverani', ' Lo Monaco', 'Lo Nero', 'Lobato', 'Lóbo', 'Locatelli', 'Lodi', 'Lodigiani', 'Loiola', 'Lollobrigida', 'Longo', 'Lopes', 'Lopes da Silva', 'Lopez', 'López', 'Lorenzetti', 'Lorenzi', 'Lorenzini', 'Loria', 'Loureiro', 'Lourenço', 'Louzada', 'Loviso', 'Lozano', 'Lucarelli', 'Lucas', 'Lucchetti', 'Lucchini', 'Lucena', 'Lucenti', 'Luciano', 'Lucio', 'Luís', 'Luisi', 'Luiso', 'Luiz', 'Luíz', 'Luna', 'Lunardi', 'Lupatelli', 'Lupi', 'Lupoli', 'Lustosa', 'Lustrinelli'],
            m: ['Machado', 'Marques', 'Márquez', 'Martin', 'Martinez', 'Martínez', 'Martini', 'Martins', 'Mascarenhas', 'Mateus', 'Mathias', 'Matias', 'Matos', 'Mattos', 'Mayer', 'Medeiros', 'Medina', 'Meira', 'Meireles', 'Meirelles', 'Mello', 'Melo', 'Mendes', 'Mendonca', 'Mendonça', 'Mendoza', 'Meneses', 'Menezes', 'Mesquita', 'Messias', 'Meyer', 'Miguel', 'Milani', 'Miller', 'Minopoli', 'Miotti', 'Mira', 'Miranda', 'Mirante', 'Mirri', 'Mitra', 'Modesto', 'Moffa', 'Moi', 'Molina', 'Molinaro', 'Molinos', 'Monaco', 'Monte', 'Monteiro', 'Montella', 'Montenegro', 'Montolivo', 'Montoya', 'Mora', 'Morabito', 'Moraes', 'Morais', 'Morales', 'Moreira', 'Morelli', 'Morello', 'Moreno', 'Moretti', 'Moretto', 'Morfeo', 'Morgado', 'Mori', 'Moro', 'Moroni', 'Morrone', 'Moscardelli', 'Moscardi', 'Mota', 'Motta', 'Moura', 'Mourao', 'Mozzoni', 'Muller', 'Munari', 'Munhoz', 'Muniz', 'Muñoz', 'Musso', 'Mussolini', 'Mutarelli', 'Muzzi'],
            n: ['Nakamura', 'Narciso', 'Nardi', 'Nascimento', 'Natal', 'Natali', 'Nattore', 'Nava', 'Navarro', 'Naves', 'Nazareno', 'Ndiaye', 'Negrao', 'Negreiros', 'Negro', 'Nepomuceno', 'Neres', 'Neri', 'Neroni', 'Nervo', 'Nery', 'Nesta', 'Neto', 'Netto', 'Neves', 'Nicola', 'Nicolau', 'Nicoletti', 'Nieto', 'Nobre', 'Nobrega', 'Nocerino', 'Nocita', 'Nodari', 'Nogueira', 'Nolasco', 'Noleto', 'Nonato', 'Noronha', 'Noseda', 'Noselli', 'Novaes', 'Novais', 'Nunes'],
            o: ['Oddo', 'Odescalchi', 'Ogliari', 'Oliva', 'Oliveira', 'Olivi', 'Onofre', 'Orlandoni', 'Ortega', 'Ortiz', 'Oshadogan', 'Osorio', 'Otero', 'Ottonello'],
            p: ['Paredes', 'Pastor', 'Pereira', 'Perez', 'Pérez', 'Perin', 'Perreira', 'Pessanha', 'Pessoa', 'Pestana', 'Petry', 'Piedade', 'Pimenta', 'Pimentel', 'Pina', 'Pinardi', 'Pinheiro', 'Pinho', 'Pinto', 'Pinzan', 'Pinzi', 'Piola', 'Pires', 'Pirlo', 'Pisani', 'Pisano', 'Pisanu', 'Pistone', 'Piva', 'Pivotto', 'Polito', 'Pollini', 'Poloni', 'Polverino', 'Pomante', 'Pompeu', 'Ponte', 'Pontes', 'Ponzo', 'Porcelli', 'Porcello', 'Porchia', 'Portanova', 'Portela', 'Portella', 'Portes', 'Porto', 'Portugal', 'Possanzini', 'Potenza', 'Prado', 'Prata', 'Pratali', 'Prates', 'Prazeres', 'Prestes', 'Previtali', 'Princivalli', 'Procopio', 'Proenca', 'Proietti', 'Protti', 'Prudencio', 'Prudente'],
            q: ['Quadros', 'Quagliarella', 'Quaresma', 'Queiros', 'Queiroz', 'Querino', 'Quintana', 'Quintero', 'Quintino', 'Quirino'],
            r: ['Rabello', 'Rabelo', 'Rabita', 'Rabito', 'Radice', 'Rafael', 'Raggi', 'Raimondi', 'Raimundo', 'Ramalho', 'Ramires', 'Ramírez', 'Ramon', 'Ramos', 'Rangel', 'Raposo', 'Raso', 'Ravanelli', 'Razzetti', 'Rea', 'Rebecchi', 'Rebelo', 'Reboucas', 'Rech', 'Reclari', 'Regazzoni', 'Regina', 'Regis', 'Rego', 'Regonesi', 'Reis', 'Resende', 'Rezende', 'Rezzonico', 'Riato', 'Ribas', 'Ribeiro', 'Ricardo', 'Ricci', 'Riccio', 'Ricco', 'Rigan', 'Rigo', 'Rigoni', 'Rinuccini', 'Riontino', 'Rios', 'Ríos', 'Riva', 'Rivalta', 'Rivas', 'Rizzato', 'Rizzo', 'Roberto', 'Rocca', 'Roccati', 'Rocchi', 'Rocha', 'Rodocanachi', 'Rodrigues', 'Rodriguês', 'Rodriguez', 'Rodríguez', 'Rodriguez Cuba', 'Rojas', 'Rolim', 'Roma', 'Román', 'Romanelli', 'Romano', 'Romao', 'Romeiro', 'Romero', 'Roncero', 'Roque', 'Rosa', 'Rosas', 'Rosina', 'Rossetti', 'Rossi', 'Rossini', 'Rotanzi', 'Ruas', 'Rufino', 'Ruggieri', 'Ruiz', 'Rullo', 'Ruotolo', 'Russo', 'Russotto', 'Rustico'],
            s: ['Salas', 'Sanchez', 'Sánchez', 'Santos', 'Serpe', 'Serrano', 'Servi', 'Sestu', 'Severi', 'Severino', 'Sibilano', 'Sicignano', 'Signori', 'Signorile', 'Silva', 'Silvestri', 'Simoes', 'Simões', 'Simon', 'Sinigaglia', 'Siqueira', 'Sirtoli', 'Siviglia', 'Soares', 'Soares da Silva', 'Sobral', 'Sobreira', 'Sobrinho', 'Sodre', 'Soligo', 'Sonzogni', 'Soria', 'Sorrentino', 'Soto', 'Sottil', 'Sousa', 'Souto', 'Souza', 'Soviero', 'Spadavecchia', 'Speranza', 'Spinelli', 'Spinesi', 'Sportillo', 'Squizzi', 'Stein', 'Stella', 'Stellini', 'Stellone', 'Stendardo', 'Stentardo', 'Sterchele', 'Storari', 'Stovini', 'Strambace', 'Strambi', 'Succi', 'Sullo', 'Suriano', 'Sussi', 'Suzuki'],
            t: ['Taborda', 'Tacchinardi', 'Tagliaferri', 'Taibi', 'Takahashi', 'Taldo', 'Tamburini', 'Tanaka', 'Tarana', 'Tarantino', 'Targino', 'Tasso', 'Tavano', 'Tavares', 'Taveira', 'Teani', 'Tedesco', 'Teixeira', 'Teles', 'Telles', 'Tenorio', 'Teodorani', 'Teodoro', 'Teoldi', 'Terlizzi', 'Terminiello', 'Terni', 'Terra', 'Testa', 'Testini', 'Teta', 'Texeira', 'Theodoro', 'Thomaz', 'Thome', 'Tinoco', 'Tirelli', 'Tiribocchi', 'Tisci', 'Tobias', 'Todisco', 'Toldo', 'Toledo', 'Tolentino', 'Tolo', 'Tomaz', 'Tome', 'Tommasi', 'Tonetto', 'Toni', 'Torquato', 'Torres', 'Torrisi', 'Toselli', 'Tosin', 'Tosto', 'Totti', 'Trajano', 'Travassos', 'Traversoni', 'Trevisan', 'Trindade', 'Triuzzi', 'Troiano', 'Troise', 'Tulli', 'Tuomino', 'Turati', 'Turato', 'Turci', 'Tursi', 'Tusino'],
            u: ['Uchoa', 'Ugolino', 'Ungari', 'Urbano'],
            v: ['Vaccari', 'Valadares', 'Valdata', 'Vale', 'Valenca', 'Valente', 'Valentim', 'Valenzuela', 'Valeriano', 'Valerio', 'Valim', 'Valle', 'Vallore', 'Valverde', 'Vanacore', 'Vanigli', 'Vanin', 'Vannucchi', 'Vanoli', 'Vantaggiato', 'Varela', 'Vargas', 'Varricchio', 'Vasario', 'Vasconcellos', 'Vasconcelos', 'Vasques', 'Vaz', 'Vega', 'Veiga', 'Veloso', 'Venancio', 'Venditti', 'Ventola', 'Ventura', 'Venturelli', 'Vera', 'Veras', 'Vergassola', 'Verissimo', 'Vettori', 'Viali', 'Viana', 'Vianna', 'Vicari', 'Viccio', 'Vicente', 'Vicentini', 'Vidal', 'Viegas', 'Vieira', 'Viera', 'Vieri', 'Vigiani', 'Vigna', 'Vignaroli', 'Vilar', 'Vilas', 'Vilas Boas', 'Vilela', 'Vilhena', 'Villela', 'Vitaini', 'Vital', 'Vitale', 'Vitiello', 'Vitor', 'Vitoriano', 'Vitorino', 'Vitorio', 'Volonte', 'Volpi'],
            w: ['Wagner', 'Watanabe', 'Weber'],
            x: ['Xavier', 'Ximenes'],
            y: ['Yamamoto'],
            z: ['Zacarias', 'Zaccanti', 'Zaccardo', 'Zago', 'Zambelli', 'Zamboni', 'Zambrella', 'Zambrotta', 'Zampagna', 'Zampieri', 'Zanatta', 'Zanchetta', 'Zanchi', 'Zanella', 'Zanetti', 'Zanin', 'Zaninelli', 'Zanini', 'Zaniolo', 'Zanoletti', 'Zanon', 'Zari', 'Zattarin', 'Zauli', 'Zenoni', 'Zeri', 'Zimmermann', 'Zoboli', 'Zola', 'Zoppetti', 'Zotti']

        }
    }
};


class MultiplosNomes {
    listaDeNomesGerados = '';

    constructor(sexo, formatação, quantidade) {
        this.gerarMultiplosNomes(sexo, formatação, quantidade);
    }

    gerarMultiplosNomes(sexo, formatação, quantidade) {
        for (let i = 0; i < quantidade; i++) {
            const geradorNome = new Nome(sexo, formatação);
            this.listaDeNomesGerados = this.listaDeNomesGerados + geradorNome.nome + "\n";
        }
    }

}

