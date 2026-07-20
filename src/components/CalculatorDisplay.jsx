import PropTypes from 'prop-types';

export function CalculatorDisplay({ value }) {
  return (
    <div
      className="mb-6 flex min-h-28 items-end justify-end overflow-hidden rounded-button border border-line bg-paper px-5 py-4"
      aria-live="polite"
    >
      <output className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-5xl font-semibold leading-none">
        {value}
      </output>
    </div>
  );
}

CalculatorDisplay.propTypes = {
  value: PropTypes.string.isRequired,
};
