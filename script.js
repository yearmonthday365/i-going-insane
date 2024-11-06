let gems = 0;
let coins = 0;
let adrenalineActive = false;

let childSupportMultiplier = 1;

function showChildSupportMessage() {
    const messageDiv = document.createElement('div');
    messageDiv.style.position = 'fixed';
    messageDiv.style.top = '50%';
    messageDiv.style.left = '50%';
    messageDiv.style.transform = 'translate(-50%, -50%)';
    messageDiv.style.backgroundColor = '#333';
    messageDiv.style.padding = '20px';
    messageDiv.style.borderRadius = '5px';
    messageDiv.style.color = 'white';
    messageDiv.style.zIndex = '1000';

    messageDiv.innerHTML = `
        Hello, you haven't paid child support all this year.<br>
        You better give me that child support, or else you're EVICTED!<br>
        Payment is $50,000.<br><br>
    `;

    const payButton = document.createElement('button');
    payButton.textContent = "Pay it (5x coin multiplier)";
    payButton.addEventListener('click', () => {
        if (coins >= 50000) {
            coins -= 50000;
            childSupportMultiplier *= 5;
            document.body.removeChild(messageDiv);
        }
    });

    const trashButton = document.createElement('button');
    trashButton.textContent = "Crumble it and throw it in the trash";
    trashButton.addEventListener('click', () => {
        document.body.removeChild(messageDiv);
    });

    messageDiv.appendChild(payButton);
    messageDiv.appendChild(trashButton);
    document.body.appendChild(messageDiv);
}

setInterval(showChildSupportMessage, 60000);

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

function abbreviateNumber(number) {
    if (number >= 1e93) return (number / 1e93).toFixed(1) + 'Ve';    // Vecillion
    if (number >= 1e90) return (number / 1e90).toFixed(1) + 'Ud';    // Undecillion
    if (number >= 1e87) return (number / 1e87).toFixed(1) + 'Td';    // Tredecillion
    if (number >= 1e84) return (number / 1e84).toFixed(1) + 'Dd';    // Duodecillion
    if (number >= 1e81) return (number / 1e81).toFixed(1) + 'Un';    // Unodecillion
    if (number >= 1e78) return (number / 1e78).toFixed(1) + 'Vi';    // Vigintillion
    if (number >= 1e75) return (number / 1e75).toFixed(1) + 'No';    // Novemdecillion
    if (number >= 1e72) return (number / 1e72).toFixed(1) + 'Oc';    // Octodecillion
    if (number >= 1e69) return (number / 1e69).toFixed(1) + 'Se';    // Septendecillion
    if (number >= 1e66) return (number / 1e66).toFixed(1) + 'Sd';    // Sexdecillion
    if (number >= 1e63) return (number / 1e63).toFixed(1) + 'Qd';    // Quindecillion
    if (number >= 1e60) return (number / 1e60).toFixed(1) + 'Qn';    // Quattuordecillion
    if (number >= 1e57) return (number / 1e57).toFixed(1) + 'Tr';    // Tredecillion
    if (number >= 1e54) return (number / 1e54).toFixed(1) + 'De';    // Decillion
    if (number >= 1e51) return (number / 1e51).toFixed(1) + 'No';    // Nonillion
    if (number >= 1e48) return (number / 1e48).toFixed(1) + 'Oc';    // Octillion
    if (number >= 1e45) return (number / 1e45).toFixed(1) + 'Sp';    // Septillion
    if (number >= 1e42) return (number / 1e42).toFixed(1) + 'Sx';    // Sextillion
    if (number >= 1e39) return (number / 1e39).toFixed(1) + 'Qn';    // Quintillion
    if (number >= 1e36) return (number / 1e36).toFixed(1) + 'Qd';    // Quadrillion
    if (number >= 1e12) return (number / 1e12).toFixed(1) + 'T';     // Trillion
    if (number >= 1e9) return (number / 1e9).toFixed(1) + 'B';       // Billion
    if (number >= 1e6) return (number / 1e6).toFixed(1) + 'M';       // Million
    if (number >= 1e3) return (number / 1e3).toFixed(1) + 'K';       // Thousand
    return number;
}

const squareMessages = [
    "OW!",
    "WHAT WAS THAT FOR?!",
    "STOP!",
    "WAAA!",
    "WHY?!",
    "PLEASE NO!",
    "OWWW!"
];

const inventoryPanel = document.getElementById('inventoryPanel');
const inventoryItemsList = document.getElementById('inventoryItems');
const equipButtonBottle = document.getElementById('equipButtonBottle');
const equipButtonBelt = document.getElementById('equipButtonBelt');
const equipButtonWhip = document.getElementById('equipButtonWhip');
const equipButtonKnife = document.getElementById('equipButtonKnife');
const equipButtonSword = document.getElementById('equipButtonSword');
const equipButtonPistol = document.getElementById('equipButtonPistol');
const equipButtonRevolver = document.getElementById('equipButtonRevolver');
const equipButtonSMG = document.getElementById('equipButtonSMG');
const equipButtonak = document.getElementById('equipButtonak');
const equipButtonChainsaw = document.getElementById('equipButtonChainsaw');
const equipButtonLunchly = document.getElementById('equipButtonLunchly');
const equipButtonMinigun = document.getElementById('equipButtonMinigun');
const equipButtonLighterSpray = document.getElementById('equipButtonLighterSpray');
const equipButtonDragonBreath = document.getElementById('equipButtonDragonBreath');
const shopButton = document.getElementById('shopButton');
const respawnButton = document.getElementById('respawnButton');

