require('dotenv').config()
var express = require('express');
var router = express.Router();
const fs = require("fs");
const bodyParser = require('body-parser');
router.post('/', async function(req, res, next) {
    let formData = req.body
    let fileName = formData.quizid;
    let fileExt = '.json';
    let dirPath = process.env.triviaDataPath;
    let file = `${dirPath}${fileName}${fileExt}`;
    let fileData;

    if (!fs.existsSync(file)) {
        res.render('triviaerror', { 
            title: 'Error, QuizId Not Found',
            flavormessage: 'Uh Oh :(',
            message: 'It looks like that QuizId does not exist. Please return home and try again.'
          });
        return
    }
    else {
        fs.readFile(file, 'utf8', function(err, data){
            fileData = JSON.parse(data);
            let answeredArr = fileData.questionArray.map(e => e.answered)
            let maxQuestions = fileData.questionArray.length
            let currentQuestion = fileData.currentQuestion
            let answeredTotal = answeredArr.filter(x => x == true).length
            let completed = false;
            if (answeredTotal === maxQuestions) {
                completed = true;
            }
            if (completed) {
                res.redirect(307,`/triviaresults/${fileName}`)
            }
            else {
                res.redirect(`/triviaapp/${fileName}/${currentQuestion}`)
            }
            

        });
    }
    

});

module.exports = router;
