"use client";

import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/api";
import { ITask } from "@/types/tasks";

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState({
    title: task.title,
    description: task.description,
    status: task.status
  });

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTodo({
      id: task.id,
      title: taskToEdit.title,
      description: taskToEdit.description,
      status: taskToEdit.status
    });
    setOpenModalEdit(false);
    router.refresh();
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTodo(id);
    setOpenModalDeleted(false);
    router.refresh();
  };

  const handleToggleStatus = async () => {
    await editTodo({
      ...task,
      status: !task.status
    });
    router.refresh();
  };

  return (
    <tr key={task.id}>
      <td className='w-full'>
        <div className="flex flex-col">
          <span className="font-medium">{task.title}</span>
          <span className="text-sm text-gray-500">{task.description}</span>
        </div>
      </td>
      <td>
        <button 
          onClick={handleToggleStatus}
          className={`px-2 py-1 rounded text-sm ${
            task.status 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {task.status ? 'Done' : 'Pending'}
        </button>
      </td>
      <td className='flex gap-5'>
        <FiEdit
          onClick={() => setOpenModalEdit(true)}
          cursor='pointer'
          className='text-blue-500'
          size={25}
        />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleSubmitEditTodo}>
            <h3 className='font-bold text-lg'>Edit task</h3>
            <div className='modal-action flex flex-col gap-4'>
              <input
                value={taskToEdit.title}
                onChange={(e) => setTaskToEdit({...taskToEdit, title: e.target.value})}
                type='text'
                placeholder='Task title'
                className='input input-bordered w-full'
              />
              <textarea
                value={taskToEdit.description}
                onChange={(e) => setTaskToEdit({...taskToEdit, description: e.target.value})}
                placeholder='Task description'
                className='textarea textarea-bordered w-full'
              />
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Mark as completed</span>
                  <input
                    type="checkbox"
                    checked={taskToEdit.status}
                    onChange={(e) => setTaskToEdit({...taskToEdit, status: e.target.checked})}
                    className="checkbox"
                  />
                </label>
              </div>
              <button type='submit' className='btn'>
                Submit
              </button>
            </div>
          </form>
        </Modal>
        <FiTrash2
          onClick={() => setOpenModalDeleted(true)}
          cursor='pointer'
          className='text-red-500'
          size={25}
        />
        <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
          <h3 className='text-lg'>
            Are you sure, you want to delete this task?
          </h3>
          <div className='modal-action'>
            <button onClick={() => handleDeleteTask(task.id)} className='btn'>
              Yes
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Task;