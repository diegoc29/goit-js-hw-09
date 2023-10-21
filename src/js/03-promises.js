import Notiflix from 'notiflix';


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

  document.querySelector('.form').addEventListener('submit', function (event) {
    event.preventDefault();

  
    const delay = parseInt(this.elements['delay'].value);
    const step = parseInt(this.elements['step'].value);
    const amount = parseInt(this.elements['amount'].value);


    for (let i = 1; i <= amount; i++) {
      const position = i;
      const totalDelay = delay + (i - 1) * step;

       createPromise(position, totalDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.info(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }

  });