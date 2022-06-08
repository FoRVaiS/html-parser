import { TokenType } from '!types/index';
import { tokenize } from '!tokenizers/tokenize';

it.skip('should tokenize a text node within an element', () => {
  const input = '<p>This is a text node inside an element node</p>';

  const result = tokenize({
    cursor: 0,
    data: input,
  });
  
  const expected: typeof result = [{
    type: TokenType.ELEMENT,
    processedChars: 49,
    node: {
      name: 'p',
      attributes: {},
      selfClosing: false,
      children: [{
        type: TokenType.TEXT,
        processedChars: 42,
        node: {
          value: 'This is a text node inside an element node',
        },
      }],
    },
  }];

  expect(result).toStrictEqual(expected);
});

it.skip('should be capable to tokenizing more than one element', () => {
  const input = '<header></header>Stray Text<footer></footer>';

  const result = tokenize({
    cursor: 0,
    data: input,
  });
  
  const expected: typeof result = [
    {
      type: TokenType.ELEMENT,
      processedChars: 17,
      node: {
        name: 'header',
        attributes: {},
        selfClosing: false,
        children: [],
      },
    },
    {
      type: TokenType.TEXT,
      processedChars: 10,
      node: {
        value: 'Stray Text',
      },
    },
    {
      type: TokenType.ELEMENT,
      processedChars: 17,
      node: {
        name: 'footer',
        attributes: {},
        selfClosing: false,
        children: [],
      },
    },
  ];

  expect(result).toStrictEqual(expected);
});
