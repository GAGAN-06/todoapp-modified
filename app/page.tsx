// app/page.tsx
import { Suspense } from 'react';
import AddTask from './components/AddTask';
import TodoList from './components/TodoList';
import { TodoListSkeleton } from './components/TodoListSkeleton';
import { query } from './lib/db';

// Helper function to add delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Function to fetch data with delay
async function getTasksWithDelay() {
  await delay(1500);
  const result = await query('SELECT * FROM Todo ORDER BY created_at DESC');
  return result.rows;
}

export default async function Home() {
  return (
    <main className='max-w-4xl mx-auto mt-4'>
      <div className='text-center my-5 flex flex-col gap-4'>
        <h1 className='text-2xl font-bold'>Todo List App</h1>
        <AddTask />
      </div>
      
      <Suspense fallback={<TodoListSkeleton />}>
        <TodoList tasks={await getTasksWithDelay()} />
      </Suspense>
    </main>
  );
}