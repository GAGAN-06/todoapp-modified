const TodoListSkeleton = () => {
    return (
      <div className="space-y-4">
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
              {[...Array(5)].map((_, index) => (
                <tr key={index}>
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  export { TodoListSkeleton}