import './Button.css'

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  const buttonClassName = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    loading ? 'btn-loading' : '',
    className
  ].filter(Boolean).join(' ')

  return (
    <button
      className={buttonClassName}
      disabled={disabled || loading}
      onClick={onClick}
      type={type}
      {...props}
    >
      {loading ? 'Cargando...' : children}
    </button>
  )
}

export default Button
