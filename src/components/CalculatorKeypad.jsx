import PropTypes from 'prop-types';
import { CalculatorButton } from './CalculatorButton.jsx';

const keys = [
  { label: 'C', type: 'clear', span: 3 },
  { label: '÷', type: 'operator' },
  { label: '7', type: 'digit' },
  { label: '8', type: 'digit' },
  { label: '9', type: 'digit' },
  { label: '×', type: 'operator' },
  { label: '4', type: 'digit' },
  { label: '5', type: 'digit' },
  { label: '6', type: 'digit' },
  { label: '−', type: 'operator' },
  { label: '1', type: 'digit' },
  { label: '2', type: 'digit' },
  { label: '3', type: 'digit' },
  { label: '+', type: 'operator' },
  { label: '0', type: 'digit', span: 2 },
  { label: '.', type: 'decimal' },
  { label: '=', type: 'equals' },
];

function keyAction({ label, type }) {
  switch (type) {
    case 'digit':
      return { type: 'digit', digit: label };
    case 'decimal':
      return { type: 'decimal' };
    case 'clear':
      return { type: 'clear' };
    case 'equals':
      return { type: 'equals' };
    case 'operator':
      return { type: 'operator', operator: label };
    default:
      return null;
  }
}

function keyVariant(type) {
  return type === 'operator' || type === 'equals' ? 'accent' : 'mono';
}

export function CalculatorKeypad({ onAction }) {
  return (
    <div className="grid grid-cols-4 gap-3">
      {keys.map((key) => (
        <CalculatorButton
          key={key.label}
          onClick={() => onAction(keyAction(key))}
          span={key.span}
          variant={keyVariant(key.type)}
        >
          {key.label}
        </CalculatorButton>
      ))}
    </div>
  );
}

CalculatorKeypad.propTypes = {
  onAction: PropTypes.func.isRequired,
};
