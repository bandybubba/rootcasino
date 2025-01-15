const cardImages = {
    // Hearts
    "Ace of Hearts": "assets/a_of_hearts.png",
    "2 of Hearts": "assets/2_of_hearts.png",
    "3 of Hearts": "assets/3_of_hearts.png",
    "4 of Hearts": "assets/4_of_hearts.png",
    "5 of Hearts": "assets/5_of_hearts.png",
    "6 of Hearts": "assets/6_of_hearts.png",
    "7 of Hearts": "assets/7_of_hearts.png",
    "8 of Hearts": "assets/8_of_hearts.png",
    "9 of Hearts": "assets/9_of_hearts.png",
    "10 of Hearts": "assets/10_of_hearts.png",
    "Jack of Hearts": "assets/j_of_hearts.png",
    "Queen of Hearts": "assets/q_of_hearts.png",
    "King of Hearts": "assets/k_of_hearts.png",
    // Clubs
    "Ace of Clubs": "assets/a_of_clubs.png",
    "2 of Clubs": "assets/2_of_clubs.png",
    "3 of Clubs": "assets/3_of_clubs.png",
    "4 of Clubs": "assets/4_of_clubs.png",
    "5 of Clubs": "assets/5_of_clubs.png",
    "6 of Clubs": "assets/6_of_clubs.png",
    "7 of Clubs": "assets/7_of_clubs.png",
    "8 of Clubs": "assets/8_of_clubs.png",
    "9 of Clubs": "assets/9_of_clubs.png",
    "10 of Clubs": "assets/10_of_clubs.png",
    "Jack of Clubs": "assets/j_of_clubs.png",
    "Queen of Clubs": "assets/q_of_clubs.png",
    "King of Clubs": "assets/k_of_clubs.png",
    // Diamonds
    "Ace of Diamonds": "assets/a_of_diamonds.png",
    "2 of Diamonds": "assets/2_of_diamonds.png",
    "3 of Diamonds": "assets/3_of_diamonds.png",
    "4 of Diamonds": "assets/4_of_diamonds.png",
    "5 of Diamonds": "assets/5_of_diamonds.png",
    "6 of Diamonds": "assets/6_of_diamonds.png",
    "7 of Diamonds": "assets/7_of_diamonds.png",
    "8 of Diamonds": "assets/8_of_diamonds.png",
    "9 of Diamonds": "assets/9_of_diamonds.png",
    "10 of Diamonds": "assets/10_of_diamonds.png",
    "Jack of Diamonds": "assets/j_of_diamonds.png",
    "Queen of Diamonds": "assets/q_of_diamonds.png",
    "King of Diamonds": "assets/k_of_diamonds.png",
    // Spades
    "Ace of Spades": "assets/a_of_spades.png",
    "2 of Spades": "assets/2_of_spades.png",
    "3 of Spades": "assets/3_of_spades.png",
    "4 of Spades": "assets/4_of_spades.png",
    "5 of Spades": "assets/5_of_spades.png",
    "6 of Spades": "assets/6_of_spades.png",
    "7 of Spades": "assets/7_of_spades.png",
    "8 of Spades": "assets/8_of_spades.png",
    "9 of Spades": "assets/9_of_spades.png",
    "10 of Spades": "assets/10_of_spades.png",
    "Jack of Spades": "assets/j_of_spades.png",
    "Queen of Spades": "assets/q_of_spades.png",
    "King of Spades": "assets/k_of_spades.png"
};

let deck = [];
let playerHands = [[]];
let dealerHand = [];
let currentHandIndex = 0;
let playerBalance = 100;
let currentBet = 0;
let gameActive = false;

