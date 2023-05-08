const fs = require('fs');
const path = require('path');
const { stdin } = process;

const nameFile = 'text.txt';

const writeStream = fs.createWriteStream(path.join(__dirname,  nameFile), 'utf-8');

stdin.on('data', data => {
  if (data.toString().trim() === `exit`) {
    exit ()
  }
  writeStream.write(data);
});

process.on('SIGINT', exit)

function exit () {
  console.log(`thanks for input`)
  process.exit();
}

console.log(`Hi, input text:`);
