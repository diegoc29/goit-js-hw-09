import Notiflix from "notiflix";

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

document.getElementById("promise-form").addEventListener("submit", async function (event) {
  event.preventDefault();

  const formData = new FormData(this);
  const firstDelay = parseInt(formData.get("delay"));
  const step = parseInt(formData.get("step"));
  let amount = parseInt(formData.get("amount"));

  const startButton = document.getElementById("start-button"); // Agregué esta línea para obtener el botón de inicio

  startButton.addEventListener("click", async function () {
    if (amount <= 0) {
      Notiflix.Notify.failure('Amount must be greater than 0');
      return;
    }
  
    for (let i = 0; i < amount; i++) {
      const delay = firstDelay + i * step;
      try {
        const result = await createPromise(i + 1, delay);
        Notiflix.Notify.Success(`✅ Fulfilled promise ${result.position} in ${result.delay}ms`);
      } catch (error) {
        Notiflix.Notify.failure(`❌ Rejected promise ${error.position} in ${error.delay}ms`);
      }
    }
  });
});

Notiflix.Notify.init({ useFontAwesome: true });