let participants = [];
let dares = [];
let truths = [];
let currentPlayer = null;
let selectedLanguage = 'en'; // Default language

const translations = {
  en: {
    setup: "Setup Session",
    enterNames: "Enter participant names (2 or more):",
    enterDares: "Enter your Dare questions:",
    enterTruths: "Enter your Truth questions:",
    startGame: "START GAME",
    truth: "Truth",
    dare: "Dare",
    playerTurn: "'s turn!",
    selectLanguage: "Select your language:",
    finishSetup: "FINISH SETUP",
  },
  it: {
    setup: "Sessione di Configurazione",
    enterNames: "Inserisci i nomi dei partecipanti (2 o più):",
    enterDares: "Inserisci le tue domande per Obbligo:",
    enterTruths: "Inserisci le tue domande per Verità:",
    startGame: "INIZIA IL GIOCO",
    truth: "Verità",
    dare: "Obbligo",
    playerTurn: ": è il turno!",
    selectLanguage: "Seleziona la tua lingua:",
    finishSetup: "TERMINA CONFIGURAZIONE",
  },
  // Aggiungi altre lingue se necessario
};

// Function to update the UI text based on the selected language
function updateText() {
  document.querySelector('h2').textContent = translations[selectedLanguage].setup;
  document.querySelector('#step2 p').textContent = translations[selectedLanguage].enterNames;
  document.querySelector('#step3 p').textContent = translations[selectedLanguage].enterDares;
  document.querySelector('#step4 p').textContent = translations[selectedLanguage].enterTruths;
  document.getElementById('finishSetup').textContent = translations[selectedLanguage].finishSetup;
  document.getElementById('truthButton').textContent = translations[selectedLanguage].truth;
  document.getElementById('dareButton').textContent = translations[selectedLanguage].dare;
}

// When the user selects a language
document.getElementById("languageSelect").addEventListener("change", function() {
  selectedLanguage = this.value;
  updateText(); // Update the UI text
});

// Show Setup Modal
document.getElementById("setupButton").addEventListener("click", function() {
  document.getElementById("setupModal").style.display = "flex";
  document.getElementById("step1").style.display = "block";
});

// Step 1: Continue to Participants
document.getElementById("continueStep1").addEventListener("click", function() {
  document.getElementById("step1").style.display = "none";
  document.getElementById("step2").style.display = "block";
});

// Step 2: Add Participants
document.getElementById("addParticipant").addEventListener("click", function() {
  let name = document.getElementById("participantInput").value;
  if (name) {
    participants.push(name);
    let li = document.createElement("li");
    li.textContent = name;
    document.getElementById("participantList").appendChild(li);
    document.getElementById("participantInput").value = '';
  }
});

// Step 2: Continue to Dares
document.getElementById("continueStep2").addEventListener("click", function() {
  document.getElementById("step2").style.display = "none";
  document.getElementById("step3").style.display = "block";
});

// Step 3: Add Dare
document.getElementById("addDare").addEventListener("click", function() {
  let dare = document.getElementById("dareInput").value;
  if (dare) {
    dares.push(dare);
    let li = document.createElement("li");
    li.textContent = dare;
    document.getElementById("dareList").appendChild(li);
    document.getElementById("dareInput").value = '';
  }
});

// Step 3: Continue to Truths
document.getElementById("continueStep3").addEventListener("click", function() {
  document.getElementById("step3").style.display = "none";
  document.getElementById("step4").style.display = "block";
});

// Step 4: Add Truth
document.getElementById("addTruth").addEventListener("click", function() {
  let truth = document.getElementById("truthInput").value;
  if (truth) {
    truths.push(truth);
    let li = document.createElement("li");
    li.textContent = truth;
    document.getElementById("truthList").appendChild(li);
    document.getElementById("truthInput").value = '';
  }
});

// Finish Setup and Start Game
document.getElementById("finishSetup").addEventListener("click", function() {
  document.getElementById("setupModal").style.display = "none";
  document.getElementById("gameScreen").classList.remove("hidden");
  startGame();
});

// Function to Start Game
function startGame() {
  pickRandomPlayer();
}

// Pick a random player
function pickRandomPlayer() {
  let randomIndex = Math.floor(Math.random() * participants.length);
  currentPlayer = participants[randomIndex];
  document.getElementById("playerTurn").textContent = currentPlayer + translations[selectedLanguage].playerTurn;
}

// Handle Truth or Dare selection
document.getElementById("truthButton").addEventListener("click", function() {
  let randomIndex = Math.floor(Math.random() * truths.length);
  let truth = truths[randomIndex];
  document.getElementById("questionDisplay").textContent = translations[selectedLanguage].truth + ": " + truth;
  document.getElementById("continueGame").classList.remove("hidden");
});

document.getElementById("dareButton").addEventListener("click", function() {
  let randomIndex = Math.floor(Math.random() * dares.length);
  let dare = dares[randomIndex];
  document.getElementById("questionDisplay").textContent = translations[selectedLanguage].dare + ": " + dare;
  document.getElementById("continueGame").classList.remove("hidden");
});

// Continue to next round
document.getElementById("continueGame").addEventListener("click", function() {
  document.getElementById("questionDisplay").textContent = '';
  document.getElementById("continueGame").classList.add("hidden");
  pickRandomPlayer();
});
