/* eslint-env mocha */
import * as mocha from 'mocha';
import {
  strictEqual,
} from 'assert';

describe('mocha', () => {
  it('is exposed as global', () => {
    strictEqual(window.mocha, mocha);
  });
});
