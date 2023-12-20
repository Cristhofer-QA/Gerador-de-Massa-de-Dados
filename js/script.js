
function fechar(elemento) {
    document.getElementById(elemento).style.display = "none";
};

function abrir(elemento) {
    document.getElementById(elemento).style.display = "flex";
};

function limitarCaracteres(elemento) {
    const element = document.getElementById(elemento);
    if (element.value.length > element.maxLength) {
        element.value = element.value.slice(0, element.maxLength);
    }
}

function limitarNumeroMinimo(elemento) {
    if (elemento.value < elemento.min) {
        elemento.value = (elemento.value * (-1));
    }
}


function limitarNumeroMaximo(elemento) {
    const element = document.querySelector(elemento);
    limitarNumeroMinimo(element);
    const elementoPositivo = document.querySelector(elemento)
    const max = 40000;
    if (elementoPositivo.value > max) {
        elementoPositivo.value = max;
    }
}

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
        this.digitosCpf[9] = this.geradorPrimeiroDigitoCPF();
        this.digitosCpf[10] = this.gerarSegundoDigitoVerificador();
    }

    gerarDigitosAleatorios() {
        return Math.floor(Math.random() * 10);
    }

    geradorPrimeiroDigitoCPF() {
        const somaDig1 = (
            (this.digitosCpf[0] * 10) + (this.digitosCpf[1] * 9) + (this.digitosCpf[2] * 8) +
            (this.digitosCpf[3] * 7) + (this.digitosCpf[4] * 6) + (this.digitosCpf[5] * 5) +
            (this.digitosCpf[6] * 4) + (this.digitosCpf[7] * 3) + (this.digitosCpf[8] * 2)
        );

        if (somaDig1 % 11 == 0 || somaDig1 % 11 == 1) {
            return 0;
        } else {
            return (11 - (somaDig1 % 11));
        }
    }

    gerarSegundoDigitoVerificador() {
        const somaDig2 = (
            (this.digitosCpf[1] * 10) + (this.digitosCpf[2] * 9) + (this.digitosCpf[3] * 8) +
            (this.digitosCpf[4] * 7) + (this.digitosCpf[5] * 6) + (this.digitosCpf[6] * 5) +
            (this.digitosCpf[7] * 4) + (this.digitosCpf[8] * 3) + (this.digitosCpf[9] * 2)
        );

        if (somaDig2 % 11 == 0 || somaDig2 % 11 == 1) {
            return 0;
        } else {
            return (11 - (somaDig2 % 11));
        }
    }

    digitoRegiaoFiscal(regiaoFiscal) {
        switch (regiaoFiscal) {
            case "DF": case "GO": case "MS": case "MT": case "TO":
                return 1;
                break;
            case "AC": case "AM": case "AP": case "PA": case "RR": case "RO":
                return 2;
                break;
            case "CE": case "MA": case "PI":
                return 3;
                break;
            case "AL": case "PB": case "PE": case "RN":
                return 4;
                break;
            case "BA": case "SE":
                return 5;
                break;
            case "MG":
                return 6;
                break;
            case "ES": case "RJ":
                return 7;
                break;
            case "SP":
                return 8;
                break;
            case "PR": case "SC":
                return 9;
                break;
            case "RS":
                return 0;
                break;
        }
    }
}

class GerarCpf {
    cpf_valido;

    constructor(regiaoFiscal, tipoPontuacao) {
        const cpf = new Cpf(regiaoFiscal)
        this.cpf_valido = this.escolherTipoPontuacao(tipoPontuacao, cpf);
    }

    gerarCpfComPontuacao(cpf) {
        return `${cpf.digitosCpf[0]}${cpf.digitosCpf[1]}${cpf.digitosCpf[2]}.${cpf.digitosCpf[3]}${cpf.digitosCpf[4]}${cpf.digitosCpf[5]}.${cpf.digitosCpf[6]}${cpf.digitosCpf[7]}${cpf.digitosCpf[8]}-${cpf.digitosCpf[9]}${cpf.digitosCpf[10]}\n`
    }

    gerarCpfSemPontuacao(cpf) {
        return `${cpf.digitosCpf[0]}${cpf.digitosCpf[1]}${cpf.digitosCpf[2]}${cpf.digitosCpf[3]}${cpf.digitosCpf[4]}${cpf.digitosCpf[5]}${cpf.digitosCpf[6]}${cpf.digitosCpf[7]}${cpf.digitosCpf[8]}${cpf.digitosCpf[9]}${cpf.digitosCpf[10]}\n`
    }

    gerarCpfApenasPontos(cpf) {
        return `${cpf.digitosCpf[0]}${cpf.digitosCpf[1]}${cpf.digitosCpf[2]}.${cpf.digitosCpf[3]}${cpf.digitosCpf[4]}${cpf.digitosCpf[5]}.${cpf.digitosCpf[6]}${cpf.digitosCpf[7]}${cpf.digitosCpf[8]}${cpf.digitosCpf[9]}${cpf.digitosCpf[10]}\n`
    }

    gerarCpfApenasTraço(cpf) {
        return `${cpf.digitosCpf[0]}${cpf.digitosCpf[1]}${cpf.digitosCpf[2]}${cpf.digitosCpf[3]}${cpf.digitosCpf[4]}${cpf.digitosCpf[5]}${cpf.digitosCpf[6]}${cpf.digitosCpf[7]}${cpf.digitosCpf[8]}-${cpf.digitosCpf[9]}${cpf.digitosCpf[10]}\n`
    }

    escolherTipoPontuacao(tipoPontuacao, cpf) {
        /* if else ternário
        return tipoPontuacao == 0
           ? this.gerarCpfComPontuacao(cpf)
               : this.gerarCpfSemPontuacao(cpf);
     */
        if (tipoPontuacao == 1) {
            return this.gerarCpfSemPontuacao(cpf);
        } else if (tipoPontuacao == 2) {
            return this.gerarCpfComPontuacao(cpf);
        } else if (tipoPontuacao == 3) {
            return this.gerarCpfApenasPontos(cpf);
        } else if (tipoPontuacao == 4) {
            return this.gerarCpfApenasTraço(cpf);
        }
    }
}

class MultiplosCpf {
    listaCpf = '';
    imprimir = document.querySelector('#retorno-cpf')
    constructor(regiaoFiscal, tipoPontuacao, quantidades) {
        this.gerarMultiplosCpf(regiaoFiscal, tipoPontuacao, quantidades);
    }

    gerarMultiplosCpf(regiaoFiscal, tipoPontuacao, quantidades) {
        for (let i = 0; i < quantidades; i++) {
            const cpf = new GerarCpf(regiaoFiscal, tipoPontuacao);
            this.listaCpf = this.listaCpf + "" + cpf.cpf_valido;

        }
    }
}


const btn = document.querySelector('#bt-gerar-cpf')
btn.addEventListener("click", function (event) {
    event.preventDefault();
    const uf = document.querySelector('#uf').value;
    const formatacao = document.querySelector('#formatacao').value;
    const qtd = document.querySelector('#quantidade-cpf').value;
    if (formatacao == 0) {
        window.alert("Selecione a FORMATAÇÃO");
    } if (uf == 0) {
        window.alert("Selecione a UF");
    } else if (qtd == '') {
        window.alert("Informe a QUANTIDADE");
    } else if ( qtd == '0') {
        window.alert("Informe uma QUANTIDADE maior que ZERO");
    } else {
        const cpf = new MultiplosCpf(uf, formatacao, qtd);
        cpf.gerarMultiplosCpf();
        cpf.imprimir.innerHTML = cpf.listaCpf;
    }

})


