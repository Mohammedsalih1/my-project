setTimeout(() => {
    const WelcomePage = document.querySelector("[data-welcome-page]");
    WelcomePage.style.display = "none";
}, 2000);

/* ================================================  Storing data in local storage  ====================================================== */
let wordContainer = document.querySelector(".words-list .container");

// empty array to store the tasks
let array_of_tasks = [];


// check if there is tasks in local storage
if (localStorage.getItem("tasks")) {
    array_of_tasks = JSON.parse(localStorage.getItem("tasks"));
};

// trigger get data from local storage
get_data_from_localstorage();

function RemoveWords(Remove_Icon) {
    Remove_Icon.addEventListener("click", (e) => {

        let delete_confirmation = document.querySelector('.delete-confirmation');
        let cancel_btn = document.querySelector('[data-cancel]');
        let delete_btn = document.querySelector('[data-delete]');

         // add the swipe effect
        e.target.parentElement.parentElement.classList.add("half-swapEffect");
        delete_confirmation.style.scale = '1 1';

        // when the user press No button
        cancel_btn.addEventListener("click", () => {
            delete_confirmation.style.scale = '0 0';
            e.target.parentElement.parentElement.classList.remove('half-swapEffect');
            e.target.parentElement.parentElement.setAttribute('data-id', 'not-removed');
        });

        // when the user press Yes button 
        delete_btn.addEventListener("click", () => {
            if (e.target.parentElement.parentElement.getAttribute("data-id") == 'not-removed') {
                return null;
            } else {
                e.target.parentElement.parentElement.classList.add('full-swapEffect');
    
                setTimeout(() => {            
                    // remove the words from the localstorage
                    deleteWordsPermanently(e.target.parentElement.parentElement.getAttribute("data-id"));
                    // remove the words from the page
                    e.target.parentElement.parentElement.remove();
                }, 600);
            };

            delete_confirmation.style.scale = '0 0';
        });

    });
};

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
        let word = document.createElement("p");
        word.appendChild(document.createTextNode(task.title));

        // create listen icon
        let listenIcon = document.createElement("img");
        listenIcon.src = './assets/listen.png';
        listenIcon.className = 'listen-icon';

        // create Delete button
        var deleteIcon = document.createElement('img');
        deleteIcon.src = './assets/icon-close-menu.svg'
        deleteIcon.className = 'delete_icon';

        let Icons = document.createElement("div");
        Icons.className = 'icons'
        Icons.appendChild(deleteIcon);
        Icons.appendChild(listenIcon);
        

        // listening to the words again
        listenIcon.addEventListener("click", () => {
            let the_saved_word = new SpeechSynthesisUtterance(listenIcon.parentElement.parentElement.querySelector("p").textContent);
            speechSynthesis.speak(the_saved_word);
        });

        RemoveWords(deleteIcon);

        div.appendChild(word);
        div.appendChild(Icons);
        wordContainer.appendChild(div);
    });
};

// remove the word from local storage function
function deleteWordsPermanently(wordId) {
    array_of_tasks = array_of_tasks.filter((task) => task.id != wordId);
    add_data_to_localstorage_from(array_of_tasks);
    Getting_the_words_number();
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
}
Getting_the_words_number();

/* ================================================  Storing data in local storage  ====================================================== */
/* ==========================================================  menu bar code  =========================================================== */
let open_menu = document.querySelector(".menu-icon");
let close_menu = document.querySelector(".close-menu-bar");
let mobile_menu = document.querySelector(".menu-bar");

function Show_Mobile_menu() {;
    mobile_menu.classList.add("open-menu");
    // hide notification icon
    let notification_icon = document.querySelector(".notification-icon");

    if (notification_icon.style.scale = '1 1') {
        notification_icon.style.scale = '0 0'
    }
};
open_menu.addEventListener("click", Show_Mobile_menu);


function hide_Mobile_menu() {
    mobile_menu.classList.remove("open-menu");
};
close_menu.addEventListener("click", hide_Mobile_menu);
/* ==========================================================  menu bar code  =========================================================== */


/* ========================================================== Pronounce words code ====================================================== */
let playBtn = document.getElementById("play-btn");
let textInput = document.getElementById("text");
playBtn.addEventListener("click", Speak_out_loud);

function Speak_out_loud() {
    let ErrorMSG = document.querySelector(".Error-message");
    
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

        // notificate the users when they add a new word to the list
        if (true) {
            let notification_icon = document.querySelector(".notification-icon");
            notification_icon.style.scale = '1 1';
        }
    }
};
/* ========================================================== Pronounce words code ====================================================== */
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