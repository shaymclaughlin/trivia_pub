require('dotenv').config()
var express = require('express');
var router = express.Router();
const fs = require("fs");
const bodyParser = require('body-parser');
router.post('/:uniqueid/', async function(req, res, next) {
    console.log("I: ", req.params.uniqueid)
    let fileName = req.params.uniqueid;
    let fileExt = '.json';
    let dirPath = process.env.triviaDataPath;
    let file = `${dirPath}${fileName}${fileExt}`;
    let fileData;
    if (!fs.existsSync(file)) {
        res.render('triviaerror', { 
            title: '404 Error, Page Not Found',
            flavormessage: 'Uh Oh :(',
            message: 'It looks like that page cannot be found or does not exist, sorry.'
          });
        return
    }
    fs.readFile(file, 'utf8', function(err, data){
        fileData = JSON.parse(data);
        let answeredArr = fileData.questionArray.map(e => e.answered)
        let maxQuestions = fileData.questionArray.length
        let currentQuestion = fileData.currentQuestion
        let questionCategory = fileData.category
        let questionAmount = fileData.maxQuestions
        let questionDifficulty = fileData.difficulty
        let answeredTotal = answeredArr.filter(x => x == true).length
        let correctArr = fileData.questionArray.map(e => e.answeredCorrectly)
        let correctTotal = correctArr.filter(x => x == true).length
        let incorrectTotal = maxQuestions - correctTotal
        let perc = ((correctTotal/maxQuestions)*100).toFixed(2)
        perc += "%"
        let completed = false;
        if (answeredTotal === maxQuestions) {
            completed = true;
        }
        
        res.render('triviaresults', { 
            title: 'Results',
            completed: completed,
            currentQuestion: currentQuestion,
            uniqueid: fileName,
            correctTotal: correctTotal,
            incorrectTotal: incorrectTotal,
            total: correctTotal+incorrectTotal,
            percent: perc,
            questionData: fileData.questionArray,
            questionCategoryName: fileData.categoryName,
            questionAmount: questionAmount,
            questionDifficulty: questionDifficulty,
            questionCategory: questionCategory

        });
      
    });

});

module.exports = router;
