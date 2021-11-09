/*Project based on "Snake" from Ania Kubow: https://github.com/kubowania/Nokia3310-Snake */

document.addEventListener('DOMContentLoaded', () => {
  const squares = document.querySelectorAll('.grid div');
  const scoreDisplay = document.querySelector('span');
  const btnStart = document.querySelector('.start');

  console.log('e');

  const width = 10;
  let index = 0;
  let appleIndex = 0;
  let currentSnake = [2, 1, 0];
  let direction = 1;
  let score = 0;
  let speed = 0.9;
  let intervalTime = 0;
  let interval = 0;

  console.log('e');
  // Start/Restart
  function startGame() {
    console.log('i');
    currentSnake.forEach((i) => squares[i].classList.remove('snake'));
    squares[appleIndex].classList.remove('apple');
    clearInterval(interval);
    score = 0;
    randomApple();
    direction = 1;
    scoreDisplay.innerText = score;
    intervalTime = 1000;
    currentSnake = [2, 1, 0];
    index = 0;
    currentSnake.forEach((i) => squares[i].classList.add('snake'));
    interval = setInterval(moveOutcomes, intervalTime);
  }

  //   Snake behaviour
  function moveOutcomes() {
    // Hit self and borders
    if (
      (currentSnake[0] + width >= width * width && direction === width) ||
      (currentSnake[0] % width === width - 1 && direction === 1) ||
      (currentSnake[0] % width === 0 && direction === -1) ||
      (currentSnake[0] - width < 0 && direction === -width) ||
      squares[currentSnake[0] + direction].classList.contains('snake')
    ) {
      return clearInterval(interval);
    }

    const tail = currentSnake.pop();
    squares[tail].classList.remove('snake');
    currentSnake.unshift(currentSnake[0] + direction);

    // Eating apple
    if (squares[currentSnake[0]].classList.contains('apple')) {
      squares[currentSnake[0]].classList.remove('apple');
      squares[tail].classList.add('snake');
      currentSnake.push(tail);
      score++;
      scoreDisplay.textContent = score;
      intervalTime = intervalTime * speed;
      interval = setTimeout(moveOutcomes, intervalTime);
      randomApple();
    }
    squares[currentSnake[0]].classList.add('snake');
  }

  // Random Apple when one is eaten
  function randomApple() {
    do {
      appleIndex = Math.floor(Math.random() * squares.length);
    } while (squares[appleIndex].classList.contains('snake'));
    squares[appleIndex].classList.add('apple');
  }

  //   Keyboard binding

  function control(e) {
    squares[index].classList.remove('snake');

    if (e.keyCode === 37) {
      direction = -1;
    } else if (e.keyCode === 38) {
      direction = -width;
    } else if (e.keyCode === 39) {
      direction = 1;
    } else if (e.keyCode === 40) {
      direction = +width;
    }
  }

  document.addEventListener('keyup', control);
  btnStart.addEventListener('click', startGame);
});
