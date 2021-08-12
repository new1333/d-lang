const DIGITS = /[0-9]/;

export function isDigits(char: string) {
  return DIGITS.test(char);
}
