let deckId
let card1=""
let card2=""
let deckCardsRemaining = ""
let computerScore = 0
let playerScore = 0
const drawCards = document.getElementById("draw-cards")
const newDeck = document.getElementById("new-deck")
const imageHolder = document.getElementById('image-holder')
const winner = document.getElementById("winner")
const remainingCards = document.getElementById("remaining-cards")
const computerScoreTab = document.getElementById("ai-score")
const playerScoreTab = document.getElementById("player-score")
const restart = document.getElementById("reload")

async function getNewDeck (){
    const response = await fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
    const data = await response.json()
    deckId = data.deck_id
    console.log(data)
    console.log(deckId)
    remainingCards.innerHTML =`
    Remaining cards: ${data.remaining}
    `
    drawCards.disabled = false
}

function higherValue (){
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1ValueIndex = valueOptions.indexOf(card1)
    const card2ValueIndex = valueOptions.indexOf(card2)
    if(card1ValueIndex > card2ValueIndex){
        winner.textContent = "Computer Wins!"
        computerScore++
        computerScoreTab.textContent = `${computerScore}`
    }else if(card1ValueIndex < card2ValueIndex){
        winner.textContent = "You win!"
        playerScore++
        playerScoreTab.textContent = `${playerScore}`
    }else{
        winner.textContent ="It's a tie!"
    }
}


async function drawNewCards (){
   const response = await fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
   const data = await response.json()
   console.log(data.cards)
   remainingCards.innerHTML =`
   Remaining cards: ${data.remaining}
   `
   imageHolder.innerHTML=`
   <img class="imgView" src=${data.cards[0].image}>
   <img class="imgView imageSpacer" src=${data.cards[1].image}>
   `
   card1 = data.cards[0].value
   card2 = data.cards[1].value
   higherValue()
   if(data.remaining === 0){
       restart.classList.remove("startAgain")
       drawCards.disabled = true
       drawCards.classList.remove("btn")
       drawCards.classList.add("disabled")
       console.log("finished")
       if(playerScore > computerScore){
           winner.textContent = "You Win The Game!"
       } else if(playerScore < computerScore){
           winner.textContent = "Computer Wins The Game!"
       }else{
           winner.textContent = "Tie Game!"
       }
   }
}

function restartGame(){
    document.location.reload(true)
}


newDeck.addEventListener('click', getNewDeck)
drawCards.addEventListener("click", drawNewCards)
restart.addEventListener("click", restartGame)

