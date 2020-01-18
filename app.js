const cards=document.querySelectorAll('.card')
const counter=document.querySelector('.count')
const back=document.querySelectorAll('.back')
const scores=document.querySelector('.score')

let selectedCard=false
let card1=null
let card2=null
let parent1
let parent2
let firstClick
let secondClick
let count=0
let score=JSON.parse(localStorage.getItem('score')) || Infinity
let endCheck=0

let mountain="/image/mountain.jpg"
let beach="/image/beach.jpg"
let flower="/image/redflower.jpg"
let sunrise="/image/laventana.jpg"
let jungle= "/image/hana.jpg"
let desert= "/image/desert.jpg"

let imagesArray=[mountain,beach,flower,sunrise,jungle,desert,mountain,beach,flower,sunrise,jungle,desert]



    //add event listener to each card
for(card of cards) { 
    card.addEventListener('click', handleClick); 
}

function handleClick(e) {
    // prevent clicking on the same card
if(e.target.tagName==="IMG"){}
else{
    //  //show front of card if icon was clicked
   if (e.target.tagName==="I"){
       e.target.parentElement.style.zIndex="1";
   }
 //show front of card if background was clicked
    else{
        e.target.style.zIndex="1";
        }
//count clicks and update score
    count++;
    counter.innerText=count;


//first click
if(!selectedCard){
    // if the logo icon was clicked
    if (e.target.tagName==="I"){
        parent1=e.target.parentElement.parentElement;
        firstClick=e.target.parentElement;
        card1=e.target.parentElement.previousElementSibling.src;
    }
    //if the back of the card was clicked
    else{
        parent1=e.target.parentElement;
        firstClick=e.target;
    //set image source to card1 for comparisons
        card1=e.target.previousElementSibling.src;
        }
    //set selectedCard for second click
        selectedCard=true;
    

}
//second click
else{
    //if the logo icon was clicked
        if (e.target.tagName==="I"){
            parent2=e.target.parentElement.parentElement
            secondClick=e.target.parentElement
            card2=e.target.parentElement.previousElementSibling.src
    }
    // if the back of the card was clicked
        else{  
            parent2=e.target.parentElement
            secondClick=e.target
            card2=e.target.previousElementSibling.src
        }
        //reset click
    selectedCard=false

}
//compare front of card
if (card1 && card2 && card1===card2){
//there is a match
parent1.removeEventListener('click', handleClick)
parent2.removeEventListener('click', handleClick)
    card1=null
    card2=null
// check for end of game
for(card of cards) {
    if (card.lastElementChild.style.zIndex==="1") {
        endCheck++;
    }}
if (endCheck===42 & count<score){
        score=count
        scores.innerText=score
        localStorage.setItem('score', score)
    }
}

//no match
else if(card1 && card2){
    card1=null
    card2=null
//flip cards over after 1 second
    setTimeout(function(){
    firstClick.style.zIndex="2"
    secondClick.style.zIndex="2"
    }, 500)
    
}
    }
        }
       
 //new game button   
const button=document.querySelector('button')
button.addEventListener('click', reset)

function reset(){
    shuffle(imagesArray)
let i=0
const images=document.querySelectorAll('img')
for(image of images){
    //change src of image tags to index of imagesArray 
    image.setAttribute('src',imagesArray[i])
i++     
    }

 // flip cards back over
 for(card of back) {
    card.style.zIndex="2"
 }
//reset board
selectedCard=false
card1=null
card2=null
//turn event listenters back on
for(card of cards) { 
    card.addEventListener('click', handleClick)}

//reset counter
count=0
counter.innerText=count 
endCheck=0
}

//shuffle the images array
function shuffle(imagesArray) {

	let currentIndex = imagesArray.length;
	let temporaryValue, randomIndex;

	while (0 !== currentIndex) {
	
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex --;

		temporaryValue = imagesArray[currentIndex];
		imagesArray[currentIndex] = imagesArray[randomIndex];
		imagesArray[randomIndex] = temporaryValue;
	}

    return imagesArray;
}
