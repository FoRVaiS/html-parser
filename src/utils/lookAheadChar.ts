import { Stateful } from '!types/index';

export const lookAheadChar: Stateful<string | null> = state => {
  let nextCharIndex = -1;

  for (let charIndex = state.cursor + 1; charIndex < state.data.length; charIndex++) {
    const char = state.data[charIndex];
    if (nextCharIndex !== -1) break;

    if (char !== ' ') nextCharIndex = charIndex;
  }

  return nextCharIndex !== -1
    ? state.data[nextCharIndex]!
    : null;
};
