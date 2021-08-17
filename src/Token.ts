export enum TokenType {
  Plus = "+",
  Minus = "-",
  Mul = "*",
  Div = "/",
  Int = "int",
  Float = "float",
  Lparen = "(",
  Rparen = ")",

  // keywords
  Var = "var",
  If = "if",
  While = "while",
  For = "for",
}

export type TokenList = Token[];

export class Token {
  constructor(public type: TokenType, public value?: any) {}

  toString() {
    if (this.value) {
      return `${this.type}:${this.value}`;
    } else {
      return `${this.type}`;
    }
  }
}
