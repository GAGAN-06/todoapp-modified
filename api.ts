import { ICreateTask } from "./types/tasks";
interface ITask {
  id: string;
  title: string;
  description: string;
  status: boolean;
}

export const getAllTodos = async (): Promise<ITask[]> => {
  const res = await fetch('/api/todos', { 
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  return data;
};

export const addTodo = async (todo: ICreateTask): Promise<ITask> => {
  const res = await fetch('/api/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });
  if (!res.ok) {
    throw new Error('Failed to add todo');
  }
  return res.json();
};

export const editTodo = async (todo: ITask): Promise<ITask> => {
  const res = await fetch(`/api/todos/${todo.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });
  const data = await res.json();
  return data;
};

export const deleteTodo = async (id: string): Promise<void> => {
  await fetch(`/api/todos/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const searchTodos = async (searchTerm: string): Promise<ITask[]> => {
  try {
    const res = await fetch(`/api/todos/search?q=${encodeURIComponent(searchTerm)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ error: 'Unknown error occurred' }));
      throw new Error(errorData.error || `Search failed with status: ${res.status}`);
    }

    const text = await res.text(); // Get response as text first
    if (!text) {
      return []; // Return empty array if response is empty
    }

    try {
      const data = JSON.parse(text); // Try to parse the JSON
      return data;
    } catch (e) {
      console.error('JSON Parse Error:', text); // Log the actual response
      throw new Error('Invalid JSON response from server');
    }
  } catch (error) {
    console.error('Search Error:', error);
    throw error;
  }
};