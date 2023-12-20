/**
 * C = Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */
(() => {
    'use strict';

    let deck = [];
    const types = ['C', 'D', 'H', 'S'],
          specials = ['A', 'J', 'Q', 'K'];
          
    // let playerPoints = 0,
    //     computerPoints = 0;
    let playerPoints = [];

    //HTML References
    const btnNew = document.querySelector('#btnNew'),
          btnHit = document.querySelector('#btnHit'),
          btnStand = document.querySelector('#btnStand');

    const divPlayerCards = document.querySelectorAll('.playerCards'),
          pointsHTML = document.querySelectorAll('span');

    const initGame = (totalPlayers = 2) => {
        deck = createDeck();
        for (let i = 0; i < totalPlayers; i++) {
            playerPoints.push(0);
        }
        console.log({playerPoints});
    };

    const createDeck = () => {
        deck = [];

        for (let i = 2; i <= 10; i++) {
            for (let type of types) {
                deck.push(i + type);
            }
        }

        for (let type of types) {
            for (let special of specials) {
                deck.push(special + type);
            }
        }

        return _.shuffle(deck);
    };

    const hit = () => {
        if (deck.length === 0) {
            throw 'Deck is empty';
        }

        return deck.pop();
    };

    const valueCard = (card) => {
        const value = card.substring(0, card.length - 1);
        let points = 0;
        
        return (isNaN(value)) ? points = (value === 'A') ? 11 : 10 : points = value * 1;    
    };


    const acumulatePoints = (turn, card) => {
        playerPoints[turn] = playerPoints[turn] + valueCard(card);
        pointsHTML[turn].innerHTML = playerPoints[turn];
        return playerPoints[turn];
    }

    const createCard = (card, turn) => {
        const imgCard = document.createElement('img');
        imgCard.src = `assets/cards/${card}.png`;
        imgCard.classList.add('cards');
        divPlayerCards[turn].append(imgCard);
    }
    
    const computerShift = (minPoints, maxPoints) => {
        let computerPoints = 0;
        do {
            const card = hit();
            computerPoints = acumulatePoints(playerPoints.length - 1, card);
            
            createCard(card, playerPoints.length - 1);

            if( computerPoints > maxPoints )
                break;
        } while( (minPoints > computerPoints) && (minPoints <= maxPoints) );

        setTimeout(() => {
            (computerPoints === minPoints) ? alert('Draw!') : (computerPoints > maxPoints) ? alert('You won!') : alert('You lost!');
        }, 100);
    }

    //Events
    btnHit.addEventListener('click', () => {
        const card = hit();
        const playerPoints = acumulatePoints(0, card);

        createCard(card, 0);

        if (playerPoints > 21) {
            btnHit.disabled = true;
            btnStand.disabled = true;
            computerShift(playerPoints, 21);
        } else if (playerPoints === 21) {
            btnHit.disabled = true;
            btnStand.disabled = true;
            computerShift(playerPoints, 21);
        }
    });

    btnStand.addEventListener('click', () => {
        if(playerPoints === 0){
            alert('debes jugar primero');
        }else{
        btnHit.disabled = true;
        btnStand.disabled = true;
        computerShift(playerPoints, 21);
        }
    });

    btnNew.addEventListener('click', () => {
        initGame();
    });
})();
