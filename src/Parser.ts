import { Token, TokenType } from "./Token";

interface AstNode {}

export class Parser {
  tokenIndex: number;
  currentToken: Token;
  constructor(public tokens: Token[]) {
    this.tokenIndex = -1;
    this.currentToken = null;
    this.advance();
  }

  private advance() {
    this.tokenIndex++;
    if (this.tokenIndex < this.tokens.length) {
      this.currentToken = this.tokens[this.tokenIndex];
    }
  }

  public parse(): AstNode {
    const res = this.term();
    return res;
  }

  // grammer

  term() {
    let left = this.factor() as AstNode;

    while ([TokenType.Mul, TokenType.Div].includes(this.currentToken.type)) {
      const op = this.currentToken;
      this.advance();
      const right = this.factor();
      left = new BinaryOpNode(op, left, right);
    }
    return left;
  }

  factor() {
    const token = this.currentToken;
    if (token.type == TokenType.Num) {
      this.advance();
      return new NumberNode(token);
    }
    return null;
  }
}

class BinaryOpNode implements AstNode {
  constructor(
    public opToken: Token,
    public left: AstNode,
    public right: AstNode
  ) {}
}

class NumberNode implements AstNode {
  constructor(public token: Token) {}
}
