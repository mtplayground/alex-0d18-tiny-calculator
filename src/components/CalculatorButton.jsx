import PropTypes from 'prop-types';

const baseClasses =
  'flex h-14 items-center justify-center rounded-button text-lg font-semibold transition duration-100 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface active:translate-y-px active:scale-[0.98]';

const variantClasses = {
  accent: 'bg-accent text-white hover:bg-blue-700 active:bg-blue-800',
  mono: 'bg-key text-charcoal hover:bg-line active:bg-[#d5cec4]',
};

export function CalculatorButton({
  children,
  onClick,
  variant = 'mono',
  wide = false,
}) {
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${wide ? 'col-span-2' : ''}`}
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
  variant: PropTypes.oneOf(['accent', 'mono']),
  wide: PropTypes.bool,
};
