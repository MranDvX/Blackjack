/**
 * C = Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

let deck = [];
const types = ['C', 'D', 'H', 'S'];
const specials = ['A', 'J', 'Q', 'K'];
let playerPoints = 0,
    computerPoints = 0;

//HTML References
const btnHit = document.querySelector('#btnHit');
const divPlayerCards = document.querySelector('#player-cards');
const divComputerCards = document.querySelector('#computer-cards');
const pointsHTML = document.querySelectorAll('small');

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
}

//Events
btnHit.addEventListener('click', () => {
    const card = hit();

    playerPoints += valueCard(card);
    pointsHTML[0].innerHTML = playerPoints;
    divPlayerCards.innerHTML += `<img src="assets/cards/${card}.png" class="cards">`;

    if (playerPoints > 21) {
        console.warn('You lost');
        btnHit.disabled = true;
        computerShift(playerPoints, 21);
    } else if (playerPoints === 21) {
        console.warn('21, great!');
        btnHit.disabled = true;
        computerShift(playerPoints, 21);
    }
});