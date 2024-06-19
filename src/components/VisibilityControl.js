
export const VisibilityControl = ({ isChecked, setShowCompletedSection, cleanTask }) => {

  const handleDelete = () => {
    if (window.confirm("are you sure you want to delete it?")) {
      cleanTask()
    }
  }

  return (
    <div className="d-flex justify-content-between bg-secondary text-white text-center p-2 border-secondary">
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type='checkbox'
          checked={isChecked}
          onChange={e => setShowCompletedSection(e.target.checked)}
        />
        <label>Show Task Done</label>

        <button className="btn btn-danger btn-sm" onClick={handleDelete}>Clear</button>
      </div>
    </div>
  )
}