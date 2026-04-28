import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  addPostComment,
  formatCommentTimestamp,
  formatPostTimestamp,
  hydratePost,
  incrementPostUpvotes,
  removePostMeta,
} from '../lib/postMeta';
import { deletePostRecord, fetchPost } from '../lib/postService';
import './PostDetails.css';

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [commentDraft, setCommentDraft] = useState({ author: '', content: '' });
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let isActive = true;

    const loadPost = async () => {
      setLoading(true);
      setError('');

      try {
        const data = await fetchPost(id);

        if (!isActive) {
          return;
        }

        setPost(hydratePost(data));
      } catch (loadError) {
        if (!isActive) {
          return;
        }

        setError(loadError.message || 'Unable to load this post.');
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    loadPost();

    return () => {
      isActive = false;
    };
  }, [id]);

  const handleUpvote = () => {
    setPost((currentPost) => {
      if (!currentPost) {
        return currentPost;
      }

      const nextCount = incrementPostUpvotes(
        currentPost.id,
        currentPost.upvotes ?? 0,
      );

      return {
        ...currentPost,
        upvotes: nextCount,
      };
    });
  };

  const handleCommentChange = (event) => {
    const { name, value } = event.target;

    setCommentDraft((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();

    if (!post || !commentDraft.content.trim()) {
      return;
    }

    const newComment = addPostComment(post.id, commentDraft);

    setPost((currentPost) => {
      if (!currentPost) {
        return currentPost;
      }

      return {
        ...currentPost,
        comments: [...currentPost.comments, newComment],
      };
    });

    setCommentDraft({ author: '', content: '' });
  };

  const handleDelete = async () => {
    if (!post || isDeleting) {
      return;
    }

    const shouldDelete = window.confirm(`Delete "${post.title}"?`);

    if (!shouldDelete) {
      return;
    }

    setIsDeleting(true);
    setError('');

    try {
      await deletePostRecord(post.id);
      removePostMeta(post.id);
      navigate('/');
    } catch (deleteError) {
      setError(deleteError.message || 'Unable to delete this post.');
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="status-panel status-panel--loading surface-panel">
        <p>Loading thread...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="status-panel status-panel--error">
        <p>{error || 'This post could not be found.'}</p>
      </div>
    );
  }

  return (
    <section className="post-page">
      {error ? (
        <div className="status-panel status-panel--error">
          <p>{error}</p>
        </div>
      ) : null}

      <div className="post-hero surface-panel">
        <div className="post-hero__copy">
          <p className="post-hero__eyebrow">Dedicated Post Page</p>
          <h2>{post.title}</h2>

          <div className="post-meta">
            <span>{formatPostTimestamp(post.created_at)}</span>
            <span>{post.upvotes ?? 0} upvotes</span>
            <span>{post.comments.length} comments</span>
          </div>

          <p className="post-author">
            Posted by <strong>{post.author || 'Anonymous Maker'}</strong>
          </p>

          <div className="post-actions">
            <button
              type="button"
              className="site-button site-button--primary"
              onClick={handleUpvote}
            >
              Upvote this post
            </button>
            <Link to={`/edit/${post.id}`} className="button-link button-link--ghost">
              Edit post
            </Link>
            <button
              type="button"
              className="button-link button-link--danger"
              onClick={handleDelete}
            >
              {isDeleting ? 'Deleting...' : 'Delete post'}
            </button>
          </div>
        </div>

        <div className="post-media">
          {post.imageUrl ? (
            <img
              src={post.imageUrl}
              alt={post.title}
              className="post-media__image"
            />
          ) : (
            <div className="post-media__placeholder">
              <span>No image attached</span>
              <p>
                This thread was published without an external image URL, so the
                conversation stays focused on the written content.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="post-body surface-panel">
        <div className="post-body__heading">
          <h3>Content</h3>
          <Link to="/" className="button-link button-link--ghost">
            Back to feed
          </Link>
        </div>
        <p className="post-body__content">
          {post.description?.trim()
            ? post.description
            : 'This post was published without additional written content.'}
        </p>
      </div>

      <div className="comment-section surface-panel">
        <div className="comment-section__heading">
          <h3>Comments</h3>
          <p>Leave a reply underneath the post to keep the discussion going.</p>
        </div>

        <form className="comment-form" onSubmit={handleCommentSubmit}>
          <label className="comment-form__field">
            <span>Name</span>
            <input
              type="text"
              id="comment-author"
              name="author"
              value={commentDraft.author}
              onChange={handleCommentChange}
              placeholder="Optional display name"
            />
          </label>

          <label className="comment-form__field">
            <span>Comment</span>
            <textarea
              id="comment-content"
              name="content"
              value={commentDraft.content}
              onChange={handleCommentChange}
              placeholder="Share a tip, ask a follow-up, or react to the post."
              required
            />
          </label>

          <button type="submit" className="site-button site-button--primary">
            Add comment
          </button>
        </form>

        <div className="comment-list">
          {post.comments.length > 0 ? (
            post.comments
              .slice()
              .reverse()
              .map((comment) => (
                <article key={comment.id} className="comment-card">
                  <div className="comment-card__meta">
                    <strong>{comment.author || 'Anonymous commenter'}</strong>
                    <span>{formatCommentTimestamp(comment.createdAt)}</span>
                  </div>
                  <p>{comment.content}</p>
                </article>
              ))
          ) : (
            <div className="status-panel status-panel--empty">
              <p>No comments yet. Start the conversation.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PostDetails;
