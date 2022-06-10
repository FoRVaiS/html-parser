import { TokenType, type Tokenizer } from '!types/index';
import { tokenizeCharacter } from './tokenizeCharacter';

const OPEN_BRACKET_CHAR = '<';

export const tokenizeOpenBracket: Tokenizer = tokenizeCharacter(TokenType.OPEN_BRACKET, OPEN_BRACKET_CHAR);
