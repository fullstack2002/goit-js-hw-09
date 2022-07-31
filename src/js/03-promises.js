function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) resolve({ position, delay });
      else reject({ position, delay });
    }, delay);
  });
}
import Notiflix from 'notiflix';

const form = document.querySelector('.form');

const handleSubmit = event => {
  event.preventDefault();

  const {
    elements: { delay, step, amount },
  } = event.currentTarget;

  for (let i = 0; i < amount.value; i++) {
    createPromise(i + 1, +delay.value + i * step.value)
      .then(result =>
        Notiflix.Notify.success(`Fulfilled promise ${result.position} in ${result.delay}ms`),
      )
      .catch(error =>
        Notiflix.Notify.failure(`Rejected promise ${error.position} in ${error.delay}ms`),
      );
  }
};

form.addEventListener('submit', handleSubmit);
