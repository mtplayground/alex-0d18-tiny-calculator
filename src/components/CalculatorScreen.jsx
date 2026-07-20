import { useReducer } from 'react';
import {
  calculatorReducer,
  getDisplayValue,
  initialCalculatorState,
} from '../calculator/state.js';
import { CalculatorDisplay } from './CalculatorDisplay.jsx';
import { CalculatorKeypad } from './CalculatorKeypad.jsx';

export function CalculatorScreen() {
  const [calculatorState, dispatch] = useReducer(
    calculatorReducer,
    initialCalculatorState,
  );

  return (
    <main className="flex min-h-dvh items-center justify-center bg-paper px-5 py-8 text-charcoal">
      <section
        className="w-full max-w-sm rounded-shell border border-line bg-surface p-7"
        aria-label="Calculator"
      >
        <CalculatorDisplay value={getDisplayValue(calculatorState)} />
        <CalculatorKeypad onAction={dispatch} />
      </section>
    </main>
  );
}
