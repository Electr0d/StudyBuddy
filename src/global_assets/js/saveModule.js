const fs = require('fs');
const { getUnpackedSettings } = require('http2');
const path = require('path');
const isDev = require('electron-is-dev');
function getUserHome() {
	return process.env[process.platform == 'win32' ? 'USERPROFILE' : 'HOME'];
}
let dirPrefix = process.platform == 'win32' ? '/Appdata/Local' : '';
const parentDir = isDev ? path.join(getUserHome(), dirPrefix + '/StudyBuddyDev') : path.join(getUserHome(), dirPrefix + '/StudyBuddyDev');
if (!fs.existsSync(parentDir)) {
	console.log("Parent directory doesn't exist");
	fs.mkdirSync(parentDir);
}
const configPath = path.join(parentDir + '/config.json');

let config = {
  theme: 'dark',
  intervals: {
    study: {
      min: 10,
      max: 100,
      value: 50
    },
    break: {
      min: 1,
      max: 30,
      value: 10
    }
  },
  rain: {
    volume: 0.5
  }
}

function pack(path, object) {
  fs.writeFileSync(path, JSON.stringify(object));
}

let adviceList = {
  study: [
    'become a teacher. Say the information aloud in your own words as if you are the instructor and teaching the concepts to a class.',
    'create a study guide by topic. Formulate questions and problems and write complete answers. Create your own quiz.',
    'study in terms of question, evidence, and conclusion: What is the question posed by the instructor/author? What is the evidence that they present? What is the conclusion?',
    'close YouTube and other forms of distractions to help you study',
    'for technical classes, work the problems and explain the steps and why they work.',
    'derive examples that relate to your own experiences'

  ],
  break: [
    'stretch out a bit',
    'say hello to your roomate',
    'drink water',
    'don\'t go on social media, you will be temped later when studying',
    'organize your stuff',
    'grab a snack',
  ]
}

