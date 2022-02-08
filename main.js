let frontCard = document.getElementById("front");
let backCard = document.getElementById("back");
let addCardBtn = document.getElementById("addCard");
let cardContainer = document.getElementById("cardContainer");

//vår array med object(kortens fram och baksida)
let cardArray = [];

if (localStorage.length !== 0) {

    for (let i = 0; i < localStorage.length; i++ ){
      let key = localStorage.key(i);
      cardArray.push(JSON.parse(localStorage.getItem(key)))
    }
   };
   console.log(cardArray)

//skapar ett värdet av baksidan och framsidan av kort och 
//lägger in värderna som objekt i en array, samt sparar i local storage.
addCardBtn.addEventListener("click", (e) => {
    e.preventDefault();

    //kollar om användaren skrivit text(om inte, ALERT!)
    if(frontCard.value === "" && backCard.value === ""){
        alert("skriv text i korten");
    }

    //kollar om användaren skrivit text(om text finns, skapa object och spara local)
    else if (frontCard.value !== "" && backCard.value !== ""){
        let cardObject = { 
            framsida: frontCard.value,
            baksida: backCard.value
        };

        //pushar objectet till array
        cardArray.push(cardObject);

        //lägger in varje enskilt object i local storage
        cardArray.forEach((element, i) =>{
            localStorage.setItem(`Item ${i}`, JSON.stringify(cardArray[i]));
            //console.log(item ${i}, JSON.stringify(cardArray[i]));
        })
        frontCard.value ="";
        backCard.value ="";
    }
    createCard();
})
function createCard(){
  let buttonFlip;
  cardContainer.innerHTML="";
  cardArray.forEach((item)=>{
      let card = document.createElement("div");
      let text = document.createElement("p");
      /* let baktext = document.createElement("p"); */

      buttonFlip = document.createElement("button");
      let side = document.createElement("b");
      side.innerText = "Front";

      card.append(text, buttonFlip, side);

      cardContainer.appendChild(card);
      card.classList.add("cardcard");

      text.innerText = item.framsida;


      buttonFlip.innerText = "Flip";
      buttonFlip.classList.add("button-flip");

      buttonFlip.addEventListener("click", ()=>{
          if (text.innerText === item.framsida){
              text.innerText = item.baksida;
              side.innerText = "Back";
          } else if(text.innerText === item.baksida){
              text.innerText = item.framsida;
              side.innerText = "Front";
          }
      })
  })

}
createCard();