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
    question: "How does ssd store 2 bits per cell?",
    choice1: "qlc", // 4 bit
    choice2: "tlc", // 3 bits
    choice3: "mlc", // 2 bits
    choice4: "slc", // 1 bit
    answer: 3
  },
  {
    question:
      "Which motherboard does not support AM4 socket?",
    choice1: "x370", // am4
    choice2: "z270", // lga 1151
    choice3: "b350", // am4
    choice4: "b450", // am4
    answer: 2
  },
  {
    question:
      "What is the best resolution?",
    choice1: "UXGA", // 1600 1200
    choice2: "HXGA", // 4096 3072
    choice3: "WSXGA +", // 1680 1050
    choice4: "QVGA", // 320 240
    answer: 2
  },
  {
    question:
      "Which motherboard does not support lga1151v2?",
    choice1: "z370", // lga1151v2
    choice2: "b350", // am4
    choice3: "h370", // lga1151v2
    choice4: "h310", // lga1151v2
    answer: 2
  },
  {
    question:
      "Which is the fastest theoretical speed?",
    choice1: "802.11a", // ~ 54mbps
    choice2: "802.11b", // // 11mbps
    choice3: "802.11n", // ~ 150mbps
    choice4: "802.11ac", // ~ 877mbps
    answer: 4
  },
  {
    question:
      "Please find the part with the shortest A/S",
    choice1: "intel cpu", // 3 years
    choice2: "samsung ram", // from 1.5 years manufacturing date
    choice3: "asus mainboard", // 3 years
    choice4: "emtek gpu", // 5 years
    answer: 2
  },
  {
    question: "Which of the following is the most dangerous overclock?",
    choice1: "cpu overclock",
    choice2: "Ram Overclock",
    choice3: "graphic overclock",
    choice4: "Power overclock",
    answer: 4
  },
  {
    question:
      "Which product has the most cores?",
    choice1: "Thread Ripper 1900X", // 8c16t
    choice2: "i9-9820x", // 10c20t
    choice3: "Xeon e5-2640v4", // 10c20t
    choice4: "Ryzen 3900x", // 12c24t
    answer: 4
  },
  {
    question:
      "Is the connection between the method and the interface incorrect?",
    choice1: "SATA1 1.5Gb / s",
    choice2: "SATA2 3Gb / s",
    choice3: "SATA3 6Gb / s",
    choice4: "NVMe 12Gb / s", // 32Gb / s
    answer: 4
  },
  {
    question:
      "What is not the version of mac os?",
    choice1: "Mac OS X Jaguar",
    choice2: "macOS Mojave",
    choice3: "OS X Yosemite",
    choice4: "macOS Boot Camp", // A program that supports the operating environment of Microsoft Windows on Mac
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
