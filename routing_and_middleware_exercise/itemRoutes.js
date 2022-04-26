const express = require("express");
const app = require("./app");
const router = express.Router();
const items = require("./fakeDb");
const middleware = require("./middleware");


router.get('/', (req, res) => {
    return res.json(items);
})


router.post("/", (req, res) => {
    const newItem = {name: req.body.name, price: req.body.price}
    items.push(newItem);
    res.status(201).json({"added": newItem})
})


router.get("/:name", (req, res, next) => {
    try {
       
        const item = items.find(item =>item.name === req.params.name)
        if(item) {
            res.json(item)
        }
        else {
            throw new middleware.ExpressError("Item Name not Found", 400)
        }
    }
    catch(err) {
        return next(err);
    }
})


router.patch("/:name", (req, res, next) => {
    try {
        const item = items.find(item => item.name === req.params.name)
        if(item) {
            item.name = req.body.name;
            return res.json({"Updated": item})
            }
        else {
            throw new middleware.ExpressError("Item Name not Found", 400)
        }
    }
    catch(err) {
        return next(err);
    }
})

router.delete("/:name", (req, res, next) => {
    try {
        const itemInx = items.findIndex(item => item.name === req.params.name);
        if(itemInx !== -1) {
            items.splice(itemInx, 1);
            return res.json({"msg": "Deleted"})
        }
        else {
            throw new middleware.ExpressError("Item Name not Found", 400)
        }
        
    }
    catch(err) {
        return next(err);
    }
})


module.exports = router;