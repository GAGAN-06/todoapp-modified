import { TodoListSkeleton } from './components/TodoListSkeleton';

export default function Loading() {  // Changed from RootLoading to Loading
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="w-full h-10 bg-gray-200 animate-pulse rounded mb-4" />
      <TodoListSkeleton />
    </div>
  );
}