import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

const datetimePicker = document.getElementById("datetime-picker");
const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

let countdownInterval;


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

flatpickr(datetimePicker, options);


startButton.addEventListener("click", function () {
  clearInterval(countdownInterval);

  const selectedDate = flatpickr.parseDate(datetimePicker.value, "Y-m-d H:i");
  const now = new Date();
  
  if (selectedDate <= now) {
    Notiflix.Notify.failure('Please choose a date in the future');
  } else {
    countdownInterval = setInterval(function () {
      const now = new Date();
      const difference = selectedDate - now;

      if (difference <= 0) {
        clearInterval(countdownInterval);
        actualizarTemporizador(0, 0, 0, 0);
      } else {
        const timeParts = convertMs(difference);
        actualizarTemporizador(
          timeParts.days,
          timeParts.hours,
          timeParts.minutes,
          timeParts.seconds
        );
      }
    }, 1000);
  }
});


function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}


function actualizarTemporizador(days, hours, minutes, seconds) {
  daysElement.textContent = addLeadingZero(days);
  hoursElement.textContent = addLeadingZero(hours);
  minutesElement.textContent = addLeadingZero(minutes);
  secondsElement.textContent = addLeadingZero(seconds);
}


function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}


Notiflix.Notify.init({ position: "bottom-right" });