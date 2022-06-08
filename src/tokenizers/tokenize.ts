import { type Tokenizer } from '!types/index';

import { cloneDeep } from '!utils/cloneDeep';

import { tokenizeElement } from './tokenizeElement';
import { tokenizeText } from './tokenizeText';

export const tokenize: Tokenizer = state => {
  console.log(null);

  const localState = cloneDeep(state);
  const tokens: ReturnType<Tokenizer> = [];

  do {
    [tokenizeElement, tokenizeText].forEach(tokenizer => {
      const [token] = tokenizer(localState);

      if (token) {
        localState.cursor += token.processedChars;
        tokens.push(token);
      }
    });
  } while (localState.cursor < localState.data.length);

  return tokenizeElement(state);
};
