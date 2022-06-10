import { type Tokenizer, TokenType } from '!types/index';

/** Tokenize a string of characters up until the first occurrence of an element or the end of string. */
export const tokenizeText: Tokenizer = state => {
  // The index of the first occurrence of a closing bracket
  const endingBracketIndex = state.data.indexOf('>', state.cursor);

  // The index of the first occurrence of a opening bracket to the left of a closing bracket position
  const openingBracketIndex = state.data.lastIndexOf('<', endingBracketIndex);

  // An element has been detected if both opening and closing positions both have an index larger than -1
  const hasElement = openingBracketIndex > -1 && endingBracketIndex > -1;
  
  // Slice the text from the cursor's position to just before the opening bracket
  const text = state.data.slice(state.cursor, hasElement
    ? openingBracketIndex
    : state.data.length);

  return [{
    type: TokenType.TEXT,
    processed: text.length,
    value: text.trim(),
  }];
};
