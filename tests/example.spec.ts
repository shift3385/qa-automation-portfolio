import { test, expect } from '@playwright/test';

test('framework basic check', async () => {
  const x = 1;
  expect(x).toBe(1);
});