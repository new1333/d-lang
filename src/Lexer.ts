import { Token, TokenType } from "./Token";
import { isDigits } from "./utils";

export class Lexer {
  idx: number;
  currentChar: string;
  constructor(public sourceCode: string) {
    this.idx = -1;
    this.currentChar = null;
    this.advance();
  }

  advance() {
    this.idx++;
    this.currentChar = this.sourceCode[this.idx];
  }

  getTokens(): Token[] {
    const tokenList: Token[] = [];

    while (this.currentChar) {
      if (/[ \t\r\n]/.test(this.currentChar)) {
      } else if (isDigits(this.currentChar)) {
        tokenList.push(this.parseNumber());
        continue;
      } else if (this.currentChar === "+") {
        tokenList.push(new Token(TokenType.Plus));
      } else if (this.currentChar === "-") {
        tokenList.push(new Token(TokenType.Minus));
      } else if (this.currentChar === "*") {
        tokenList.push(new Token(TokenType.Mul));
      } else if (this.currentChar === "/") {
        tokenList.push(new Token(TokenType.Div));
      } else if (this.currentChar === "(") {
        tokenList.push(new Token(TokenType.Lparen));
      } else if (this.currentChar === ")") {
        tokenList.push(new Token(TokenType.Rparen));
      } else {
        throw new Error(`Unknown Char :[${this.currentChar}]`);
      }
      this.advance();
    }

    return tokenList;
  }

  parseNumber(): Token {
    let numStr = "";
    while (isDigits(this.currentChar)) {
      numStr += this.currentChar;
      this.advance();
    }

    return new Token(TokenType.Num, Number(numStr));
  }
}
