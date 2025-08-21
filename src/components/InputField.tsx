import React, { useId } from 'react';
import clsx from 'clsx';


type Variant = 'filled' | 'outlined' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  id?: string;
  className?: string;
}

const InputField: React.FC<
  InputFieldProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'value' | 'onChange'>
> = ({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled,
  invalid,
  variant = 'outlined',
  size = 'md',
  loading = false,
  id,
  className,
  ...rest
}) => {
  const autoId = useId();
  const inputId = id ?? `if-${autoId}`;
  const describedBy = errorMessage
    ? `${inputId}-error`
    : helperText
    ? `${inputId}-help`
    : undefined;

  const sizeCls: Record<Size, string> = {
    sm: 'h-9 text-sm px-3',
    md: 'h-11 text-base px-3.5',
    lg: 'h-12 text-lg px-4',
  };

  const variantCls: Record<Variant, string> = {
    outlined:
      'bg-orange dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 focus:border-blue-500 focus:ring-2 focus:ring-pink-500',
    filled:
      'bg-pink-100 dark:bg-zinc-800 border border-transparent focus:border-blue-500 focus:ring-2 focus:ring-pink-500',
    ghost:
      'bg-red border border-transparent hover:bg-zinc-50 dark:hover:bg-zinc-900 focus:ring-2 focus:ring-pink-500',
  };

  const stateCls = clsx(
    'w-full rounded-xl shadow-sm outline-none transition-all duration-150',
    sizeCls[size],
    variantCls[variant],
    invalid && 'ring-2 ring-red-500 focus:ring-red-500 border-red-500',
    disabled && 'opacity-60 cursor-not-allowed',
    loading && 'pr-10'
  );

  return (
    <div className={clsx('w-full space-y-1.5', className)}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium tracking-wide text-zinc-700 dark:text-zinc-200"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={inputId}
          value={value}
          defaultValue={value === undefined ? rest.defaultValue : undefined}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={invalid ? 'true' : 'false'}
          aria-busy={loading ? 'true' : 'false'}
          aria-describedby={describedBy}
          className={stateCls}
          {...rest}
        />


        {loading && (
          <svg
            className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin h-5 w-5 text-zinc-500"
            viewBox="0 0 24 24"
            role="status"
            aria-label="Loading"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        )}
      </div>

      {errorMessage ? (
        <p id={`${inputId}-error`} className="text-sm text-red-600">
          {errorMessage}
        </p>
      ) : helperText ? (
        <p id={`${inputId}-help`} className="text-sm text-zinc-500">
          {helperText}
        </p>
      ) : null}
    </div>
  );
};

export default InputField;
