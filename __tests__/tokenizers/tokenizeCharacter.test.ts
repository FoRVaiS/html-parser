import { TokenType } from '!types/index';
import { tokenizeCharacter as factory } from '!tokenizers/tokenizeCharacter';

const tokenize = factory(TokenType.OPEN_BRACKET, '<');

it('should tokenize a character from the factory function', () => {
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

it('should return null if the char does not match', () => {
  const input = 'Text Node <element></element>';

  const result = tokenize({
    cursor: 8,
    data: input,
  });

  const expected: typeof result = null;

  expect(result).toStrictEqual(expected);
});

