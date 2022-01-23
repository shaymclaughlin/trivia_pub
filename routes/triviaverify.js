require('dotenv').config()
var express = require('express');
var router = express.Router();
const fs = require("fs");
const axios = require("axios");
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
router.get('/:uniqueid/:curquestion/', async function(req, res, next) {
    //console.log("V: ", req.params.uniqueid,req.params.curquestion,req.query[`question${req.params.curquestion}`])
    console.log(1)
    let fileName = req.params.uniqueid;
    let currentQuestion = parseInt(req.params.curquestion);
    let answer = req.query[`question`]
    let fileExt = '.json';
    let dirPath = process.env.triviaDataPath;
    let file = `${dirPath}${fileName}${fileExt}`;
    console.log(file)
    if (!fs.existsSync(file)) {
        res.render('triviaerror', { 
            title: '404 Error, Page Not Found',
            flavormessage: 'Uh Oh :(',
            message: 'It looks like that page cannot be found or does not exist, sorry.'
          });
        return
    }
    let fileData;
    let answerResults = "Incorrect."
    let answeredCorrectly = false;
    let answered = false;
    console.log(fileData)
    fs.readFile(file, 'utf8', function(err, data){
        fileData = JSON.parse(data);
        if (!answer || answer.length < 1) {
            res.redirect(`/triviaapp/${fileName}/${fileData.currentQuestion}`)
            return           
        }
        if (currentQuestion !== fileData.currentQuestion && !fileData.questionArray[currentQuestion-1].answered) {
            res.redirect(`/triviaapp/${fileName}/${fileData.currentQuestion}`)
            return
        }
        let previouslyAnswered = fileData.questionArray[currentQuestion-1].answered;
        let questionData = fileData.questionArray[currentQuestion-1]
        let maxQuestions = fileData.maxQuestions;
        if (!fileData.questionArray[currentQuestion-1].answered) {
            if (fileData.currentQuestion < parseInt(fileData.maxQuestions)) {
                fileData.currentQuestion++
            }
            fileData.questionArray[currentQuestion-1].answered = true;
            fileData.questionArray[currentQuestion-1].answer = answer

        }
        if (answer === questionData.correct_answer) {
            answerResults = "Correct"
            answeredCorrectly = true
            fileData.questionArray[currentQuestion-1].answeredCorrectly = true;
            
        }
        fs.writeFile(file, JSON.stringify(fileData, null, 2), (err) => {
            if (err) {
                console.error(err);
            return;
            }
        })
//        async function() {const animalData = await axios.get("https://zoo-animal-api.herokuapp.com/animals/rand")
  //      console.log("Animals Data:",fileData.animalData)
        res.render('triviaqresults', { 
            title: 'Results',
            previouslyAnswered:previouslyAnswered,
            answerResults: answerResults,
            correctAnswer: questionData.correct_answer,
            answeredCorrectly: answeredCorrectly,
            answer:fileData.questionArray[currentQuestion-1].answer,
            answered: fileData.questionArray[currentQuestion-1].answered,
            uniqueid: req.params.uniqueid,
            currentQuestion: currentQuestion,
            maxQuestions: maxQuestions,
            animalData: fileData.animalData


        });
        
      
    });

});

module.exports = router;