const playerImage = new Image();
playerImage.src = "https://assets.onecompiler.app/42wswghpg/42wv9ajwg/image_2024-11-01_162704710.png";

const bottleImage = new Image();
bottleImage.src = "https://assets.onecompiler.app/42wswghpg/42wv9ajwg/image_2024-11-01_210214474.png";

const beltImage = new Image();
beltImage.src = "https://assets.onecompiler.app/42wswghpg/42wv9ajwg/belt.png";

const whipImage = new Image();
whipImage.src = "https://assets.onecompiler.app/42wswghpg/42wymus2a/image_2024-11-02_214730449.png";

const knifeImage = new Image();
knifeImage.src = "https://assets.onecompiler.app/42wswghpg/42wymus2a/image_2024-11-03_094438570.png"

const revolverImage = new Image();
revolverImage.src = "https://assets.onecompiler.app/42wswghpg/42wymus2a/image_2024-11-03_145925402.png";

const houseImage = new Image();
houseImage.src = "https://assets.onecompiler.app/42wswghpg/42wv9ajwg/image_2024-11-01_161736155.png";

const squareImage = new Image();
squareImage.src = "https://assets.onecompiler.app/42wswghpg/42wv9ajwg/image_2024-11-01_163043863.png";

const weaponImage = new Image();
weaponImage.src = "https://assets.onecompiler.app/42wswghpg/42wv9ajwg/file.png";

const houseBackgroundImage = new Image();
houseBackgroundImage.src = "https://assets.onecompiler.app/42wswghpg/42wv9ajwg/house_interior.png";
let houseBackgroundLoaded = false;
houseBackgroundImage.addEventListener('load', () => {
    houseBackgroundLoaded = true;
    console.log('House background loaded successfully');
});

const characters = {
    unknown: {
        name: "UNKNOWN NAME",
        coinMultiplier: 1,
        speedMultiplier: 1,
        image: playerImage
    },
    henry: {
        name: "Henry",
        coinMultiplier: 2,
        speedMultiplier: 1.25,
        image: new Image(),
        cost: 250
    },
    ssj2: {
      name: "UNKOWN SSJ2",
      coinMultiplier: 5,
      speedMultiplier: 1.5,
      image: new Image(),
      cost: 2500
    },
    fredrick: {
        name: "Fredrick",
        coinMultiplier: 10,
        speedMultiplier: 1.7,
        image: new Image(),
        cost: 50000
    },
    bartholomew: {
      name: "Bartholomew",
      coinMultiplier: 20,
      speedMultiplier: 1.75,
      image: new Image(),
      cost: 250000
    },
    wilfred: {
      name: "Wilfred",
      coinMultiplier: 35,
      speedMultiplier: 1.8,
      image: new Image(),
      cost: 450000
    },
    smartschool: {
      name: "Smartschoolboy9",
      coinMultiplier: 50,
      speedMultiplier: 0.75,
      image: new Image(),
    },
    mrbeast: {
      name: "Mrbeast",
      coinMultiplier: 100,
      speedMultiplier: 0.85,
      image: new Image(),
    }
};

characters.henry.image.src = "https://assets.onecompiler.app/42wswghpg/42wymus2a/image_2024-11-02_224452006.png";
characters.ssj2.image.src = "https://assets.onecompiler.app/42wswghpg/42wymus2a/image_2024-11-03_140214071.png"
characters.fredrick.image.src = "https://assets.onecompiler.app/42wswghpg/42wymus2a/image_2024-11-03_152023018.png"
characters.bartholomew.image.src = "https://assets.onecompiler.app/42wswghpg/42wymus2a/image_2024-11-03_174626778.png"
characters.wilfred.image.src = "https://assets.onecompiler.app/42wswghpg/42wymus2a/image_2024-11-03_212917648.png";
characters.smartschool.image.src = "https://assets.onecompiler.app/42wswghpg/42wymus2a/image_2024-11-04_175942424.png"
characters.mrbeast.image.src = "https://assets.onecompiler.app/42wswghpg/42wymus2a/image_2024-11-05_204132575.png"

const player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    width: 40,
    height: 40,
    speed: 2
};

const keys = {
    w: false,
    a: false,
    s: false,
    d: false,
};

const house = {
    x: canvas.width - 100,
    y: 10,
    width: 80,
    height: 80
};

const square = {
    x: house.x + 10,
    y: house.y + 30,
    width: 60,
    height: 40,
    collided: false,
    velocity: {
        x: 0,
        y: 0
    },
    friction: 0.98
};

let currentArea = "Outside";

const exitBox = {
    x: (canvas.width / 2) - 40,
    y: canvas.height - 60,
    width: 80,
    height: 40
};

const weapon = {
    x: (3 * canvas.width) / 4,
    y: canvas.height / 2,
    width: 40,
    height: 40
};

let inventory = [];
let equippedWeapon = null;
let canHitSquare = true;

const lotteryShopPanel = document.createElement('div');
lotteryShopPanel.id = 'lotteryShopPanel';
const buyTicketButton = document.createElement('button');
buyTicketButton.textContent = "Buy Lottery Ticket (10 Coins)";
lotteryShopPanel.appendChild(buyTicketButton);
document.body.appendChild(lotteryShopPanel);

buyTicketButton.addEventListener('click', () => {
    if (coins >= 10) {
        coins -= 10;
        if (guaranteedWin) {
            coins += 1000;
            alert("Congratulations! You won 1000 coins!");
        } else {
            const winChance = Math.random();
            if (winChance <= 0.1) {
                coins += 1000;
                alert("Congratulations! You won 1000 coins!");
            } else {
                alert("Better luck next time!");
            }
        }
    } else {
        alert("Not enough coins to buy a ticket!");
    }
});

