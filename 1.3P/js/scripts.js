function changeText() {
    var textsArray = ["Hello", "Welcome", "Surya", "SIT725", "Web App"];
    var number = getRandomNumberBetween(0, textsArray.length - 1);
    document.getElementById("heading").innerHTML = textsArray[number];
}

function getRandomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}