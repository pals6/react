import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import CrewmateAvatar from '../components/CrewmateAvatar'
import NoticePanel from '../components/NoticePanel'
import {
  buildCrewmateInsight,
  fetchCrewmate,
  formatDate,
  formatErrorMessage,
  getSpeedMeta,
} from '../lib/crewmates'

const CrewmateDetails = () => {
  const { id } = useParams()
  const [crewmate, setCrewmate] = useState(null)
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let cancelled = false

    const loadCrewmate = async () => {
      setLoading(true)
      const { data, error } = await fetchCrewmate(id)

      if (cancelled) {
        return
      }

      setCrewmate(data)
      setErrorMessage(error ? formatErrorMessage(error) : '')
      setLoading(false)
    }

    loadCrewmate()

    return () => {
      cancelled = true
    }
  }, [id])

  if (loading) {
    return (
      <div className="page-stack">
        <section className="panel">
          <p className="eyebrow">Crewmate file</p>
          <h2>Loading crewmate details...</h2>
        </section>
      </div>
    )
  }

  if (errorMessage || !crewmate) {
    return (
      <div className="page-stack">
        <NoticePanel
          action={
            <Link className="secondary-button" to="/gallery">
              Back to gallery
            </Link>
          }
          message={errorMessage || 'That crewmate could not be found.'}
          title="Crewmate unavailable"
        />
      </div>
    )
  }

  const speedMeta = getSpeedMeta(crewmate.speed)
  const insight = buildCrewmateInsight(crewmate)

  return (
    <div className="page-stack">
      <section className="panel detail-hero">
        <div className="detail-hero__identity">
          <CrewmateAvatar color={crewmate.color} size="large" />
          <div>
            <p className="eyebrow">Crewmate file</p>
            <h2>{crewmate.name}</h2>
            <p className="muted-copy">
              {crewmate.color} suit • {speedMeta.label} • created {formatDate(crewmate.created_at)}
            </p>

            <div className="badge-row">
              <span className="stat-pill">{speedMeta.tier}</span>
              <span className="stat-pill">{crewmate.color}</span>
              <span className="stat-pill stat-pill--soft">Unique URL ready</span>
            </div>
          </div>
        </div>

        <div className="cta-row">
          <Link className="primary-button" to={`/crewmates/${crewmate.id}/edit`}>
            Edit this crewmate
          </Link>
          <Link className="secondary-button" to="/gallery">
            Back to gallery
          </Link>
        </div>
      </section>

      <section className="detail-grid">
        <article className="panel metric-card">
          <p className="eyebrow">Mission role</p>
          <h3>{insight.missionRole}</h3>
          <p className="muted-copy">{insight.dangerNote}</p>
        </article>

        <article className="panel metric-card">
          <p className="eyebrow">Speed readout</p>
          <h3>{speedMeta.tier}</h3>
          <p className="muted-copy">{insight.speedReadout}</p>
        </article>

        <article className="panel metric-card">
          <p className="eyebrow">Style readout</p>
          <h3>{crewmate.color}</h3>
          <p className="muted-copy">{insight.colorReadout}</p>
        </article>
      </section>
    </div>
  )
}

export default CrewmateDetails
