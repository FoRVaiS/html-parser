import { TokenType, type Tokenizer } from '!types/index';

const OPEN_BRACKET_CHAR = '<';

export const tokenizeOpenBracket: Tokenizer = state => {
  const char = state.data[state.cursor];

  // Is the selected character equal to the open bracket character?
  if (char !== OPEN_BRACKET_CHAR) return null;

  return [{
    type: TokenType.OPEN_BRACKET,
    processed: 1,
    value: char,
  }];
};
