import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PostForm from '../components/PostForm';
import {
  EMPTY_POST_DRAFT,
  createDraftFromPost,
  savePostMeta,
} from '../lib/postMeta';
import { fetchPost, updatePostRecord } from '../lib/postService';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formState, setFormState] = useState(EMPTY_POST_DRAFT);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let isActive = true;

    const loadPost = async () => {
      setLoading(true);
      setError('');

      try {
        const post = await fetchPost(id);

        if (!isActive) {
          return;
        }

        setFormState(createDraftFromPost(post));
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

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setError('');

    try {
      await updatePostRecord(id, formState);

      savePostMeta(id, {
        imageUrl: formState.imageUrl.trim(),
      });

      navigate(`/posts/${id}`);
    } catch (saveError) {
      setError(saveError.message || 'Unable to save this post.');
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="status-panel status-panel--loading surface-panel">
        <p>Loading post editor...</p>
      </div>
    );
  }

  return (
    <div className="editor-layout">
      {error ? (
        <div className="status-panel status-panel--error">
          <p>{error}</p>
        </div>
      ) : null}

      <PostForm
        title="Refine your thread"
        subtitle="Update the title, content, or image URL, then return to the dedicated post page."
        submitLabel="Save changes"
        busyLabel="Saving..."
        formState={formState}
        isBusy={isSaving}
        onChange={handleChange}
        onSubmit={handleSubmit}
      >
        <Link to={`/posts/${id}`} className="button-link button-link--ghost">
          Back to post
        </Link>
      </PostForm>
    </div>
  );
};

export default EditPost;
