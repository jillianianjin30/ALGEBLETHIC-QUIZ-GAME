const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [{
        question: 'Simplify this Algebraic Expression: 12r + 3 - 6r + 10',
        choice1: '7r + 8',
        choice2: '6r + 13',
        choice3: '8r + 11',
        choice4: '4r - 9',
        answer: 2,
    },
    {
        question: "Simplify this Algebraic Expression: -20y^2 +19y - 11 (y + 10)",
        choice1: "-20y^2 + 8y -1",
        choice2: "20y^2 - 8y -1",
        choice3: "-20y^3 + 2y -7",
        choice4: "-20y^2 + 10y -1",
        answer: 1,
    },
    {
        question: "Simplify this Algebraic Expression: 30x + 15 (2x - 8)",
        choice1: "12x - 8",
        choice2: "62y + 9",
        choice3: "60x - 120",
        choice4: "90 + 13x",
        answer: 3,
    },
    {
        question: "Simplify this Algebraic Expression: 10x - (8x + 6)",
        choice1: "2x - 6",
        choice2: "x + 6",
        choice3: "3x - 6",
        choice4: "2x + 6",
        answer: 1,
    },
    {
        question: "Simplify this Algebraic Expression: 5x + 8 -2x + 5",
        choice1: "3x + 13",
        choice2: "11x - 2",
        choice3: "2x + 9",
        choice4: "6 - 3x",
        answer: 1,
    },
    {
        question: "Simplify this Algebraic Expression: 8x + 9y -8x +6y",
        choice1: "6y",
        choice2: "18y",
        choice3: "2y",
        choice4: "15y",
        answer: 4,
    },
    {
        question: "Simplify this Algebraic Expression: 10xy + 8x\^2 + 6xy -11x\^2",
        choice1: "3xy + 16x^2",
        choice2: "16xy - 3x^2",
        choice3: "2x + 9",
        choice4: "9xy - 3x^2",
        answer: 2,
    },
    {
        question: "Simplify this Algebraic Expression: 12 (6x + 9)",
        choice1: "26x - 110",
        choice2: "41x + 101",
        choice3: "32x + 9",
        choice4: "72x + 108",
        answer: 4,
    },
    {
        question: "Simplify this Algebraic Expression: 5 (4x\^2 - 9x + 3)",
        choice1: "23x^2 - 65x + 13",
        choice2: "21x^2 - 36x + 16",
        choice3: "20x^2 - 45x + 15",
        choice4: "26x^2 - 53x + 12",
        answer: 3,
    },
    {
        question: "Simplify this Algebraic Expression: 5 (3x + 4) -8x +9",
        choice1: "7x + 29",
        choice2: "9x - 2",
        choice3: "5x + 9",
        choice4: "16x - 3x",
        answer: 1,
    },
    {
        question: "Factor this equation: x\^2 - 49 = 0",
        choice1: "x = -3, x = 3",
        choice2: "x = -5, x = 5",
        choice3: "x = -7, x = 7",
        choice4: "x = -9, x = 9",
        answer: 3,
    },
    {
        question: "Factor this equation: 3x\^2 - 75 = 0",
        choice1: "x = -3, x = 3",
        choice2: "x = -5, x = 5",
        choice3: "x = -7, x = 7",
        choice4: "x = -9, x = 9",
        answer: 2,
    },
    {
        question: "Factor this equation: 9x\^2 - 64 = 0",
        choice1: "x = -8/3, x = 8/3",
        choice2: "x = -8/5, x = 8/5",
        choice3: "x = -8/7, x = 8/7",
        choice4: "x = -8/9, x = 8/9",
        answer: 1,
    },
    {
        question: "Factor this equation: x\^2 -2x -15 = 0",
        choice1: "x = -3, x = 5",
        choice2: "x = 3, x = -5",
        choice3: "x = -3, x = -5",
        choice4: "x = 3, x = 5",
        answer: 1,
    },
    {
        question: "Factor this equation: x\^2 + 3x - 28 = 0",
        choice1: "x = 4, x = 7",
        choice2: "x = -4, x = -7",
        choice3: "x = -7, x = 4",
        choice4: "x = 4, x = -7",
        answer: 4,
    },
    {
        question: "Factor this equation: 8x\^2 + 2x - 15 = 0",
        choice1: "x = -2/3, x = 4/5",
        choice2: "x = -3/2, x = 5/4",
        choice3: "x = -2/7, x = 7/2",
        choice4: "x = -3/5, x = 5/3",
        answer: 2,
    },
    {
        question: "Factor this equation using quadratic formula: x\^2 - 2x - 15 = 0",
        choice1: "x = 5, x = 3",
        choice2: "x = -3, x = -5",
        choice3: "x = 5, x = -3",
        choice4: "x = 3, x = -5",
        answer: 3,
    },
    {
        question: "Factor this equation using quadratic formula: 8x^2 + 2x - 15 = 0",
        choice1: "x = -2/3, x = 4/5",
        choice2: "x = -3/2, x = 5/4",
        choice3: "x = -2/7, x = 7/2",
        choice4: "x = -3/5, x = 5/3",
        answer: 2,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 18

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()