import { TokenType, type Tokenizer } from '!types/index';

export const tokenizeCharacter = (type: TokenType, character: string): Tokenizer => state => {
  const currentChar = state.data[state.cursor];

  if (currentChar !== character) return null;

  return [{
    type,
    processed: 1,
    value: currentChar,
  }];
};
