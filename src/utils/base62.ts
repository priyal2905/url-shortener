const CHARSET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const BASE = CHARSET.length; // 62

export function encodeBase62(num: number): string {
  if (num === 0) return CHARSET[0];
  let result = '';
  while (num > 0) {
    result = CHARSET[num % BASE] + result;
    num = Math.floor(num / BASE);
  }
  return result;
}

export function decodeBase62(str: string): number {
  let num = 0;
  for (const char of str) {
    num = num * BASE + CHARSET.indexOf(char);
  }
  return num;
}