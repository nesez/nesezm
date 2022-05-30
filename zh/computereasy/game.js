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
    question: "cpu는 어떤 것을 의미하나요?",
    choice1: "중앙처리장치",
    choice2: "intel core i series",//intel의 cpu제품명
    choice3: "amd ryzen",//amd의 cpu제품명
    choice4: "qualcomm snapdragon",//퀄컴의 cpu제품명
    answer: 1
  },
  {
    question:
      "컴퓨터에서 메인보드가 없다면 어떤 일이 벌어지나요?",
    choice1: "컴퓨터에서 폭발이 일어난다",
    choice2: "메인보드 없이도 cpu와 램과 그래픽카드로만으로도 구동이 가능하다",
    choice3: "컴퓨터가 조립되지 않은 상태일 것이다.",
    choice4: "게임을 충분히 빠르게 돌릴 수 있게 해준다.",//조립자체가 불가
    answer: 3
  },
  {
    question:
      "가장 용량이 큰 저장소는?",
    choice1: "ssd 128gb",//128gb
    choice2: "hdd 1tb",//1024gb
    choice3: "emmc 64gb",//64gb
    choice4: "hdd 10tb",//10240gb
    answer: 4
  },
  {
    question:
      "컴퓨터를 사용하는 올바른 행동은?",
    choice1: "컴퓨터에게 드라이버를 던진다.",//컴퓨터 고장
    choice2: "채굴 프로그램을 다운받아서 컴퓨터에게 열정을 준다.",//수명단축
    choice3: "컴퓨터의 사양에 적절한 프로그램과 게임을 사용한다.",
    choice4: "cpu팬에 손가락을 넣는다.",//손가락과 cpu팬 둘 다 아픔
    answer: 3
  },
  {
    question:
      "컴퓨터에서 사용해야하는 프로그램은?",
    choice1: "불법 복제프로그램",//사용하면 안 됨
    choice2: "정품 프로그램",
    choice3: "윈도우 크랙 키",//바이러스가 있을 수 있고 불법
    choice4: "인터넷에서 다운받은 신뢰도 없는 프로그램",//바이러스가 있을 수 있음
    answer: 2
  },
  {
    question:
      "컴퓨터에서 소리출력을 하는 장비가 아닌것은?",
    choice1: "마우스",//입력장치
    choice2: "헤드셋",
    choice3: "스피커",
    choice4: "이어폰",
    answer: 1
  },
  {
    question:
      "보기에서 가장 빠른 인터넷 속도를 고르시오",
    choice1: "100mb/s",//KB<MB< GB< TB< PB< EB< ZB
    choice2: "1gb/s",//KB<MB< GB< TB< PB< EB< ZB
    choice3: "1000bit/s",//KB<MB< GB< TB< PB< EB< ZB
    choice4: "800kb/s",//KB<MB< GB< TB< PB< EB< ZB
    answer: 2
  },
  {
    question:
      "컴퓨터가 바이러스에 감염되는 원인은?",
    choice1: "윈도우를 깔면 바이러스가 자동으로 깔리기에 바이러스는 무조건 있다.",//말도 안됨
    choice2: "불법적인 프로그램을 다운받아서",
    choice3: "키보드를 뺏다가 껴서",//말도 안됨
    choice4: "모니터를 바꿔서",//말도 안됨
    answer: 2
  },
  {
    question: "가장 속도가 빠른 저장장치를 고르시오",
    choice1: "emmc",//매우 느림
    choice2: "hdd",//회전 속도에 따라다름
    choice3: "sd카드",//느림
    choice4: "nvme ssd",
    answer: 4
  },
  {
    question:
      "컴퓨터의 os가 아닌것은?",
    choice1: "linux", //리누스 토르발르가 만든 컴퓨터 운영 체제
    choice2: "window",//microsoft 
    choice3: "mac os",//마이맥과 맥북에서 사용
    choice4: "galaxy",//os가 아님
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
