// To run this assignment, right click on index.html in the Visual Studio Code file explorer to the left
// and select "Open with Live Server"

// YOUR CODE HERE!
let emptyDataObject = {}
let questionArray = []
let currentQuestionIndex = 1
let currentArrayIndex = 0
let currentQuestionText = ""
let currentQuestionValue = 0
let previousAnswerText = ""
let currentAnswerText = ""
let userAnswer = ""
let currentCategory
let categoryID
let gamesPlayed = 0
let hintMessage = ""
//Elements
let answerBox = document.querySelector(".answer-box")
let answerButton = document.querySelector(".answer-button")
const registerDiv = document.querySelector(".register-display")
const appDiv = document.querySelector(".app-display")
let questDiv = document.querySelector(".question-display")
const userNameInput = document.querySelector(".name-input")
let userNameInputValue
const startButton = document.querySelector(".start-button")
const reStartButton = document.querySelector(".reStart-button")
const swapButton = document.querySelector(".swap-button")
const nameHeaderElement = document.querySelector(".name-banner")
const hintButton = document.createElement("button")
let hintTook = false
const scoreDiv = document.querySelector(".score-display")
const moneyScoreDiv = document.querySelector(".moneyscore-display")
const correctMessageElement = document.querySelector(".correctMessagePara")
let gameScore = 0
let moneyScore = 0
const instructionDiv = document.querySelector(".instruct")
const instructionDivWhole = document.querySelector(".instructWhole ")
function userScoreHTML() {
    let userScore = `<h2>Game Score<h2>
                ${gameScore}`
    return userScore
}
scoreDiv.innerHTML = userScoreHTML()

function moneyScoreHTML() {
    let score = `<h2>Money<h2>
                \$ ${moneyScore}`
    return score
}

moneyScoreDiv.innerHTML = moneyScoreHTML()

//Functions

function showHideElement(element) {
    if (element.style.display === "block" || element.style.display === "flex") {
        element.style.display = "none"
    } else {
        element.style.display === "block"
    }
}

function fetchRandomQuestions() {
    fetch(`https://jservice.io/api/random`)
        .then((response) => response.json())
        .then((data) => {
            const randomCategoryID = data[0].category.id;
            fetch('https://jservice.io/api/clues?' + new URLSearchParams({
                category: randomCategoryID
            }))
                .then((res) => res.json())
                .then(data => {
                    data.unshift(emptyDataObject)
                    questionArray.push(data)
                })
        })
}
fetchRandomQuestions()

// AOS.init({
//     duration: 1200,
//   })

function formAnswer(word) {
    // let special = [/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/]
    // let special1 = ["/$/"]
    // console.log(special1.includes())
    // let newWord = ""
    // for (let index = 0; index < word.length; index++) {
    //     let currentLetter = word[index];
    //     if(!special.includes(currentLetter)){
    //         newWord += currentLetter
    //     }
    // }
    return word.toLowerCase().replace(/(<([^>]+)>)/ig, '')
}
function resetGame() {
    if (gamesPlayed === 0) {
        startButton.style.display = "block"
        userNameInput.style.display = "block"
        instructionDiv.style.display = "block"
        reStartButton.style.display = "none"
        nameHeaderElement.innerText = ""
        swapButton.style.display = "none"
    } else {
        hintTook = false
        currentQuestionIndex = 1
        currentArrayIndex = 0
        questionArray = []
        currentQuestionText = ""
        currentAnswerText = ""
        gameScore = 0
        questDiv.innerHTML = ""
        scoreDiv.innerHTML = userScoreHTML()
        moneyScoreDiv.innerHTML = moneyScoreHTML()
    }

}
function randomNumGen(min, max) {
    return Math.floor(Math.random() * (max - min) + min)

}
function getRandomcategoryID() {

    fetch(`https://jservice.io/api/random`)
        .then((response) => response.json())
        .then((data) => {
            categoryID = data[0].category.id
            console.log(categoryID)
        })
}

