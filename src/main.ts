import { Lexer } from "./Lexer";
import { Parser } from "./Parser";

const sourceCode = `
1 + 2 * (3 + 4) `;

const lexer = new Lexer(sourceCode);

const tokens = lexer.getTokens();

const parser = new Parser(tokens);

parser.parse();
