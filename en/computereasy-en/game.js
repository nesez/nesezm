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
    question: "what does cpu means?",
    choice1: "Central processing unit",
    choice2: "intel core i series",//intel's cpu model
    choice3: "amd ryzen",//amd's cpu model
    choice4: "qualcomm snapdragon",//qualcomm's cpu model
    answer: 1
  },
  {
    question:
      "What happens if you don't have a motherboard on your computer?",
    choice1: "Explosion occurs on the computer",
    choice2: "Even without a main board, it can be driven with a CPU, RAM, and graphics card.",
    choice3: "The computer will not be assembled.",
    choice4: "To make the game run fast enough.",//Assembly itself is not possible
    answer: 3
  },
  {
    question:
      "What is the largest storage space??",
    choice1: "ssd 128gb",//128gb
    choice2: "hdd 1tb",//1024gb
    choice3: "emmc 64gb",//64gb
    choice4: "hdd 10tb",//10240gb
    answer: 4
  },
  {
    question:
      "What is the correct behavior to use a computer?",
    choice1: "Throw the driver at the computer. ", // Computer malfunction
    choice2: "Download the mining program and give your computer enthusiasm. ",
    choice3: "Use programs and games appropriate to your computer's specifications. ",
    choice4: "Put your finger in the cpu fan. ", // Both the finger and the cpu fan are painful.
    answer: 3
  },
  {
    question:
    "What programs should I use on my computer?",
    choice1: "piracy program", // should not be used
    choice2: "genuine program",
    choice3: "Windows crack key", // virus may be present and illegal
    choice4: "Untrusted programs downloaded from the Internet", // There may be a virus

    answer: 2
  },
  {
    question:
    "What is not the device that outputs sound from the computer?",
    choice1: "mouse", // input device
    choice2: "headset",
    choice3: "speaker",
    choice4: "earphone",
    answer: 1
  },
  {
    question:
    "Choose the fastest internet speed in the view",
     choice1: "100mb / s", // KB <MB <GB <TB <PB <EB <ZB
     choice2: "1gb / s", // KB <MB <GB <TB <PB <EB <ZB
     choice3: "1000bit / s", // KB <MB <GB <TB <PB <EB <ZB
     choice4: "800kb / s", // KB <MB <GB <TB <PB <EB <ZB
    answer: 2
  },
  {
    question:
    "What causes computers to become infected with viruses?",
     choice1: "The virus automatically spreads when windows are installed, so the virus is unconditional.", // Nonsense
     choice2: "by downloading an illegal program",
     choice3: "take the keyboard and cuddle it", // nonsense
     choice4: "by changing the monitor", // nonsense
    answer: 2
  },
  {
    question: "Choose the slowest storage",
    choice1: "emmc",//very slow
    choice2: "hdd",// depends on rotation speed
    choice3: "sd card",//gg
    choice4: "nvme ssd",//fast
    answer: 3
  },
  {
    question:
    "What is not the os of the computer?",
     choice1: "linux", // Computer operating system created by Linus Torvalr
     choice2: "window", // Microsoft
     choice3: "mac os", // used on my mac and macbook
     choice4: "galaxy",  //not os
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
