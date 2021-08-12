import { Lexer } from "./Lexer";

const sourceCode = `
1 + 2 * (3 + 4) `;

const lexer = new Lexer(sourceCode);

const tokens = lexer.getTokens();

tokens.forEach((t) => {
  t.print();
});
