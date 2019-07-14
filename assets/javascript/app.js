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
            randomIndex = Math.floor(Math.random() * currentIndex);
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
    // Remove div with Start
    $('#start-btn').remove();

    // Remove flex property from CSS style
    $('.container-1').css({"display" : 'block'});

    // Load the content of the page
    $('.container-1').append('<div id="box-1"> <p>Totally Trivial Trivia</p> <h2>Time remaining: <a id="time"></a></h2></div><div class="Q-A"><div id="questions">Question Here</div><div class="answers">Answers Here</div></div>');

    $('#time').text(time + ' seconds');

    console.log(currentQuestion)
    $('#questions').text(currentQuestion.question);

    // start function starts the timer
    start();
}


// Reset function to restart the timer and change the text within the div with the id = time.
function reset()
{
    time = 30; // reset time to 30 units
    questionCounter ++;
    currentQuestion = questionAnswer[shuffledQuestions[questionCounter]];
    $('#time').text(time + ' seconds');
    $('#questions').text(shuffledQuestions[questionCounter]);
}

// Function reduces the time variable by one every second
function countDown()
{
    if (time > 0)
    {
        time --; // reduce time by 1 unit
        $('#time').text(time + ' seconds');

    }
    else if ((questionCounter+1) === shuffledQuestions.length)
    {
        console.log("Game over... your score is below");
        stop();
    }
    else {
        unanswered ++; // if time runs out, increase unanswered variable by 1
        reset(); // call reset function to reset the page
        console.log('Question went unanswered ' + unanswered)
        console.log(currentQuestion);
        $('#questions').text(currentQuestion.question);
    }
    
}

// Function triggers the countDown function which reduces the time variable by one unit. The start functino calls the countDown function every second.
function start()
{
    if (!clockRunning)
    {
        intervalId = setInterval(countDown, 100);
        clockRunning = true;
    }
}

function stop()
{
    clearInterval(intervalId);
    clockRunning = false;
}
