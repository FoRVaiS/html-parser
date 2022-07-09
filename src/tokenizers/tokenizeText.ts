import { type Tokenizer, TokenType } from '!types/index';

/** Tokenize a string of characters up until the first occurrence of an element or the end of string. */
export const tokenizeText: (delimiters?: Array<string>) => Tokenizer = (delimiters = []) => state => {
  // The index of the first occurrence of a closing bracket
  const endingBracketIndex = state.data.indexOf('>', state.cursor);

  // The index of the first occurrence of a opening bracket to the left of a closing bracket position
  const openingBracketIndex = state.data.lastIndexOf('<', endingBracketIndex);

  // Find the first occurrence of each delimiter, filtering out any
  // delimiter indices that could not be found
  delimiters.push(' ');

  const delimiterIndices = delimiters
    .reduce((acc, delimiter) => {
      const index = state.data.trimStart().indexOf(delimiter, state.cursor);
      acc.push(index);

      return acc;
    }, [openingBracketIndex])
    .filter(index => index > -1 && index >= state.cursor);

  // Select the smallest valid index, infinity if indices list is empty
  const sliceEndRange = Math.min(...delimiterIndices);

  // Slice the text from the cursor's position to just before the delimiter
  const text = state.data.slice(state.cursor, sliceEndRange);

  return [{
    type: TokenType.TEXT,
    processed: text.length,
    value: text.trim(),
  }];
};
