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
    question: "ssd에서 1셀에 2비트를 저장하는 것은?",
    choice1: "qlc",//4비트
    choice2: "tlc",//3비트
    choice3: "mlc",//2비트
    choice4: "slc",//1비트
    answer: 3
  },
  {
    question:
      "다음중 AM4소켓을 지원하지 않는 메인보드는?",
    choice1: "x370",//am4
    choice2: "z270",//lga 1151
    choice3: "b350",//am4
    choice4: "b450",//am4
    answer: 2
  },
  {
    question:
      "다음중 가장 해상도가 좋은것은?",
    choice1: "UXGA",//1600 1200
    choice2: "HXGA",//4096 3072 
    choice3: "WSXGA+",//1680 1050
    choice4: "QVGA",//320 240
    answer: 2
  },
  {
    question:
      "다음중 lga1151v2를 지원하지 않는 메인보드는?",
    choice1: "z370",//lga1151v2
    choice2: "b350",//am4
    choice3: "h370",//lga1151v2
    choice4: "h310",//lga1151v2
    answer: 2
  },
  {
    question:
      "다음중 이론상 속도가 제일 빠른것은?",
    choice1: "802.11a",//~54mbps
    choice2: "802.11b",//~11mbps
    choice3: "802.11n",//~150mbps
    choice4: "802.11ac",//~877mbps
    answer: 4
  },
  {
    question:
      "as가 가장 짧은 부품을 구하시오",
    choice1: "intel cpu",//3년
    choice2: "samsung ram",//1.5년 제조일자부터
    choice3: "asus 메인보드",//3년
    choice4: "emtek gpu",//5년
    answer: 2
  },
  {
    question: "다음 중 상대적으로 가장 위험한 오버클럭은?",
    choice1: "cpu 오버클럭",
    choice2: "램 오버클럭",
    choice3: "그래픽 오버클럭",
    choice4: "파워 오버클럭",
    answer: 4
  },
  {
    question:
      "다음중 코어가 제일 많은 제품은?",
    choice1: "쓰레드리퍼 1900X",//8c16t
    choice2: "i9-9820x",//10c20t
    choice3: "제온 e5-2640v4",//10c20t
    choice4: "라이젠 3900x",//12c24t
    answer: 4
  },
  {
    question:
      "방식과 인터페이스의 연결이 옳지 않은것은?",
    choice1: "SATA1 1.5Gb/s",
    choice2: "SATA2 3Gb/s",
    choice3: "SATA3 6Gb/s",
    choice4: "NVMe 12Gb/s",//32Gb/s임
    answer: 4
  },
  {
    question:
      "mac os의 버전이 아닌것은?",
    choice1: "Mac OS X Jaguar",
    choice2: "macOS Mojave",
    choice3: "OS X Yosemite",
    choice4: "macOS Boot Camp",//Mac에서 Microsoft Windows의 구동 환경을 지원해 주는 프로그램
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
