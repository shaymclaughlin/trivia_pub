const triviaQuestionSubmit = document.getElementById("triviaQuestionSubmit"),
triviaSubmitErrorMessage = document.getElementById("triviaSubmitErrorMessage");
function cssToggle(el,className) {
    el.classList.toggle(className)
}
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }
  
if(triviaQuestionSubmit) {
    triviaQuestionSubmit.addEventListener("click",function(event){
        triviaSubmitErrorMessage.querySelector(".card-title").innerText = ""
        triviaSubmitErrorMessage.querySelector(".card-title").innerText = "Please Select An Answer"
        if (triviaSubmitErrorMessage.classList.contains("d-none")) {
        }
        else {
            triviaSubmitErrorMessage.classList.add("d-none");
        }
        let triviaQuestionAnswers = document.getElementsByName('question')
        let answer;
        for (let i=0;i<triviaQuestionAnswers.length;i++) {
            if(triviaQuestionAnswers[i].checked) {
                answer = triviaQuestionAnswers[i].value
            }
        }
        if (!answer) {
            if (triviaSubmitErrorMessage.classList.contains("d-none")) {
                triviaSubmitErrorMessage.classList.remove("d-none");
                triviaSubmitErrorMessage.querySelector(".card-title").innerText = "Please Select An Answer"
            }
        
            event.preventDefault();
        }
        
    })
}
const previewQuestions = document.getElementById("previewQuestions") 
const triviaQuestionPreview = document.getElementById("triviaQuestionPreview")
if (previewQuestions) {
    previewQuestions.addEventListener("click",function() {
        cssToggle(triviaQuestionPreview)
    })
}
const questionCategorySelect = document.getElementById("questionCategorySelect")
if (questionCategorySelect) {
    const catName = document.getElementById("catName");
    text = questionCategorySelect.options[questionCategorySelect.selectedIndex].text;
    catName.value = text
    questionCategorySelect.addEventListener("change",function(){
        text = questionCategorySelect.options[questionCategorySelect.selectedIndex].text;
        catName.value = text
    })
}
const randomSettingsButton = document.getElementById("randomSettingsButton");
if (randomSettingsButton) {
    const catNameRandomInput = document.getElementById("catNameRandomInput"),
    qamtRandomInput = document.getElementById("qamtRandomInput"),
    difficultyRandomInput = document.getElementById("difficultyRandomInput"),
    catRandomInput = document.getElementById("catRandomInput"),
    randomSettingsPost = document.getElementById("randomSettingsPost"),
    mainTriviaSettingsForm = document.getElementById("mainTriviaSettingsForm"),
    startTriviaButton = document.getElementById("startTriviaButton");
    randomSettingsButton.addEventListener("click",function(event) {
        event.preventDefault();
        let catNameArray = catNameRandomInput.value.split(",");
        let catIdArray = catRandomInput.value.split(",");
        let difficultyArray = difficultyRandomInput.value.split(",");
        let qamtArray = qamtRandomInput.value.split(",");
        let categoryRandom = getRandomIntInclusive(0,catIdArray.length-1);
        let difficultyRandom = getRandomIntInclusive(0,difficultyArray.length-1);
        let qamtRandom = getRandomIntInclusive(0,qamtArray.length-1)
        catNameRandomInput.value = catNameArray[categoryRandom];
        catRandomInput.value =catIdArray[categoryRandom];
        difficultyRandomInput.value=difficultyArray[difficultyRandom];
        qamtRandomInput.value = qamtArray[qamtRandom];
        mainTriviaSettingsForm.classList.toggle("invisible");
        randomSettingsButton.classList.toggle("d-none");
        randomSettingsPost.classList.toggle("d-none");
    });
}
