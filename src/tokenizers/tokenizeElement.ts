import { type ElementToken, type Tokenizer, TokenType } from '!types/index';
import { cloneDeep } from '!utils/cloneDeep';

import { lookAheadChar } from '!utils/lookAheadChar';

const selfClosingElements = [
  'br',
  'hr',
  'img',
  'input',
  'meta',
  'link',
  'col',
  'base',
  'param',
  'track',
  'source',
  'wbr',
  'command',
  'keygen',
  'area',
  'embed',
  'menuitem',
];

export const tokenizeElement: Tokenizer<ElementToken> = state => {
  const startBracketIndex = state.data.indexOf('<', state.cursor);
  const endBracketIndex = state.data.indexOf('>', startBracketIndex);

  const localState = cloneDeep(state);

  localState.cursor = startBracketIndex + 1;

  let elementName = '';

  for (;localState.cursor < state.data.length; localState.cursor++) {
    const char = state.data[localState.cursor];

    if (elementName.length <= 0 && char === ' ') {
      const nextChar = lookAheadChar(localState);

      if (nextChar) localState.cursor = state.data.indexOf(nextChar, localState.cursor);
    } else if (elementName.length > 0 && char === ' ') {
      break;
    } else {
      elementName += char;
    }
  }

  return [{
    type: TokenType.ELEMENT,
    processedChars: localState.cursor - state.cursor,
    node: {
      name: elementName,
      attributes: {},
      selfClosing: selfClosingElements.includes(elementName.toLowerCase()),
      children: [],
    },
  }];
};
