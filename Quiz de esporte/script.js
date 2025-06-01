const quizData = [
  {
    question: "Qual país sediou a Copa do Mundo de 2014?",
    options: ["Brasil", "Alemanha", "África do Sul", "Rússia"],
    answer: "Brasil"
  },
  {
    question: "Quantos jogadores tem um time de basquete em quadra?",
    options: ["5", "6", "7", "11"],
    answer: "5"
  },
  {
    question: "Quem é considerado o maior nadador olímpico da história?",
    options: ["Michael Phelps", "Ian Thorpe", "César Cielo", "Mark Spitz"],
    answer: "Michael Phelps"
  }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const resultEl = document.getElementById("result");

function loadQuestion() {
  const current = quizData[currentQuestion];
  questionEl.textContent = current.question;
  answersEl.innerHTML = "";

  current.options.forEach(option => {
    const button = document.createElement("button");
    button.textContent = option;
    button.onclick = () => checkAnswer(option);
    answersEl.appendChild(button);
  });
}

function checkAnswer(selected) {
  const correct = quizData[currentQuestion].answer;
  if (selected === correct) {
    score++;
  }
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById("quiz").style.display = "none";
  resultEl.innerHTML = `Você acertou <strong>${score}</strong> de <strong>${quizData.length}</strong> perguntas!`;
}

// Iniciar o quiz
loadQuestion();
