const TaskRowSkeleton = () => {
    return (
      <tr>
        <td className="w-full">
          <div className="flex flex-col gap-2">
            <div className="h-5 bg-gray-200 animate-pulse rounded w-3/4" />
            <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2" />
          </div>
        </td>
        <td>
          <div className="w-20 h-8 bg-gray-200 animate-pulse rounded" />
        </td>
        <td>
          <div className="flex gap-5">
            <div className="w-6 h-6 bg-gray-200 animate-pulse rounded" />
            <div className="w-6 h-6 bg-gray-200 animate-pulse rounded" />
          </div>
        </td>
      </tr>
    );
  };
  
  export { TaskRowSkeleton };