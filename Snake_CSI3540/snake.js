let canvas, ctx;
let snake = [{ x: 10, y: 10 }];
let apples = [];
let direction = 'right';
let tileSize = 20;
let gameInterval;
let menu;
let score = 0;
let highestScore = 0;

function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
  }
  


window.addEventListener('DOMContentLoaded', (event) => {
  canvas = document.getElementById('gameCanvas');
  ctx = canvas.getContext('2d');
  menu = document.getElementById('menu');
});
  
function startGame() {
  clearCanvas();
  initGame();
  menu.style.display = 'none';
  document.addEventListener('keydown', changeDirection);
  gameInterval = setInterval(gameLoop, 100);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function initGame() {
  snake = [{ x: 10, y: 10 }];
  apples = [];
  for (let i = 0; i < parseInt(document.getElementById('appleNumber').value); i++) {
    placeApple();
  }
  updateScore(0);
}

function gameLoop() {
  moveSnake();
  if (checkCollision()) {
    gameOver();
    return;
  }
  if (snakeEatsApple()) {
    eatApple();
    updateScore(1);
  }
  draw();
}

function draw() {
  clearCanvas();
  drawSnake();
  drawApples();
}

function drawSnake() {
  // Draw snake's body segments
  for (let i = 0; i < snake.length; i++) {
    let img = new Image();
    img.src = (i === 0) ? 'head.png' : 'body.png'; 
    ctx.drawImage(img, snake[i].x * tileSize, snake[i].y * tileSize, tileSize, tileSize);
  }
}

function drawApples() {
  // Draw apples
  apples.forEach(apple => {
    let img = new Image();
    img.src = 'apple.png';
    ctx.drawImage(img, apple.x * tileSize, apple.y * tileSize, tileSize, tileSize);
  });
}

function moveSnake() {
  let head = { x: snake[0].x, y: snake[0].y };

  if (direction === 'right') {
    head.x++;
    if (head.x * tileSize >= canvas.width) {
      if (!document.getElementById('borderCheckbox').checked) {
        head.x = 0;
      } else {
        gameOver();
        return;
      }
    }
  } else if (direction === 'left') {
    head.x--;
    if (head.x < 0) {
      if (!document.getElementById('borderCheckbox').checked) {
        head.x = Math.floor(canvas.width / tileSize) - 1;
      } else {
        gameOver();
        return;
      }
    }
  } else if (direction === 'up') {
    head.y--;
    if (head.y < 0) {
      if (!document.getElementById('borderCheckbox').checked) {
        head.y = Math.floor(canvas.height / tileSize) - 1;
      } else {
        gameOver();
        return;
      }
    }
  } else if (direction === 'down') {
    head.y++;
    if (head.y * tileSize >= canvas.height) {
      if (!document.getElementById('borderCheckbox').checked) {
        head.y = 0;
      } else {
        gameOver();
        return;
      }
    }
  }

  snake.unshift(head);
  if (!snakeEatsApple()) {
    snake.pop();
  }
}

function checkCollision() {
  let head = snake[0];
  return (
    head.x < 0 || head.y < 0 ||
    head.x >= canvas.width / tileSize || head.y >= canvas.height / tileSize ||
    snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
  );
}

function snakeEatsApple() {
  return apples.some(apple => apple.x === snake[0].x && apple.y === snake[0].y);
}

function eatApple() {
  apples = apples.filter(apple => apple.x !== snake[0].x || apple.y !== snake[0].y);
  placeApple();
}

function placeApple() {
  let apple = { x: Math.floor(Math.random() * (canvas.width / tileSize)), y: Math.floor(Math.random() * (canvas.height / tileSize)) };
  if (!apples.some(a => a.x === apple.x && a.y === apple.y)) {
    apples.push(apple);
  } else {
    placeApple(); // Try again if the apple is placed on top of the snake
  }
}

function gameOver() {
  clearInterval(gameInterval);
  document.removeEventListener('keydown', changeDirection);
  if (score > highestScore) {
    highestScore = score; // New: Update highest score if needed
    document.getElementById('highScore').innerText = 'Highest Score: ' + highestScore; // New: Display highest score
  }
  alert('Game Over! Your score: ' + score);
  score = 0; // New: Reset score
  showMenu();
}

function showMenu() {
  menu.style.display = 'block';
}

function changeDirection(event) {
  const key = event.key;
  if ((key === 'ArrowUp' || key === 'w') && direction !== 'down') direction = 'up';
  else if ((key === 'ArrowDown' || key === 's') && direction !== 'up') direction = 'down';
  else if ((key === 'ArrowLeft' || key === 'a') && direction !== 'right') direction = 'left';
  else if ((key === 'ArrowRight' || key === 'd') && direction !== 'left') direction = 'right';
}

function updateScore(points) {
  score += points;
  document.getElementById('score').innerText = 'Score: ' + score;
}
