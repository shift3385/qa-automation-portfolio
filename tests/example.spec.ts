import { test, expect } from '@playwright/test';


test('framework basic check', async () => {
  const x = 1;
  const a="Lio"
  console.log(a);
  expect(x).toBe(1);
  expect(a).toBe('Tato');
});