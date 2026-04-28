import { supabase } from '../client';

const POSTS_TABLE = 'Posts';

const normalizeDraft = (draft) => {
  return {
    title: draft.title.trim(),
    author: draft.author.trim() || 'Anonymous Maker',
    description: draft.description.trim(),
  };
};

export const fetchPosts = async () => {
  const { data, error } = await supabase
    .from(POSTS_TABLE)
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data ?? [];
};

export const fetchPost = async (id) => {
  const { data, error } = await supabase
    .from(POSTS_TABLE)
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const createPostRecord = async (draft) => {
  const { data, error } = await supabase
    .from(POSTS_TABLE)
    .insert(normalizeDraft(draft))
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const updatePostRecord = async (id, draft) => {
  const { data, error } = await supabase
    .from(POSTS_TABLE)
    .update(normalizeDraft(draft))
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const deletePostRecord = async (id) => {
  const { error } = await supabase.from(POSTS_TABLE).delete().eq('id', id);

  if (error) {
    throw error;
  }
};