function createDeck() {
    deck = [];
    for (const suit of ["Hearts", "Diamonds", "Clubs", "Spades"]) {
        for (const rank of ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"]) {
            deck.push({ suit, rank });
        }
    }
    deck = shuffle(deck);
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function renderHand(hand) {
    return hand
        .map(card => {
            const cardKey = `${card.rank} of ${card.suit}`;
            const imagePath = cardImages[cardKey] || "assets/card_back.png";
            return `<div class="card" style="background-image: url('${imagePath}');"></div>`;
        })
        .join("");
}

function updateHands(revealDealer = false) {
    const dealerHandDiv = document.getElementById("dealer-hand");

    // Dealer hand logic: reveal only the first card unless explicitly told to reveal the full hand
    dealerHandDiv.innerHTML = renderHand(
        dealerHand.map((card, index) =>
            index === 0 || revealDealer ? card : { rank: "Hidden", suit: "Card" }
        )
    );

    // Player hand logic
    const playerHandDivs = document.querySelectorAll("#player-hands-container .hand");
    playerHandDivs.forEach((div, index) => {
        if (playerHands[index]) {
            div.style.display = "flex";
            div.innerHTML = renderHand(playerHands[index]);

            // Highlight the active hand
            div.style.border = index === currentHandIndex ? "2px solid #c69749" : "none";
        } else {
            div.style.display = "none";
        }
    });
}




function updateStatus(message) {
    const statusElement = document.getElementById("status");
    statusElement.innerText = message;

    // Show the message
    statusElement.classList.add("visible");

    // Hide it after 3 seconds
    setTimeout(() => {
        statusElement.classList.remove("visible");
    }, 3000);
}

function startGame() {
    if (currentBet <= 0) {
        updateStatus("Place a bet to start!");
        return;
    }

    if (gameActive) {
        updateStatus("A game is already in progress!");
        return;
    }

    document.getElementById("confirm-wager").disabled = true; // Disable button
    gameActive = true;

    createDeck();
    playerHands = [[deck.pop(), deck.pop()]];
    dealerHand = [deck.pop(), deck.pop()];
    currentHandIndex = 0;

    updateHands();

    // Dealer Blackjack check (restored)
    const dealerValue = calculateHandValue(dealerHand);
    if (dealerValue === 21) {
        updateHands(true); // Reveal dealer’s full hand
        updateStatus("Dealer has Blackjack! Dealer wins.");
        resetGame();
        return;
    }

    checkPlayerTurn();
}



function checkPlayerTurn() {
    const hand = playerHands[currentHandIndex];
    const value = calculateHandValue(hand);

    if (value > 21) {
        updateStatus(`Hand ${currentHandIndex + 1}: You bust! Dealer wins.`);
        updateHands(true); // Reveal dealer's hand
        resetGame(); // End game immediately
    } else if (value === 21) {
        updateStatus(`Hand ${currentHandIndex + 1}: You hit 21!`);
        playerStand(); // Automatically proceed to next phase
    }
}



function nextHand() {
    if (currentHandIndex < playerHands.length - 1) {
        currentHandIndex++;
        updateStatus(`Playing Hand ${currentHandIndex + 1}`);
        updateHands();
    } else {
        dealerTurn();
    }
}


function dealerTurn() {
    while (calculateHandValue(dealerHand) < 17) {
        dealerHand.push(deck.pop());
    }
    updateHands(true); // Reveal dealer’s full hand
    resolveGame();
}

function resolveGame() {
    updateHands(true); // Reveal dealer’s full hand
    const dealerValue = calculateHandValue(dealerHand);

    playerHands.forEach((hand, index) => {
        const playerValue = calculateHandValue(hand);
        let message = `Hand ${index + 1}: `;

        if (playerValue > 21) {
            message += "You bust! Dealer wins.";
        } else if (dealerValue > 21) {
            playerBalance += currentBet * 2;
            message += "Dealer busts! You win!";
        } else if (playerValue > dealerValue) {
            playerBalance += currentBet * 2;
            message += "You win!";
        } else if (playerValue === dealerValue) {
            playerBalance += currentBet;
            message += "It's a tie!";
        } else {
            message += "Dealer wins.";
        }

        updateStatus(message); // Update status for each hand
    });

    resetGame();
}





function calculateHandValue(hand) {
    let value = hand.reduce((sum, card) => sum + (card.rank === "Ace" ? 11 : isNaN(card.rank) ? 10 : Number(card.rank)), 0);
    let aceCount = hand.filter(card => card.rank === "Ace").length;

    while (value > 21 && aceCount > 0) {
        value -= 10;
        aceCount--;
    }
    return value;
}

function updateUI() {
    document.getElementById("balance").innerText = `Balance: $${playerBalance}`;
    document.getElementById("bet").innerText = `Current Bet: $${currentBet}`;
}

function addChip(amount) {
    if (gameActive) return;

    if (playerBalance >= amount) {
        currentBet += amount;
        playerBalance -= amount;
        updateUI();
    } else {
        updateStatus("Insufficient balance!");
    }
}

function clearBet() {
    if (gameActive) {
        updateStatus("Cannot clear your bet during an active game!");
        return;
    }

    // Refund the current bet to the player's balance
    playerBalance += currentBet;
    currentBet = 0;

    updateStatus("Bet cleared. Place your chips again!");
    updateUI();
}

function confirmWager() {
    startGame();
}


function confirmWager() {
    if (gameActive) {
        updateStatus("A game is already in progress!");
        return;
    }

    startGame();
}


function playerHit() {
    if (!gameActive) return;

    const hand = playerHands[currentHandIndex];
    hand.push(deck.pop());
    updateHands();
    checkPlayerTurn();
}

function playerStand() {
    nextHand();
}

function playerDoubleDown() {
    if (!gameActive || playerHands[currentHandIndex].length > 2) return;

    if (playerBalance >= currentBet) {
        playerBalance -= currentBet;
        currentBet *= 2;
        const hand = playerHands[currentHandIndex];
        hand.push(deck.pop());
        updateHands();
        nextHand();
    } else {
        updateStatus("Insufficient balance to double down!");
    }
}

function playerSplit() {
    if (!gameActive || playerHands.length > 1) {
        updateStatus("Cannot split right now!");
        splitAllowed = false; // Disable further splits
        return;
    }
    

    const hand = playerHands[0];
    if (hand[0].rank !== hand[1].rank) {
        updateStatus("Cards must be the same rank to split!");
        return;
    }

    if (playerBalance < currentBet) {
        updateStatus("Not enough balance to split!");
        return;
    }

    // Deduct a second wager for the split
    playerBalance -= currentBet;

    // Split the hand into two separate hands
    playerHands = [
        [hand[0], deck.pop()],
        [hand[1], deck.pop()]
    ];

    currentHandIndex = 0; // Set active hand to the first hand
    updateActiveHandUI(); // Highlight the active hand
    updateHands();
    updateStatus("Hand split! Play your first hand.");
    updateUI();
}


function resetGame() {
    currentBet = 0;
    gameActive = false;

    // Re-enable the Confirm Wager button
    document.getElementById("confirm-wager").disabled = false;

    // Reset status message if no result is displayed
    const currentStatus = document.getElementById("status").innerText;
    if (!currentStatus.includes("You win") &&
        !currentStatus.includes("Dealer wins") &&
        !currentStatus.includes("It's a tie") &&
        !currentStatus.includes("You bust")) {
        updateStatus("Game over. Place your bet to play again.");
    }

    updateUI(); // Ensure the UI reflects reset balance and bet
}
