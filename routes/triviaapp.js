require('dotenv').config()
var express = require('express');
var router = express.Router();
const fs = require("fs");
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }
  /*    res.render('triviaerror', { 
      title: '404 Error, Page Not Found',
      flavormessage: 'Uh Oh :(',
      message: 'It looks like that page cannot be found or does not exist, sorry.'
    });*/
router.get('/:uniqueid/:curquestion/', async function(req, res, next) {
    console.log("I: ", req.params.uniqueid,req.params.curquestion)
    let fileName = req.params.uniqueid;
    let currentQuestion = req.params.curquestion;
    let fileExt = '.json';
    let dirPath = process.end.triviaDataPath;
    let file = `${dirPath}${fileName}${fileExt}`;
    if (!fs.existsSync(file)) {
        res.render('triviaerror', { 
            title: '404 Error, Page Not Found',
            flavormessage: 'Uh Oh :(',
            message: 'It looks like that page cannot be found or does not exist, sorry.'
          });
        return
    }
    let fileData;
    
    fs.readFile(file, 'utf8', function(err, data){
        fileData = JSON.parse(data);
        if (fileData.currentQuestion < parseInt(fileData.maxQuestions)) {
            fileData.currentQuestion++;
        }
        let questionData = fileData.questionArray[currentQuestion-1]
        let answerArray = questionData.incorrect_answers
        answerArray.push(questionData.correct_answer)
        answerArray = shuffle(answerArray);
        answerArray = shuffle(answerArray);
        res.render('triviaapp', { 
            title: 'Trivia Q',
            uniqueid: req.params.uniqueid,
            currentQuestion: currentQuestion,
            maxQuestions: fileData.maxQuestions,
            questionData: questionData,
            answerArray: answerArray
            
        });
      
    });

});

module.exports = router;
