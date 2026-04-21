import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CrewmateForm from '../components/CrewmateForm'
import NoticePanel from '../components/NoticePanel'
import { createCrewmate, defaultCrewmate, formatErrorMessage } from '../lib/crewmates'

const CreateCrewmate = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState(defaultCrewmate)
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

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

    const { error } = await createCrewmate(formData)

    if (error) {
      setErrorMessage(formatErrorMessage(error))
      setSubmitting(false)
      return
    }

    navigate('/gallery')
  }

  return (
    <div className="page-stack">
      <NoticePanel
        action={
          <Link className="ghost-button ghost-button--accent" to="/gallery">
            Open gallery
          </Link>
        }
        message="If saving fails, create the `crewmates` table from the README in this folder and verify your Supabase credentials."
        title="Supabase setup"
      />

      <CrewmateForm
        description="Pick a name, choose one of the preset speed values, and lock in a suit color."
        errorMessage={errorMessage}
        formData={formData}
        onFieldChange={handleFieldChange}
        onSubmit={handleSubmit}
        submitLabel="Save crewmate"
        submitting={submitting}
        title="Create a new crewmate"
      />
    </div>
  )
}

export default CreateCrewmate
