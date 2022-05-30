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
    question: "다음중 키보드 축이 아닌것은?",
    choice1: "청축",
    choice2: "적축",
    choice3: "각축",//???
    choice4: "광축",
    answer: 3
  },
  {
    question:
      "다음중 병목이 일어나지 않는 것은?",
    choice1: "i3 530-titan x",//병목
    choice2: "i5 9600kf-rtx2070",//이상적 조합
    choice3: "q6600-gtx1080ti",//병목
    choice4: "pentium g840-radeon VII",//병목
    answer: 2
  },
  {
    question:
      "lga 1150는 인텔의 몇세대의 소켓인가요?",
    choice1: "3세대",
    choice2: "4세대",//lga 1150은 4세대
    choice3: "6세대",
    choice4: "8세대",
    answer: 2
  },
  
  {
    question: "usb a타입 포트색깔이 파란색인 것은?",
    choice1: "usb 1.0",//흰색
    choice2: "usb 2.0",//검은색
    choice3: "usb 3.0",//파란색
    choice4: "usb 3.1",//초록,빨간색
    answer: 3
  },
  {
    question: "mac os관련해 사실이 아닌것은?",
    choice1: "바이러스가 걸리지 않는다.",//mac도 바이러스가 걸릴 수 있음
    choice2: "dootcamp로 윈도우를 구동할 수 있다.",//Mac에서 Microsoft Windows의 구동 환경을 지원해 주는 프로그램
    choice3: "맥 앱스토어가 있다.",//맥용 앱스토어다
    choice4: "사파리 브라우저가 있다.",//macOS에 기본 탑재된 웹 브라우저이다
    answer: 1
  },
 
  {
    question:
      "다음중 오픈 소스가 아닌 os는?",
    choice1: "우분투",//리눅스 기반
    choice2: "윈도우",//오픈 소스가 아님
    choice3: "페도라",//리눅스 기반
    choice4: "리눅스",//리눅스
    answer: 2
  },
  {
    question:
      "이 중에서 잘못된 행동은?",
    choice1: "컴퓨터에 여러 가지 백신을 깔음",//백신이 많을 수록 백신의 충돌이 잦아져 성능저하를 야기합니다.
    choice2: "듀얼부팅으로 두가지의 os를 활용",
    choice3: "스피커를 여러개를 달아서 음악을 청취",
    choice4: "컴퓨터 파워를 안정적인 파워로 교체",
    answer: 1
  },
  {
    question:
      "마이크로소프트가 윈도우 7 사용을 권장하지 않는 이유는?",
    choice1: "지원이 종료되어 보안업데이트가 불가능함",//Windows 7의 지원 종료일은 2020년 1월 14일이었습니다.
    choice2: "윈도우 7의 디자인이 윈도우 10에 비해 레트로 느낌을 가지고 있음",//????
    choice3: "윈도우 7에서는 익스플로러를 사용해야함",//????
    choice4: "윈도우 7은 램을 2기가만 지원함",//????
    answer: 1
  },
  {
    question:
      "보기중에서 호환되지 않는 한 개를 고르시오",
    choice1: "b360",//인텔 lga1151v2보드
    choice2: "ryzen 3600",//젠2
    choice3: "ddr4 8gb*2",//호환가능
    choice4: "10년된 하드",//호환가능
    answer: 1
  },
  {
    question:
      "무료 vpn사용의 단점이 아닌것은?",
    choice1: "너무나 훌륭한 보안정책.",//???
    choice2: "개인정보를 탈취할 수 있다.",//무료 vpn의 단점
    choice3: "데이터 사용량 제한",//무료 vpn의 단점
    choice4: "제한된 서버 수",//무료 vpn의 단점
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
