setTimeout(() => {
    const FristPage = document.querySelector("[data-frist-page]");
    FristPage.style.display = "none";
}, 2000);

/* ================================================  Storing data in local storage  ====================================================== */
let wordContainer = document.querySelector(".your-words .container");

// empty array to store the tasks
let array_of_tasks = [];


// check if there is tasks in local storage
if (localStorage.getItem("tasks")) {
    array_of_tasks = JSON.parse(localStorage.getItem("tasks"));
};

// trigger get data from local storage
get_data_from_localstorage();

wordContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains("delete_icon")) {
        // add the swipe effect
        e.target.parentElement.classList.add("swapEffect");
        setTimeout(() => {            
            // remove the words from the localstorage
            deleteWordsPermanently(e.target.parentElement.getAttribute("data-id"));
            // remove the words from the page
            e.target.parentElement.remove();
        }, 600);

        if (array_of_tasks.length == 0) { // when the user delete the list
            wordContainer.innerHTML = `<h2>you deleted all the list</h2>`
        }
    }
});

function add_task_to_array(tasktext) {
    // task data
    const task = {
        id: Date.now(),
        title: tasktext,
        completed: false
    }
    // push task to array of tasks
    array_of_tasks.push(task);
    // add tasks to the page
    add_elements_to_page_from(array_of_tasks);
    // add tasks to local storage
    add_data_to_localstorage_from(array_of_tasks);
};
function add_elements_to_page_from(array_of_tasks) {
    // empty task div
    wordContainer.innerHTML = "";
    // looping on array of tasks
    array_of_tasks.forEach((task) => {
        // create main div
        let div = document.createElement("div");
        div.className = "word-container"
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title));

        // create listen icon
        let listenIcon = document.createElement("img");
        listenIcon.src = './images/listen-icon-23.png';
        listenIcon.className = 'listen-icon';

        // create Delete button
        var deleteIcon = document.createElement('img');
        deleteIcon.src = './images/icon-close-menu.svg'
        deleteIcon.className = 'delete_icon';

        // listening to the words again
        listenIcon.addEventListener("click", () => {
            let the_saved_word = new SpeechSynthesisUtterance(listenIcon.parentElement.textContent);
            speechSynthesis.speak(the_saved_word);
        });

        // append delete button
        div.appendChild(deleteIcon);
        // append icon container to main div
        div.appendChild(listenIcon);
        // add task div to tasks container
        wordContainer.appendChild(div);
    });
};

// remove the word from local storage function
function deleteWordsPermanently(wordId) {
    array_of_tasks = array_of_tasks.filter((task) => task.id != wordId);
    add_data_to_localstorage_from(array_of_tasks);
    Getting_the_words_number();
    if (array_of_tasks.length == 0) {
        wordContainer.innerHTML = `<h2>you didn't add any words to your list yet</h2>`; 
        // console.log("your list is Empty");
    }
};


function add_data_to_localstorage_from(array_of_tasks) {
    localStorage.setItem("tasks", JSON.stringify(array_of_tasks));
};

function get_data_from_localstorage() {
    let data = localStorage.getItem("tasks");
    if (data) {
        let tasks = JSON.parse(data);
        add_elements_to_page_from(tasks);
    };
};

// getting the number of the words
const WordsNumber = document.querySelector("[data-words-number]");
function Getting_the_words_number() {
    WordsNumber.innerHTML = array_of_tasks.length;
    
    if (array_of_tasks.length == 0) { // when the user delete the list
        wordContainer.innerHTML = `<h2>you deleted all the list</h2>`
    }
}
Getting_the_words_number();

/* ================================================  Storing data in local storage  ====================================================== */
/* ==========================================================  menu bar code  =========================================================== */
let open_menu = document.querySelector(".menu-icon");
let close_menu = document.querySelector(".close-menu-bar");
let mobile_menu = document.querySelector(".menu-bar");

function Show_Mobile_menu() {;
    mobile_menu.classList.add("open-menu");
}
open_menu.addEventListener("click", Show_Mobile_menu);


function hide_Mobile_menu() {
    mobile_menu.classList.remove("open-menu");
}
close_menu.addEventListener("click", hide_Mobile_menu);
/* ==========================================================  menu bar code  =========================================================== */


/* ========================================================== Saying the words code ====================================================== */
let playBtn = document.getElementById("play-btn");
let textInput = document.getElementById("text");
playBtn.addEventListener("click", Speak_out_loud);

function Speak_out_loud() {
    let ErrorMSG = document.querySelector(".Error");
    

    // handling Errors 
    if (textInput.value.length == 0 || textInput.value == " ") {
        ErrorMSG.classList.add("ShowError");
    } else {
        ErrorMSG.classList.remove("ShowError");
        let utterance = new SpeechSynthesisUtterance(textInput.value);
        speechSynthesis.speak(utterance);
        add_task_to_array(textInput.value); // add task to array of tasks
        textInput.value = ""; // empty input field
        Getting_the_words_number();
    }
};
/* ========================================================== Saying the words code ====================================================== */


/* ========================================================== switching between the tabs ================================================== */
let links = document.querySelectorAll(".menu-bar li");
let linksArray = Array.from(links);

let Tabs = document.querySelectorAll("[data-tab]");
let TabsArray = Array.from(Tabs);

links.forEach((e) => {
    e.addEventListener("click", (e) => {
        linksArray.forEach((e) => {
            e.classList.remove("active");
            hide_Mobile_menu();
        });
        e.currentTarget.classList.add("active");

        TabsArray.forEach((div) => {
            div.classList.remove("active-tab");
        });
        document.querySelector(e.currentTarget.dataset.content).classList.add("active-tab");
    });
});
/* ========================================================== switching between the tabs ================================================== */
