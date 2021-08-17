import { Lexer } from "./Lexer";
import { Parser } from "./Parser";

const sourceCode = `
  1 * 2 * 3
`;

const lexer = new Lexer(sourceCode);

const tokens = lexer.getTokens();

const parser = new Parser(tokens);

const ast = parser.parse();
console.log(ast);
