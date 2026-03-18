import Button from '../../../../components/common/Button'

const RenovacionForm = ({
  formData,
  isEditing,
  onCancel,
  onInputChange,
  onSubmit
}) => {
  return (
    <form onSubmit={onSubmit} className="renovacion-form">
      <div className="form-row">
        <div className="form-group">
          <label>Nombre Cliente*</label>
          <input
            type="text"
            name="nombre_cliente"
            value={formData.nombre_cliente}
            onChange={onInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Empresa</label>
          <input
            type="text"
            name="empresa"
            value={formData.empresa}
            onChange={onInputChange}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onInputChange}
          />
        </div>
        <div className="form-group">
          <label>Teléfono</label>
          <input
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={onInputChange}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Precio (€)</label>
          <input
            type="number"
            name="precio"
            step="0.01"
            value={formData.precio}
            onChange={onInputChange}
          />
        </div>
        <div className="form-group">
          <label>Fecha Renovación*</label>
          <input
            type="date"
            name="fecha_renovacion"
            value={formData.fecha_renovacion}
            onChange={onInputChange}
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group checkbox">
          <label>
            <input
              type="checkbox"
              name="giro_bancario"
              checked={formData.giro_bancario === 1}
              onChange={onInputChange}
            />
            Giro Bancario
          </label>
        </div>
        <div className="form-group checkbox">
          <label>
            <input
              type="checkbox"
              name="b_flag"
              checked={formData.b_flag === 1}
              onChange={onInputChange}
            />
            B
          </label>
        </div>
      </div>

      <div className="form-group">
        <label>Servicios Contratados</label>
        <textarea
          name="servicios_contratados"
          value={formData.servicios_contratados}
          onChange={onInputChange}
          rows="2"
        />
      </div>

      <div className="form-group">
        <label>Comentarios</label>
        <textarea
          name="comentarios"
          value={formData.comentarios}
          onChange={onInputChange}
          rows="2"
        />
      </div>

      <div className="form-actions">
        <Button type="submit" variant="primary">
          {isEditing ? 'Guardar Cambios' : 'Crear Renovación'}
        </Button>

        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  )
}

export default RenovacionForm
