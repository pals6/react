import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CrewmateCard from '../components/CrewmateCard'
import NoticePanel from '../components/NoticePanel'
import { fetchCrewmates, formatErrorMessage } from '../lib/crewmates'

const CrewmateGallery = () => {
  const [crewmates, setCrewmates] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let cancelled = false

    const loadCrewmates = async () => {
      setLoading(true)
      const { data, error } = await fetchCrewmates()

      if (cancelled) {
        return
      }

      setCrewmates(data)
      setErrorMessage(error ? formatErrorMessage(error) : '')
      setLoading(false)
    }

    loadCrewmates()

    return () => {
      cancelled = true
    }
  }, [])

  if (loading) {
    return (
      <div className="page-stack">
        <section className="panel">
          <p className="eyebrow">Summary page</p>
          <h2>Loading your crew...</h2>
        </section>
      </div>
    )
  }

  if (errorMessage) {
    return (
      <div className="page-stack">
        <NoticePanel
          action={
            <Link className="primary-button" to="/create">
              Create a crewmate
            </Link>
          }
          message={errorMessage}
          title="The gallery could not load"
        />
      </div>
    )
  }

  return (
    <div className="page-stack">
      <section className="panel page-header">
        <div>
          <p className="eyebrow">Summary page</p>
          <h2>Your Crewmate Gallery</h2>
          <p className="muted-copy">
            Every saved crewmate appears here, sorted by creation date with the newest entries first.
          </p>
        </div>

        <Link className="primary-button" to="/create">
          Add another crewmate
        </Link>
      </section>

      {crewmates.length === 0 ? (
        <section className="panel empty-panel">
          <h3>No crewmates yet</h3>
          <p className="muted-copy">
            Start with the create page, save your first recruit, and it will appear here.
          </p>
          <Link className="secondary-button" to="/create">
            Create your first crewmate
          </Link>
        </section>
      ) : (
        <section className="card-grid">
          {crewmates.map((crewmate) => (
            <CrewmateCard key={crewmate.id} crewmate={crewmate} />
          ))}
        </section>
      )}
    </div>
  )
}

export default CrewmateGallery
