import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import CrewmateForm from '../components/CrewmateForm'
import NoticePanel from '../components/NoticePanel'
import {
  defaultCrewmate,
  deleteCrewmate,
  fetchCrewmate,
  formatErrorMessage,
  updateCrewmate,
} from '../lib/crewmates'

const EditCrewmate = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState(defaultCrewmate)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let cancelled = false

    const loadCrewmate = async () => {
      setLoading(true)
      const { data, error } = await fetchCrewmate(id)

      if (cancelled) {
        return
      }

      if (error || !data) {
        setErrorMessage(formatErrorMessage(error) || 'That crewmate could not be found.')
        setLoading(false)
        return
      }

      setFormData({
        name: data.name || '',
        speed: Number(data.speed) || defaultCrewmate.speed,
        color: data.color || defaultCrewmate.color,
      })
      setErrorMessage('')
      setLoading(false)
    }

    loadCrewmate()

    return () => {
      cancelled = true
    }
  }, [id])

  const handleFieldChange = (field, value) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setErrorMessage('')

    const { error } = await updateCrewmate(id, formData)

    if (error) {
      setErrorMessage(formatErrorMessage(error))
      setSubmitting(false)
      return
    }

    navigate('/gallery')
  }

  const handleDelete = async () => {
    const shouldDelete = window.confirm('Delete this crewmate from the roster?')

    if (!shouldDelete) {
      return
    }

    setSubmitting(true)
    setErrorMessage('')

    const { error } = await deleteCrewmate(id)

    if (error) {
      setErrorMessage(formatErrorMessage(error))
      setSubmitting(false)
      return
    }

    navigate('/gallery')
  }

  if (loading) {
    return (
      <div className="page-stack">
        <section className="panel">
          <p className="eyebrow">Update form</p>
          <h2>Loading current crewmate values...</h2>
        </section>
      </div>
    )
  }

  if (errorMessage && !formData.name.trim()) {
    return (
      <div className="page-stack">
        <NoticePanel
          action={
            <Link className="secondary-button" to="/gallery">
              Back to gallery
            </Link>
          }
          message={errorMessage}
          title="Crewmate unavailable"
        />
      </div>
    )
  }

  return (
    <div className="page-stack">
      <CrewmateForm
        description="The current values load from Supabase first. Update them here, then save or delete from the same screen."
        errorMessage={errorMessage}
        formData={formData}
        onDelete={handleDelete}
        onFieldChange={handleFieldChange}
        onSubmit={handleSubmit}
        submitLabel="Save changes"
        submitting={submitting}
        title="Update your crewmate"
      />
    </div>
  )
}

export default EditCrewmate
