import Notiflix from "notiflix";

function createPromise(position, delay) {
  return new Promise ((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({position, delay});
      } else {
       reject({position, delay});
      }
    }, delay);
  });
}


function showSuccessNotification(position, delay) {
  Notiflix.Notify.Success('✅ Fulfilled promise ${position} in ${delay}ms');
}

function showErrorNotification(position, delay) {
  Notiflix.Notify.Failure('❌ Rejected promise ${position} in ${delay}ms');


createPromise(2, 1500)
.then(({position, delay}) => {
  console.log('✅ Fulfilled promise ${position} in ${delay}ms');
})
.catch(({position, delay}) =>{
  console.log('❌ Rejected promise ${position} in ${delay}ms');
});