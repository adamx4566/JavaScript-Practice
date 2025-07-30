 let score = JSON.parse(localStorage.getItem('score')) || {
          wins: 0,
          losses: 0,
          ties: 0
        };

        document.querySelector('.js-score').innerHTML = 
        `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.  ties}`;

      /*
      if(!score) {
        score = {
          wins: 0,
          losses: 0,
          ties: 0
        }
      }
      */

      let isAutoPlaying = false;
      let intervalId;
      
      // const autoPlay = () => {

      // };
      function autoPlay() {
        if(!isAutoPlaying) {
          intervalId = setInterval(() => {
          const playerMove = pickComputerMove();
          playGame(playerMove);
           }, 1000)
           isAutoPlaying = true;
          } else {
            clearInterval(intervalId)
            isAutoPlaying = false;
          }  
        }

        const autoPlayButtonElement = document.querySelector('.js-auto-play-button');

        autoPlayButtonElement.addEventListener('click', () => {
          autoPlay();
           if(isAutoPlaying === true) {
          autoPlayButtonElement.innerText = 'Stop Playing'
           } else if(isAutoPlaying === false){
            autoPlayButtonElement.innerText = 'Auto Play';
           }
        })

        document.body.addEventListener('keydown', (event) => {
          if (event.key === 'a') {
            autoPlay();
            if (isAutoPlaying) {
              autoPlayButtonElement.innerText = 'Stop Playing';
            } else {
              autoPlayButtonElement.innerText = 'Auto Play';
            }
          }
        });

        document.querySelector('.js-rock-button').addEventListener('click', () => {
          playGame('rock');
        })

        document.querySelector('.js-paper-button').addEventListener('click', () => {
        playGame('paper');
        })

        document.querySelector('.js-scissors-button').addEventListener('click', () => {
        playGame('scissors');
        })

        document.body.addEventListener('keydown', (event) => {
          if(event.key === 'r') {
            playGame('rock');
          } else if (event.key === 'p') {
            playGame('paper');
          } else if (event.key === 's') {
            playGame('scissors');
          }
        })

      function playGame(playerMove) {
        const computerMove = pickComputerMove();

        let result = '';

        if (playerMove === 'scissors') {
          if (computerMove === 'rock') {
            result = 'You lose.';
          } else if (computerMove === 'paper') {
            result = 'You win.';
          } else if (computerMove === 'scissors') {
            result = 'Tie.';
          }

        } else if (playerMove === 'paper') {
          if (computerMove === 'rock') {
            result = 'You win.';
          } else if (computerMove === 'paper') {
            result = 'Tie.';
          } else if (computerMove === 'scissors') {
            result = 'You lose.';
          }
          
        } else if (playerMove === 'rock') {
          if (computerMove === 'rock') {
            result = 'Tie.';
          } else if (computerMove === 'paper') {
            result = 'You lose.';
          } else if (computerMove === 'scissors') {
            result = 'You win.';
          }
        }

        if(result === 'You win.') {
          score.wins += 1;
        } else if (result === 'You lose.') {
          score.losses += 1;
        } else if (result === 'Tie.') {
          score.ties += 1;
        }

        localStorage.setItem('score', JSON.stringify(score));

        updateScoreElement();

        document.querySelector('.js-result').innerHTML = `${result}`
        document.querySelector(`.js-moves`).innerHTML = `You <img class="move-icon" src="/images/${playerMove}-emoji.png">
    <img class="move-icon" src="/images/${computerMove}-emoji.png"> Computer`;

      }

      function updateScoreElement() {
        document.querySelector('.js-score').innerHTML = 
        `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.  ties}`;
      }

      function pickComputerMove() {
        const randomNumber = Math.random();

        let computerMove = '';

        if (randomNumber >= 0 && randomNumber < 1 / 3) {
          computerMove = 'rock';
        } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
          computerMove = 'paper';
        } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
          computerMove = 'scissors';
        }

        return computerMove;
      }

      const resetScoreButtonElement = document.querySelector('.js-reset-score-button');

      const resetScoreTextElement = document.querySelector('.js-reset-text');

      resetScoreButtonElement.addEventListener('click', () => {
          const html = `<p>Are you sure you want to reset the score? <button class="reset-button-approval js-yes">Yes</button><button class="reset-button-approval js-no">No</button></p> `;
          resetScoreTextElement.innerHTML = html;
          const yesButtonElement = document.querySelector('.js-yes');
          const noButtonElement = document.querySelector('.js-no');
          yesButtonElement.addEventListener('click', () => {
          resetScoreTextElement.innerHTML = html;
          score.wins = 0;
          score.losses = 0;
          score.ties = 0;
          localStorage.removeItem('score');
          updateScoreElement();
          resetScoreTextElement.innerHTML = '';
          })
          noButtonElement.addEventListener('click', () => {
            resetScoreTextElement.innerHTML = '';
          } )
      })

      document.body.addEventListener('keydown', (event) => {
        if(event.key === 'Backspace') {
           const html = `<p>Are you sure you want to reset the score? <button class="reset-button-approval js-yes">Yes</button><button class="reset-button-approval js-no">No</button></p> `;
          resetScoreTextElement.innerHTML = html;
          const yesButtonElement = document.querySelector('.js-yes');
          const noButtonElement = document.querySelector('.js-no');
          yesButtonElement.addEventListener('click', () => {
          resetScoreTextElement.innerHTML = html;
          score.wins = 0;
          score.losses = 0;
          score.ties = 0;
          localStorage.removeItem('score');
          updateScoreElement();
          resetScoreTextElement.innerHTML = '';
          })
          noButtonElement.addEventListener('click', () => {
            resetScoreTextElement.innerHTML = '';
          } )
        }
      })