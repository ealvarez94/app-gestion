import './Button.css'

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  ...props
}) => {
  const className = `btn btn-${variant} btn-${size} ${loading ? 'btn-loading' : ''}`

  return (
    <button
      className={className}
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