const express = require('express');
const ExpressError = require('./error')


const app = express();

app.get('/mean', (req, res, next) => {
    const { mode='mean', nums } = req.query;

    try{
        if(nums === undefined){
            throw new ExpressError(400, "No number inputs")
        }
    }
    catch(err) {
        next(err)
    }

    let total = 0;

    try {
        for(let num of nums.split(",")) {
            num = parseInt(num)
            if(num) {
                throw new ExpressError(400, "Not all inputs are Numbers")
            }
            total += num;
        }
    }
    catch(err) {
        next(err)
    }

    total /= nums.split(",").length;
    
    return res.json(response = {'operation': mode, "value": total})
})


app.get('/median', (req, res, next) => {
    const { mode='median', nums } = req.query;

    try{
        if(nums === undefined){
            throw new ExpressError(400, "No number inputs")
        }
    }
    catch(err) {
        next(err)
    }

    let total = 0;

    let numList = nums.split(",").sort();
    
    try {
        for(let num of numList) {
            if(parseInt(num)) {
                throw new ExpressError(400, "Not all inputs are Numbers")
            }
        }
    }
    catch(err) {
        next(err)
    }

    if(numList.length % 2 === 0) {
        let firstNum = parseInt(numList[numList.length/2-1]);
        let secondNum = parseInt(numList[numList.length/2]);
        total = (firstNum + secondNum) / 2;
    }
    else if(numList.length % 2 !== 0) {
        total = parseInt(numList[numList.length/2-0.5])
        console.log(total)
    }

    return res.json({"operation": mode, "value": total})

})


app.get('/mode', (req,res, next) => {
    const { mode='mode', nums } = req.query;

    try{
        if(nums === undefined){
            throw new ExpressError(400, "No number inputs")
        }
    }
    catch(err) {
        next(err)
    }

    let total = 0;
    let numCount = {};

    numList = nums.split(",").sort();

    try{ 
        numList.forEach(num => {
            num = parseInt(num)

            if(!num) {
                throw new ExpressError(400, "Not all inputs are Numbers")
            }
    
            if(!numCount[num]) {
                numCount[num] = 1;
            }
            else {
                numCount[num] += 1;
            }
        });
    }
    catch(err) {
        next(err)
    }

    

    for(let val in numCount) {
        if(numCount[val] > total) {
            console.log(numCount[val])
            total = val
        }
    }

    return res.json({"operation": mode, "value": total})
})


app.use((err,req, res, next) => {
    let status = err.status || 500;
    let msg = err.message;

    return res.status(status).json({error: {msg, status}})
})


app.listen(3000, () => {
    console.log("App running");
})


module.exports = {
    app
};