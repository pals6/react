import { Link } from 'react-router-dom'
import CrewmateAvatar from '../components/CrewmateAvatar'
import { colorOptions } from '../lib/crewmates'

const highlights = [
  {
    title: 'Create from a dedicated form',
    body: 'Give each crewmate a name, then click through speed and color options.',
  },
  {
    title: 'See the newest crew first',
    body: 'The gallery is sorted by creation date so the latest recruit stays on top.',
  },
  {
    title: 'Open direct detail pages',
    body: 'Every crewmate gets a unique URL with extra readouts and a route back to edit.',
  },
  {
    title: 'Update or delete later',
    body: 'Each saved crewmate can be edited or removed from a dedicated update screen.',
  },
]

const previewColors = [colorOptions[0].name, colorOptions[3].name, colorOptions[6].name]

const Home = () => {
  return (
    <div className="page-stack">
      <section className="panel hero">
        <div className="hero__copy">
          <p className="eyebrow">Project 7</p>
          <h2 className="hero__title">Build the sharpest crew in the galaxy.</h2>
          <p className="hero__body">
            This Week 8 app is set up for the CodePath Crewmates project: a Supabase-backed
            creator, a sorted summary gallery, unique detail routes, and full CRUD.
          </p>

          <div className="cta-row">
            <Link className="primary-button" to="/create">
              Create a crewmate
            </Link>
            <Link className="secondary-button" to="/gallery">
              View gallery
            </Link>
          </div>
        </div>

        <div className="hero__visual">
          {previewColors.map((color) => (
            <div key={color} className="hero__tile">
              <CrewmateAvatar color={color} size="large" />
              <span>{color}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="feature-grid">
        {highlights.map((item) => (
          <article key={item.title} className="panel feature-card">
            <p className="eyebrow">Required feature</p>
            <h3>{item.title}</h3>
            <p className="muted-copy">{item.body}</p>
          </article>
        ))}
      </section>

      <section className="panel route-panel">
        <p className="eyebrow">Routes</p>
        <h2>Project structure</h2>
        <div className="route-list">
          <div className="route-item">
            <span>/</span>
            <p>Landing page with the assignment overview and quick actions.</p>
          </div>
          <div className="route-item">
            <span>/create</span>
            <p>Create form for new crewmates.</p>
          </div>
          <div className="route-item">
            <span>/gallery</span>
            <p>Summary page showing every saved crewmate, newest first.</p>
          </div>
          <div className="route-item">
            <span>/crewmates/:id</span>
            <p>Detail page with extra readouts and the unique link requirement.</p>
          </div>
          <div className="route-item">
            <span>/crewmates/:id/edit</span>
            <p>Update form with the current values and a delete button.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
