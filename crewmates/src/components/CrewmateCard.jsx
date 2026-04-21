import { Link } from 'react-router-dom'
import CrewmateAvatar from './CrewmateAvatar'
import { formatDate, getColorMeta, getSpeedMeta } from '../lib/crewmates'

const CrewmateCard = ({ crewmate }) => {
  const colorMeta = getColorMeta(crewmate.color)
  const speedMeta = getSpeedMeta(crewmate.speed)

  return (
    <article className="crewmate-card" style={{ '--card-accent': colorMeta.hex }}>
      <Link className="crewmate-card__body" to={`/crewmates/${crewmate.id}`}>
        <div className="crewmate-card__top">
          <CrewmateAvatar color={crewmate.color} size="medium" />

          <div className="crewmate-card__meta">
            <p className="crewmate-card__label">Crewmate #{crewmate.id}</p>
            <h3 className="crewmate-card__title">{crewmate.name}</h3>
            <p className="crewmate-card__date">Logged {formatDate(crewmate.created_at)}</p>
          </div>
        </div>

        <div className="badge-row">
          <span className="stat-pill">{crewmate.color}</span>
          <span className="stat-pill">{speedMeta.label}</span>
          <span className="stat-pill stat-pill--soft">{speedMeta.tier}</span>
        </div>
      </Link>

      <div className="crewmate-card__actions">
        <Link className="ghost-button" to={`/crewmates/${crewmate.id}`}>
          Open file
        </Link>
        <Link className="ghost-button ghost-button--accent" to={`/crewmates/${crewmate.id}/edit`}>
          Edit
        </Link>
      </div>
    </article>
  )
}

export default CrewmateCard
