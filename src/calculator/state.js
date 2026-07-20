export const initialCalculatorState = {
  currentEntry: '0',
  pendingOperand: null,
  activeOperator: null,
  isEnteringNextOperand: false,
};

export function getDisplayValue(state) {
  return state.currentEntry;
}

export function inputDigit(state, digit) {
  if (!/^[0-9]$/.test(digit)) {
    return state;
  }

  if (state.isEnteringNextOperand) {
    return {
      ...state,
      currentEntry: digit,
      isEnteringNextOperand: false,
    };
  }

  if (state.currentEntry === '0') {
    return {
      ...state,
      currentEntry: digit,
    };
  }

  return {
    ...state,
    currentEntry: `${state.currentEntry}${digit}`,
  };
}

export function inputDecimal(state) {
  if (state.isEnteringNextOperand) {
    return {
      ...state,
      currentEntry: '0.',
      isEnteringNextOperand: false,
    };
  }

  if (state.currentEntry.includes('.')) {
    return state;
  }

  return {
    ...state,
    currentEntry: `${state.currentEntry}.`,
  };
}

export function chooseOperator(state, operator) {
  return {
    ...state,
    pendingOperand: state.currentEntry,
    activeOperator: operator,
    isEnteringNextOperand: true,
  };
}

export function clearCalculator() {
  return initialCalculatorState;
}

export function calculatorReducer(state, action) {
  switch (action.type) {
    case 'digit':
      return inputDigit(state, action.digit);
    case 'decimal':
      return inputDecimal(state);
    case 'operator':
      return chooseOperator(state, action.operator);
    case 'clear':
      return clearCalculator();
    default:
      return state;
  }
}
