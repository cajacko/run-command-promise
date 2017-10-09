import runCommand from 'src/index';

describe('Entry file', () => {
  test('Default', () => {
    runCommand();
    expect(true).toBe(true);
  });
});