const buyHighStakesTicketButton = document.createElement('button');
buyHighStakesTicketButton.textContent = "Buy High Stakes Ticket (1000 Coins)";
lotteryShopPanel.appendChild(buyHighStakesTicketButton);

buyHighStakesTicketButton.addEventListener('click', () => {
    if (coins >= 1000) {
        coins -= 1000;
        if (guaranteedWin) {
            coins += 100000;
            alert("JACKPOT! You won 100,000 coins!");
        } else {
            const winChance = Math.random();
            if (winChance <= 0.01) {
                coins += 100000;
                alert("JACKPOT! You won 100,000 coins!");
            } else {
                alert("Not this time! Try again for the big prize!");
            }
        }
    } else {
        alert("Not enough coins for a High Stakes ticket!");
    }
});

const lotteryShopButton = document.createElement('button');
lotteryShopButton.textContent = "Toggle Lottery Shop";
lotteryShopButton.addEventListener('click', () => {
    lotteryShopPanel.style.display = lotteryShopPanel.style.display === 'none' ? 'block' : 'none';
});
document.body.appendChild(lotteryShopButton);

const gemConvertButton = document.createElement('button');
gemConvertButton.textContent = "Convert 100,000 Coins to 1 Gem";
document.body.appendChild(gemConvertButton);

gemConvertButton.addEventListener('click', () => {
    if (coins >= 100000) {
        coins -= 100000;
        gems += 1;
        alert(`Successfully converted! You now have ${gems} gems!`);
    } else {
        alert("You need 100,000 coins to convert to a gem!");
    }
});

const gemConvertButton2 = document.createElement('button');
gemConvertButton2.textContent = "Convert 1M Coins to 10 Gems";
document.body.appendChild(gemConvertButton2);

gemConvertButton2.addEventListener('click', () => {
    if (coins >= 1000000) {
        coins -= 1000000;
        gems += 10;
        alert(`Successfully converted! You now have ${gems} gems!`);
    } else {
        alert("You need 1M coins to convert to gems!");
    }
});

const bigGemConvertButton = document.createElement('button');
bigGemConvertButton.textContent = "Convert 10M Coins to 100 Gems";
document.body.appendChild(bigGemConvertButton);

bigGemConvertButton.addEventListener('click', () => {
    if (coins >= 10000000) {
        coins -= 10000000;
        gems += 100;
        alert(`Successfully converted! You now have ${gems} gems!`);
    } else {
        alert("You need 10M coins to convert to gems!");
    }
});

const shopPanel = document.createElement('div');
const shopItemsList = document.createElement('ul');
const buyBottleButton = document.createElement('button');
const buyBeltButton = document.createElement('button');
shopPanel.id = 'shopPanel';
buyBottleButton.textContent = "Buy Bottle (10 Coins)";
buyBeltButton.textContent = "Buy Belt (150 Coins)";

const whipLi = document.createElement('li');
whipLi.textContent = "Whip - 500 Coins";
shopItemsList.appendChild(whipLi);

const buyWhipButton = document.createElement('button');
buyWhipButton.textContent = "Buy Whip (500 Coins)";
shopPanel.appendChild(buyWhipButton);

buyWhipButton.addEventListener('click', () => {
    if (coins >= 500) {
        coins -= 500;
        addToInventory("Whip");
        updateInventoryDisplay();
        updateShopDisplay();
    } else {
        alert("Not enough coins to buy the Whip!");
    }
});

const maceLi = document.createElement('li');
maceLi.textContent = "Mace - 750 Coins";
shopItemsList.appendChild(maceLi);

const buyMaceButton = document.createElement('button');
buyMaceButton.textContent = "Buy Mace (750 Coins)";
shopPanel.appendChild(buyMaceButton);

buyMaceButton.addEventListener('click', () => {
    if (coins >= 750) {
        coins -= 750;
        addToInventory("Mace");
        updateInventoryDisplay();
        updateShopDisplay();
    } else {
        alert("Not enough coins to buy the Mace!");
    }
});

const knifeLi = document.createElement('li');
knifeLi.textContent = "Knife - 1250 Coins";
shopItemsList.appendChild(knifeLi);

const buyKnifeButton = document.createElement('button');
buyKnifeButton.textContent = "Buy Knife (1250 Coins)";
shopPanel.appendChild(buyKnifeButton);

buyKnifeButton.addEventListener('click', () => {
    if (coins >= 1250) {
        coins -= 1250;
        addToInventory("Knife");
        updateInventoryDisplay();
        updateShopDisplay();
    } else {
        alert("Not enough coins to buy the Knife!");
    }
});

const swordLi = document.createElement('li');
swordLi.textContent = "Sword - 2000 Coins";
shopItemsList.appendChild(swordLi);

const buySwordButton = document.createElement('button');
buySwordButton.textContent = "Buy Sword (2000 Coins)";
shopPanel.appendChild(buySwordButton);

buySwordButton.addEventListener('click', () => {
    if (coins >= 2000) {
        coins -= 2000;
        addToInventory("Sword");
        updateInventoryDisplay();
        updateShopDisplay();
    } else {
        alert("Not enough coins to buy the Sword!");
    }
});

const pistolLi = document.createElement('li');
pistolLi.textContent = "Pistol - 7500 Coins";
shopItemsList.appendChild(pistolLi);

