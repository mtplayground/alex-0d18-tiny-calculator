import { useReducer } from 'react';
import {
  calculatorReducer,
  getDisplayValue,
  initialCalculatorState,
} from '../calculator/state.js';

const keys = [
  ['C', 'action'],
  ['+/-', 'action'],
  ['%', 'action'],
  ['÷', 'operator'],
  ['7', 'number'],
  ['8', 'number'],
  ['9', 'number'],
  ['×', 'operator'],
  ['4', 'number'],
  ['5', 'number'],
  ['6', 'number'],
  ['−', 'operator'],
  ['1', 'number'],
  ['2', 'number'],
  ['3', 'number'],
  ['+', 'operator'],
  ['0', 'number wide'],
  ['.', 'number'],
  ['=', 'equals'],
];

function keyClass(type) {
  const base =
    'flex h-14 items-center justify-center rounded-button text-lg font-semibold';

  if (type.includes('operator') || type.includes('equals')) {
    return `${base} bg-accent text-white`;
  }

  return `${base} bg-key text-charcoal`;
}

function keyAction(label, type) {
  if (/^[0-9]$/.test(label)) {
    return { type: 'digit', digit: label };
  }

  if (label === '.') {
    return { type: 'decimal' };
  }

  if (label === 'C') {
    return { type: 'clear' };
  }

  if (type.includes('equals')) {
    return { type: 'equals' };
  }

  if (type.includes('operator')) {
    return { type: 'operator', operator: label };
  }

  return null;
}

export function CalculatorShell() {
  const [calculatorState, dispatch] = useReducer(
    calculatorReducer,
    initialCalculatorState,
  );
  const displayValue = getDisplayValue(calculatorState);

  return (
    <main className="flex min-h-screen items-center justify-center bg-paper px-5 py-8 text-charcoal">
      <section
        className="w-full max-w-sm rounded-shell border border-line bg-surface p-6"
        aria-label="Calculator"
      >
        <div className="mb-6 flex min-h-28 items-end justify-end rounded-button border border-line bg-paper px-5 py-4">
          <span className="text-5xl font-semibold leading-none">
            {displayValue}
          </span>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {keys.map(([label, type]) => (
            <button
              key={label}
              className={`${keyClass(type)} ${type.includes('wide') ? 'col-span-2' : ''}`}
              onClick={() => {
                const action = keyAction(label, type);

                if (action) {
                  dispatch(action);
                }
              }}
              type="button"
            >
              {label}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
