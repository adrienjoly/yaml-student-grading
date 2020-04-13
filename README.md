# yaml-student-grading

A toolkit to grade student assignments consistently, using yaml files.

## Setup and usage

```sh
$ git clone https://github.com/adrienjoly/yaml-student-grading.git
$ cd yaml-student-grading
$ nvm use # to setup the version of Node.js specified in `.nvmrc`
$ npm install
$ npm run build
$ npm link # so you can run the grade command from anywhere
$ grade tests/sample-grading.yaml
```
