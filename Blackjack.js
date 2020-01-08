var cardHolder = document.querySelector("#card-holder");
var cardHolderDealer = document.querySelector("#card-holder-dealer");

var hitButton = document.querySelector("#hit-button");
var stickButton = document.querySelector("#stick-button");
var newGameButton = document.querySelector("#new-game-button");

var statusText = document.querySelector("#game-status");

var cards = [];

var playerHand = [];
var dealerHand = [];

var initialiseGame = function () {
    var cards = [];
    
    var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    var suits = ["C", "H", "D", "S"];

    for (var i in values){
        for (var j in suits){
            cards = cards.concat([values[i]+suits[j]]);
        }
    }
    
    return cards;
};

var startGame = function () {
    playerHand = [];
    dealerHand = [];
    
    cards = initialiseGame();
    
    playerHand = dealCard(playerHand, cards);
    
    playerHand = dealCard(playerHand, cards);
    
    dealerHand = dealCard(dealerHand, cards);

    dealerHand = dealCard(dealerHand, cards);

    
    drawCards(playerHand, dealerHand);
    
    hitButton.disabled = false;
    stickButton.disabled = false;
    newGameButton.disabled = true;
    
    statusText.innerHTML = "";
};

var value = function (hand) {
    var val = 0;
    var noAces = 0;
    
    for (var i in hand){
        var card = hand[i][0];
        if (card == "A"){
            noAces += 1;
        }
        
        val += {"2":2, "3":3, "4":4, "5":5, "6":6, "7":7, "8":8, "9":9, "1":10, "J":10, "Q":10, "K":10, "A":11}[card];
        
        if (val > 21 && noAces > 0){
            val -= 10;
            noAces -= 1;
        }
    }
    
    return val;
}

var hit = function () {
    playerHand = dealCard(playerHand, cards);

    
    drawCards(playerHand, dealerHand);
    
    console.log(value(playerHand));
    
    if (value(playerHand) > 21) {
        playerGoBust();
    }
}

var playerGoBust = function () {
    hitButton.disabled = true;
    stickButton.disabled = true;
    newGameButton.disabled = false;
    
    drawCards(playerHand, dealerHand, true);
    
    statusText.innerHTML = "You went bust! Try again?";
}

var playerStick = function () {
    hitButton.disabled = true;
    stickButton.disabled = true;
    newGameButton.disabled = false;
    
    while (value(dealerHand) < 16 || value(dealerHand) < value(playerHand)){
        dealerHand = dealCard(dealerHand, cards);

    }
    
    drawCards(playerHand, dealerHand, true);
    
    var dValue = value(dealerHand);
    var pValue = value(playerHand);
    
    if (pValue == 21 && playerHand.length == 2 && !(dValue == 21 && dealerHand.length == 2)){
        statusText.innerHTML = "Blackjack! You win!";
    }
    else if (dValue > 21){
        statusText.innerHTML = "Dealer went bust! You win!";
    }
    else if (playerHand.length >= 5 && dealerHand.length < 5){
        statusText.innerHTML = "Five card trick! You win!";
    }
    else if (pValue > dValue){
        statusText.innerHTML = "Higher score than the dealer? This shouldn't really ever happen, but you still win!";
    }
    else if (dValue == pValue){
        statusText.innerHTML = "Dealer wins on tied scores - you lose!";
    }
    else {
        statusText.innerHTML = "Dealer had a higher score - you lose!";
    }
}

var dealCard = function (handTo, cardsasd) {
    var card = cards[Math.floor(Math.random()*cards.length)];
    
    console.log(card);
    
    cards = cards.filter(x => x != card);
    
    console.log(cards);
    
    return handTo.concat([card]);
}


var drawCards = function (playerHand, dealerHand, revealCard=false) {
    while (cardHolder.childElementCount > 0){
        cardHolder.removeChild(cardHolder.children.item(0));
    }
    
    while (cardHolderDealer.childElementCount > 0){
        cardHolderDealer.removeChild(cardHolderDealer.children.item(0));
    }
    
    for (var i in playerHand) {
        var newItem = document.createElement("div");
        
        var location = "Cards/"+playerHand[i]+".png";
        
        newItem.innerHTML = `
        <img src="${location}">
`;
        
        cardHolder.appendChild(newItem);      
    }
    
    for (var i in dealerHand) {
        var newItem = document.createElement("div");
        
        if (i == 0 && revealCard==false) {
            var location = "Cards/red_back.png";
        }
        else {
            var location = "Cards/"+dealerHand[i]+".png";
        }
        
        newItem.innerHTML = `
        <img src="${location}">
`;
        
        cardHolderDealer.appendChild(newItem); 
    }
}

startGame();