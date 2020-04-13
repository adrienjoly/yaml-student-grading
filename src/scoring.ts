type BoolScorer = (bool: boolean) => number;

export const defaultBoolScorer = (bool: boolean): number =>
  bool === true ? 1 : 0;

export const scoreMaximizer = (): number => 1;

// will recursively count all final values that are true
export function scoreRecur(
  ref: object | boolean,
  path = '',
  boolScorer: BoolScorer
): number {
  if (typeof ref === 'string') {
    return 0; // ignore string values (e.g. "name")
  }
  if (typeof ref === 'boolean') {
    return boolScorer(ref);
  } else if (typeof ref === 'object') {
    let sum = 0;
    for (const [key, val] of Object.entries(ref)) {
      sum += scoreRecur(val, `${path}.${key}`, boolScorer);
    }
    return sum;
  } else {
    console.warn(`Skipping ${typeof ref} at ${path}:`, ref);
    return 0;
  }
}
