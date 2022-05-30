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
    question: "다음중 게이밍 성능이 가장 좋은 그래픽카드는?",
    choice1: "gtx1660ti",
    choice2: "rtx2070",
    choice3: "Radeon VII",
    choice4: "GeForce GTX 1080",
    answer: 3
  },
  {
    question:
      "이 중에서 fhd 144헤르츠를 사용할 수 없는 케이블은?",
    choice1: "hdmi 1.2",//fhd 60헤르츠까지 지원
    choice2: "dp 1.2",//144hz지원함
    choice3: "dvi 듀얼링크",//144hz지원함
    choice4: "dp1.4",//144hz지원함
    answer: 1
  },
  {
    question:
      "기가인터넷을 지원하지 않는 선은?",
    choice1: "cat.5",//100mbps지원
    choice2: "cat.6",//1gbps
    choice3: "cat.6e",//1gbps
    choice4: "cat.7",//10gbps
    answer: 1
  },
  {
    question:
      "다음중 크기가 제일 작은 메인보드는?",
    choice1: "atx",//305x244mm 
    choice2: "m-atx",//244x244mm 
    choice3: "itx",//170x170mm 
    choice4: "E-ATX",//305 × 330 mm
    answer: 3
  },
  {
    question:
      "다음중 가장 높은 파워 등급은?",
    choice1: "80+ bronze",//85
    choice2: "80+ titanium",//96
    choice3: "80+ platinum",//94
    choice4: "80+ gold",//92
    answer: 2
  },

  {
    question:
      "다음중 내장그래픽이 있는 cpu는?",
    choice1: "i5-9400f",//내장 x
    choice2: "ryzen 3200g",//내장 o
    choice3: "ryzen 3900x",//내장 x
    choice4: "i7-9700kf",//내장 x 
    answer: 2
  },
  {
    question: "다음 중 윈도우 단축키에 대해서 옳지 않은 것을 고르시오",
    choice1: "ctrl+shift+esc를 누르면 작업관리자를 킬 수 있다.",
    choice2: "alt+tab으로 창을 바꿀 수 있다.",
    choice3: "win+W로 검색을 할 수 있다.",//win w는 캡처
    choice4: "윈도우 바탕화면에서 alt+f4와 enter로 컴퓨터를 끌 수 있다.",
    answer: 3
  },
  {
    question:
      "해상도가 일치하지 않는 것은?",
    choice1: "hd-1080x720",//1280X720임
    choice2: "fhd-1920x1080",
    choice3: "2k-2560x1440",
    choice4: "4k-3840x2160",
    answer: 1
  },
  {
    question:
      "pc 구성이 올바르지 않은 것을 고르시오",
    choice1: "i3 8350k + z370 + ddr4 8gb",
    choice2: "ryzen r5 3600 + a320 + ddr4 8gb",
    choice3: "i9 9820X + z370 + ddr4 16gb ", //i9 9820x는 2066소켓
    choice4: "ryzen r7 2700X + B450 + ddr4 16gb",
    answer: 3
  },
  {
    question:
      "다음중 브라우저 엔진이 다른 것은?(2020최신버전기준)",
    choice1: "크롬",//크로미움
    choice2: "오페라",//크로미움
    choice3: "마이크로소프트 엣지",//크로미움
    choice4: "파이어폭스",//게코 레이아웃 엔진
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
