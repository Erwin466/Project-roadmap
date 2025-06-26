import { apiRequest } from '../Config/auth-sdk.js';
import { sanitizeInput, validateEmail, validatePasswordStrength } from '../Script/utils.js';

describe('Auth SDK', () => {
  test('should throw on network error', async () => {
    await expect(apiRequest('invalid-endpoint')).rejects.toThrow();
  });
});

describe('Utils', () => {
  test('sanitizeInput should escape HTML', () => {
    expect(sanitizeInput('<script>')).toBe('&lt;script&gt;');
  });
  test('validateEmail should validate emails', () => {
    expect(validateEmail('test@example.com')).toBe(true);
    expect(validateEmail('bad-email')).toBe(false);
  });
  test('validatePasswordStrength should check strength', () => {
    expect(validatePasswordStrength('Abcdef12')).toBe(true);
    expect(validatePasswordStrength('abc')).toBe(false);
  });
});
