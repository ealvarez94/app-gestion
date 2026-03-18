import { forwardRef } from 'react'
import './Input.css'

const Input = forwardRef(({
  label,
  error,
  type = 'text',
  className = '',
  ...props
}, ref) => {
  const inputClass = `input ${error ? 'input-error' : ''} ${className}`

  return (
    <div className="input-group">
      {label && (
        <label htmlFor={props.id} className="input-label">
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        className={inputClass}
        {...props}
      />
      {error && <span className="input-error-text">{error}</span>}
    </div>
  )
})

Input.displayName = 'Input'

export default Input
