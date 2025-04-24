import { api } from './api';

export const createNote = async (newNote: { content: string }) => {
  const response = await api.post('/api/notes', newNote);
  return response.data;
};

export const getNotes = async () => {
    const response = await api.get('/api/notes');
    return response.data;
};

export const editNoteById = async ({ id, content }: { id: number; content: string}) => {
    console.log(content)
    const response = await api.put(`/api/notes/edit/${id}`,{content});
    return response.data;
};
export const deleteNoteById = async (id: number) => {
    const response = await api.delete(`/api/notes/delete/${id}`);
    return response.data;
};


export const summarizeNote = async (text: string) => {
    const response = await api.post('/api/summarize', { content:text });
    return response.data.summary;
  };