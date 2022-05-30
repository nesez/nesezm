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
    question:
    "Which picture quality is the best?",
  choice1: "hd", // 1280 720
  choice2: "fhd", // 1920 1080
  choice3: "2k", // 2560 1440
  choice4: "4k", // 3840 2160
  answer: 4
},
{
  question:
    "What is the highest mouse dpi?",
  choice1: "2800dpi",
  choice2: "4000dpi",
  choice3: "5000dpi",
  choice4: "6000dpi", // bigger is higher.
  answer: 4
},
{
  question:
    "If the computer does not have the capacity, what is the solution?",
  choice1: "Erase hard or ssd useless programs.",
  choice2: "Install additional ssd or hard.",
  choice3: "Change the browser.", // Um ​​...
  choice4: "Delete update file.",
  answer: 3
},
{
  question:
    "What should I do if the hard sector is bad?", // A hard sector with a bed sector is like a time bomb.
  choice1: "Hard information should be backed up and the hard disk separated and discarded.", // To back up the data and prevent data recovery, the hard disk should be destroyed with a magnet.
  choice2: "Install 3dmark on the hard", // independent of the bed sector
  choice3: "Hard performance has been upgraded, so install Windows.", // Windows will fly soon.
  choice4: "put all data on hard", // contribute to data loss
  answer: 1
},
{
  question:
    "What should I do when my computer slows down?",
  choice1: "Graphic card upgrade",
  choice2: "format os", // When os is slow, caching in the repository slows down, so you need to format it.
  choice3: "Upgrade WiFi router",
  choice4: "Install more programs",
  answer: 2
},
{
  question:
    "What can not happen when the power capacity (W) is insufficient?",
  choice1: "Power explosion",
  choice2: "abnormal drive",
  choice3: "damage of parts",
  choice4: "The clock of RAM rises", // If the power capacity is insufficient, it will have an overall adverse effect on the computer.
  answer: 4
},
{
  question:
    "What is not appropriate to use a computer?",
  choice1: "Crack file sharing", // Crack is illegal.
  choice2: "program development",
  choice3: "Gaming", // desirable ^^
  choice4: "office",
  answer: 1
},
{
  question:
    "Which is not a company that sells cpu?",
  choice1: "Intel",
  choice2: "mediatech", // mobile cpu manufacturer
  choice3: "amd",
  choice4: "asus", // Mainboard manufacturer
  answer: 4
},
{
  question: "What if I don't have a cpu fan?",
  choice1: "The temperature of the ram is dropping", // The heat of cpu may increase the temperature of the ram
  choice2: "The temperature of the cpu rises", // can not take out the heat because there is no fan
  choice3: "Hard usage increases", // independent of cpu fan
  choice4: "Power consumption is reduced", //?
  answer: 2
},
{
  question:
    "What software is basically needed to run the computer itself?",
  choice1: "operating system",
  choice2: "adobe Premier Pro", // os available
  choice3: "office", // os must be used
  choice4: "Hancom", // os must be used
  answer: 1
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
