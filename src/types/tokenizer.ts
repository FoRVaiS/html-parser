import type { Stateful } from './state';

export const enum TokenType {
  TEXT = 'text'
}

export type TextToken = {
  type: TokenType.TEXT
  processedChars: number;
  node: {
    value: string
  }
}

export type Token = (TextToken);
export type Tokenizer<T extends Token = Token> = Stateful<Array<T>>;
