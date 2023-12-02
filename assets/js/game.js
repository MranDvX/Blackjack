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
    let playerPoints = 0,
        computerPoints = 0;

    //HTML References
    const btnNew = document.querySelector('#btnNew'),
          btnHit = document.querySelector('#btnHit'),
          btnStand = document.querySelector('#btnStand');

    const divPlayerCards = document.querySelector('#player-cards'),
          divComputerCards = document.querySelector('#computer-cards'),
          pointsHTML = document.querySelectorAll('span');

    const createDeck = () => {
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

        deck = _.shuffle(deck);
        return deck;
    };

    createDeck();

    const hit = () => {
        if (deck.length === 0) {
            throw 'Deck is empty';
        }

        const card = deck.pop();
        return card;
    };

    const valueCard = (card) => {
        const value = card.substring(0, card.length - 1);
        let points = 0;
        
        return (isNaN(value)) ? points = (value === 'A') ? 11 : 10 : points = value * 1;    
    };

    const computerShift = (minPoints, maxPoints) => {

        do {
            const card = hit();

            computerPoints += valueCard(card);
            pointsHTML[1].innerHTML = computerPoints;
            divComputerCards.innerHTML += `<img src="assets/cards/${card}.png" class="cards">`;
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

        playerPoints += valueCard(card);
        pointsHTML[0].innerHTML = playerPoints;
        divPlayerCards.innerHTML += `<img src="assets/cards/${card}.png" class="cards">`;

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
        deck = [];
        computerPoints = 0;
        playerPoints = 0;

        createDeck();
        pointsHTML[0].innerHTML = playerPoints;
        pointsHTML[1].innerHTML = computerPoints;
        divPlayerCards.innerHTML = `<img class="cards">`;
        divComputerCards.innerHTML = `<img class="cards">`;

        btnHit.disabled = false;
        btnStand.disabled = false;
    });
})();
