import { TokenType } from '!types/index';
import { tokenizeText as tokenize } from '!tokenizers/tokenizeText';

it('should tokenize a single word', () => {
  const input = 'Text';

  const result = tokenize()({
    cursor: 0,
    data: input,
  });

  const expected: typeof result = [{
    type: TokenType.TEXT,
    processed: 4,
    value: 'Text',
  }];

  expect(result).toStrictEqual(expected);
});

it('should tokenize a single word starting with a space', () => {
  const input = ' Text';

  const result = tokenize()({
    cursor: 0,
    data: input,
  });

  const expected: typeof result = [{
    type: TokenType.TEXT,
    processed: 5,
    value: 'Text',
  }];

  expect(result).toStrictEqual(expected);
});

it('should tokenize a single word from a text node', () => {
  const input = 'This is a text node';

  const result = tokenize()({
    cursor: 0,
    data: input,
  });

  const expected: typeof result = [{
    type: TokenType.TEXT,
    processed: 4,
    value: 'This',
  }];

  expect(result).toStrictEqual(expected);
});

it('should be able to tokenize at an offset', () => {
  const input = '<span>This is a text node</span>';

  const result = tokenize()({
    cursor: 6,
    data: input,
  });

  const expected: typeof result = [{
    type: TokenType.TEXT,
    processed: 4,
    value: 'This',
  }];

  expect(result).toStrictEqual(expected);
});

it('should accept a list of delimiters', () => {
  const input = '<span class="container"></span>';

  const result = tokenize(['='])({
    cursor: 6,
    data: input,
  });

  const expected: typeof result = [{
    type: TokenType.TEXT,
    processed: 5,
    value: 'class',
  }];

  expect(result).toStrictEqual(expected);
});

it('should still delimit by whitespace even given a list of delimiters', () => {
  const input = 'Text node';

  const result = tokenize(['='])({
    cursor: 0,
    data: input,
  });

  const expected: typeof result = [{
    type: TokenType.TEXT,
    processed: 4,
    value: 'Text',
  }];

  expect(result).toStrictEqual(expected);
});

it('should not prematurely interrupt tokenization when it comes across a \'<\'', () => {
  const input = 'Te<xt';

  const result = tokenize()({
    cursor: 0,
    data: input,
  });

  const expected: typeof result = [{
    type: TokenType.TEXT,
    processed: 5,
    value: 'Te<xt',
  }];

  expect(result).toStrictEqual(expected);
});

it('should interrupt tokenization when it encounters an element', () => {
  const input = 'Text<span></span>node';

  const result = tokenize()({
    cursor: 0,
    data: input,
  });

  const expected: typeof result = [{
    type: TokenType.TEXT,
    processed: 4,
    value: 'Text',
  }];

  expect(result).toStrictEqual(expected);
});

it('should correctly determine exactly which character is part of an element tag', () => {
  const input = 'Text<<span></span>node';

  const result = tokenize()({
    cursor: 0,
    data: input,
  });

  const expected: typeof result = [{
    type: TokenType.TEXT,
    processed: 5,
    value: 'Text<',
  }];

  expect(result).toStrictEqual(expected);
});

it('should be able to tokenize words inside elements', () => {
  const input = '<span class="container"></span>';

  const result = tokenize()({
    cursor: 1,
    data: input,
  });

  const expected: typeof result = [{
    type: TokenType.TEXT,
    processed: 4,
    value: 'span',
  }];

  expect(result).toStrictEqual(expected);
});