const buyPistolButton = document.createElement('button');
buyPistolButton.textContent = "Buy Pistol (7500 Coins)";
shopPanel.appendChild(buyPistolButton);

buyPistolButton.addEventListener('click', () => {
    if (coins >= 7500) {
        coins -= 7500;
        addToInventory("Pistol");
        updateInventoryDisplay();
        updateShopDisplay();
    } else {
        alert("Not enough coins to buy the Pistol!");
    }
});

const revolverLi = document.createElement('li');
revolverLi.textContent = "Revolver - 15000 Coins";
shopItemsList.appendChild(pistolLi);

const buyRevolverButton = document.createElement('button');
buyRevolverButton.textContent = "Buy Revolver (15000 Coins)";
shopPanel.appendChild(buyRevolverButton);

buyRevolverButton.addEventListener('click', () => {
    if (coins >= 15000) {
        coins -= 15000;
        addToInventory("Revolver");
        updateInventoryDisplay();
        updateShopDisplay();
    } else {
        alert("Not enough coins to buy the Revolver!");
    }
});

const smgLi = document.createElement('li');
smgLi.textContent = "SMG - 85000 Coins";
shopItemsList.appendChild(pistolLi);

const buysmgButton = document.createElement('button');
buysmgButton.textContent = "Buy SMG (85000 Coins)";
shopPanel.appendChild(buysmgButton);

buysmgButton.addEventListener('click', () => {
    if (coins >= 85000) {
        coins -= 85000;
        addToInventory("SMG");
        updateInventoryDisplay();
        updateShopDisplay();
    } else {
        alert("Not enough coins to buy the SMG!");
    }
});

const akLi = document.createElement('li');
akLi.textContent = "AK-47 - 100000 Coins";
shopItemsList.appendChild(akLi);

const buyakButton = document.createElement('button');
buyakButton.textContent = "Buy AK-47 (100000 Coins)";
shopPanel.appendChild(buyakButton);

buyakButton.addEventListener('click', () => {
    if (coins >= 100000) {
        coins -= 100000;
        addToInventory("AK-47");
        updateInventoryDisplay();
        updateShopDisplay();
    } else {
        alert("Not enough coins to buy the AK-47!");
    }
});

const chainsawLi = document.createElement('li');
chainsawLi.textContent = "Chainsaw - 325000 Coins";
shopItemsList.appendChild(chainsawLi);

const buyChainSawButton = document.createElement('button');
buyChainSawButton.textContent = "Buy Chainsaw (325000 Coins)";
shopPanel.appendChild(buyChainSawButton);

buyChainSawButton.addEventListener('click', () => {
    if (coins >= 325000) {
        coins -= 325000;
        addToInventory("Chainsaw");
        updateInventoryDisplay();
        updateShopDisplay();
    } else {
        alert("Not enough coins to buy the Chainsaw!");
    }
});

const lunchlyLi = document.createElement('li');
lunchlyLi.textContent = "Lunchly - 1000000 Coins";
shopItemsList.appendChild(lunchlyLi);

const buyLunchlyButton = document.createElement('button');
buyLunchlyButton.textContent = "Buy Lunchly (1000000 Coins)";
shopPanel.appendChild(buyLunchlyButton);

buyLunchlyButton.addEventListener('click', () => {
    if (coins >= 1000000) {
        coins -= 1000000;
        addToInventory("Lunchly");
        updateInventoryDisplay();
        updateShopDisplay();
    } else {
        alert("Not enough coins to buy the Lunchly!");
    }
});

const minigunLi = document.createElement('li');
minigunLi.textContent = "Minigun - 20 Gems";
shopItemsList.appendChild(minigunLi);

const buyMinigunButton = document.createElement('button');
buyMinigunButton.textContent = "Buy Minigun (20 Gems)";
shopPanel.appendChild(buyMinigunButton);

buyMinigunButton.addEventListener('click', () => {
    if (gems >= 20) {
        gems -= 20;
        addToInventory("Minigun");
        updateInventoryDisplay();
        updateShopDisplay();
    } else {
        alert("Not enough gems to buy the Minigun!");
    }
});

const lighterSprayLi = document.createElement('li');
lighterSprayLi.textContent = "Lighter + Hair spray - 50 Gems";
shopItemsList.appendChild(lighterSprayLi);

const buyLighterSprayButton = document.createElement('button');
buyLighterSprayButton.textContent = "Buy Lighter + Hair spray (50 Gems)";
shopPanel.appendChild(buyLighterSprayButton);

buyLighterSprayButton.addEventListener('click', () => {
    if (gems >= 50) {
        gems -= 50;
        addToInventory("Lighter + Hair spray");
        updateInventoryDisplay();
        updateShopDisplay();
    } else {
        alert("Not enough gems to buy the Lighter + Hair spray!");
    }
});

const dragonBreathLi = document.createElement('li');
dragonBreathLi.textContent = "Dragon's Breath - 200 Gems";
shopItemsList.appendChild(dragonBreathLi);

const buyDragonBreathButton = document.createElement('button');
buyDragonBreathButton.textContent = "Buy Dragon's Breath (200 Gems)";
shopPanel.appendChild(buyDragonBreathButton);

buyDragonBreathButton.addEventListener('click', () => {
    if (gems >= 200) {
        gems -= 200;
        addToInventory("Dragon's Breath");
        updateInventoryDisplay();
        updateShopDisplay();
    } else {
        alert("Not enough gems to buy Dragon's Breath!");
    }
});

shopPanel.appendChild(shopItemsList);
shopPanel.appendChild(buyBottleButton);
shopPanel.appendChild(buyBeltButton);
document.body.appendChild(shopPanel);

