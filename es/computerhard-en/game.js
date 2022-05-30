const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const loader = document.getElementById("loader");
const game = document.getElementById("game");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    question: "Which is not Intel's cpu?",
    choice1: "xeon e3 1230 v2", // Inteltel Xeon
    choice2: "i7 9700k", // Intel i7
    choice3: "atom z3740", // Intel Atom
    choice4: "ryzen 3900x", // amd Ryzen
    answer: 4
  },
  {
    question:
      "Which RAM has the highest clock?",
    choice1: "ddr3 1333", // 1333mhz
    choice2: "ddr4 2666", // 2666mhz
    choice3: "ddr4 3200", // 3200mhz
    choice4: "ddr2 133", // 133mhz
    answer: 3
  },
  {
    question:
      "What is the top model among the mainboards below? (6-7 generations)",
    choice1: "z370", // z> b> h
    choice2: "h110", // z> b> h
    choice3: "b150", // z> b> h
    choice4: "b250", // z> b> h
    answer: 1
  },
  {
    question:
      "What does Pridos mean?",
    choice1: "The user has to install os because os is not installed", // Fridos
    choice2: "PC component is missing for cost reduction", // cost reduction
    choice3: "The fan does not exist, so it is low noise", // Fanless
    choice4: "Cpu clock downclocked to 1ghz", // Downclock
    answer: 1
  },
  {
    question: "Which storage device is the fastest?",
    choice1: "7200rpm hdd", // normal hard
    choice2: "5400rpm hdd", // laptop hard
    choice3: "nvme m.2 ssd", // PCIe 3.0 32Gb / s (4GB / s) corresponding to 4 lane bandwidth
    choice4: "sata3 ssd", // SATA 6Gbps up to 600MB / s
    answer: 3
  },
 
  {
    question:
      "When purchasing power, which products should you refrain from purchasing?",
    choice1: "Chunky", // explosion
    choice2: "fsp", // stable power
    choice3: "Sisosonic", // stable power
    choice4: "evga", // stable power
    answer: 1
  },
  {
    question:
      "Choose the appropriate action",
    choice1: "Electricity flows when replacing parts.", // Risk of electric shock
    choice2: "I try to mount m.2 ssd to the sata3 socket", // not installable
    choice3: "Put your finger on the cpu cooler to feel the temperature directly when the cpu fan spins.", // Very dangerous
    choice4: "Arrange the wires of your computer beautifully",
    answer: 4
  },
  {
    question:
      "Which products are not officially overclockable?",
    choice1: "i5 3570k", // k version available
    choice2: "ryzen 3700x", // Ryzen available
    choice3: "i9 9900k", // k version available
    choice4: "i7 7700", // non-k officially not allowed
    answer: 4
  },
  {
    question:
      "Choose one that is not compatible while viewing",
    choice1: "z370", // 8-9th generation
    choice2: "i5 9600k", // 9th generation i5
    choice3: "ddr3 8gb * 2", // ddr4 is compatible
    choice4: "10-year-old sata hard", // sata support available
    answer: 3
  },
  {
    question:
      "What is the fastest usb?",
    choice1: "usb 2.0", // 480mbps
    choice2: "usb 3.0", // 5gbps
    choice3: "usb 3.1", // 10gbps
    choice4: "usb 1.0", //1.5mbps
    answer: 3
  },
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
  game.classList.remove("hidden");
  loader.classList.add("hidden");
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("end");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();
