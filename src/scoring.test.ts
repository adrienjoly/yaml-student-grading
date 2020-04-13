import test from 'ava';
import { scoreRecur, defaultBoolScorer, scoreMaximizer } from './scoring';

test('scoreRecur should ignore strings', (t) => {
  const grading = { str: 'hello world' };
  const score = scoreRecur(grading, '', defaultBoolScorer);
  t.is(score, 0);
});

test('scoreRecur should ignore strings when maximizing', (t) => {
  const grading = { str: 'hello world' };
  const score = scoreRecur(grading, '', scoreMaximizer);
  t.is(score, 0);
});

test('scoreRecur should sum a flat set of booleans', (t) => {
  const grading = { bool1: true, bool2: false };
  const score = scoreRecur(grading, '', defaultBoolScorer);
  t.is(score, 1);
});

test('scoreRecur should find the maximum score for a flat set of booleans', (t) => {
  const grading = { bool1: true, bool2: false };
  const score = scoreRecur(grading, '', scoreMaximizer);
  t.is(score, 2);
});

test('scoreRecur should sum with boolean in an array', (t) => {
  const grading = { bool1: true, bools: [true, true, false, true] };
  const score = scoreRecur(grading, '', defaultBoolScorer);
  t.is(score, 4);
});

test('scoreRecur should sum with boolean in an object', (t) => {
  const grading = {
    bool1: true,
    bools: { a: true, b: true, c: false, d: true },
  };
  const score = scoreRecur(grading, '', defaultBoolScorer);
  t.is(score, 4);
});

test('scoreRecur should sum with boolean in an array of objects', (t) => {
  const grading = {
    bool1: true,
    bools: [{ a: true }, { b: true }, { c: false, d: true }],
  };
  const score = scoreRecur(grading, '', defaultBoolScorer);
  t.is(score, 4);
});

test('scoreRecur should sum with deeply nested booleans', (t) => {
  const grading = {
    bool1: true,
    a: [{ b: [true] }, { c: true }],
  };
  const score = scoreRecur(grading, '', defaultBoolScorer);
  t.is(score, 3);
});