function getQuestion() {
    return `<h3>Question #${currentQuestionIndex}</h3><p>${questionArray[currentArrayIndex][currentQuestionIndex].question}.</p>`

}
function getNextQuestion() {

    return `<h3>Question #${currentQuestionIndex}</h3><p>${questionArray[currentArrayIndex][currentQuestionIndex].question}.</p>`
}
function getCategoryHTML() {
    let category = `<h3>Category</h3>
<h1 style= text-align: "center">${questionArray[currentArrayIndex][currentQuestionIndex].category.title}</h1>`.toLocaleUpperCase()
    return category
}

function getQuestionValueHTML(value) {
    return `
<p>\$${value}</p>`
}
function displayQuestion() {
    console.log(questionArray)
    currentQuestionText = questionArray[currentArrayIndex][currentQuestionIndex].question
    currentAnswerText = questionArray[currentArrayIndex][currentQuestionIndex].answer
    currentQuestionValue = questionArray[currentArrayIndex][currentQuestionIndex].value
    console.log("Question: ", currentQuestionText, "answer: ", currentAnswerText)
    //     function getQuestionHTML() {
    //         let questionHTML = `<h3>Question #${currentQuestionIndex}</h3>
    // ${questionArray[currentArrayIndex][currentQuestionIndex].question}.`
    //         return questionHTML
    //     }

    questDiv.innerHTML += getCategoryHTML()
    questDiv.innerHTML += getQuestion()
    questDiv.innerHTML += getQuestionValueHTML(currentQuestionValue)
    let hintWarningElement = document.createElement("p")
    hintWarningElement.style.fontSize = "small"
    let hintWarningMessage = `"If you take hint, you get half of the money."`
    hintWarningElement.append(hintWarningMessage)
    hintButton.classList.add("hint")
    hintButton.innerText = "Hint"
    hintButton.style.display = "none"
    hintButton.addEventListener("click", function (event) {
        event.preventDefault()
        hintTook = true
        hintMessage = `The Answer Starts with an ${formAnswer(currentAnswerText).slice(0, 2).toUpperCase()} and ends with ${formAnswer(currentAnswerText).slice(-2,).toUpperCase()}`
        const tempValue = currentQuestionValue / 2
        questDiv.lastChild.innerHTML = `\$${tempValue}`
        questDiv.innerHTML += hintMessage
    })
    nameHeaderElement.append(hintButton)


    setTimeout(() => {
        hintButton.style.display = "block"
        nameHeaderElement.append(hintWarningElement)
    }, 10000)

}

let windowfeatures = "width = 100, height=120, toolbar=0, status =0"

function openCorrectMessage() {
    var correctMessage
    correctMessageElement.style.display = "block"
    if (currentQuestionIndex === questionArray[currentArrayIndex].length) {
        questDiv.innerHTML = ""
        let para = document.createElement("p")
        para.classList.add = "catComplete"
        correctMessage = `Congratulations ${userNameInputValue}, You are a Master of the ${questionArray[currentArrayIndex][currentQuestionIndex - 1].category.title}!!! 
        Please Swap Categories to continue.`
        para.append(correctMessage)
        questDiv.append(para)
    } else {
        correctMessage = `${userNameInputValue}, That is Correct,`
        correctMessage += "<br>"
        correctMessage += `Your Score is ${gameScore}.`
        correctMessage += "<br>"
        correctMessage += `You have \$${moneyScore} dollars.`
        console.log(correctMessage)
    }
    let correctAudio = document.createElement("audio")
    correctAudio.src = "https://a.tumblr.com/tumblr_lsyzfdXgyU1qhnj8eo1.mp3"
    correctAudio.autoplay = true
    correctMessageElement.innerHTML = correctMessage
    setTimeout(function () { return showHideElement(correctMessageElement) }, 5000)
}

function openYouLoseMessage() {
    gamesPlayed += 1
    let loserAudio = document.createElement("audio")
    loserAudio.src = "http://instantrimshot.com/audio/priceiswrong.mp3"
    loserAudio.autoplay = true
    var loserMessage = `<p style="font-size: 28px"/>Sorry, ${userNameInputValue} that is incorrect, the correct answer is ${currentAnswerText}</p>`
    questDiv.innerHTML = loserMessage
    setTimeout(function () { questDiv.innerHTML += `<p>Your final score is ${gameScore} with a bank of ${moneyScore}</p>` }, 1000)
    setTimeout(function () { questDiv.innerHTML += `<h1>"Press Re-Start, to Try Again"</h1>` }, 7000)
}
//EventListeners for Start Button, runs displayQuestion, Appends name & hides nameInput

