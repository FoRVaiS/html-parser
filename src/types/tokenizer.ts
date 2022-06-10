import type { Stateful } from './state';

export const enum TokenType {
  TEXT = 'text',
  OPEN_BRACKET = 'open_bracket',
  CLOSE_BRACKET = 'close_bracket',
}

export type Token = {
  type: TokenType
  processed: number;
  value: string;
}

export type Tokenizer = Stateful<Array<Token> | null>;
