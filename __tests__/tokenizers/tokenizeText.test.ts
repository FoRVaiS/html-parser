import { TokenType } from '!types/index';
import { tokenizeText as tokenize } from '!tokenizers/tokenizeText';

it('should tokenize a text node', () => {
  const input = 'This is a text node';

  const result = tokenize({
    cursor: 0,
    data: input,
  });

  const expected: typeof result = [{
    type: TokenType.TEXT,
    processed: 19,
    value: 'This is a text node',
  }];

  expect(result).toStrictEqual(expected);
});

it('should be able to tokenize at an offset', () => {
  const input = '<span>This is a text node</span>';

  const result = tokenize({
    cursor: 6,
    data: input,
  });

  const expected: typeof result = [{
    type: TokenType.TEXT,
    processed: 19,
    value: 'This is a text node',
  }];

  expect(result).toStrictEqual(expected);
});

it('should not prematurely interrupt tokenization when it comes across a \'<\'', () => {
  const input = 'This is a text <node';

  const result = tokenize({
    cursor: 0,
    data: input,
  });

  const expected: typeof result = [{
    type: TokenType.TEXT,
    processed: 20,
    value: 'This is a text <node',
  }];

  expect(result).toStrictEqual(expected);
});

it('should interrupt tokenization when it encounters an element', () => {
  const input = 'This is a text <span></span>node';

  const result = tokenize({
    cursor: 0,
    data: input,
  });

  const expected: typeof result = [{
    type: TokenType.TEXT,
    processed: 15,
    value: 'This is a text',
  }];

  expect(result).toStrictEqual(expected);
});

it('should correctly determine exactly which character is part of an element tag', () => {
  const input = 'This is a text <<span></span>node';

  const result = tokenize({
    cursor: 0,
    data: input,
  });

  const expected: typeof result = [{
    type: TokenType.TEXT,
    processed: 16,
    value: 'This is a text <',
  }];

  expect(result).toStrictEqual(expected);
});
