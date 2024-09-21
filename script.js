let participants = [];
let dares = [];
let truths = [];
let currentPlayer = null;
let selectedLanguage = 'en'; // Default language

const translations = {
  en: {
    setup: "Setup Session",
    enterNames: "Enter participant names (2 or more):",
    enterDares: "Enter your Dare challenges:",
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
    enterDares: "Inserisci le tue sfide per Obbligo:",
    enterTruths: "Inserisci le tue domande per Verità:",
    startGame: "INIZIA IL GIOCO",
    truth: "Verità",
    dare: "Obbligo",
    playerTurn: ": è il turno!",
    selectLanguage: "Seleziona la tua lingua:",
    finishSetup: "TERMINA CONFIGURAZIONE",
  },
  fr: {
    setup: "Session de Configuration",
    enterNames: "Entrez les noms des participants (2 ou plus) :",
    enterDares: "Entrez vos défis pour les Gages :",
    enterTruths: "Entrez vos questions pour Vérité :",
    startGame: "COMMENCER LE JEU",
    truth: "Vérité",
    dare: "Gage",
    playerTurn: ": c'est à votre tour !",
    selectLanguage: "Choisissez votre langue :",
    finishSetup: "TERMINER LA CONFIGURATION",
  },
  de: {
    setup: "Einstellungsphase",
    enterNames: "Teilnehmernamen eingeben (mindestens 2):",
    enterDares: "Geben Sie Ihre Mut-Herausforderungen ein:",
    enterTruths: "Geben Sie Ihre Wahrheit-Fragen ein:",
    startGame: "SPIEL STARTEN",
    truth: "Wahrheit",
    dare: "Mut",
    playerTurn: "ist an der Reihe!",
    selectLanguage: "Wähle deine Sprache:",
    finishSetup: "KONFIGURATION ABSCHLIESSEN",
  },
  es: {
    setup: "Sesión de Configuración",
    enterNames: "Ingresa los nombres de los participantes (2 o más):",
    enterDares: "Introduce tus desafíos para el Reto:",
    enterTruths: "Introduce tus preguntas para la Verdad:",
    startGame: "EMPEZAR JUEGO",
    truth: "Verdad",
    dare: "Reto",
    playerTurn: "¡es su turno!",
    selectLanguage: "Selecciona tu idioma:",
    finishSetup: "FINALIZAR CONFIGURACIÓN",
  }
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
  document.querySelector('.container').classList.add('hidden'); // Nascondere la descrizione
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
  if (participants.length >= 2) { // Assicurati che ci siano almeno 2 partecipanti
    document.getElementById("step2").style.display = "none";
    document.getElementById("step3").style.display = "block";
  } else {
    alert("Please add at least 2 participants!");
  }
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
  if (dares.length > 0) { // Assicurati che ci siano obblighi
    document.getElementById("step3").style.display = "none";
    document.getElementById("step4").style.display = "block";
  } else {
    alert("Please add at least 1 dare!");
  }
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
  if (truths.length > 0) { // Assicurati che ci siano verità
    document.getElementById("setupModal").style.display = "none";
    document.getElementById("gameScreen").classList.remove("hidden");
    startGame();
  } else {
    alert("Please add at least 1 truth!");
  }
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
  if (truths.length > 0) {
    let randomIndex = Math.floor(Math.random() * truths.length);
    let truth = truths[randomIndex];
    document.getElementById("questionDisplay").textContent = translations[selectedLanguage].truth + ": " + truth;
    document.getElementById("continueGame").classList.remove("hidden");
  } else {
    alert("There are no truth questions available.");
  }
});

document.getElementById("dareButton").addEventListener("click", function() {
  if (dares.length > 0) {
    let randomIndex = Math.floor(Math.random() * dares.length);
    let dare = dares[randomIndex];
    document.getElementById("questionDisplay").textContent = translations[selectedLanguage].dare + ": " + dare;
    document.getElementById("continueGame").classList.remove("hidden");
  } else {
    alert("There are no dare challenges available.");
  }
});

// Continue to next round
document.getElementById("continueGame").addEventListener("click", function() {
  document.getElementById("questionDisplay").textContent = '';
  document.getElementById("continueGame").classList.add("hidden");
  pickRandomPlayer();
});
