import Notiflix from 'notiflix';

function createPromise(position, delay) {
	return new Promise((resolve, reject) => {
		const shouldResolve = Math.random() > 0.3;

		setTimeout(() => {
			if (shouldResolve) {
				resolve({position, delay});
			} else {
				reject({position, delay});
			}
		}, delay);
	});
}

document.getElementById('submit-button').addEventListener('click', click => {
	console.log('Button clicked!');
	click.preventDefault();

	const delay = parseInt(document.querySelector('input[name="delay"]').value, 10);
	const step = parseInt(document.querySelector('input[name="step"]').value, 10);
	const amount = parseInt(document.querySelector('input[name="amount"]').value, 10);

	for (let i = 1; i <= amount; i++) {
    const position = i;
    const totalDelay = delay + (i - 1) * step;

    createPromise(position, totalDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.info(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({position, delay}) => {
				Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
			});
	}
});