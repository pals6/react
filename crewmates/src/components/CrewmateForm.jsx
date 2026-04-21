import CrewmateAvatar from './CrewmateAvatar'
import { colorOptions, getSpeedMeta, speedOptions } from '../lib/crewmates'

const CrewmateForm = ({
  title,
  description,
  formData,
  onFieldChange,
  onSubmit,
  submitLabel,
  submitting,
  errorMessage,
  onDelete,
}) => {
  const speedMeta = getSpeedMeta(formData.speed)
  const previewName = formData.name.trim() || 'Unnamed recruit'

  return (
    <form className="panel form-shell" onSubmit={onSubmit}>
      <div className="form-preview">
        <p className="eyebrow">Live preview</p>
        <h2>{title}</h2>
        <p className="muted-copy">{description}</p>

        <div className="form-preview__card">
          <CrewmateAvatar color={formData.color} size="large" />
          <div>
            <h3 className="preview-name">{previewName}</h3>
            <p className="preview-meta">
              {formData.color} suit • {speedMeta.label}
            </p>
            <p className="muted-copy">{speedMeta.note}</p>
          </div>
        </div>
      </div>

      <div className="form-fields">
        <label className="field-block" htmlFor="name">
          Name
          <input
            id="name"
            className="text-input"
            maxLength="32"
            name="name"
            onChange={(event) => onFieldChange('name', event.target.value)}
            placeholder="Captain Nova"
            type="text"
            value={formData.name}
          />
        </label>

        <fieldset className="field-group">
          <legend>Speed</legend>
          <div className="choice-grid">
            {speedOptions.map((option) => (
              <button
                key={option.value}
                aria-pressed={Number(formData.speed) === option.value}
                className="choice-button"
                onClick={() => onFieldChange('speed', option.value)}
                type="button"
              >
                <span>{option.label}</span>
                <small>{option.note}</small>
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="field-group">
          <legend>Suit color</legend>
          <div className="choice-grid color-grid">
            {colorOptions.map((option) => (
              <button
                key={option.name}
                aria-pressed={formData.color === option.name}
                className="choice-button color-choice"
                onClick={() => onFieldChange('color', option.name)}
                style={{ '--choice-color': option.hex }}
                type="button"
              >
                <span className="color-dot" />
                <span>{option.name}</span>
              </button>
            ))}
          </div>
        </fieldset>

        {errorMessage ? <p className="form-error">{errorMessage}</p> : null}

        <div className="form-actions">
          <button className="primary-button" disabled={submitting || !formData.name.trim()} type="submit">
            {submitting ? 'Saving...' : submitLabel}
          </button>

          {onDelete ? (
            <button className="danger-button" onClick={onDelete} type="button">
              Delete crewmate
            </button>
          ) : null}
        </div>
      </div>
    </form>
  )
}

export default CrewmateForm
