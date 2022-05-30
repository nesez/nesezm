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
    question: "Which is not the keyboard axis?",
    choice1: "heavy",
    choice2: "accumulate",
    choice3: "each axis", // ???
    choice4: "optical axis",
    answer: 3
  },
  {
    question:
      "Which bottleneck does not happen?",
    choice1: "i3 530-titan x", // bottleneck
    choice2: "i5 9600kf-rtx2070", // ideal combination
    choice3: "q6600-gtx1080ti", // bottleneck
    choice4: "pentium g840-radeon VII", // bottleneck
    answer: 2
  },
  {
    question:
      "How many generations of sockets is the lga 1150 from Intel?",
    choice1: "3rd generation",
    choice2: "4th generation", // lga 1150 is 4th generation
    choice3: "6th generation",
    choice4: "8th generation",
    answer: 2
  },
  
  {
    question: "What is the color of the usb a type port?",
    choice1: "usb 1.0", // white
    choice2: "usb 2.0", // black
    choice3: "usb 3.0", // blue
    choice4: "usb 3.1", // green, red
    answer: 3
  },
  {
    question: "What's not true about mac os?",
    choice1: "Virus does not get caught", // mac can get a virus too
    choice2: "You can run Windows with dootcamp.", // A program that supports the operating environment of Microsoft Windows on Mac.
    choice3: "There is a Mac App Store.", // It is a Mac App Store.
    choice4: "I have a safari browser.", // This is the web browser built into macOS
    answer: 1
  },
 
  {
    question:
      "Which os are not open source?",
    choice1: "Ubuntu", // Linux based
    choice2: "Windows", // not open source
    choice3: "Fedora", // Linux based
    choice4: "Linux", // Linux
    answer: 2
  },
  {
    question:
      "What is wrong with this?",
    choice1: "Put various vaccines on your computer", /// The more vaccines you have, the more frequent the vaccine crashes, causing performance degradation.
    choice2: "Use two os as a dual boot",
    choice3: "Listen to multiple speakers to listen to music",
    choice4: "Replace computer power with stable power",
    answer: 1
  },
  {
    question:
      "Why doesn't Microsoft recommend using Windows 7?",
    choice1: "Security update is not possible because support has ended", // The support end date for Windows 7 was January 14, 2020.
    choice2: "The design of Windows 7 has a retro feel compared to Windows 10", /// ????
    choice3: "Windows 7 requires Explorer", //
    choice4: "Windows 7 only supports 2 gigabytes of RAM", // ????
    answer: 1
  },
  {
    question:
      "Choose one that is not compatible while viewing",
    choice1: "b360", // Intel lga1151v2 board
    choice2: "ryzen 3600", // gen2
    choice3: "ddr4 8gb * 2", // compatible
    choice4: "10 years old hard", // compatible
    answer: 1
  },
  {
    question:
      "What are not the disadvantages of using free vpn?",
    choice1: "Too good security policy.", // ???
    choice2: "Personal information can be seized", // disadvantages of free vpn
    choice3: "Data usage limit", // cons of free vpn
    choice4: "Number of servers limited", // disadvantages of free vpn
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
