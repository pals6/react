import './PostForm.css';

const PostForm = ({
  title,
  subtitle,
  submitLabel,
  busyLabel,
  formState,
  isBusy,
  onChange,
  onSubmit,
  children,
}) => {
  return (
    <section className="editor-page">
      <div className="editor-page__copy">
        <p className="editor-page__eyebrow">Compose a thread</p>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>

      <form className="post-form surface-panel" onSubmit={onSubmit}>
        <label className="form-field">
          <span>Post title *</span>
          <input
            type="text"
            id="title"
            name="title"
            value={formState.title}
            onChange={onChange}
            required
            maxLength="120"
            placeholder="What are you sharing with the community?"
          />
        </label>

        <label className="form-field">
          <span>Posted by</span>
          <input
            type="text"
            id="author"
            name="author"
            value={formState.author}
            onChange={onChange}
            maxLength="60"
            placeholder="Optional display name"
          />
        </label>

        <label className="form-field">
          <span>Content</span>
          <textarea
            id="description"
            name="description"
            value={formState.description}
            onChange={onChange}
            placeholder="Add details, tips, or context for the rest of the forum."
          />
        </label>

        <label className="form-field">
          <span>Image URL</span>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={formState.imageUrl}
            onChange={onChange}
            placeholder="https://example.com/hobby-photo.jpg"
          />
        </label>

        <p className="form-note">
          Title is required. Content and image URL are optional, matching the
          Week 9 project requirements.
        </p>

        <div className="form-actions">
          <button type="submit" className="site-button site-button--primary">
            {isBusy ? busyLabel : submitLabel}
          </button>
          <div className="form-actions__secondary">{children}</div>
        </div>
      </form>
    </section>
  );
};

export default PostForm;
