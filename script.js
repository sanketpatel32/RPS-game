let bottomDiv = document.getElementById('bottom');
let newDiv = document.getElementById('result');
let pcScore = 'pcScore';
let userScore = 'userScore';
let rockBorderColor = '#006177';
let scissorBorderColor = '#b000a7';
let paperBorderColor = '#ed8d2c';
let pcCircle = document.getElementById('pcCircle');
let userCircle = document.getElementById('userCircle');
let imgRockElement = document.createElement('img');
imgRockElement.src = './assests/rock.png';
let imgPaperElement = document.createElement('img');
imgPaperElement.src = './assests/paper.png';
let imgScissorElement = document.createElement('img');
imgScissorElement.src = './assests/scissor.png';
let loseWinText = document.getElementById('loss-win');
let against = document.getElementById('against');
let buttonResult = document.getElementById('button-result');
let mainDiv = document.getElementById('main');
let nextDiv = document.getElementById('next');
let footerDiv = document.getElementById('footer');
let finalResult = document.getElementById('final-result');
let closeButton = document.getElementById('rules-tab');

let divhide = () => {
   bottomDiv.style.display = 'none';
   newDiv.style.display = 'flex';
   closeButton.style.display = 'none'
   if(localStorage.getItem(pcScore) < localStorage.getItem(userScore))
   {nextDiv.style.display = 'flex';}
};
let divhide2 = () => {
   bottomDiv.style.display = 'contents';
   newDiv.style.display = 'none';
   nextDiv.style.display = 'none';
   pcCircle.classList.remove('last-circle')
   userCircle.classList.remove('last-circle')
   closeButton.style.display = 'none'
};

let divhide3 = () => {
   mainDiv.style.display = 'contents';
   finalResult.style.display = 'none';
   closeButton.style.display = 'none'
   divhide2();
}
let divhide4 = () => {
   mainDiv.style.display = 'none';
   finalResult.style.display = 'contents';
   closeButton.style.display = 'none'
}
let divhide5 = () => {
   if (closeButton.style.display === 'flex')
      closeButton.style.display = 'none'
   else {
      closeButton.style.display = 'flex'
   }
}
// If you want you want to initialize it with zero
// localStorage.setItem(userScore, 0);
// localStorage.setItem(pcScore, 0);


// generate Computer's decision
let computerPlay = () => {
   let randomNumber = Math.floor(Math.random() * 3);
   switch (randomNumber) {
      case 0:
         return 'rock';
      case 1:
         return 'paper';
      case 2:
         return 'scissors';
   }
}

//--- Function to update counter ---

let getCounter = (counter) => {
   return parseInt(localStorage.getItem(counter)) || 0;
}

let updateCounter = (counter, value) => {
   localStorage.setItem(counter, value);
}

let displayCounter = (counter) => {
   document.getElementById(counter).innerText = getCounter(counter);
}

let incrementCounter = (counter) => {
   let score = getCounter(counter);
   score++;
   updateCounter(counter, score);
   displayCounter(counter);
}
// --- updating ends here ---

displayCounter(pcScore);
displayCounter(userScore);
// -- upadting pre-html

// Function to append images to circles
let appendImageToCircle = (circleElement, imgElement) => {
   circleElement.innerHTML = '';
   circleElement.appendChild(imgElement);
};

// Function to update border color and append image to circle
let borderChange = (circle, decide) => {
   if (decide === 'rock') {
      circle.style.borderColor = rockBorderColor;
      appendImageToCircle(circle, imgRockElement.cloneNode(true));
   } else if (decide === 'scissors') {
      circle.style.borderColor = scissorBorderColor;
      appendImageToCircle(circle, imgScissorElement.cloneNode(true));
   } else {
      circle.style.borderColor = paperBorderColor;
      appendImageToCircle(circle, imgPaperElement.cloneNode(true));
   }
};

//decides who is gonna win!!!
let playRound = (playerSelection) => {
   let computerSelection = computerPlay();
   borderChange(pcCircle, computerSelection);
   borderChange(userCircle, playerSelection);
   console.log(playerSelection, computerSelection);
   if (
      (playerSelection === 'rock' && computerSelection === 'scissors') ||
      (playerSelection === 'paper' && computerSelection === 'rock') ||
      (playerSelection === 'scissors' && computerSelection === 'paper')
   ) {
      loseWinText.innerHTML = 'YOU WIN'
      against.innerHTML = 'AGAINST PC'
      userCircle.classList.add('last-circle')
      incrementCounter(userScore)
      buttonResult.innerHTML = 'PLAY AGAIN'
      console.log('You win, But only this time')
   } else if (playerSelection === computerSelection) {
      loseWinText.innerHTML = 'TIE UP'
      against.innerHTML = ''
      buttonResult.innerHTML = 'REPLAY'
      console.log('Tieee')
   } else {
      loseWinText.innerHTML = 'YOU LOST'
      against.innerHTML = 'AGAINST PC'
      pcCircle.classList.add('last-circle')
      buttonResult.innerHTML = 'PLAY AGAIN'
      incrementCounter(pcScore)
      console.log('You Loser, Looser')
   }
}


// mainDiv.style.display = 'none';