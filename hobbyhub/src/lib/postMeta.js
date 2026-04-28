const STORAGE_KEY = 'hobbyhub-post-meta-v1';

export const EMPTY_POST_DRAFT = {
  title: '',
  author: '',
  description: '',
  imageUrl: '',
};

const readPostMeta = () => {
  if (typeof window === 'undefined') {
    return {};
  }

  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY);
    return storedValue ? JSON.parse(storedValue) : {};
  } catch (error) {
    console.error('Unable to read saved post metadata.', error);
    return {};
  }
};

const writePostMeta = (meta) => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(meta));
};

const getPostMeta = (postId) => {
  const allMeta = readPostMeta();
  return allMeta[String(postId)] ?? {};
};

export const savePostMeta = (postId, patch) => {
  const allMeta = readPostMeta();
  const key = String(postId);

  allMeta[key] = {
    ...allMeta[key],
    ...patch,
  };

  writePostMeta(allMeta);
  return allMeta[key];
};

export const removePostMeta = (postId) => {
  const allMeta = readPostMeta();
  delete allMeta[String(postId)];
  writePostMeta(allMeta);
};

export const hydratePost = (post) => {
  const meta = getPostMeta(post.id);
  const postUpvotes = Number(post.upvotes ?? 0);

  return {
    ...post,
    imageUrl: meta.imageUrl ?? '',
    upvotes: Number.isNaN(postUpvotes) ? 0 : meta.upvotes ?? postUpvotes,
    comments: Array.isArray(meta.comments) ? meta.comments : [],
  };
};

export const hydratePosts = (posts) => {
  return (posts ?? []).map(hydratePost);
};

export const createDraftFromPost = (post) => {
  const hydratedPost = hydratePost(post);

  return {
    title: hydratedPost.title ?? '',
    author: hydratedPost.author ?? '',
    description: hydratedPost.description ?? '',
    imageUrl: hydratedPost.imageUrl ?? '',
  };
};

export const incrementPostUpvotes = (postId, currentCount = 0) => {
  const nextCount = Number(currentCount || 0) + 1;
  savePostMeta(postId, { upvotes: nextCount });
  return nextCount;
};

export const addPostComment = (postId, draft) => {
  const nextComment = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    author: draft.author.trim(),
    content: draft.content.trim(),
    createdAt: new Date().toISOString(),
  };

  const currentMeta = getPostMeta(postId);
  const comments = [...(currentMeta.comments ?? []), nextComment];

  savePostMeta(postId, { comments });

  return nextComment;
};

export const formatPostTimestamp = (timestamp) => {
  if (!timestamp) {
    return 'Recently posted';
  }

  const createdAt = new Date(timestamp);
  const diffInMs = Date.now() - createdAt.getTime();
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

  if (diffInHours < 1) {
    return 'Less than an hour ago';
  }

  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
  }

  return createdAt.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const formatCommentTimestamp = (timestamp) => {
  if (!timestamp) {
    return 'Just now';
  }

  return new Date(timestamp).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
};
