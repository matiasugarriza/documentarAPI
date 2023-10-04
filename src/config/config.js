const dotenv = require('dotenv');
const { Command } = require('commander');

const program = new Command();
program
    .option('-d','Variable para debug', false)
    .option('-p <port>','Puerto del servidor', process.env.PORT)
    .option('--mode <mode>', 'Modo de trabajo', 'develop')
program.parse();

console.log("Mode Option: ", program.opts().mode);

const environment = program.options.mode;

dotenv.config({
    path: environment==="production"?"./.env.production":"./.env.development"
});

module.exports = {
    db: process.env.DB,
    domain: process.env.DOMAIN,
    port: process.env.PORT,
    secret: process.env.SECRET,
    environment: environment
};