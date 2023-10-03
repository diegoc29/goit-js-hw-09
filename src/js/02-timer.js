import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";


const fechaObjetivo = new Date(2023, 8, 30, 12, 0, 0);

const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const dateTimePicker = document.getElementById("datetime-picker");

let countdownInterval;


function convertMs(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    return {
        days: days % 24,
        hours: hours % 60,
        minutes: minutes % 60,
        seconds: seconds % 60,
    };
}


function actualizarTemporizador() {
    const ahora = new Date();
    const diferencia = fechaObjetivo - ahora;

    if (diferencia <= 0) {
        daysElement.textContent = '00';
        hoursElement.textContent = '00';
        minutesElement.textContent = '00';
        secondsElement.textContent = '00';
        clearInterval(countdownInterval);
    } else {
        const timeParts = convertMs(diferencia);
        daysElement.textContent = ('0' + timeParts.days).slice(-2);
        hoursElement.textContent = ('0' + timeParts.hours).slice(-2);
        minutesElement.textContent = ('0' + timeParts.minutes).slice(-2);
        secondsElement.textContent = ('0' + timeParts.seconds).slice(-2);
    }
}


flatpickr(dateTimePicker, {
    enableTime: true,
    time_24hr: true,
    minuteIncrement: 1,
    onClose: function (selectedDates) {
        const selectedDate = selectedDates[0];
        const currentDate = new Date();

        if (selectedDate <= currentDate) {
            Notiflix.Notify.failure('28-08-09');
        } else {
            fechaObjetivo = selectedDate;
            clearInterval(countdownInterval);
            countdownInterval = setInterval(actualizarTemporizador, 1000);
        }
    }
});

document.querySelector('[data-start]').addEventListener("click", function () {
    clearInterval(countdownInterval);
    countdownInterval = setInterval(actualizarTemporizador, 1000);
});


Notiflix.Notify.init({position: "bottom-right" });


actualizarTemporizador();