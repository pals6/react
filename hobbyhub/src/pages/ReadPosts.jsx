import { useEffect, useState } from 'react';
import Card from '../components/Card';
import { hydratePosts } from '../lib/postMeta';
import { fetchPosts } from '../lib/postService';
import './ReadPosts.css';

const ReadPosts = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isActive = true;

    const loadPosts = async () => {
      setLoading(true);
      setError('');

      try {
        const data = await fetchPosts();

        if (!isActive) {
          return;
        }

        setPosts(hydratePosts(data));
      } catch (loadError) {
        if (!isActive) {
          return;
        }

        setError(loadError.message || 'Unable to load the forum feed.');
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    loadPosts();

    return () => {
      isActive = false;
    };
  }, []);

  const query = searchTerm.trim().toLowerCase();
  const visiblePosts = [...posts]
    .filter((post) => post.title?.toLowerCase().includes(query))
    .sort((left, right) => {
      if (sortBy === 'upvotes') {
        return (right.upvotes ?? 0) - (left.upvotes ?? 0);
      }

      return (
        new Date(right.created_at ?? 0).getTime() -
        new Date(left.created_at ?? 0).getTime()
      );
    });

  return (
    <section className="feed-page">
      <div className="feed-hero surface-panel">
        <div className="feed-hero__copy">
          <p className="feed-hero__eyebrow">Home Feed</p>
          <h2>Track what the community is building, learning, and debating.</h2>
          <p>
            Every post opens into a dedicated thread where people can add
            context, share reference images, leave comments, and upvote ideas
            worth trying next.
          </p>
        </div>

        <div className="feed-hero__stats">
          <div className="stat-block">
            <span className="stat-block__label">Posts in the forum</span>
            <strong>{posts.length}</strong>
          </div>
          <div className="stat-block">
            <span className="stat-block__label">Visible after search</span>
            <strong>{visiblePosts.length}</strong>
          </div>
          <div className="stat-block">
            <span className="stat-block__label">Sorted by</span>
            <strong>{sortBy === 'upvotes' ? 'Most upvoted' : 'Newest'}</strong>
          </div>
        </div>
      </div>

      <div className="feed-controls surface-panel">
        <label className="feed-controls__field">
          <span>Search by title</span>
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search threads"
          />
        </label>

        <label className="feed-controls__field">
          <span>Sort posts</span>
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
          >
            <option value="created_at">Creation time</option>
            <option value="upvotes">Upvotes count</option>
          </select>
        </label>
      </div>

      {loading ? (
        <div className="status-panel status-panel--loading surface-panel">
          <p>Loading posts...</p>
        </div>
      ) : null}

      {!loading && error ? (
        <div className="status-panel status-panel--error">
          <p>{error}</p>
        </div>
      ) : null}

      {!loading && !error && visiblePosts.length === 0 ? (
        <div className="status-panel status-panel--empty surface-panel">
          <p>
            {posts.length === 0
              ? 'No posts yet. Start the first thread from the button above.'
              : 'No posts match that title search.'}
          </p>
        </div>
      ) : null}

      {!loading && !error && visiblePosts.length > 0 ? (
        <div className="feed-grid">
          {visiblePosts.map((post) => (
            <Card key={post.id} post={post} />
          ))}
        </div>
      ) : null}
    </section>
  );
};

export default ReadPosts;
