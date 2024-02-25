document.addEventListener('DOMContentLoaded', function() {
    // Initialize game data
    let gameData = {
        score: 0,
        clickValue: 1,
        upgradeCost: 10,
        multiplier: 2,
        multiplierCost: 50,
        runeCost: 100,
        rebirthCost: 1000000,
        rebirthMultiplier: 1.5,
        hasRebirthed: false
    };

    // Load saved game data from local storage
    const savedGameData = localStorage.getItem('clickerGameData');
    if (savedGameData) {
        gameData = JSON.parse(savedGameData);
    }

    const scoreDisplay = document.getElementById('score');
    const clickButton = document.getElementById('clickButton');
    const upgradeButton = document.getElementById('upgradeButton');
    const multiplierButton = document.getElementById('multiplierButton');
    const runeButton = document.getElementById('runeButton');
    const rebirthButton = document.getElementById('rebirthButton');
    const upgradeCostDisplay = document.getElementById('upgradeCost');
    const multiplierCostDisplay = document.getElementById('multiplierCost');
    const runeCostDisplay = document.getElementById('runeCost');
    const rebirthCostDisplay = document.getElementById('rebirthCost');
    const rebirthMultiplierDisplay = document.getElementById('rebirthMultiplier');
    const runeList = document.getElementById('runeList');

    // Update the display with initial game data
    updateScoreDisplay();
    updateUpgradeCostDisplay();
    updateMultiplierCostDisplay();
    updateRuneCostDisplay();
    updateRebirthCost();

    // Add event listeners for buttons
    clickButton.addEventListener('click', function() {
        gameData.score += gameData.clickValue;
        updateScoreDisplay();
        saveGameData();
    });

    upgradeButton.addEventListener('click', function() {
        if (gameData.score >= gameData.upgradeCost) {
            gameData.score -= gameData.upgradeCost;
            gameData.clickValue++;
            gameData.upgradeCost *= 2;
            updateScoreDisplay();
            updateUpgradeCostDisplay();
            saveGameData();
        }
    });

    multiplierButton.addEventListener('click', function() {
        if (gameData.score >= gameData.multiplierCost) {
            gameData.score -= gameData.multiplierCost;
            gameData.clickValue *= gameData.multiplier;
            gameData.multiplierCost *= 2;
            updateScoreDisplay();
            updateMultiplierCostDisplay();
            saveGameData();
        }
    });

    runeButton.addEventListener('click', function() {
        if (gameData.hasRebirthed && gameData.score >= gameData.runeCost) {
            gameData.score -= gameData.runeCost;
            gameData.runeCost *= 2;
            updateScoreDisplay();
            updateRuneCostDisplay();

            // Add logic to handle runes
        }
    });

    rebirthButton.addEventListener('click', function() {
        if (gameData.score >= gameData.rebirthCost) {
            gameData.score = 0;
            gameData.clickValue = 1;
            gameData.multiplier = 1;
            gameData.upgradeCost = 10;
            gameData.multiplierCost = 50;
            gameData.runeCost = 100;
            gameData.rebirthCost *= 10;
            gameData.hasRebirthed = true;

            updateScoreDisplay();
            updateUpgradeCostDisplay();
            updateMultiplierCostDisplay();
            updateRuneCostDisplay();
            updateRebirthCost();

            saveGameData();
        }
    });

    // Function to update the score display
    function updateScoreDisplay() {
        scoreDisplay.textContent = gameData.score;
    }

    // Function to update the upgrade cost display
    function updateUpgradeCostDisplay() {
        upgradeCostDisplay.textContent = gameData.upgradeCost;
    }

    // Function to update the multiplier cost display
    function updateMultiplierCostDisplay() {
        multiplierCostDisplay.textContent = gameData.multiplierCost;
    }

    // Function to update the rune cost display
    function updateRuneCostDisplay() {
        runeCostDisplay.textContent = gameData.runeCost;
    }

    // Function to update the rebirth cost display
    function updateRebirthCost() {
        rebirthCostDisplay.textContent = gameData.rebirthCost;
        rebirthMultiplierDisplay.textContent = gameData.rebirthMultiplier;
    }

    // Function to save game data to local storage
    function saveGameData() {
        localStorage.setItem('clickerGameData', JSON.stringify(gameData));
    }
});
