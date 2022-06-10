import { TokenType, type Tokenizer } from '!types/index';
import { tokenizeCharacter } from './tokenizeCharacter';

const CLOSE_SLASH_CHAR = '/';

export const tokenizeCloseSlash: Tokenizer = tokenizeCharacter(TokenType.CLOSE_SLASH, CLOSE_SLASH_CHAR);
