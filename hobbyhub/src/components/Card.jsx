import { Link } from 'react-router-dom';
import { formatPostTimestamp } from '../lib/postMeta';
import './Card.css';

const Card = ({ post }) => {
  return (
    <Link to={`/posts/${post.id}`} className="Card">
      <div className="card-meta">
        <span>{formatPostTimestamp(post.created_at)}</span>
        <span className="card-meta__dot" aria-hidden="true" />
        <span>{post.upvotes ?? 0} upvotes</span>
      </div>

      <h2 className="card-title">{post.title}</h2>
    </Link>
  );
};

export default Card;
