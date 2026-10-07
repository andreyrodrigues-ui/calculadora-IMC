const nome = document.getElementById("nome");
const peso = document.getElementById("peso");
const altura = document.getElementById("altura");
const btnCalcular =document.getElementById("btnCalcular");
const btnLimpar =document.getElementById("btnLimpar");
const resultado =document.getElementById("resultado");
const lista =document.getElementById("listaPessoas");
const contadorPessoas =document.getElementById("contadorPessoas");
const maiorIMC =document.getElementById("maiorIMC");
const menorIMC =document.getElementById("menorIMC");
const mediaIMC =document.getElementById("mediaIMC");
const pesquisa =document.getElementById("pesquisa");

const pessoas = [];

btnCalcular.addEventListener("click", function (event) {

    event.preventDefault();

    const nomePessoa =
        nome.value.trim();

    const pesoPessoa =
        Number(peso.value);

    const alturaPessoa =
        Number(altura.value) / 100;

    if (
        nomePessoa === "" ||
        pesoPessoa <= 0 ||
        alturaPessoa <= 0
    ) {

        resultado.innerHTML = `
            <p>
                Preencha todos os campos corretamente!
            </p>
        `;
        return;
    }

    function calcularIMC() {

        let IMC =
            pesoPessoa /
            (alturaPessoa * alturaPessoa);

        return IMC;
    }

    const IMC = calcularIMC();

    let classificacao = "";

    if (IMC < 18.5) {

        classificacao =
            "Abaixo do peso";

    } else if (IMC < 25) {

        classificacao =
            "Peso normal";

    } else if (IMC < 30) {

        classificacao =
            "Sobrepeso";

    } else if (IMC < 35) {

        classificacao =
            "Obesidade grau I";

    } else if (IMC < 40) {

        classificacao =
            "Obesidade grau II";

    } else {

        classificacao =
            "Obesidade grau III";
    }

    const pessoa = {

        nome: nomePessoa,

        peso: pesoPessoa,

        altura: alturaPessoa,

        imc: IMC,

        classificacao: classificacao
    };

    pessoas.push(pessoa);

    resultado.innerHTML = `

        <p>
            <strong>Nome:</strong>
            ${nomePessoa}
        </p>

        <p>
            <strong>IMC:</strong>
            ${IMC.toFixed(2)}
        </p>

        <p>
            <strong>Classificação:</strong>
            ${classificacao}
        </p>
    `;

    atualizarLista();
    atualizarEstatisticas();

    nome.value = "";
    peso.value = "";
    altura.value = "";
});

function atualizarLista() {

    lista.innerHTML = "";

    if (pessoas.length === 0) {

        lista.innerHTML = `
            <p>
                Não há pessoas cadastradas.
            </p>
        `;
        return;
    }

    pessoas.forEach(function (pessoa, index) {

        lista.innerHTML += `

            <div class="cardPessoa">

                <p>
                    <strong>Nome:</strong>
                    ${pessoa.nome}
                </p>

                <p>
                    <strong>Peso:</strong>
                    ${pessoa.peso} kg
                </p>

                <p>
                    <strong>Altura:</strong>
                    ${pessoa.altura.toFixed(2)} m
                </p>

                <p>
                    <strong>IMC:</strong>
                    ${pessoa.imc.toFixed(2)}
                </p>

                <p>
                    <strong>Classificação:</strong>
                    ${pessoa.classificacao}
                </p>

                <button
                    class="btnRemover"
                    onclick="removerPessoa(${index})"
                >
                    Remover
                </button>

            </div>
        `;
    });
}

function removerPessoa(index) {

    pessoas.splice(index, 1);
    atualizarLista();
    atualizarEstatisticas();
}

function atualizarEstatisticas() {

    contadorPessoas.textContent =
        `Pessoas cadastradas: ${pessoas.length}`;

    if (pessoas.length === 0) {

        maiorIMC.textContent =
            "Maior IMC: 0";
        menorIMC.textContent =
            "Menor IMC: 0";
        mediaIMC.textContent =
            "Média dos IMCs: 0";

        return;
    }

    let maior =
        pessoas[0].imc;

    pessoas.forEach(function (pessoa) {

        if (pessoa.imc > maior) {

            maior =
                pessoa.imc;
        }
    });

    let menor =
        pessoas[0].imc;

    pessoas.forEach(function (pessoa) {

        if (pessoa.imc < menor) {
            menor =
                pessoa.imc;
        }
    });

    let soma = 0;

    pessoas.forEach(function (pessoa) {

        soma += pessoa.imc;
    });

    let media =
        soma / pessoas.length;

    maiorIMC.textContent =
        `Maior IMC: ${maior.toFixed(2)}`;

    menorIMC.textContent =
        `Menor IMC: ${menor.toFixed(2)}`;

    mediaIMC.textContent =
        `Média dos IMCs: ${media.toFixed(2)}`;
}

btnLimpar.addEventListener("click", function () {

    nome.value = "";
    peso.value = "";
    altura.value = "";
    resultado.innerHTML = "";
});

pesquisa.addEventListener("input", function () {

    const textoPesquisa =
        pesquisa.value
        .toLowerCase()
        .trim();

    lista.innerHTML = "";

    const pessoasFiltradas =
        pessoas.filter(function (pessoa) {

            return pessoa.nome
                .toLowerCase()
                .includes(textoPesquisa);
        });

    if (pessoasFiltradas.length === 0) {

        lista.innerHTML = `
            <p>
                Nenhuma pessoa encontrada.
            </p>
        `;
        return;
    }

    pessoasFiltradas.forEach(function (pessoa) {

        const index =
            pessoas.indexOf(pessoa);

        lista.innerHTML += `

            <div class="cardPessoa">

                <p>
                    <strong>Nome:</strong>
                    ${pessoa.nome}
                </p>

                <p>
                    <strong>Peso:</strong>
                    ${pessoa.peso} kg
                </p>

                <p>
                    <strong>Altura:</strong>
                    ${pessoa.altura.toFixed(2)} m
                </p>

                <p>
                    <strong>IMC:</strong>
                    ${pessoa.imc.toFixed(2)}
                </p>

                <p>
                    <strong>Classificação:</strong>
                    ${pessoa.classificacao}
                </p>

                <button
                    class="btnRemover"
                    onclick="removerPessoa(${index})"
                >
                    Remover
                </button>

            </div>
        `;
    });
});