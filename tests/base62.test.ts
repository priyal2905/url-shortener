import { encodeBase62, decodeBase62 } from '../src/utils/base62';

describe('Base62 encoding', () => {
  it('encodes 0 correctly', () => {
    expect(encodeBase62(0)).toBe('a');
  });

  it('encodes a small number correctly', () => {
    expect(encodeBase62(61)).toBe('9'); // last char in your charset
  });

  it('encoding then decoding returns the original number', () => {
    const original = 123456789;
    const encoded = encodeBase62(original);
    const decoded = decodeBase62(encoded);
    expect(decoded).toBe(original);
  });

  it('produces different codes for different ids', () => {
    const a = encodeBase62(100);
    const b = encodeBase62(101);
    expect(a).not.toBe(b);
  });
});