const characterShopPanel = document.createElement('div');
characterShopPanel.id = 'characterShopPanel';
characterShopPanel.style.display = 'none';

const buyHenryButton = document.createElement('button');
buyHenryButton.textContent = "Buy Henry (250 Coins)";
characterShopPanel.appendChild(buyHenryButton);

document.body.appendChild(characterShopPanel);

let currentCharacter = characters.unknown;
let unlockedCharacters = ['unknown'];

buyHenryButton.addEventListener('click', () => {
    if (coins >= 250 && !unlockedCharacters.includes('henry')) {
        coins -= 250;
        unlockedCharacters.push('henry');
        currentCharacter = characters.henry;
        player.speed *= currentCharacter.speedMultiplier;
        buyHenryButton.textContent = "Select Henry";
    } else if (unlockedCharacters.includes('henry')) {
        currentCharacter = characters.henry;
        player.speed = 5 * currentCharacter.speedMultiplier;
    }
});

const buySSJ2Button = document.createElement('button');
buySSJ2Button.textContent = "Buy UNKNOWN SSJ2 (2500 Coins)";
characterShopPanel.appendChild(buySSJ2Button);

buySSJ2Button.addEventListener('click', () => {
  if (coins >= 2500 && !unlockedCharacters.includes('ssj2')) {
    coins -= 2500;
    unlockedCharacters.push('ssj2');
    currentCharacter = characters.ssj2;
    player.speed *= currentCharacter.speedMultiplier;
    buySSJ2Button.textContent = "Select UNKNOWN SSJ2";
  } else if (unlockedCharacters.includes('ssj2')) {
    currentCharacter = characters.ssj2;
    player.speed = 5 * currentCharacter.speedMultiplier
  }
});

const buyFredrickButton = document.createElement('button');
buyFredrickButton.textContent = "Buy Fredrick (50000 Coins)";
characterShopPanel.appendChild(buyFredrickButton);

buyFredrickButton.addEventListener('click', () => {
    if (coins >= 50000 && !unlockedCharacters.includes('fredrick')) {
        coins -= 50000;
        unlockedCharacters.push('fredrick');
        currentCharacter = characters.fredrick;
        player.speed *= currentCharacter.speedMultiplier;
        buyFredrickButton.textContent = "Select Fredrick";
    } else if (unlockedCharacters.includes('fredrick')) {
        currentCharacter = characters.fredrick;
        player.speed = 5 * currentCharacter.speedMultiplier;
    }
});

const buyBartholomewButton = document.createElement('button');
buyBartholomewButton.textContent = "Buy Bartholomew (250000 Coins)";
characterShopPanel.appendChild(buyBartholomewButton);

buyBartholomewButton.addEventListener('click', () => {
    if (coins >= 250000 && !unlockedCharacters.includes('bartholomew')) {
        coins -= 250000;
        unlockedCharacters.push('bartholomew');
        currentCharacter = characters.bartholomew;
        player.speed *= currentCharacter.speedMultiplier;
        buyBartholomewButton.textContent = "Select Bartholomew";
    } else if (unlockedCharacters.includes('bartholomew')) {
        currentCharacter = characters.bartholomew;
        player.speed = 5 * currentCharacter.speedMultiplier;
    }
});

const buyWilfredButton = document.createElement('button');
buyWilfredButton.textContent = "Buy Wilfred (450000 Coins)";
characterShopPanel.appendChild(buyWilfredButton);

buyWilfredButton.addEventListener('click', () => {
    if (coins >= 450000 && !unlockedCharacters.includes('wilfred')) {
        coins -= 450000;
        unlockedCharacters.push('wilfred');
        currentCharacter = characters.wilfred;
        player.speed *= currentCharacter.speedMultiplier;
        buyWilfredButton.textContent = "Select Wilfred";
    } else if (unlockedCharacters.includes('wilfred')) {
        currentCharacter = characters.wilfred;
        player.speed = 5 * currentCharacter.speedMultiplier;
    }
});

const buysmartbutton = document.createElement('button');
buysmartbutton.textContent = "Buy smartschoolboy9 (7 Gems)";
characterShopPanel.appendChild(buysmartbutton );

buysmartbutton.addEventListener('click', () => {
    if (gems >= 7 && !unlockedCharacters.includes('smartschool')) {
        gems -= 7;
        unlockedCharacters.push('smartschool');
        currentCharacter = characters.smartschool;
        player.speed *= currentCharacter.speedMultiplier;
        buysmartbutton.textContent = "Select smartschoolboy9";
    } else if (unlockedCharacters.includes('smartschool')) {
        currentCharacter = characters.smartschool;
        player.speed = 5 * currentCharacter.speedMultiplier;
    }
});

const buymrbeast = document.createElement('button');
buymrbeast.textContent = "Buy MrBeast (20 Gems)";
characterShopPanel.appendChild(buymrbeast );

buymrbeast.addEventListener('click', () => {
    if (gems >= 20 && !unlockedCharacters.includes('mrbeast')) {
        gems -= 20;
        unlockedCharacters.push('mrbeast');
        currentCharacter = characters.mrbeast;
        player.speed *= currentCharacter.speedMultiplier;
        buymrbeast.textContent = "Select MrBeast";
    } else if (unlockedCharacters.includes('mrbeast')) {
        currentCharacter = characters.mrbeast;
        player.speed = 5 * currentCharacter.speedMultiplier;
    }
});

