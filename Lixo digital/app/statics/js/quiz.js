// Dados das perguntas
const questions = [
    { question: "Onde devemos descartar baterias usadas?", answers: ["Lixo comum", "Ecopontos", "Rios"], correct: 1 },
    { question: "Qual é o impacto ambiental do descarte incorreto de eletrônicos?", answers: ["Nenhum", "Poluição e contaminação", "Redução do oxigênio"], correct: 1 },
    { question: "Qual material perigoso é encontrado em eletrônicos?", answers: ["Chumbo", "Papel", "Madeira"], correct: 0 },
    { question: "Como o lixo eletrônico pode afetar a saúde humana?", answers: ["Aumenta a imunidade", "Causa doenças respiratórias", "Melhora a qualidade de vida"], correct: 1 },
    { question: "Qual é a melhor opção para descartar um celular antigo?", answers: ["Jogar no lixo comum", "Descartar em um ponto de coleta especializado", "Deixar em casa",], correct: 1 },
    { question: "O que pode ser reciclado em um computador?", answers: ["A carcaça", "A placa-mãe", "Ambos"], correct: 2 },
    { question: "A reciclagem de eletrônicos pode ajudar a:", answers: ["Reduzir a quantidade de resíduos", "Aumentar o consumo de produtos", "Poluir mais o ambiente"], correct: 0 },
    { question: "Qual é o tempo de decomposição de um celular no lixo?", answers: ["5 anos", "30 anos", "100 anos"], correct: 2 },
    { question: "O que é o lixo eletrônico?", answers: ["Resíduos orgânicos", "Qualquer produto eletrônico descartado", "Papel e plástico usados"], correct: 1 },
    { question: "Por que é importante fazer o descarte adequado de pilhas e baterias?", answers: ["Porque elas contêm substâncias tóxicas", "Porque são recicláveis", "Porque são biodegradáveis"], correct: 0 },
    { question: "O que você pode fazer para reduzir o lixo digital em casa?", answers: ["Comprar novos aparelhos constantemente", "Fazer manutenção nos aparelhos e doar os antigos", "Jogar os aparelhos fora"], correct: 1 },
    { question: "Qual a consequência do descarte incorreto de aparelhos de informática?", answers: ["Poluição do solo e da água", "Aumento da biodiversidade", "Redução da poluição atmosférica"], correct: 0 },
    { question: "Quais materiais de um computador podem ser reciclados?", answers: ["Vidro, plástico e metal", "Madeira e papel", "Nada pode ser reciclado"], correct: 0 },
    { question: "Qual é o destino ideal para um monitor de computador quebrado?", answers: ["Lixo comum", "Lixo reciclável", "Ponto de coleta especializado"], correct: 2 },
    { question: "O que é feito com os metais reciclados de aparelhos eletrônicos?", answers: ["São transformados em novos produtos", "São descartados em aterros", "São deixados para se decompor"], correct: 0 },
    { question: "Por que a reciclagem de eletrônicos é importante?", answers: ["Reduz a demanda por novos recursos", "Aumenta a quantidade de lixo", "Aumenta a produção de lixo orgânico"], correct: 0 },
    { question: "Onde podemos encontrar pontos de descarte de lixo eletrônico?", answers: ["Lojas de eletrodomésticos e centros de reciclagem", "No lixo comum", "Nos rios e mares"], correct: 0 }
];


// Índice da pergunta atual
let currentQuestionIndex = 0;

// Seleção dos elementos HTML
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const feedbackElement = document.getElementById("feedback");
const nextButton = document.getElementById("next-btn");

// Função para carregar as perguntas
function loadQuestion() {
    let currentQuestion = questions[currentQuestionIndex];

    // Atualiza a pergunta na tela
    questionElement.innerText = currentQuestion.question;

    // Limpa as respostas anteriores
    answersElement.innerHTML = "";

    // Cria os botões de resposta
    currentQuestion.answers.forEach((answer, index) => {
        let btn = document.createElement("button");
        btn.innerText = answer;
        btn.classList.add("answer-btn");

        // Adiciona evento para verificar a resposta
        btn.addEventListener("click", () => checkAnswer(index));
        answersElement.appendChild(btn);
    });

    // Limpa o feedback
    feedbackElement.innerText = "";

    // Esconde o botão de próxima pergunta inicialmente
    nextButton.style.display = "none";
}


// Função para verificar a resposta
function checkAnswer(selectedIndex) {
    let correctIndex = questions[currentQuestionIndex].correct;
    let buttons = document.querySelectorAll(".answer-btn");

    if (selectedIndex === correctIndex) {
        buttons[selectedIndex].classList.add("correct");
        feedbackElement.innerText = "✅ Resposta correta!";
    } else {
        buttons[selectedIndex].classList.add("wrong");
        feedbackElement.innerText = "❌ Resposta errada!";
    }

    buttons.forEach(btn => btn.disabled = true);  // Desabilitar os botões de resposta
    
    // Exibir o botão de próxima pergunta
    nextButton.style.display = "block";
}

// Função para avançar para a próxima pergunta
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();  // Carrega a próxima pergunta
    } else {
        questionElement.innerText = "🎉 Parabéns! Você concluiu o quiz!";
        answersElement.innerHTML = "";  // Remove as respostas
        feedbackElement.innerText = "";  // Limpa o feedback
        nextButton.style.display = "none";  // Esconde o botão de próxima pergunta
    }
});

// Carrega a primeira pergunta ao abrir a página
loadQuestion();
