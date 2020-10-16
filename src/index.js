const app = require('./app');
const chalk = require('chalk');

const port = process.env.PORT;

app.listen(port, () => {
    console.log(chalk.greenBright.inverse('Server is on | ' + port));
});