document.getElementById('characterShopButton').addEventListener('click', () => {
    characterShopPanel.style.display = characterShopPanel.style.display === 'none' ? 'block' : 'none';
});

let debugMode = false;
let guaranteedWin = false;

function createDebugPanel() {
    const debugPanel = document.createElement('div');
    debugPanel.id = 'debugPanel';
    debugPanel.style.position = 'fixed';
    debugPanel.style.top = '50%';
    debugPanel.style.left = '50%';
    debugPanel.style.transform = 'translate(-50%, -50%)';
    debugPanel.style.backgroundColor = '#333';
    debugPanel.style.padding = '20px';
    debugPanel.style.borderRadius = '5px';
    debugPanel.style.display = 'none';

    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.placeholder = 'Enter debug password';

    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit';

    const coinInput = document.createElement('input');
    coinInput.type = 'number';
    coinInput.placeholder = 'Enter coin amount';
    coinInput.style.display = 'none';

    const gemInput = document.createElement('input');
    gemInput.type = 'number';
    gemInput.placeholder = 'Enter gem amount';
    gemInput.style.display = 'none';

    const addCoinsButton = document.createElement('button');
    addCoinsButton.textContent = 'Add Coins';
    addCoinsButton.style.display = 'none';

    const addGemsButton = document.createElement('button');
    addGemsButton.textContent = 'Add Gems';
    addGemsButton.style.display = 'none';

    const lottoToggleButton = document.createElement('button');
    lottoToggleButton.textContent = 'Toggle Lottery Win Rate';
    lottoToggleButton.style.display = 'none';

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close Debug Menu';
    closeButton.style.marginTop = '10px';

    lottoToggleButton.addEventListener('click', () => {
        guaranteedWin = !guaranteedWin;
        lottoToggleButton.textContent = guaranteedWin ? 'Lottery Win: ON' : 'Toggle Lottery Win Rate';
    });

    submitButton.addEventListener('click', () => {
        if (passwordInput.value === 'dadnameharold') {
            passwordInput.style.display = 'none';
            submitButton.style.display = 'none';
            coinInput.style.display = 'block';
            gemInput.style.display = 'block';
            addCoinsButton.style.display = 'block';
            addGemsButton.style.display = 'block';
            lottoToggleButton.style.display = 'block';
        }
    });

    addCoinsButton.addEventListener('click', () => {
        coins += parseInt(coinInput.value) || 0;
    });

    addGemsButton.addEventListener('click', () => {
        gems += parseInt(gemInput.value) || 0;
    });

    closeButton.addEventListener('click', () => {
        debugPanel.style.display = 'none';
        debugMode = false;
    });

    debugPanel.appendChild(passwordInput);
    debugPanel.appendChild(submitButton);
    debugPanel.appendChild(coinInput);
    debugPanel.appendChild(gemInput);
    debugPanel.appendChild(addCoinsButton);
    debugPanel.appendChild(addGemsButton);
    debugPanel.appendChild(lottoToggleButton);
    debugPanel.appendChild(closeButton);
    document.body.appendChild(debugPanel);

    return debugPanel;
}

respawnButton.addEventListener('click', () => {
    square.x = player.x;
    square.y = player.y;
    square.velocity.x = 0;
    square.velocity.y = 0;
});

function toggleEquipBottle() {
    if (equippedWeapon === "Bottle") {
        equippedWeapon = null;
        equipButtonBottle.textContent = "Equip Bottle";
    } else if (inventory.includes("Bottle")) {
        equippedWeapon = "Bottle";
        equipButtonBottle.textContent = "Unequip Bottle";
    }
    updateInventoryDisplay();
}

function toggleEquipBelt() {
    if (equippedWeapon === "Belt") {
        equippedWeapon = null;
        equipButtonBelt.textContent = "Equip Belt";
    } else if (inventory.includes("Belt")) {
        equippedWeapon = "Belt";
        equipButtonBelt.textContent = "Unequip Belt";
    }
    updateInventoryDisplay();
}

function toggleEquipWhip() {
    if (equippedWeapon === "Whip") {
        equippedWeapon = null;
        equipButtonWhip.textContent = "Equip Whip";
    } else if (inventory.includes("Whip")) {
        equippedWeapon = "Whip";
        equipButtonWhip.textContent = "Unequip Whip";
    }
    updateInventoryDisplay();
}

function toggleEquipMace() {
    if (equippedWeapon === "Mace") {
        equippedWeapon = null;
        equipButtonMace.textContent = "Equip Mace";
    } else if (inventory.includes("Mace")) {
        equippedWeapon = "Mace";
        equipButtonMace.textContent = "Unequip Mace";
    }
    updateInventoryDisplay();
}

function toggleEquipKnife() {
    if (equippedWeapon === "Knife") {
        equippedWeapon = null;
        equipButtonKnife.textContent = "Equip Knife";
    } else if (inventory.includes("Knife")) {
        equippedWeapon = "Knife";
        equipButtonKnife.textContent = "Unequip Knife";
    }
    updateInventoryDisplay();
}

function toggleEquipSword() {
  if (equippedWeapon === "Sword") {
    equippedWeapon = null;
    equipButtonSword.textContent = "Equip Sword";
  } else if (inventory.includes("Sword")) {
    equippedWeapon = "Sword"
    equipButtonSword.textContent = "Unequip Sword";
  }
  updateInventoryDisplay();
}

function toggleEquipPistol() {
    if (equippedWeapon === "Pistol") {
        equippedWeapon = null;
        equipButtonPistol.textContent = "Equip Pistol";
    } else if (inventory.includes("Pistol")) {
        equippedWeapon = "Pistol";
        equipButtonPistol.textContent = "Unequip Pistol";
    }
    updateInventoryDisplay();
}

