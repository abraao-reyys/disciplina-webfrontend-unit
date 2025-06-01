const botaoBranco = document.getElementById("branco");
const botaoVermelho = document.getElementById("vermelho");
const botaoResetar = document.getElementById("resetar");
const botaoAcelerar = document.getElementById("acelerar");
const botaoDesacelerar = document.getElementById("desacelerar");
const carroBranco = document.getElementById("white");
const carroVermelho = document.getElementById("red");
const resultado = document.getElementById("result");
const somMotor = document.getElementById("engineSound");
const caixaTexto = document.querySelector(".text");

let carroSelecionado = null;
let idIntervalo = null;
let velocidade = 0;
let velocidadeLateral = 0;
let escala = 1;
const velocidadeMaxima = 5;
const velocidadeMinima = -5;
const escalaMaxima = 1.2;
const escalaMinima = 0.8;
const limiteLateral = 150;

function esconderBotoes() {
    botaoAcelerar.style.display = "none";
    botaoDesacelerar.style.display = "none";
    botaoResetar.style.display = "none";
}
esconderBotoes();

function selecionarCarro(carro, nome) {
    carroSelecionado = carro;
    resultado.textContent = nome;
    caixaTexto.classList.add("hidden");
    mostrarBotoes();
    somMotor.play();
}

function mostrarBotoes() {
    botaoAcelerar.style.display = "block";
    botaoDesacelerar.style.display = "block";
    botaoResetar.style.display = "block";
}

function iniciarMovimento() {
    if (idIntervalo) clearInterval(idIntervalo);
    const pista = document.querySelector(".container");
    const larguraPista = pista.offsetWidth;
    const larguraCarro = carroSelecionado.offsetWidth;
    const centroX = 270;

    idIntervalo = setInterval(() => {
        if (!carroSelecionado) return;

        let esquerdaAtual = parseFloat(window.getComputedStyle(carroSelecionado).left) || 0;
        let topoAtual = parseFloat(window.getComputedStyle(carroSelecionado).top) || 0;

        let novaEsquerda = esquerdaAtual + velocidadeLateral;
        let novoTopo = topoAtual + velocidade;

        escala = 1 + (novoTopo - 140) / 400;
        escala = Math.max(escalaMinima, Math.min(escalaMaxima, escala));

        novaEsquerda = Math.max(centroX - limiteLateral, Math.min(novaEsquerda, centroX + limiteLateral));
        novoTopo = Math.max(0, Math.min(novoTopo, 140));

        carroSelecionado.style.left = novaEsquerda + "px";
        carroSelecionado.style.top = novoTopo + "px";
        carroSelecionado.style.transform = `scale(${escala})`;

        somMotor.playbackRate = 1 + Math.abs(velocidade) / velocidadeMaxima;
    }, 16);
}

function pararMovimento() {
    velocidade = 0;
    velocidadeLateral = 0;
    somMotor.playbackRate = 1;
}

function resetarJogo() {
    if (idIntervalo) clearInterval(idIntervalo);
    velocidade = 0;
    velocidadeLateral = 0;
    escala = 1;
    carroBranco.style.left = "270px";
    carroBranco.style.top = "140px";
    carroBranco.style.transform = "scale(1)";
    carroBranco.style.display = "block";
    carroVermelho.style.left = "270px";
    carroVermelho.style.top = "140px";
    carroVermelho.style.transform = "scale(1)";
    carroVermelho.style.display = "block";
    carroSelecionado = null;
    resultado.textContent = "?";
    caixaTexto.classList.remove("hidden");
    esconderBotoes();
    somMotor.pause();
    somMotor.currentTime = 0;
}

botaoBranco.addEventListener("click", (e) => {
    e.stopPropagation();
    selecionarCarro(carroBranco, "Branco");
    iniciarMovimento();
});
botaoVermelho.addEventListener("click", (e) => {
    e.stopPropagation();
    selecionarCarro(carroVermelho, "Vermelho");
    iniciarMovimento();
});
carroBranco.addEventListener("click", (e) => {
    e.stopPropagation();
    selecionarCarro(carroBranco, "Branco");
    iniciarMovimento();
});
carroVermelho.addEventListener("click", (e) => {
    e.stopPropagation();
    selecionarCarro(carroVermelho, "Vermelho");
    iniciarMovimento();
});
botaoResetar.addEventListener("click", (e) => {
    e.stopPropagation();
    resetarJogo();
});

botaoAcelerar.addEventListener("mousedown", (e) => {
    e.stopPropagation();
    velocidade = -10;
    iniciarMovimento();
});
botaoAcelerar.addEventListener("mouseup", (e) => {
    e.stopPropagation();
    pararMovimento();
});
botaoDesacelerar.addEventListener("mousedown", (e) => {
    e.stopPropagation();
    velocidade = 10;
    iniciarMovimento();
});
botaoDesacelerar.addEventListener("mouseup", (e) => {
    e.stopPropagation();
    pararMovimento();
});

document.addEventListener("keydown", (e) => {
    e.preventDefault();
    switch (e.key) {
        case "1":
            selecionarCarro(carroBranco, "Branco");
            iniciarMovimento();
            break;
        case "2":
            selecionarCarro(carroVermelho, "Vermelho");
            iniciarMovimento();
            break;
        case "ArrowUp":
            velocidade = -10;
            iniciarMovimento();
            break;
        case "ArrowDown":
            velocidade = 10;
            break;
        case "ArrowLeft":
            velocidadeLateral = -10;
            iniciarMovimento();
            break;
        case "ArrowRight":
            velocidadeLateral = 10;
            iniciarMovimento();
            break;
        case "r":
        case "R":
            resetarJogo();
            break;
    }
});

document.addEventListener("keyup", (e) => {
    switch (e.key) {
        case "ArrowUp":
        case "ArrowDown":
        case "ArrowLeft":
        case "ArrowRight":
            pararMovimento();
            break;
    }
});