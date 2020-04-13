import test from 'ava';
import { sum } from './index';

test('one plus two equals three', (t) => {
  t.is(sum(1, 2), 3);
});
