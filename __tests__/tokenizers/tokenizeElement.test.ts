import { TokenType } from '!types/index';
import { tokenizeElement as tokenize } from '!tokenizers/tokenizeElement';

it('should tokenize an element node', () => {
  const input = '<main></main>';

  const result = tokenize({
    cursor: 0,
    data: input,
  });
  
  const expected: typeof result = [{
    type: TokenType.ELEMENT,
    processedChars: 13,
    node: {
      name: 'main',
      attributes: {},
      selfClosing: false,
      children: [],
    },
  }];

  expect(result).toStrictEqual(expected);
});

it('should tokenize a self-closing element node', () => {
  const input = '<img />';

  const result = tokenize({
    cursor: 0,
    data: input,
  });
  
  const expected: typeof result = [{
    type: TokenType.ELEMENT,
    processedChars: 7,
    node: {
      name: 'main',
      attributes: {},
      selfClosing: true,
      children: [],
    },
  }];

  expect(result).toStrictEqual(expected);
});

it('should tokenize a poorly formatted self-closing element node', () => {
  const input = '<img>';

  const result = tokenize({
    cursor: 0,
    data: input,
  });
  
  const expected: typeof result = [{
    type: TokenType.ELEMENT,
    processedChars: 5,
    node: {
      name: 'main',
      attributes: {},
      selfClosing: true,
      children: [],
    },
  }];

  expect(result).toStrictEqual(expected);
});

it('should tokenize element node\'s attributes with various quote styles', () => {
  const input = '<section id="hero--banner" class=\'hero__section\' data-id=42></section>';

  const result = tokenize({
    cursor: 0,
    data: input,
  });
  
  const expected: typeof result = [{
    type: TokenType.ELEMENT,
    processedChars: 70,
    node: {
      name: 'section',
      attributes: {
        'id': 'hero--banner',
        'class': 'hero__section',
        'data-id': '42',
      },
      selfClosing: false,
      children: [],
    },
  }];

  expect(result).toStrictEqual(expected);
});
