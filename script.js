// script.js

// Initial player and enemy health
let playerHealth = 100;
let enemyHealth = 100;

// DOM elements
const playerHealthBar = document.getElementById('player-health-bar');
const enemyHealthBar = document.getElementById('enemy-health-bar');
const playerHealthText = document.getElementById('player-health');
const enemyHealthText = document.getElementById('enemy-health');
const log = document.getElementById('log');
const attackButton = document.getElementById('attack-button');
const retryButton = document.getElementById('retry-button');
const narutoImg = document.getElementById('naruto-img');
const sasukeImg = document.getElementById('sasuke-img');

// Function to update the health bars and text
function updateHealthDisplay() {
    playerHealthText.textContent = `HP: ${playerHealth}`;
    enemyHealthText.textContent = `HP: ${enemyHealth}`;
    playerHealthBar.style.width = `${playerHealth}%`;
    enemyHealthBar.style.width = `${enemyHealth}%`;
}

// Function to log messages in the game log
function logMessage(message) {
    const logEntry = document.createElement('p');
    logEntry.textContent = message;
    log.appendChild(logEntry);
    log.scrollTop = log.scrollHeight; // Auto scroll to bottom
}

// Function to trigger a shake animation on a character
function shakeCharacter(characterImg) {
    characterImg.classList.add('shake');
    setTimeout(() => characterImg.classList.remove('shake'), 500); // Remove class after animation
}

// Function to flash a character when taking damage
function flashCharacter(characterImg) {
    characterImg.classList.add('flash');
    setTimeout(() => characterImg.classList.remove('flash'), 500); // Remove class after animation
}

// Function to simulate player attack
function playerAttack() {
    let damage = Math.floor(Math.random() * 20) + 5; // Random damage between 5 and 25
    enemyHealth -= damage;
    enemyHealth = Math.max(enemyHealth, 0); // Ensure health doesn't go below 0
    logMessage(`Naruto attacks Sasuke for ${damage} damage!`);
    shakeCharacter(sasukeImg); // Shake Sasuke when he takes damage
    updateHealthDisplay();
    if (enemyHealth === 0) {
        logMessage('Sasuke is defeated! You win!');
        attackButton.disabled = true; // Disable attack button
        retryButton.style.display = 'block'; // Show retry button
    } else {
        setTimeout(enemyAttack, 1000); // Enemy attacks after 1 second
    }
}

// Function to simulate enemy attack
function enemyAttack() {
    let damage = Math.floor(Math.random() * 15) + 5; // Random damage between 5 and 20
    playerHealth -= damage;
    playerHealth = Math.max(playerHealth, 0); // Ensure health doesn't go below 0
    logMessage(`Sasuke attacks Naruto for ${damage} damage!`);
    shakeCharacter(narutoImg); // Shake Naruto when he takes damage
    updateHealthDisplay();
    if (playerHealth === 0) {
        logMessage('Naruto is defeated! You lose!');
        attackButton.disabled = true; // Disable attack button
        retryButton.style.display = 'block'; // Show retry button
    }
}

// Function to reset the game
function resetGame() {
    playerHealth = 100;
    enemyHealth = 100;
    updateHealthDisplay();
    log.innerHTML = ''; // Clear the log
    logMessage('Game restarted! Fight again!');
    attackButton.disabled = false; // Enable attack button
    retryButton.style.display = 'none'; // Hide retry button
}

// Event listeners for attack and retry buttons
attackButton.addEventListener('click', playerAttack);
retryButton.addEventListener('click', resetGame);

// Initialize the health display
updateHealthDisplay();
