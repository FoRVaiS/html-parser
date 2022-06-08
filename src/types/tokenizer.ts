import type { Stateful } from './state';

export const enum TokenType {
  ELEMENT = 'element',
  TEXT = 'text'
}

type ElementNodeToken = {
  selfClosing: false
  children: Array<Token>
}

type ElementSelfClosingNodeToken = {
  selfClosing: true
  children: Array<undefined>
}

export type ElementToken = {
  type: TokenType.ELEMENT
  processedChars: number;
  node: {
    name: string
    attributes: Record<string, string>
  } & (ElementNodeToken | ElementSelfClosingNodeToken)
}

export type TextToken = {
  type: TokenType.TEXT
  processedChars: number;
  node: {
    value: string
  }
}

export type Token = (ElementToken | TextToken);
export type Tokenizer<T extends Token = Token> = Stateful<Array<T>>;
