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
      "다음중 화질이 제일 좋은 것은?",
    choice1: "hd",//1280 720
    choice2: "fhd",//1920 1080
    choice3: "2k",//2560 1440
    choice4: "4k",//3840 2160
    answer: 4
  },
  {
    question:
      "마우스 dpi가 가장 높은 것은?",
    choice1: "2800dpi",
    choice2: "4000dpi",
    choice3: "5000dpi",
    choice4: "6000dpi",//큰게 높습니다.
    answer: 4
  },
  {
    question:
      "컴퓨터의 용량이 없을 경우 해결방안이 아닌것은?",
    choice1: "하드나 ssd의 쓸데없는 프로그램을 지운다.",
    choice2: "ssd나 하드를 추가로 설치한다.",
    choice3: "브라우저를 바꾼다.",//음..
    choice4: "업데이트 파일을 삭제한다.",
    answer: 3
  },
  {
    question:
      "하드가 배드섹터가 났을경우 해야하는 행동은?",//베드섹터가 난 하드는 시한폭탄과 같은 존재이다.
    choice1: "하드의 정보는 백업하고 하드를 분리하여 폐기한다.",//데이터를 백업하고 데이터 복구를 막기 위해 자석같은 것으로 하드를 파괴시켜서 버려야한다.
    choice2: "하드에 3dmark를 설치한다.",//베드섹터와 무관
    choice3: "하드의 성능이 업그레이드 되었으므로 윈도우를 설치한다.",//곧 윈도우가 날라갈 것
    choice4: "하드에 모든 데이터를 넣는다.",//데이터 손실에 이바지
    answer: 1
  },
  {
    question:
      "컴퓨터의 속도가 느려졌을때 해야하는것은?",
    choice1: "그래픽카드 업그레이드",
    choice2: "os 포맷",//os가 느려질때에는 저장소에 캐시같은 것이 속도 저하를 일으키므로 포맷을 해야한다.
    choice3: "와이파이 공유기 업그레이드",
    choice4: "더 많은 프로그램 설치",
    answer: 2
  },
  {
    question:
      "파워의 용량이(W) 부족할때 일어날 수 있는 것이 아닌 것은?",
    choice1: "파워 폭발",
    choice2: "비정상적인 구동",
    choice3: "부품의 손상",
    choice4: "램의 클럭이 상승",//파워 용량이 부족할 경우에 컴퓨터에 전반적인 악영향을 끼칩니다.
    answer: 4
  },
  {
    question:
      "컴퓨터를 사용하는 적절하지 못한 행위는?",
    choice1: "크랙 파일 공유",//크랙은 불법입니다.
    choice2: "프로그램 개발",
    choice3: "게이밍",//바람직합니다^^
    choice4: "사무용",
    answer: 1
  },
  {
    question:
      "다음중 cpu를 판매하는 회사가 아닌것은?",
    choice1: "인텔",
    choice2: "미디어텍",//모바일 cpu제조업체
    choice3: "amd",
    choice4: "asus",//메인보드 제조회사
    answer: 4
  },
  {
    question: "cpu팬이 없다면 어떻게 되나요?",
    choice1: "램의 온도가 하강함",//cpu의 열기가 램의 온도를 일부 상승시킬 수는 있음
    choice2: "cpu의 온도가 상승함",//팬이 없기에 열기를 빼낼 수 없음
    choice3: "하드의 사용량이 늘어남",//cpu팬과 무관함
    choice4: "파워의 전력 사용량이 줄어듬",//?
    answer: 2
  },
  {
    question:
      "컴퓨터 자체를 구동하기 위해 기본적으로 필요한 소프트웨어는?",
    choice1: "operating system",
    choice2: "adobe 프리미어 프로",//os가 있어야 사용가능
    choice3: "office",//os가 있어야 사용가능
    choice4: "한컴",//os가 있어야 사용가능
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
