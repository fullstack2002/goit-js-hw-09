import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
/* ===== ===== ===== ===== ===== */
const startBtn = document.querySelector('[data-start]');

const timer = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

startBtn.disabled = true;

let targetDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      Notiflix.Notify.warning('Please choose a date in the future');
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
      targetDate = selectedDates[0];
    }
  },
};

flatpickr(document.querySelector('#datetime-picker'), options);

startBtn.addEventListener('click', () => {
  let interval = targetDate - Date.now();
  startBtn.disabled = true;

  const timerId = setInterval(() => {
    interval -= 1000;
    if (interval <= 0) {
      clearInterval(timerId);
    } else {
      timer.days.textContent = addLeadingZero(convertMs(interval).days);
      timer.hours.textContent = addLeadingZero(convertMs(interval).hours);
      timer.minutes.textContent = addLeadingZero(convertMs(interval).minutes);
      timer.seconds.textContent = addLeadingZero(convertMs(interval).seconds);
    }
  }, 1000);
});

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}