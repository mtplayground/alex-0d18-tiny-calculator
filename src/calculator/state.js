export const initialCalculatorState = {
  currentEntry: '0',
  pendingOperand: null,
  activeOperator: null,
  isEnteringNextOperand: false,
  isShowingResult: false,
  lastOperation: null,
  error: null,
};

export function getDisplayValue(state) {
  if (state.error) {
    return state.error;
  }

  return state.currentEntry;
}

function formatNumber(value) {
  if (!Number.isFinite(value)) {
    return 'Error';
  }

  return Number.parseFloat(value.toFixed(10)).toString();
}

function calculate(leftEntry, operator, rightEntry) {
  const left = Number(leftEntry);
  const right = Number(rightEntry);

  switch (operator) {
    case '+':
      return formatNumber(left + right);
    case '−':
      return formatNumber(left - right);
    case '×':
      return formatNumber(left * right);
    case '÷':
      if (right === 0) {
        return 'Error';
      }

      return formatNumber(left / right);
    default:
      return rightEntry;
  }
}

function resultState(state, result, nextState) {
  if (result === 'Error') {
    return {
      ...initialCalculatorState,
      currentEntry: '0',
      error: 'Error',
    };
  }

  return {
    ...state,
    ...nextState,
    currentEntry: result,
    error: null,
  };
}

export function inputDigit(state, digit) {
  if (!/^[0-9]$/.test(digit)) {
    return state;
  }

  if (state.error || state.isShowingResult) {
    return {
      ...initialCalculatorState,
      currentEntry: digit,
    };
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
  if (state.error || state.isShowingResult) {
    return {
      ...initialCalculatorState,
      currentEntry: '0.',
    };
  }

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
  if (state.error) {
    return state;
  }

  if (state.activeOperator && !state.isEnteringNextOperand) {
    const result = calculate(
      state.pendingOperand,
      state.activeOperator,
      state.currentEntry,
    );

    return resultState(state, result, {
      pendingOperand: result,
      activeOperator: operator,
      isEnteringNextOperand: true,
      isShowingResult: false,
      lastOperation: null,
    });
  }

  return {
    ...state,
    pendingOperand: state.currentEntry,
    activeOperator: operator,
    isEnteringNextOperand: true,
    isShowingResult: false,
    lastOperation: null,
    error: null,
  };
}

export function clearCalculator() {
  return { ...initialCalculatorState };
}

export function calculateResult(state) {
  if (state.error) {
    return state;
  }

  if (state.activeOperator && state.pendingOperand !== null) {
    const rightEntry = state.currentEntry;
    const result = calculate(
      state.pendingOperand,
      state.activeOperator,
      rightEntry,
    );

    return resultState(state, result, {
      pendingOperand: null,
      activeOperator: null,
      isEnteringNextOperand: false,
      isShowingResult: true,
      lastOperation: {
        operator: state.activeOperator,
        operand: rightEntry,
      },
    });
  }

  if (state.lastOperation) {
    const result = calculate(
      state.currentEntry,
      state.lastOperation.operator,
      state.lastOperation.operand,
    );

    return resultState(state, result, {
      pendingOperand: null,
      activeOperator: null,
      isEnteringNextOperand: false,
      isShowingResult: true,
      lastOperation: state.lastOperation,
    });
  }

  return state;
}

export function calculatorReducer(state, action) {
  switch (action.type) {
    case 'digit':
      return inputDigit(state, action.digit);
    case 'decimal':
      return inputDecimal(state);
    case 'operator':
      return chooseOperator(state, action.operator);
    case 'equals':
      return calculateResult(state);
    case 'clear':
      return clearCalculator();
    default:
      return state;
  }
}
