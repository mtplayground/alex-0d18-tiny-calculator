import PropTypes from 'prop-types';

const baseClasses =
  'flex h-16 select-none items-center justify-center rounded-button text-xl font-semibold transition duration-100 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface active:translate-y-px active:scale-[0.98]';

const variantClasses = {
  accent: 'bg-accent text-white hover:bg-blue-700 active:bg-blue-800',
  mono: 'bg-key text-charcoal hover:bg-[#e4ded5] active:bg-[#d5cec4]',
};

export function CalculatorButton({
  children,
  onClick,
  span = 1,
  variant = 'mono',
}) {
  const spanClass = {
    1: '',
    2: 'col-span-2',
    3: 'col-span-3',
  }[span];

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${spanClass}`}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

CalculatorButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  span: PropTypes.oneOf([1, 2, 3]),
  variant: PropTypes.oneOf(['accent', 'mono']),
};