startButton.addEventListener("click", function (event) {
    event.preventDefault()
    // if(questionArray.length > 1){
    //     fetchRandomQuestions()
    // }
    userNameInputValue = userNameInput.value.toUpperCase()
    // if you dont put your name is the only time I use alerts Please dont punish me, I just want you to play.
    if (userNameInput.value === "" || userNameInput.value === null) {
        return alert("Please Enter your name to Start.")
    } else {
        if (gamesPlayed > 0) {
            fetchRandomQuestions()
        }
        //if there is no Name already there
        if (nameHeaderElement.childElementCount === 0) {
            let nameHeading = document.createElement("h3")
            nameHeading.innerText = userNameInputValue
            nameHeaderElement.append(nameHeading)
            userNameInput.value = ""
        }
        userNameInput.style.display = "none"
        startButton.style.display = "none"
        reStartButton.style.display = "block"
        instructionDivWhole.style.display = "none"

        swapButton.style.display = "block"
        answerBox.setAttribute('autofocus', 'autofocus')
        setTimeout(() => {
            displayQuestion()

        }, 1000)
    }
})
// startButton.addEventListener("click", displayQuestion)

//EventListener for AnswerButton, checks Answer, Increments Score & Question Index  
answerButton.addEventListener("click", function (event) {
    event.preventDefault()
    userAnswer = answerBox.value
    let comparedAnswer = formAnswer(currentAnswerText)
    let userComparedAnswer = formAnswer(userAnswer)

    // check answer if its blank alert, if its correct, 
    if (userAnswer === "") {
        alert("You must enter in an Answer")
    }
    //check if the answer is correct
    else if (comparedAnswer.includes(userComparedAnswer)) {
        gameScore += 1
        //if HintButton is press, add half money
        if (hintTook) {
            moneyScore += currentQuestionValue / 2
        } else {
            moneyScore += currentQuestionValue
        }
        //Increment to prepare for Next Question, while recording the last answer 
        currentQuestionIndex += 1
        previousAnswerText = currentAnswerText
        //Tell the User they are Correct
        openCorrectMessage()
        //changes the score
        scoreDiv.innerHTML = userScoreHTML()
        moneyScoreDiv.innerHTML = moneyScoreHTML()
        let question = questDiv.lastChild
        //if you reach the end of the category, you win, but can continue....
        if (currentQuestionIndex === questionArray[0].length) {
            questionArray = []
            currentQuestionIndex = 1

        } else {
            hintTook = false
            hintButton.style.display = "none"
            setTimeout(function () { questDiv.innerHTML = "" }, 2000)
            currentQuestionText = questionArray[currentArrayIndex][currentQuestionIndex].question
            currentAnswerText = questionArray[currentArrayIndex][currentQuestionIndex].answer
            console.log("Question: ", currentQuestionText, "answer: ", currentAnswerText)
            setTimeout(function () {
                questDiv.innerHTML += getCategoryHTML()
                questDiv.innerHTML += getQuestion()
                questDiv.innerHTML += getQuestionValueHTML(currentQuestionValue)
                setTimeout(() => { hintButton.style.display = "block" }, 10000)

            }, 2000)
        }



    } else {
        //when you lose, everything resets, Losing message shows, and Name Input & Instructions shows again
        questDiv.innerHTML = ""
        swapButton.style.display = "none"
        console.log("You Lose")
        openYouLoseMessage()
        setTimeout(() => { resetGame() }, 5000)


    }
    answerBox.value = ""
})

//EventListener for Swap Categories
swapButton.addEventListener("click", function () {
    questionArray = []
    fetchRandomQuestions()
    questDiv.innerHTML = ""
    currentQuestionIndex = 1
    setTimeout(() => {
        displayQuestion()

    }, 2000);

})

reStartButton.addEventListener("click", function () {
    gamesPlayed += 1
    resetGame()
    fetchRandomQuestions()
    setTimeout(() => { displayQuestion() }, 2000)


})



