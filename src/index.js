document.addEventListener("DOMContentLoaded", () => {
    fetchCharacters();
});

let characterBar = document.getElementById("character-bar");
let newCharacter = null;

function fetchCharacters() {
    fetch("https://flatacuties-eight.vercel.app/characters")
        .then(response => response.json())
        .then(characters => {
            characters.forEach(function (character) {
                let span = document.createElement("span");
                span.textContent = character.name;
                span.style.cursor = "pointer";
                span.addEventListener("click", () => {
                    displayDetails(character);
                });
                characterBar.appendChild(span);
            });

            newCharacter = characters[0]; 
            displayDetails(newCharacter);
        })
        .catch(err => console.error(err));
}



function displayDetails(character) {
    newCharacter = character; 

    document.querySelector("#name").textContent = character.name;
    document.querySelector("#image").src = character.image;
    document.querySelector("#image").alt = character.name;
    document.querySelector("#vote-count").textContent = character.votes;
}

const form = document.querySelector("#votes-form");
form.addEventListener("submit", countVote);

function countVote(event) {
    event.preventDefault();
    let voteCount = document.querySelector("#vote-count");
    let inputField = document.querySelector("#votes");
    let updatedVotes = parseInt(inputField.value, 10) || 0;

    newCharacter.votes += updatedVotes; 
    voteCount.textContent = newCharacter.votes;
    
    event.target.reset()
}

document.querySelector("#reset-btn").addEventListener("click", () => {
    newCharacter.votes = 0; 
    document.querySelector("#vote-count").textContent = 0;})
