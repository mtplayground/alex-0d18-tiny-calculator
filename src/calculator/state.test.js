import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import {
  calculatorReducer,
  getDisplayValue,
  initialCalculatorState,
} from './state.js';

function press(state, action) {
  return calculatorReducer(state, action);
}

function digit(value) {
  return { type: 'digit', digit: value };
}

function operator(value) {
  return { type: 'operator', operator: value };
}

function enter(sequence) {
  return sequence.reduce((state, action) => press(state, action), {
    ...initialCalculatorState,
  });
}

describe('calculator entry', () => {
  test('enters digits with sensible leading-zero behavior', () => {
    const state = enter([digit('0'), digit('0'), digit('7'), digit('3')]);

    assert.equal(getDisplayValue(state), '73');
  });

  test('allows only one decimal point per number', () => {
    const state = enter([
      { type: 'decimal' },
      { type: 'decimal' },
      digit('5'),
      { type: 'decimal' },
    ]);

    assert.equal(getDisplayValue(state), '0.5');
  });
});

describe('calculator operations', () => {
  test('adds numbers', () => {
    const state = enter([
      digit('8'),
      operator('+'),
      digit('4'),
      { type: 'equals' },
    ]);

    assert.equal(getDisplayValue(state), '12');
  });

  test('subtracts numbers', () => {
    const state = enter([
      digit('9'),
      operator('−'),
      digit('6'),
      { type: 'equals' },
    ]);

    assert.equal(getDisplayValue(state), '3');
  });

  test('multiplies numbers', () => {
    const state = enter([
      digit('7'),
      operator('×'),
      digit('6'),
      { type: 'equals' },
    ]);

    assert.equal(getDisplayValue(state), '42');
  });

  test('divides numbers', () => {
    const state = enter([
      digit('8'),
      operator('÷'),
      digit('2'),
      { type: 'equals' },
    ]);

    assert.equal(getDisplayValue(state), '4');
  });

  test('keeps decimal arithmetic display-friendly', () => {
    const state = enter([
      { type: 'decimal' },
      digit('1'),
      operator('+'),
      { type: 'decimal' },
      digit('2'),
      { type: 'equals' },
    ]);

    assert.equal(getDisplayValue(state), '0.3');
  });
});

describe('calculator edge cases', () => {
  test('clear resets the state to zero', () => {
    const state = enter([
      digit('4'),
      digit('2'),
      operator('+'),
      digit('1'),
      { type: 'clear' },
    ]);

    assert.equal(getDisplayValue(state), '0');
    assert.equal(state.pendingOperand, null);
    assert.equal(state.activeOperator, null);
  });

  test('handles divide by zero as an error state', () => {
    const state = enter([
      digit('8'),
      operator('÷'),
      digit('0'),
      { type: 'equals' },
    ]);

    assert.equal(getDisplayValue(state), 'Error');
  });

  test('chains operations by resolving the pending operation first', () => {
    const state = enter([
      digit('2'),
      operator('+'),
      digit('3'),
      operator('×'),
      digit('4'),
      { type: 'equals' },
    ]);

    assert.equal(getDisplayValue(state), '20');
  });

  test('repeats the last operation when equals is pressed repeatedly', () => {
    const state = enter([
      digit('5'),
      operator('−'),
      digit('2'),
      { type: 'equals' },
      { type: 'equals' },
    ]);

    assert.equal(getDisplayValue(state), '1');
  });

  test('starts a new entry after a result', () => {
    const state = enter([
      digit('6'),
      operator('+'),
      digit('1'),
      { type: 'equals' },
      digit('9'),
    ]);

    assert.equal(getDisplayValue(state), '9');
    assert.equal(state.pendingOperand, null);
    assert.equal(state.activeOperator, null);
  });
});
