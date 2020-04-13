#!/usr/bin/env node

import fs from 'fs';
import YAML from 'yaml';
import { scoreRecur, defaultBoolScorer, scoreMaximizer } from './scoring';

const USAGE = `Usage: $ ./grade student-grading.yaml`;

const yamlFilePath = process.argv[2];

if (!yamlFilePath) {
  console.warn(USAGE);
  process.exit(1);
}

console.warn(`Parsing ${yamlFilePath}...`);

const fileContents = fs.readFileSync(yamlFilePath, 'utf8');
const data = YAML.parse(fileContents);

type GroupData = { nom: string } & object;

const groupsScore = data.groupes.map((groupData: GroupData, i: number) => {
  return {
    name: groupData.nom,
    score: scoreRecur(groupData, `groupe[${i}]`, defaultBoolScorer),
    maxScore: scoreRecur(groupData, `groupe[${i}]`, scoreMaximizer),
  };
});

// assertion: all maxScore values should be equal

console.log(groupsScore);
