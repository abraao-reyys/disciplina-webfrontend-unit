const brancoBtn = document.getElementById("branco");
const vermelhoBtn = document.getElementById("vermelho");
const resetarBtn = document.getElementById("resetar");
const acelerarBtn = document.getElementById("acelerar");
const desacelerarBtn = document.getElementById("desacelerar");

const whiteCar = document.getElementById("white");
const redCar = document.getElementById("red");
const result = document.getElementById("result");

let selectedCar = null;
let intervalId = null;
let speed = 2;

// Inicialmente esconder botões de ação
function esconderBotoes() {
    acelerarBtn.style.display = "none";
    desacelerarBtn.style.display = "none";
    resetarBtn.style.display = "none";
}
esconderBotoes();

// Seleção dos carros
brancoBtn.addEventListener("click", () => {
    console.log("Botão BRANCO clicado");
    selectedCar = whiteCar;
    result.textContent = "Branco";
    mostrarBotoes();
    pararMovimento();
});

vermelhoBtn.addEventListener("click", () => {
    console.log("Botão VERMELHO clicado");
    selectedCar = redCar;
    result.textContent = "Vermelho";
    mostrarBotoes();
    pararMovimento();
});

function mostrarBotoes() {
    acelerarBtn.style.display = "block";
    desacelerarBtn.style.display = "block";
    resetarBtn.style.display = "block";
}

// Funções de movimento
function moverCarro(velocidade) {
    if (!selectedCar) return;
    pararCarro(); // para evitar múltiplos intervalos

    const pista = document.querySelector(".container");
    const pistaWidth = pista.offsetWidth;
    const carroWidth = selectedCar.offsetWidth;

    intervalId = setInterval(() => {
        let currentLeft = parseInt(window.getComputedStyle(selectedCar).left) || 0;

        // Calcula nova posição
        let novaPosicao = currentLeft + velocidade;

        // Limites: entre 0 e (largura da pista - largura do carro)
        const limiteDireita = pistaWidth - carroWidth;
        if (novaPosicao < 0) novaPosicao = 0;
        if (novaPosicao > limiteDireita) novaPosicao = limiteDireita;

        selectedCar.style.left = novaPosicao + "px";
    }, 30);

}

function pararCarro() {
    clearInterval(intervalId);
}

// Botões de controle
acelerarBtn.addEventListener("click", () => moverCarro(speed));
desacelerarBtn.addEventListener("click", () => moverCarro(-speed));

resetarBtn.addEventListener("click", () => {
    pararCarro();
    whiteCar.style.left = "205px";
    redCar.style.left = ""; // Resetando para CSS original (right: 205px)
    selectedCar = null;
    result.textContent = "?";
    esconderBotoes();
});
