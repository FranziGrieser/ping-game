

var scores, roundScore, activePlayer, gamePlaying;
init();

var previousDice;
// var winningScore = document.querySelector('.score').value

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        var diceDOM = document.querySelector('.dice');
        var dice = Math.floor(Math.random() * 6) + 1;
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        if (dice === 6 && previousDice === 6) {
          scores[activePlayer] = 0;
          document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
          nextPlayer();
        } else if (dice !== 1) {
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
        previousDice = dice;
    }
});


document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        scores[activePlayer] += roundScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var initScore = document.querySelector('.score').value
        var winningScore;
        if (initScore) {
          winningScore = initScore;
        } else {
          winningScore = 100;
        }

        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false
        } else {
            nextPlayer();
        }
    }
});

function nextPlayer() {
    activePlayer  === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    gamePlaying = true;
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}


/*

3. Add another dice to the game, so that there are two dices now. The player
looses the current score when one of them is a 1. (Hint: you need some
CSS to position the second one - have a look at the first one.)
*/
