// app/components/SearchBar.tsx
"use client";

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { searchTodos } from '@/api';
import debounce from 'lodash/debounce';
import { ITask } from '@/types/tasks';

interface SearchBarProps {
  onSearchResults: (tasks: ITask[]) => void;
  onError: (error: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchResults, onError }) => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();

  const debouncedSearch = useCallback(
    debounce(async (term: string) => {
      if (!term.trim()) {
        router.refresh();
        return;
      }

      try {
        setIsSearching(true);
        const results = await searchTodos(term);
        onSearchResults(results);
      } catch (error) {
        onError(error instanceof Error ? error.message : 'Search failed');
      } finally {
        setIsSearching(false);
      }
    }, 300),
    [onSearchResults, onError, router]
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    debouncedSearch(value);
  };

  return (
    <div className="flex gap-2 w-full max-w-xl mb-4">
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchValue}
          onChange={handleSearch}
          className="input input-bordered w-full pr-10"
        />
        {isSearching && (
          <div className="absolute right-3 top-3">
            <div className="loading loading-spinner loading-sm"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;