function toggleEquipRevolver() {
    if (equippedWeapon === "Revolver") {
        equippedWeapon = null;
        equipButtonRevolver.textContent = "Equip Revolver";
    } else if (inventory.includes("Revolver")) {
        equippedWeapon = "Revolver";
        equipButtonRevolver.textContent = "Unequip Revolver";
    }
    updateInventoryDisplay();
}

function toggleEquipSMG() {
  if (equippedWeapon === "SMG") {
    equippedWeapon = null;
    equipButtonSMG.textContent = "Equip SMG";
  } else if (inventory.includes("SMG")) {
    equippedWeapon = "SMG";
    equipButtonSMG.textContent = "Unequip SMG";
  }
  updateInventoryDisplay();
}

function toggleEquipAK() {
  if (equippedWeapon === "AK-47") {
    equippedWeapon = null;
    equipButtonSMG.textContent = "Equip AK-47";
  } else if (inventory.includes("AK-47")) {
    equippedWeapon = "AK-47";
    equipButtonSMG.textContent = "Unequip AK-47";
  }
  updateInventoryDisplay();
}

function toggleEquipChainsaw() {
    if (equippedWeapon === "Chainsaw") {
        equippedWeapon = null;
        equipButtonChainsaw.textContent = "Equip Chainsaw";
    } else if (inventory.includes("Chainsaw")) {
        equippedWeapon = "Chainsaw";
        equipButtonChainsaw.textContent = "Unequip Chainsaw";
    }
    updateInventoryDisplay();
}

function toggleEquipLunchly() {
    if (equippedWeapon === "Lunchly") {
        equippedWeapon = null;
        equipButtonLunchly.textContent = "Equip Lunchly";
    } else if (inventory.includes("Lunchly")) {
        equippedWeapon = "Lunchly";
        equipButtonLunchly.textContent = "Unequip Lunchly";
    }
    updateInventoryDisplay();
}

function toggleEquipMinigun() {
    if (equippedWeapon === "Minigun") {
        equippedWeapon = null;
        equipButtonMinigun.textContent = "Equip Minigun";
    } else if (inventory.includes("Minigun")) {
        equippedWeapon = "Minigun";
        equipButtonMinigun.textContent = "Unequip Minigun";
    }
    updateInventoryDisplay();
}

function toggleEquipLighterSpray() {
    if (equippedWeapon === "Lighter + Hair spray") {
        equippedWeapon = null;
        equipButtonLighterSpray.textContent = "Equip Lighter + Hair spray";
    } else if (inventory.includes("Lighter + Hair spray")) {
        equippedWeapon = "Lighter + Hair spray";
        equipButtonLighterSpray.textContent = "Unequip Lighter + Hair spray";
    }
    updateInventoryDisplay();
}

function toggleEquipDragonBreath() {
    if (equippedWeapon === "Dragon's Breath") {
        equippedWeapon = null;
        equipButtonDragonBreath.textContent = "Equip Dragon's Breath";
    } else if (inventory.includes("Dragon's Breath")) {
        equippedWeapon = "Dragon's Breath";
        equipButtonDragonBreath.textContent = "Unequip Dragon's Breath";
    }
    updateInventoryDisplay();
}

function addToInventory(item) {
    if (!inventory.includes(item)) {
        inventory.push(item);
        updateInventoryDisplay();
    }
}

function updateInventoryDisplay() {
    inventoryItemsList.innerHTML = '';
    inventory.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        inventoryItemsList.appendChild(li);
    });
    inventoryPanel.style.display = inventory.length > 0 ? 'block' : 'none';
}

shopButton.addEventListener('click', () => {
    shopPanel.style.display = shopPanel.style.display === 'none' ? 'block' : 'none';
    updateShopDisplay();
});

function updateShopDisplay() {
    shopItemsList.innerHTML = '';
    shopItemsList.appendChild(bottleLi);
    shopItemsList.appendChild(beltLi);
}

buyBottleButton.addEventListener('click', () => {
    if (coins >= 10) {
        coins -= 10;
        addToInventory("Bottle");
        updateInventoryDisplay();
        updateShopDisplay();
        console.log(`Coins: ${coins}`);
    } else {
        alert("Not enough coins to buy the Bottle!");
    }
});

buyBeltButton.addEventListener('click', () => {
    if (coins >= 150) {
        coins -= 150;
        addToInventory("Belt");
        updateInventoryDisplay();
        updateShopDisplay();
        console.log(`Coins: ${coins}`);
    } else {
        alert("Not enough coins to buy the Belt!");
    }
});

