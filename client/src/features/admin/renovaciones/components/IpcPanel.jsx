const IpcPanel = ({
  selectedCount,
  ipcPorcentaje,
  onIpcChange,
  onApplyIpc
}) => {
  if (selectedCount === 0) {
    return null
  }

  return (
    <div className="ipc-section">
      <h3>Aplicar IPC a {selectedCount} renovación(es)</h3>
      <div className="ipc-controls">
        <input
          type="number"
          min="0"
          max="100"
          step="0.1"
          value={ipcPorcentaje}
          onChange={(event) => onIpcChange(Number.parseFloat(event.target.value))}
          className="ipc-input"
        />
        <span>%</span>
        <button onClick={onApplyIpc} className="btn-ipc">
          Aplicar IPC
        </button>
      </div>
    </div>
  )
}

export default IpcPanel
