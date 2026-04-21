import { getColorMeta } from '../lib/crewmates'

const CrewmateAvatar = ({ color, size = 'medium' }) => {
  const colorMeta = getColorMeta(color)

  return (
    <div
      aria-hidden="true"
      className={`crewmate-avatar crewmate-avatar--${size}`}
      style={{ '--crew-color': colorMeta.hex }}
    >
      <span className="crewmate-avatar__visor" />
      <span className="crewmate-avatar__pack" />
    </div>
  )
}

export default CrewmateAvatar
