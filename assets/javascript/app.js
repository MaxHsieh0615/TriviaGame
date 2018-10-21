$("#start").on("click", function () {
    $("#start").remove();
    game.loadQuestion();
})

$(document).on("click", ".answer-button", function (e) {
    game.clicked(e);
})
$(document).on("click", "#reset", function () {
    game.reset();
})

let questions = [
    {
        question: "Which NBA team played at Amway Arena 1989-1510?",
        answers: ["Golden State Warriors", "Orlando Magic", "Washington Wizards", "Chicago Bulls"],
        correctAnswer: "Orlando Magic",
    },
    {
        question: "What was the first team to have both the Slam Dunk contest and Three-point shootout champions in the same year?",
        answers: ["Dallas Mavericks", "Cleverland Cavaliers", "Miami Heat", "Los Angeles Lakers"],
        correctAnswer: "Miami Heat",
    },
    {
        question: "What was the original name of the NBA?",
        answers: ["BAA", "AAB", "BAB", "ABA"],
        correctAnswer: "BAA",
    },
    {
        question: "What team won the 1956-57 championship?",
        answers: ["Boston Celtics", "Los Angeles Lakers", "Seattle Sonics", "Detroit Pistons"],
        correctAnswer: "Boston Celtics",
    },
    {
        question: "Which player was draft 13th overall in the 1996 draft?",
        answers: ["Allen Iverson", "Ray Allen", "Kobe Bryant", "Steve Nash"],
        correctAnswer: "Kobe Bryant",
    },
    {
        question: "Which one of these players had 40 rebounds, setting a record record twice in a NBA Finals game during the 1960s?",
        answers: ["Wilt Chamberlain", "Wes Unseld", "Elvin Hayes", "Bill Russell"],
        correctAnswer: "Bill Russell",
    },
    {
        question: "Bill Walton and Kareem Abdul-Jabbar (Lew Alcindor) attended the same college. Do you know which one?",
        answers: ["UCB", "UCSD", "UCI", "UCLA"],
        correctAnswer: "UCLA",
    },
    {
        question: "Which team was the only team to beat the Celtics at Boston Garden in the 1985-1986 season?",
        answers: ["Los Angeles Lakers", "San Antonio Spurs", "Atlanta Hawks", "Portland Trailblazers"],
        correctAnswer: "Portland Trailblazers",
    },
    {
        question: "Who won the NBA finals MVP reward in 2015",
        answers: ["Klay Thompson", "Andre Iguodala", "Stephen Curry", "Draymond Green"],
        correctAnswer: "Andre Iguodala",
    },
    {
        question: "Who was most considered the X-factor in Golden States Warriors' playoff series from 2016-2018",
        answers: ["Kevon Looney", "Damian Jones", "Patrick McCaw", "Javale McGee"],
        correctAnswer: "Javale McGee",
    }
]

let game = {
    questions: questions,
    currentQuestion: 0,
    counter: 15,
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    countdown: function () {
        game.counter--;
        $("#counter").html(game.counter);
        if (game.counter == 0) {
            console.log("Time up");
            game.timeUp();
        }
    },
    loadQuestion: function () {
        timer = setInterval(game.countdown, 1000);
        $("#btnContainer").html("<h3>Time remaining: <span id='counter'>15</span></h3>")
        $("#btnContainer").append("<h3>" + questions[game.currentQuestion].question + "</h3>");
        for (var i = 0; i < questions[game.currentQuestion].answers.length; i++) {
            $("#btnContainer").append('<button class="answer-button" id="button-' + i + '" data-name="' + questions[game.currentQuestion].answers[i] + '">' + questions[game.currentQuestion].answers[i] + '</button>');
        }
    },
    nextQuestion: function () {
        //same amount of time for each question
        game.counter = 15;
        $("#counter").html(game.counter);
        game.currentQuestion++;
        game.loadQuestion();
    },
    timeUp: function () {
        clearInterval(timer);
        game.unanswered++;
        $("#btnContainer").html("<h3>NO TIME</h3>");
        $("#btnContainer").append("<h3>The correct answer was " + questions[game.currentQuestion].correctAnswer + ".</h3>");
        if (game.currentQuestion == questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },
    results: function () {
        clearInterval(timer);
        $('#btnContainer').html("<h2>Your Results</h2>");
        $('#btnContainer').append("<h3>Correct: " + game.correct + "</h3>");
        $('#btnContainer').append("<h3>Incorrect: " + game.incorrect + "</h3>");
        $('#btnContainer').append("<h3>Unanswered: " + game.unanswered + "</h3>");
        $('#btnContainer').append("<button id='reset'>RESET</button>");
    },
    clicked: function (e) {
        //clear the timer
        clearInterval(timer);
        if ($(e.target).data("name") == questions[game.currentQuestion].correctAnswer) {
            game.answeredCorrectly();
        } else {
            game.answeredIncorrectly();
        }
    },
    answeredCorrectly: function () {
        console.log("YES");
        clearInterval(timer);
        game.correct++;
        $("#btnContainer").html("<h3>You got it! The correct answer was " + questions[game.currentQuestion].correctAnswer + "!!</h3>");
        //if its the last question go to result, if not then go on to the next question
        if (game.currentQuestion == questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },
    answeredIncorrectly: function () {
        console.log("NO");
        clearInterval(timer);
        game.incorrect++;
        $("#btnContainer").html("<h3>Wrong! The correct answer was " + questions[game.currentQuestion].correctAnswer + ".</h3>");
        if (game.currentQuestion == questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },
    reset: function () {
        game.currentQuestion = 0;
        game.correct = 0;
        game.incorrect = 0;
        game.unanswered = 0;
        game.countdown = 0;
        game.loadQuestion();
    }
}