function update() {
    if (keys.w && player.y > 0) player.y -= player.speed;
    if (keys.s && player.y < canvas.height - player.height) player.y += player.speed;
    if (keys.a && player.x > 0) player.x -= player.speed;
    if (keys.d && player.x < canvas.width - player.width) player.x += player.speed;

    if (player.x < house.x + house.width && player.x + player.width > house.x &&
        player.y < house.y + house.height && player.y + player.height > house.y) {
        currentArea = "House";
    }

    if (currentArea === "House" && player.x < exitBox.x + exitBox.width &&
        player.x + player.width > exitBox.x && player.y < exitBox.y + exitBox.height &&
        player.y + player.height > exitBox.y) {
        currentArea = "Outside";
    }

    if (currentArea === "House" && player.x < square.x + square.width &&
        player.x + player.width > square.x && player.y < square.y + square.height &&
        player.y + player.height > square.y) {
        if (canHitSquare) {
            let coinReward = 5;
              if (equippedWeapon === "Bottle") {
                coinReward *= 2;
              } else if (equippedWeapon === "Belt") {
                coinReward *= 3;
              } else if (equippedWeapon === "Whip") {
                coinReward *= 5;
              } else if (equippedWeapon === "Mace") {
                coinReward *= 10;
              } else if (equippedWeapon === "Knife") {
                coinReward *= 15;
              } else if  (equippedWeapon === "Sword") {
                coinReward *= 25;
              } else if (equippedWeapon === "Pistol") {
                coinReward *= 50;
              } else if (equippedWeapon === "Revolver") {
                coinReward *= 100;
              } else if (equippedWeapon === "SMG") {
                coinReward *= 200;
              } else if (equippedWeapon === "AK-47") {
                coinReward *= 500;
              } else if (equippedWeapon === "Chainsaw") {
                coinReward *= 1000;
              } else if (equippedWeapon === "Lunchly") {
                coinReward *= 2500;
              } else if (equippedWeapon === "Minigun") {
                coinReward *= 5000;
              } else if (equippedWeapon === "Lighter + Hair spray") {
                coinReward *= 20000;
              } else if (equippedWeapon === "Dragon's Breath") {
                coinReward *= 100000;
              }
            coinReward *= currentCharacter.coinMultiplier;
            coinReward *= childSupportMultiplier; // Apply the child support multiplier
            coins += Math.floor(coinReward);
            const randomMessage = squareMessages[Math.floor(Math.random() * squareMessages.length)];
            const messageX = square.x + square.width / -4;
            const messageY = square.y - 20;
            ctx.fillStyle = "#fcf403";
            ctx.font = "12px Times new Roman";
            ctx.textAlign = "center";
            ctx.fillText(randomMessage, messageX, messageY);
            console.log(`Coins: ${coins}`);

            const hitDirectionX = (player.x + player.width / 2) - (square.x + square.width / 2);
            const hitDirectionY = (player.y + player.height / 2) - (square.y + square.height / 2);
            const magnitude = Math.sqrt(hitDirectionX * hitDirectionX + hitDirectionY * hitDirectionY);

            if (magnitude !== 0) {
                square.velocity.x = (hitDirectionX / magnitude) * 5;
                square.velocity.y = (hitDirectionY / magnitude) * 5;
            }
            canHitSquare = false;
            setTimeout(() => {
                canHitSquare = true;
            }, 1000);
        }
    }

    square.x += square.velocity.x;
    square.y += square.velocity.y;
    square.velocity.x *= square.friction;
    square.velocity.y *= square.friction;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

if (currentArea === "House") {
    if (houseBackgroundLoaded) {
        ctx.drawImage(houseBackgroundImage, 0, 0, canvas.width, canvas.height);
    } else {
        ctx.fillStyle = "#8B0000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    ctx.drawImage(squareImage, square.x, square.y, square.width, square.height);
} else {
    ctx.fillStyle = "lightgreen";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(houseImage, house.x, house.y, house.width, house.height);
}

    ctx.drawImage(currentCharacter.image, player.x, player.y, player.width, player.height);
    ctx.fillStyle = "yellow";
    ctx.font = "16px Arial";
    ctx.fillText(`Coins: ${abbreviateNumber(coins)}`, 300, 20);

    ctx.fillStyle = "blue";
    ctx.font = "16px Arial";
    ctx.fillText(`Gems: ${abbreviateNumber(gems)}`, 300, 40);

    requestAnimationFrame(update);
}

window.addEventListener('keydown', (e) => {
    if (e.key === 'w') keys.w = true;
    if (e.key === 'a') keys.a = true;
    if (e.key === 's') keys.s = true;
    if (e.key === 'd') keys.d = true;
    if (e.key === 'o' || e.key === 'O') {
        const debugPanel = document.getElementById('debugPanel') || createDebugPanel();
        debugPanel.style.display = 'block';
        debugMode = true;
    }
});

window.addEventListener('keyup', (e) => {
    if (e.key === 'w') keys.w = false;
    if (e.key === 'a') keys.a = false;
    if (e.key === 's') keys.s = false;
    if (e.key === 'd') keys.d = false;
});

equipButtonBottle.addEventListener('click', toggleEquipBottle);
equipButtonBelt.addEventListener('click', toggleEquipBelt);
equipButtonWhip.addEventListener('click', toggleEquipWhip);
equipButtonMace.addEventListener('click', toggleEquipMace);
equipButtonKnife.addEventListener('click', toggleEquipKnife);
equipButtonSword.addEventListener('click', toggleEquipSword);
equipButtonPistol.addEventListener('click', toggleEquipPistol);
equipButtonRevolver.addEventListener('click', toggleEquipRevolver);
equipButtonSMG.addEventListener('click', toggleEquipSMG);
equipButtonak.addEventListener('click', toggleEquipAK);
equipButtonChainsaw.addEventListener('click', toggleEquipChainsaw);
equipButtonLunchly.addEventListener('click', toggleEquipLunchly);
equipButtonMinigun.addEventListener('click', toggleEquipMinigun);
equipButtonLighterSpray.addEventListener('click', toggleEquipLighterSpray);
equipButtonDragonBreath.addEventListener('click', toggleEquipDragonBreath);

const inventoryToggle = document.getElementById('inventoryToggle');
inventoryToggle.addEventListener('click', () => {
    inventoryPanel.style.display = inventoryPanel.style.display === 'none' ? 'block' : 'none';
});

update();
