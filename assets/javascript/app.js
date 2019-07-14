// Create variables for the game
var clockRunning = false;
var intervalId;
var time = 30;
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var questionCounter = 0;


// Create question and answer object
var questionAnswer = {
    question1: {
        question: "Which is the only American Football team to go a whole season undefeated, including the Super Bowl?",
        answers: {'a': "The Miami Dolphins, in 1972.",
                  'b': "The New England Patriots, in 2007.",
                  'c': "The Chicago Bears, in 1985.",
                  'd': "The Oakland Raiders, in 1967."
                 },
        correctAnswer: 'a'
    },
    question2: {
        question: "Which NFL team appeared in four consecutive Super Bowls from 1991 - 1994 and lost them all?",
        answers: {'a': "San Francisco 49ers",
                  'b': "Denver Broncos",
                  'c': "Buffalo Bills",
                  'd': "Oakland Raiders"
                },
        correctAnswer: 'c'
    },
    question3: {
        question: "Which boxer inflicted Muhammad Ali's first defeat in professional boxing?",
        answers: {'a': "Floyd Patterson",
                  'b': "Joe Frazier",
                  'c': "Ken Norton",
                  'd': "Sonny Liston"
                  },
        correctAnswer: 'b'
    },
    question4: {
        question: "How many NBA championships did Michael Jordan win with the Chicago Bulls?",
        answers: {'a': "3",
                  'b': "5",
                  'c': "8",
                  'd': "6"
                 },
        correctAnswer: 'd'
    },
    question5: {
        question: "Which country has won the most futbol (soccer) World Cups?",
        answers: {'a': "Argentina",
                  'b': "Germany",
                  'c': "Italy",
                  'd': "Brazil"},
        correctAnswer: 'd'
    }
};


// Create function to randomly store the keys of the questionAnswer object and return the shuffled array of keys
function randomQuestion(obj)
{
    var quesAnswerKeys = Object.keys(obj);

    function shuffle(array) {
        var currentIndex = array.length
        var temporaryValue;
        var randomIndex;

        /* Algorithm is known as the Fisher-Yates Shuffle algorithm
        
        While there are still elements remaining to shuffle through in the array,
        loop through the element(s). If current index is 0, then we would have looped
        through all elements of the array. 
        
        */
        while (0 != currentIndex)
        {
            // Pick a random element
            randomIndex = Math.floor(Math.random() * currentIndex); //randomIndex will not be great than n-1
            currentIndex -= 1;

            // Swap the random index with the current index
            // Store the current index to replace element value in random index
            temporaryValue = array[currentIndex]; 
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }
    return shuffle(quesAnswerKeys);
}

var shuffledQuestions = randomQuestion(questionAnswer);
var currentQuestion = questionAnswer[shuffledQuestions[questionCounter]];

// Create onclick event; when the Start div is pressed, the element is removed and the page content is loaded
$('#start-btn').on('click', loadPage);

/* loadPage function loads the content of the page and calls the start function which starts
the timer counting down from 30 seconds */ 
function loadPage()
{
    // Remove div with Start if it exists (only exists when the page is loaded)
    if ($('#start-btn'))
    {
        $('#start-btn').remove();
    }

    // Remove flex property from CSS style
    $('.container-1').css({"display" : 'block'});

    // Load the content of the page
    $('.container-1').append('<div id="box-1"><p>Totally Trivial Trivia</p>' + 
    '<h2>Time remaining: <a id="time"></a></h2></div>' +
    '<div class="Q-A"><div id="questions">Question Here</div>' +
    '<div class="answers">Answers Here</div></div>');

    loadQuestionAnswer();

    // start function starts the timer
    start();
}


function loadQuestionAnswer()
{
    $('#time').text(time + ' seconds');
    $('#questions').text(currentQuestion.question);
    $('.answers').html('<ol><li class="ans" value="a">' + 
                    currentQuestion.answers['a'] + '</li><li class="ans" value="b">' + 
                    currentQuestion.answers['b'] + '</li><li class="ans" value="c">' + 
                    currentQuestion.answers['c'] + '</li><li class="ans" value="d">' +
                    currentQuestion.answers['d'] + '</li></ol>');
    $('.ans').on('click', checkAnswer);
}


function checkAnswer()
{
    var userAnswerValue = $(this).attr('value');
    var correctAns = currentQuestion.correctAnswer; 

    if (userAnswerValue === correctAns)
    {
        correct ++;
        reset();
    }
    else 
    {
        incorrect ++;
        reset();
    }
    if (questionCounter < shuffledQuestions.length)
    {
        loadQuestionAnswer();
    }
}


// Reset function to restart the timer and change to the next question
function reset()
{
    time = 30; // reset time to 30 units
    questionCounter ++;
    currentQuestion = questionAnswer[shuffledQuestions[questionCounter]];  
}


// Function reduces the time variable by one unit every second
function countDown()
{
    if (questionCounter === shuffledQuestions.length)
    {
        console.log("Game over... your score is below");
        gameOver();
        stop();
    }

    if (time > 0)
    {
        time --; // reduce time by 1 unit
        $('#time').text(time + ' seconds');
    }

    else
    {
        unanswered ++; // if time runs out, increase unanswered variable by 1
        reset(); // call reset function to reset the page
        loadQuestionAnswer();
    }    
}

// start function triggers the countDown function which reduces the time variable by one unit. The start function calls the countDown function every second.
function start()
{
    if (!clockRunning)
    {
        intervalId = setInterval(countDown, 1000);
        clockRunning = true;
    }
}


function stop()
{
    clearInterval(intervalId);
    clockRunning = false;
}


function gameOver()
{
    $('.container-1').empty();
    $('.container-1').html('<div>Correct Answers:' + correct + '</div>' 
                        + '<div>Incorrect Answers: ' + incorrect + '</div>' 
                        + '<div>Unanswered Questions: ' + unanswered + '</div>')
    $('.container-1 div').css({'text-align': 'center', 
                           'font-size': '34px',
                           'margin': 'auto',
                           'padding-top': '50px'})
}

