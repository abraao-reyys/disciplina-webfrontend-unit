let numeroOculto;
let tentativas = 5;

function iniciarJogo() {
  const input = document.getElementById("numeroSecreto");
  numeroOculto = parseInt(input.value);
  
  if (isNaN(numeroOculto) || numeroOculto < 1 || numeroOculto > 100) {
    alert("Digite um número válido entre 1 e 100.");
    return;
  }

  document.getElementById("setup").classList.add("escondido");
  document.getElementById("jogo").classList.remove("escondido");
}

function verificarChute() {
  const chute = parseInt(document.getElementById("chute").value);
  const feedback = document.getElementById("feedback");
  const btnReiniciar = document.getElementById("btnReiniciar");

  if (isNaN(chute)) {
    feedback.textContent = "Digite um número válido!";
    return;
  }

  if (chute === numeroOculto) {
    feedback.textContent = "🎉 Parabéns! Você acertou o número!";
    document.getElementById("chute").disabled = true;
    btnReiniciar.classList.remove("escondido");
    return;
  }

  tentativas--;
  document.getElementById("tentativasRestantes").textContent = tentativas;

  if (tentativas === 0) {
    feedback.textContent = `❌ Suas tentativas acabaram. O número era ${numeroOculto}.`;
    document.getElementById("chute").disabled = true;
    btnReiniciar.classList.remove("escondido");
    return;
  }

  if (chute > numeroOculto) {
    feedback.textContent = "O número oculto é menor.";
  } else {
    feedback.textContent = "O número oculto é maior.";
  }

  document.getElementById("chute").value = "";
}

function reiniciarJogo() {
  tentativas = 5;
  numeroOculto = null;

  document.getElementById("numeroSecreto").value = "";
  document.getElementById("chute").value = "";
  document.getElementById("feedback").textContent = "";
  document.getElementById("tentativasRestantes").textContent = "5";
  document.getElementById("chute").disabled = false;

  document.getElementById("jogo").classList.add("escondido");
  document.getElementById("setup").classList.remove("escondido");
  document.getElementById("btnReiniciar").classList.add("escondido");
}
