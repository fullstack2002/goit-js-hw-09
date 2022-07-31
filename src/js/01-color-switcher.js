const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const changeBackgroundColor = node => {
  node.style.backgroundColor = getRandomHexColor();
};

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  changeBackgroundColor(document.body);
  timerId = setInterval(() => {
    changeBackgroundColor(document.body);
  }, 1000);
});

stopBtn.addEventListener('click', () => {
  startBtn.disabled = false;
  clearInterval(timerId);
});
