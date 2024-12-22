document.addEventListener("DOMContentLoaded", function() {
    var bool = [true, true, true, true, true, true, true, true];
    var button = "";
    var correct = new Audio("./assets/sounds/correct_answer.mp3");
    var wrong = new Audio("./assets/sounds/wrong_answer.mp3");
    var TimerTickTock = new Audio("./assets/sounds/EchoingClockTick.mp3 ");
    let answersRoundOne = [ "Python", "C++", "Java", "C", "C#", "JavaScript"];     
    let answersRoundTwo = ["Facebook", "YouTube", "WhatsApp", "Instagram", "TikTok", "Messenger"];
    let answersRoundThree = ["China", "India", "United States", "Indonesia", "Pakistan","Nigeria"];
    let answersRoundFour =["Bubble sort","Insertion sort","Selection sort","Quick sort","Merge sort","Heap sort"];
    let timerQuestions = [
        "Part One",
        "countries in Asia",
        "Network Devices",
        "Majors in our university",
        "Part Two",
        "Operating Systems",
        "Job titles in technology industry",
        "Tourist places in Jordan",
        "Part Three",
        "Browsers",
        "Cars",
        "Electronic devices",
        "Part Four",
        "Computer components",
        "Data Types",
        "File Extension"
        ];
    let buzzerQuestions1 = [
        // General Questions
        "Question",
        "What is the default programming language used in Arduino IDE?",
        "What is the AI principle that allows a system to learn from data without being explicitly programmed?",
        "What is the name of the rose-red city in Jordan?",
        "Which planet is known as the 'Red Planet'?",
        "Which protocol is used to send emails?",
        "How many bytes are in a kilobyte?"
    ];
    let buzzerQuestions2 =[        
        // Team C&D Questions
        "Question",
        "What is the default file extension for an Arduino sketch?",
        "What is the purpose of a VPN?",
        "What is the data structure that follows First-In-First-Out (FIFO)?",
        "What is the most country to have played in the FIFA World Cup?",
        "What is the largest continent in the world?",
        "What does the CPU stand for?"
    ];
    let buzzerQuestions3 =[    
        // Team E&F Questions
        "Question",
        "Which port type is commonly used to connect an Arduino to a computer?",
        "What does SQL stand for?",
        "What is a special method in a class used to initialize an object?",
        "What is the name of the scientist who developed the theory of relativity?",
        "Which sea is located between Jordan and Palestine?",
        "What does DNS stand for?"

    ];
    let buzzerQuestions4 = [
        // Semi-Final Questions A&B
        "Question",
        "What is the unit of measurement for processor speed?",
        "What protocol is used for file transfer between computers?",
        "What is the process of finding and fixing bugs in code called?",
        "Who painted the Mona Lisa?"
    ];
    let buzzerQuestions5 = [
        // Semi-Final Questions C&D
        "Question",
        "What is the hardest natural material on Earth?",
        "What is the process of creating a new class based on an existing class?",
        "Which board is the most commonly used for beginners?",
        "What is the name of the longest river in the world?"
    ];
    let buzzerQuestions6 = [
        // Final
        "Question",
        "What is the condition that stops the recursion in a recursive function?",
        "What does the acronym CRUD stand for in databases?",
        "What is the OOP principle that restricts direct access to an object's data?",
        "What is the time complexity of binary search in a sorted array?"
    ];    
    let timerQuestionIndex=0;
    if (document.getElementById("round") != null) {
        switch (document.getElementById("round").value) {
            case "2":
                answersRoundOne = answersRoundTwo;
                break;
            case "3":
                answersRoundOne = answersRoundThree;
                break;
            case "4":
                answersRoundOne = answersRoundFour;
                break;
        }
    }
    function first_answer(answer, buttonNumber) {
        button = "myButton" + buttonNumber;
        if (bool[buttonNumber - 1]) {
            document.getElementById(button).classList.toggle("test");
            document.getElementById('back'+buttonNumber).innerHTML = answer;
            correct.currentTime = 0;
            correct.play();
            bool[buttonNumber - 1] = false;
        }
    }

    document.addEventListener("keydown", function(event) {
        const key = event.key;

        if (key >= "1" && key <= "6") {
            first_answer(answersRoundOne[key - 1], key);
        }

        if (key === "x"||key === "X") {
            wrong.currentTime = 0;
            wrong.play();
            showWrongAnswerImage();
        }

        if(key === "s" || key === "S"){
            timeLeft=30;
            $("#Seconds").text(timeLeft); // Display message
            timerCountDown();
            TimerTickTock.play();
            if($('.timer').hasClass("timer_stop")){
                $('.timer').removeClass("timer_stop");
            }            
            $("#Seconds").css("font-size","120px");
        }
        if(key === "r" || key === "R"){
            TimerTickTock.pause();
            TimerTickTock.currentTime=0;

            resetTimer();
        }
        if(key === 'n' || key === 'N'){
            resetTimer();
            TimerTickTock.pause();
            TimerTickTock.currentTime=0;
            timerQuestionIndex+=1;
            $("#questionP").text(timerQuestions[timerQuestionIndex]);
            $("#questionAvsB").text(buzzerQuestions1[timerQuestionIndex]);
            $("#questionCvsD").text(buzzerQuestions2[timerQuestionIndex]);
            $("#questionEvsF").text(buzzerQuestions3[timerQuestionIndex]);

            $("#questionAvsB2").text(buzzerQuestions4[timerQuestionIndex]);
            $("#questionCvsD2").text(buzzerQuestions5[timerQuestionIndex]);
            $("#questionAvsB3").text(buzzerQuestions6[timerQuestionIndex]);

        }
        if(key === 'p' || key === 'P'){
            resetTimer();
            TimerTickTock.pause();
            TimerTickTock.currentTime=0;
            timerQuestionIndex-=1;
            $("#questionP").text(timerQuestions[timerQuestionIndex]);
            $("#questionAvsB").text(buzzerQuestions1[timerQuestionIndex]);
            $("#questionCvsD").text(buzzerQuestions2[timerQuestionIndex]);
            $("#questionEvsF").text(buzzerQuestions3[timerQuestionIndex]);

            $("#questionAvsB2").text(buzzerQuestions4[timerQuestionIndex]);
            $("#questionCvsD2").text(buzzerQuestions5[timerQuestionIndex]);
            $("#questionAvsB3").text(buzzerQuestions6[timerQuestionIndex]);
        }
    });

    function showWrongAnswerImage() {
        const imageContainer = document.getElementById("wrong-answer-image-container");
        imageContainer.style.display = "block";

       setTimeout(function() {
            imageContainer.style.display = "none";
        }, 1000); 
    }

    $("#questionP").text(timerQuestions[0]);
    $("#questionAvsB").text(buzzerQuestions1[0]);
    $("#questionCvsD").text(buzzerQuestions2[0]);
    $("#questionEvsF").text(buzzerQuestions3[0]);

    $("#questionAvsB2").text(buzzerQuestions4[0]);
    $("#questionCvsD2").text(buzzerQuestions5[0]);
    $("#questionAvsB3").text(buzzerQuestions6[0]);




    let timeLeft = 3; // Starting time in seconds
    function timerCountDown(){
        let timer = setInterval(function () {
            timeLeft--; // Decrement the timer by 1
            $("#Seconds").text(timeLeft); // Update the text of the timer
            if (timeLeft <= 0) {
                clearInterval(timer); // Stop the timer
                $("#Seconds").css("font-size","50px");
                $("#Seconds").text("Time's Up!"); // Display message
                $('.timer').addClass("timer_stop");
            }            }, 1000); // Update every 1 second
    }

    function resetTimer(){
        timeLeft=0;
        if($('.timer').hasClass("timer_stop")){
            $('.timer').removeClass("timer_stop");
        }
        $("#Seconds").text("30");
        $("#Seconds").css("font-size","120px");
    }
});

