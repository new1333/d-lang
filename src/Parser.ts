import { Token } from "./Token";

export class Parser {
  tokenIndex: number;
  currentToken: Token;
  constructor(public tokens: Token[]) {
    this.tokenIndex = -1;
    this.currentToken = null;
    this.advance();
  }

  advance() {
    this.tokenIndex++;
    if (this.tokenIndex < this.tokens.length) {
      this.currentToken = this.tokens[this.tokenIndex];
    }
  }

  parse() {
    console.log("parse");
  }

  // grammer
}

class NumberNode {
  constructor(public token: Token) {}
}
