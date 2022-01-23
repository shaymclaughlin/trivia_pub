var express = require('express');
var router = express.Router();
const axios = require("axios");
const bodyParser = require('body-parser');
router.get('/', async function(req, res, next) {
    let difficulty = [
        {value: "any",name:"Any Difficulty"},
        {value: "easy",name:"Easy"},
        {value: "medium",name:"Medium"},
        {value: "hard",name:"Hard"}
    ]
    let questionMin = 5;
    let questionMax = 20;
    let questionSteps = 5;
    let questionAmtArray = []
    for (let i = questionMin;i<questionMax+1;i++) {
        if (i % questionSteps === 0) {
            questionAmtArray.push(i)
        }
    }

    const getdata = await axios.get("https://opentdb.com/api_category.php");
    let categories = getdata.data.trivia_categories;
    let questionAmountString = questionAmtArray.join(",")
    let categoryNameString = categories.map(e => e.name).join(",")
    let categoryIdString = categories.map(e => e.id).join(",")
    let difficultyValString = difficulty.map(e => e.value).join(",")
    /*console.log(categoryIdString)
    console.log(categoryNameString)
    console.log(questionAmountString)
    console.log(difficultyValString)*/
    res.render('trivia', { 
        title: 'Trivia!', 
        categories: getdata.data.trivia_categories, 
        difficulty_options:difficulty,
        question_amt:questionAmtArray,
        questionAmountString:questionAmountString,
        categoryNameString:categoryNameString,
        categoryIdString:categoryIdString,
        difficultyValString:difficultyValString
    });
  
});

module.exports = router;
