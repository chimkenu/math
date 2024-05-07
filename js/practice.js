// Timer
setInterval(function() {
    document.getElementById("time-elapsed").innerHTML = parseInt(document.getElementById("time-elapsed").innerHTML) + 1;
}, 1000);

// Constants
const PLACE_VALUES = ["Ones", "Tens", "Hundreds", "Thousands", "Ten Thousands", "Hundred Thousands"];
const OPERATIONS = ['*'];


function generateQuestion() {
    var random = Math.random();
    if (random < 0.05) {
        findPlaceValueQuestion();
    } else {
        // arithmetic
        random = Math.random();
        arithmeticQuestion(2);
    }
}



function findPlaceValueQuestion() {
     // Generate digits of a number
     const digits = {};
     for (var i = 0; i < 6; i++) {
         digits[i] = Math.floor(Math.random() * 10);
     }
 
     // Generate answer from random element in PLACE_VALUES
     const answer = Math.floor(Math.random() * PLACE_VALUES.length);
 
     // Display the number
     for (var i = 5; i >= 0; i--) {
         const digit = document.createElement("a");
         const digitValue = document.createTextNode(digits[i]);
         digit.appendChild(digitValue);
         digit.dataset.place_value = i;
         digit.addEventListener("click", function() {
             revealAnswer(this, this.dataset.place_value == answer);
         });
         document.getElementById("number").appendChild(digit);
     }
 
     // Create the question
     document.getElementById("question").innerHTML = `What is the digit in the ${PLACE_VALUES[answer]} place?`;
}

function arithmeticQuestion(difficulty) {
    const operation = OPERATIONS[Math.floor(Math.random() * OPERATIONS.length)];
    console.log(10**difficulty);

    const a = Math.floor(Math.random() * 10**difficulty);
    const b = Math.floor(Math.random() * 10**difficulty);
    
    var answer = a + b;
    switch (operation) {
        case "-":
            answer = a - b;
            break;
        case "*":
            answer = a * b;
            break;
        case "/":
            answer = a / b;
    }
    
    const question = document.createElement("p");
    question.innerHTML = a + " " + operation + " " + b + " = ?";

    const answerable = document.createElement("input");
    answerable.type = "text";

    question.appendChild(answerable);

    document.getElementById("number").appendChild(question);
    document.getElementById("question").innerHTML = "What is the answer?";

    const reveal = document.createElement("a");
    reveal.innerHTML = "(Check answer)";
    reveal.addEventListener("click", function() {
        revealAnswer(this, answerable.value == answer);
    });

    document.getElementById("question").appendChild(reveal);
}

function revealAnswer(object, isCorrect) {
    document.getElementById(isCorrect ? "right-answer" : "wrong-answer").play();
    document.getElementById(isCorrect ? "rights" : "wrongs").innerHTML = parseInt(document.getElementById(isCorrect ? "rights" : "wrongs").innerHTML) + 1;
    alert(isCorrect ? "Correct!" : "Try Again.");
    if (isCorrect) {
        // Clear numbers
        const parent = document.getElementById("number");
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }

        generateQuestion();
    }
}