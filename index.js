const path = require('path');
const fs = require('fs');
const inquirer = require('inquirer');
const chalkPipe = require('chalk-pipe');

function getFileNames(path) {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, files) => {
        if (err) reject(err);
      resolve(files);
    });
  });
}

async function createQuestions() {
    let fileNames = await getFileNames('./examples');
    let questions = fileNames.map(fileName => {
        return [
          {
            type: "input",
            name: `${fileName}_reagents'`,
            prefix: `${chalkPipe("yellow")('?')} ${chalkPipe("green")(
              fileName
            )} - `,
            message: `Enter ${chalkPipe("blue")("reagents")}:`,
        },
        {
            type: "input",
            name: `${fileName}_sellValue`,
            prefix: `${chalkPipe("yellow")('?')} ${chalkPipe("green")(
                fileName
            )} - `,
            message: `Enter ${chalkPipe("blue")("sell price")}:`
        },
        {
            type: "input",
            name: `${fileName}_sellValue`,
            prefix: `${chalkPipe("yellow")('?')} ${chalkPipe("green")(
                fileName
            )} - `,
            message: `Enter ${chalkPipe("blue")("value")}:`
          }
        ];
    }).reduce((p, c) => p.concat(c));
    return questions;
}

async function init() {
    inquirer.prompt(await createQuestions()).then(answers => {
      console.log(JSON.stringify(answers, null, '  '));
    });
}

init()