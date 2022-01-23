require('dotenv').config()
var express = require('express');
var router = express.Router();
require('dotenv').config()
const axios = require("axios");
const fs = require("fs");
var uniqid = require('uniqid'); 
var dayjs = require('dayjs')
const bodyParser = require('body-parser');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('triviastart', { title: 'Trivia Start'});
});
router.post('/', async function(req, res, next) {
    let data = req.body;
    let url = `https://opentdb.com/api.php?amount=${data.qamt}&category=${data.cat}`;
    if (data.difficulty !== "any") {
        url += `&difficulty=${data.difficulty}`;
    }
    const getdata = await axios.get(url);
    let responseCode = getdata.data.response_code;
    if (responseCode !== 0) {
        res.render('triviaerror', { 
            title: 'Error Generating Trivia Questions',
            flavormessage: 'Uh Oh :(',
            message: 'There was an error retrieving questions. Please try again or use different settings.'
          });
        return
    }
    if (responseCode === 0) {
        let fileExists = false;
        while (fileExists === false) {
            
            const date = dayjs().format();
            let uniqueId = uniqid();
            let fileName = `${uniqueId}`;
            let fileExt = '.json';
            let dirPath = process.env.triviaDataPath;
            let file = `${dirPath}${fileName}${fileExt}`;
            if (!fs.existsSync(file)) {
                const questionArr = getdata.data.results.map(v => ({...v, answered: false,answer: "",answeredCorrectly:false}))
                let triviaData = {
                    date: date,
                    currentQuestion: 1,
                    maxQuestions: parseInt(data.qamt),
                    correct: 0,
                    incorrect: 0,
                    difficulty: data.difficulty,
                    category: data.cat,
                    categoryName: data.catname,
                    uniqueId: uniqueId,
                    questionArray: questionArr,
                }
                fs.writeFile(`${file}`, JSON.stringify(triviaData, null, 2), (err) => {
                    if (err) {
                        console.error(err);
                    return;
                    }
                });
                fileExists = true;
                //res.redirect(`/triviaapp/${uniqueId}/${triviaData.currentQuestion}`)
                res.render('triviastart', { 
                    title: 'Your Trivia Information',
                    uniqueid:fileName,
                    currentQuestion:triviaData.currentQuestion,
                    questionData: questionArr,
                    maxQuestions: questionArr.length,
                    categoryName: triviaData.categoryName,
                    difficulty: triviaData.difficulty
                });

            } 
        }
    }
  
});
module.exports = router;
