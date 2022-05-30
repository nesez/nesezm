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
    question: "다음중에 인텔의 cpu가 아닌것은?",
    choice1: "xeon e3 1230 v2 ",//인텔제온
    choice2: "i7 9700k",//인텔 i7
    choice3: "atom z3740",//인텔 아톰
    choice4: "ryzen 3900x",//amd 라이젠
    answer: 4
  },
  {
    question:
      "다음 중에 클럭이 제일 높은 램은?",
    choice1: "ddr3 1333",//1333mhz
    choice2: "ddr4 2666",//2666mhz
    choice3: "ddr4 3200",//3200mhz
    choice4: "ddr2 133 ",//133mhz
    answer: 3
  },
  {
    question:
      "아래 메인보드 중에 가장 상위제품인 모델은?(6-7세대)",
    choice1: "z370",//z>b>h
    choice2: "h110",//z>b>h
    choice3: "b150",//z>b>h
    choice4: "b250",//z>b>h
    answer: 1
  },
  {
    question:
      "프리도스는 무엇을 의미하나요?",
    choice1: "os가 깔려있지 않기에 사용자가 os를 설치해야함",//프리도스
    choice2: "원가절감을 위해 pc의 구성부품이 빠져있음",//원가절감
    choice3: "팬이 존재하지 않아 저소음임",//팬리스
    choice4: "cpu의 클럭이 1ghz로 다운클럭됨",//다운클럭
    answer: 1
  },
  {
    question: "다음 중 속도가 가장 빠른 저장장치는?",
    choice1: "7200rpm hdd",//일반 하드
    choice2: "5400rpm hdd",//노트북 하드
    choice3: "nvme m.2 ssd",//PCIe 3.0 4레인의 대역폭에 해당하는 32Gb/s(4GB/s)
    choice4: "sata3 ssd",//최대 600MB/s의 SATA 6Gbps 
    answer: 3
  },
 
  {
    question:
      "파워를 구매할때 구매를 자제해야하는 제품은?",
    choice1: "천궁", //폭-발
    choice2: "fsp",//안정적인 파워
    choice3: "시소닉",//안정적인 파워
    choice4: "evga",//안정적인 파워
    answer: 1
  },
  {
    question:
      "다음 중 적절한 행동을 고르시오",
    choice1: "부품을 교체할때 전기가 흐르게한다.", //감전 위험
    choice2: "m.2 ssd를 sata3 소켓에 장착하고자 노력한다",//장착불가
    choice3: "cpu팬이 돌때 온도를 직접 느끼기위해서 cpu쿨러에 손가락을 넣는다.",//매우 위험
    choice4: "컴퓨터의 전선을 아름답게 정리한다",
    answer: 4
  },
  {
    question:
      "공식적으로 오버클럭이 불가능한 제품은?",
    choice1: "i5 3570k",//k버전 가능
    choice2: "ryzen 3700x",//라이젠 가능
    choice3: "i9 9900k",//k버전가능
    choice4: "i7 7700",//non-k 공식적으로는 불가
    answer: 4
  },
  {
    question:
      "보기중에서 호환되지 않는 한 개를 고르시오",
    choice1: "z370",//8-9세대
    choice2: "i5 9600k",//9세대 i5
    choice3: "ddr3 8gb*2",//ddr4가 호환됨
    choice4: "10년된 sata 하드",//sata지원시 가능
    answer: 3
  },
  {
    question:
      "가장 빠른 속도의 usb는?",
    choice1: "usb 2.0",//480mbps
    choice2: "usb 3.0",//5gbps
    choice3: "usb 3.1",//10gbps
    choice4: "usb 1.0",//1.5mbps
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
