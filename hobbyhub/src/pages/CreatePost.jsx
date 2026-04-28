import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PostForm from '../components/PostForm';
import { EMPTY_POST_DRAFT, savePostMeta } from '../lib/postMeta';
import { createPostRecord } from '../lib/postService';

const CreatePost = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState(EMPTY_POST_DRAFT);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

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
      const createdPost = await createPostRecord(formState);

      savePostMeta(createdPost.id, {
        imageUrl: formState.imageUrl.trim(),
        upvotes: 0,
        comments: [],
      });

      navigate(`/posts/${createdPost.id}`);
    } catch (createError) {
      setError(createError.message || 'Unable to create this post right now.');
      setIsSaving(false);
    }
  };

  return (
    <div className="editor-layout">
      {error ? (
        <div className="status-panel status-panel--error">
          <p>{error}</p>
        </div>
      ) : null}

      <PostForm
        title="Start a new hobby thread"
        subtitle="Create a post with a required title, optional written content, and an optional external image URL."
        submitLabel="Publish post"
        busyLabel="Publishing..."
        formState={formState}
        isBusy={isSaving}
        onChange={handleChange}
        onSubmit={handleSubmit}
      >
        <Link to="/" className="button-link button-link--ghost">
          Back to feed
        </Link>
      </PostForm>
    </div>
  );
};

export default CreatePost;
