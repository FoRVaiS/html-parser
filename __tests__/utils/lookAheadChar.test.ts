import { lookAheadChar } from '!utils/lookAheadChar';

it('should identify the next character', () => {
  const input = 'Hello World';

  const result = lookAheadChar({
    cursor: 0,
    data: input,
  });

  const expected = 'e';

  expect(result).toStrictEqual(expected);
});

it('should identify the next character ahead of whitespaces', () => {
  const input = 'Hello   World';

  const result = lookAheadChar({
    cursor: 4,
    data: input,
  });

  const expected = 'W';

  expect(result).toStrictEqual(expected);
});

it('should return null if there is no non-whitespace character ahead', () => {
  const input = 'Hello   ';

  const result = lookAheadChar({
    cursor: 4,
    data: input,
  });

  const expected = null;

  expect(result).toStrictEqual(expected);
});
