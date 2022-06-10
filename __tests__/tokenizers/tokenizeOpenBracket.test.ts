import { TokenType } from '!types/index';
import { tokenizeOpenBracket as tokenize } from '!tokenizers/tokenizeOpenBracket';

it('should tokenize an opening bracket', () => {
  const input = '<';

  const result = tokenize({
    cursor: 0,
    data: input,
  });

  const expected: typeof result = [{
    type: TokenType.OPEN_BRACKET,
    processed: 1,
    value: '<',
  }];

  expect(result).toStrictEqual(expected);
});

it('should tokenize on an offset cursor', () => {
  const input = 'Text Node <element></element>';

  const result = tokenize({
    cursor: 10,
    data: input,
  });

  const expected: typeof result = [{
    type: TokenType.OPEN_BRACKET,
    processed: 1,
    value: '<',
  }];

  expect(result).toStrictEqual(expected);
});

it('should return null if the char is not an opening bracket', () => {
  const input = 'Text Node <element></element>';

  const result = tokenize({
    cursor: 8,
    data: input,
  });

  const expected: typeof result = null;

  expect(result).toStrictEqual(expected);
});

