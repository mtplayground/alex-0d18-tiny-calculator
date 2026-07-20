import PropTypes from 'prop-types';

export function CalculatorDisplay({ value }) {
  return (
    <div
      className="mb-7 flex min-h-32 items-end justify-end overflow-hidden rounded-button border border-line bg-paper px-5 py-5"
      aria-live="polite"
    >
      <output
        className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-6xl font-semibold leading-none"
        aria-label="Calculator display"
      >
        {value}
      </output>
    </div>
  );
}

CalculatorDisplay.propTypes = {
  value: PropTypes.string.isRequired,
};
