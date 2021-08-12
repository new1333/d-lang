export enum TokenType {
  Plus = "+",
  Minus = "-",
  Mul = "*",
  Div = "/",
  Num = "Num",
  Lparen = "(",
  Rparen = ")",

  // keywords
  Var = "var",
  If = "if",
  While = "while",
}

export class Token {
  constructor(public type: TokenType, public value?: any) {}

  print() {
    if (this.value) {
      console.log(`[${this.type}:${this.value}]`);
    } else {
      console.log(`[${this.type}]`);
    }
  }
}
