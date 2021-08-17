import { Lexer } from "./Lexer";
import { Parser } from "./Parser";

const sourceCode = `
 (1 + 2) * 3
`;

function parse(code: string) {
  const lexer = new Lexer(code);

  const tokens = lexer.getTokens();

  const parser = new Parser(tokens);

  const ast = parser.parse();

  return ast;
}

window.parse = parse;

const ast = parse(sourceCode);
console.log(`${ast}`);
