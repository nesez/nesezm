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
    question: "Which graphics card has the best gaming performance?",
    choice1: "gtx1660ti",
    choice2: "rtx2070",
    choice3: "Radeon VII",
    choice4: "GeForce GTX 1080",
    answer: 3
  },
  {
    question:
      "Which cable can't use fhd 144Hz?",
    choice1: "hdmi 1.2", // fhd up to 60Hz supported
    choice2: "support dp 1.2", // 144hz
    choice3: "dvi dual link", // 144hz supported
    choice4: "dp1.4", // 144hz supported
    answer: 1
  },
  {
    question:
      "Which line does not support Giga Internet?",
    choice1: "cat.5", // 100mbps support
    choice2: "cat.6", // 1gbps
    choice3: "cat.6e", // 1gbps
    choice4: "cat.7", // 10gbps
    answer: 1
  },
  {
    question:
      "Which motherboard is the smallest in size?",
    choice1: "atx", // 305x244mm
    choice2: "m-atx", // 244x244mm
    choice3: "itx", // 170x170mm
    choice4: "E-ATX", // 305 × 330 mm
    answer: 3
  },
  {
    question:
      "What is the highest power rating?",
    choice1: "80+ bronze", // 85
    choice2: "80+ titanium", // 96
    choice3: "80+ platinum", // 94
    choice4: "80+ gold", // 92
    answer: 2
  },

  {
    question:
      "Which cpu has built-in graphics?",
    choice1: "i5-9400f", // built-in x
    choice2: "ryzen 3200g", // built o
    choice3: "ryzen 3900x", // built-in x
    choice4: "i7-9700kf", // built-in x
    answer: 2
  },
  {
    question: "Choose the wrong one for Windows shortcuts",
    choice1: "You can kill task manager by pressing ctrl + shift + esc.",
    choice2: "You can change the window with alt + tab.",
    choice3: "You can search with win + W.", // win w capture
    choice4: "You can turn off the computer with alt + f4 and enter on the Windows desktop.",
    answer: 3
  },
  {
    question:
      "What resolution does not match?",
    choice1: "hd-1080x720", // 1280X720
    choice2: "fhd-1920x1080",
    choice3: "2k-2560x1440",
    choice4: "4k-3840x2160",
    answer: 1
  },
  {
    question:
      "Choose the pc configuration is incorrect",
    choice1: "i3 8350k + z370 + ddr4 8gb",
    choice2: "ryzen r5 3600 + a320 + ddr4 8gb",
    choice3: "i9 9820X ​​+ z370 + ddr4 16gb", // i9 9820x is 2066 socket
    choice4: "ryzen r7 2700X + B450 + ddr4 16gb",
    answer: 3
  },
  {
    question:
      "Which browser engine is different? (Based on the latest version of 2020)",
    choice1: "Chrome", // Chromium
    choice2: "Opera", // Chromium
    choice3: "Microsoft Edge", // Chromium
    choice4: "Firefox", // Gecko layout engine
    answer: 4
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
