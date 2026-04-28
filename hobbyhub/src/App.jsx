import './App.css';
import { Link, useRoutes } from 'react-router-dom';
import ReadPosts from './pages/ReadPosts';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import PostDetails from './pages/PostDetails';

const App = () => {
  const element = useRoutes([
    {
      path: '/',
      element: <ReadPosts />,
    },
    {
      path: '/new',
      element: <CreatePost />,
    },
    {
      path: '/posts/:id',
      element: <PostDetails />,
    },
    {
      path: '/edit/:id',
      element: <EditPost />,
    },
  ]);

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="site-header__inner">
          <Link to="/" className="brand-mark">
            <span className="brand-mark__icon">HH</span>
            <div>
              <p className="brand-mark__eyebrow">Week 9 Final Project</p>
              <h1>HobbyHub</h1>
            </div>
          </Link>

          <p className="site-summary">
            Build a home for the hobbies you obsess over. Publish new threads,
            browse the latest ideas, and keep every discussion in one place.
          </p>

          <nav className="site-nav" aria-label="Primary">
            <Link to="/" className="site-button site-button--ghost">
              Browse Feed
            </Link>
            <Link to="/new" className="site-button site-button--primary">
              Start a Post
            </Link>
          </nav>
        </div>
      </header>

      <main className="site-main">{element}</main>
    </div>
  );
};

export default App;
