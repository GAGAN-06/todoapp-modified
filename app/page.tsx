import { query } from './lib/db'
import AddTask from "./components/AddTask";
import TodoList from "./components/TodoList";

export default async function Home() {
  // Direct database query instead of fetch
  const result = await query('SELECT * FROM Todo ORDER BY created_at DESC');
  const tasks = result.rows;

  return (
    <main className='max-w-4xl mx-auto mt-4'>
      <div className='text-center my-5 flex flex-col gap-4'>
        <h1 className='text-2xl font-bold'>Todo List App</h1>
        <AddTask />
      </div>
      <TodoList tasks={tasks} />
    </main>
  );
}