"use client";

import { TaskRowSkeleton } from './TaskRowSkeleton';
import React, { useState } from "react";
import Task from "./Task";
import SearchBar from "./SearchBar";
import { ITask } from "@/types/tasks";
import { getAllTodos } from "@/api";

interface TodoListProps {
  tasks: ITask[];
}

const TodoList: React.FC<TodoListProps> = ({ tasks: initialTasks }) => {
  const [tasks, setTasks] = useState(initialTasks);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchResults = (searchResults: ITask[]) => {
    setTasks(searchResults);
    setSearchError(null);
  };

  const handleSearchError = (error: string) => {
    setSearchError(error);
  };

  const handleShowAll = async () => {
    setIsLoading(true);
    try {
      const allTasks = await getAllTodos();
      setTasks(allTasks);
      setSearchError(null);
    } catch (error) {
      setSearchError('Failed to fetch tasks');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <SearchBar 
            onSearchResults={handleSearchResults}
            onError={handleSearchError}
          />
        </div>
        <button
          onClick={handleShowAll}
          className="btn btn-outline"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="loading loading-spinner loading-sm mr-2"></span>
              Loading...
            </>
          ) : (
            'Show All'
          )}
        </button>
      </div>
      
      {searchError && (
        <div className="alert alert-error">
          <span>{searchError}</span>
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Task</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <Task key={task.id} task={task} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodoList;