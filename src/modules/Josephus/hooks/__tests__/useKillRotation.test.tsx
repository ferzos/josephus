import { renderHook } from '@testing-library/react';
import { useKillRotation } from '../useKillRotation';

const highestOneBit = (x: number) => {
  if (x < 1) return 0;

  let result = 1;
  while (result <= x) {
    result *= 2;
  }

  return result / 2;
};

const getSafePosition = (n: number) => {
  if (n === 0) return 1;
  // find value of L for the equation
  const valueOfL = n - highestOneBit(n);
  return 2 * valueOfL + 1;
};

const testCase = [...new Array(42)]
  .fill('-')
  .map((_, index) => [index, getSafePosition(index) - 1]);

describe('useKillRotation', () => {
  it.each(testCase)(
    'should produce deads correctly for index %i',
    (input, expected) => {
      const { result } = renderHook(() => useKillRotation({ numberOfPeople: input }));

      const theDeads = result.current
        .createKillRotation(0)
        .theDeads.sort((a, b) => a - b);

      const safePosition = theDeads.find((currValue, i, arr) => currValue + 1 !== arr[i + 1]) || 0;
      const roundedSafePosition = input > 0 ? (safePosition + 1) % input : safePosition;

      expect(roundedSafePosition).toBe(expected);
    },
  );
});
