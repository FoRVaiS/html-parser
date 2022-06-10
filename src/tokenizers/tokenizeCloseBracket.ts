import { TokenType, type Tokenizer } from '!types/index';
import { tokenizeCharacter } from './tokenizeCharacter';

const CLOSE_BRACKET_CHAR = '>';

export const tokenizeCloseBracket: Tokenizer = tokenizeCharacter(TokenType.CLOSE_BRACKET, CLOSE_BRACKET_CHAR);
