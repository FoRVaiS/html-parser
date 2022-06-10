import { type TextToken, type Tokenizer, TokenType } from '!types/index';

export const tokenizeText: Tokenizer<TextToken> = state => {
  const endingBracketIndex = state.data.indexOf('>', state.cursor);
  const openingBracketIndex = state.data.lastIndexOf('<', endingBracketIndex);
  const hasElement = openingBracketIndex > -1 && endingBracketIndex > -1;
  
  const text = state.data.slice(state.cursor, hasElement
    ? openingBracketIndex
    : state.data.length);

  return [{
    type: TokenType.TEXT,
    processed: text.length,
    value: text.trim(),
  }];
};
