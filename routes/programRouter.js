const express = require('express')
const bodyParser = require('body-parser');


const programRouter = express.Router();

programRouter.use(bodyParser.json());

programRouter.route('/')


.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})

.get((req, res) => {
    res.end('Will send all the program to you');
})

.post((req, res) => {
    res.end(`Will add the program: ${req.body.name} with description: ${req.body.description}`);
})

.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /programs');
})

.delete((req, res) => {
    res.end('Deleting all programs');
});

programRouter.route('/:programId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end(`Will send details of the program: ${req.params.programId} to you`);
})

.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /program/${req.params.programId}`);
})

.put((req, res) => {
    res.write(`Updating the campsite: ${req.params.programId}\n`);
    res.end(`Will update the campsite: ${req.body.name}
    with description: ${req.body.description}`);
})

.delete((req, res) => {
    res.end(`Deleting campsite: ${req.params.programId}`);
});



module.exports = programRouter;