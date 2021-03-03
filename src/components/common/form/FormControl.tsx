import React from 'react';
import clsx from 'clsx';

export type FormControlProps = {
  label: string;
  name: string;
  type?: string;
  error?: string | false;
};

function FormControl(
  {
    label,
    type = 'text',
    name,
    error,
    ...divProps
  }: FormControlProps & JSX.IntrinsicElements['div'],
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const controlId = `form-input-${name}`;

  return (
    <div {...divProps}>
      <label className="block text-xs" htmlFor={controlId}>
        {label}
      </label>
      <input
        id={controlId}
        type={type}
        name={name}
        ref={ref}
        className={clsx('p-1 w-full border border-gray-300 rounded', error && 'border-red-800')}
      />
      {error && <div className="text-red-800 text-xs">{error}</div>}
    </div>
  );
}

export default React.forwardRef(FormControl);
