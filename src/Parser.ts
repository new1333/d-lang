import { Token, TokenList, TokenType } from "./Token";

interface AstNode {}

export class Parser {
  tokenIndex: number;
  currentToken: Token;
  constructor(public tokens: TokenList) {
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

  parse(): AstNode {
    const res = this.expr();
    return res;
  }

  // grammer
  factor() {
    const token = this.currentToken;

    if ([TokenType.Minus, TokenType.Plus].includes(token.type)) {
      this.advance();
      const node = this.factor();
      return new UnaryOpNode(token.type, node);
    }

    if ([TokenType.Int, TokenType.Float].includes(token.type)) {
      this.advance();
      return new NumberNode(token);
    }

    if (token.type === TokenType.Lparen) {
      this.advance();
      const expr = this.expr();

      if (this.currentToken.type === TokenType.Rparen) {
        this.advance();
        return expr;
      } else {
        throw new Error('expected ")"');
      }
    }

    return null;
  }

  term() {
    return this.binOp(this.factor, [TokenType.Mul, TokenType.Div]);
  }

  expr() {
    return this.binOp(this.term, [TokenType.Plus, TokenType.Minus]);
  }

  // utils
  binOp(func: Function, ops: TokenType[]): AstNode {
    let left = func.call(this) as AstNode;

    while (ops.includes(this.currentToken.type)) {
      const op = this.currentToken;
      this.advance();
      const right = func.call(this);
      left = new BinaryOpNode(op, left, right);
    }
    return left;
  }
}

class BinaryOpNode implements AstNode {
  constructor(
    public opToken: Token,
    public left: AstNode,
    public right: AstNode
  ) {}

  toString() {
    return `(${this.left} ${this.opToken} ${this.right})`;
  }
}

class UnaryOpNode implements AstNode {
  constructor(public op: TokenType, public node: AstNode) {}

  toString() {
    console.log(this);
    return `(${this.op}, ${this.node})`;
  }
}

class NumberNode implements AstNode {
  constructor(public token: Token) {}

  toString() {
    return `${this.token.type}:${this.token.value}`;
  }
}
