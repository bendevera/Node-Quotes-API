const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

let apiRouter = express.Router();

apiRouter.get('/quotes/random', (req, res, next) => {
    let randomElem = getRandomElement(quotes);
    res.send({quote: randomElem});
})

apiRouter.get('/quotes', (req, res, next) => {
    let person = req.query.person; 
    if (person) {
        let quotesByPerson = [];
        quotes.forEach((item, index) => {
            if (item.person.toLowerCase() === person.toLowerCase()) {
                quotesByPerson.push(item);
            }
        });
        res.send({
            quotes: quotesByPerson
        })
    } else {
        res.send({
            quotes: quotes
        });
    }
})

apiRouter.post('/quotes', (req, res, next) => {
    if (req.query.quote && req.query.person) {
        const newQuote = { quote: req.query.quote, person: req.query.person };
        quotes.push(newQuote);
        res.send({
            quote: newQuote
        })
    } else {
        res.status(400).send("Invalid data");
    }
})

app.use('/api', apiRouter);

app.listen(PORT, () => {
    console.log(`Server is lisening on port: ${PORT}`);
})

