"use client";

import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";
import { FormEventHandler, useState } from "react";
import { addTodo } from "@/api";
import { useRouter } from "next/navigation";
import { TaskSchema } from "../lib/validation";

const AddTask = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [newTaskDescription, setNewTaskDescription] = useState<string>("");
  const [errors, setErrors] = useState<{
    title?: string[];
    description?: string[];
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    try {
      TaskSchema.parse({
        title: newTaskTitle,
        description: newTaskDescription,
        status: false
      });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof Error) {
        const zodError = JSON.parse(error.message);
        const formattedErrors: { [key: string]: string[] } = {};
        zodError.forEach((err: any) => {
          if (!formattedErrors[err.path[0]]) {
            formattedErrors[err.path[0]] = [];
          }
          formattedErrors[err.path[0]].push(err.message);
        });
        setErrors(formattedErrors);
      }
      return false;
    }
  };

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      await addTodo({
        title: newTaskTitle,
        description: newTaskDescription,
        status: false
      });
      setNewTaskTitle("");
      setNewTaskDescription("");
      setModalOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Error adding todo:", error);
      // Handle API errors
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className="btn btn-primary w-full"
      >
        Add new task <AiOutlinePlus className="ml-2" size={18} />
      </button>

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmitNewTodo}>
          <h3 className="font-bold text-lg">Add new task</h3>
          <div className="modal-action flex flex-col gap-4">
            <div className="form-control w-full">
              <input
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                type="text"
                placeholder="Task title"
                className={`input input-bordered w-full ${
                  errors.title ? "input-error" : ""
                }`}
              />
              {errors.title && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.title.join(", ")}
                  </span>
                </label>
              )}
            </div>

            <div className="form-control w-full">
              <textarea
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
                placeholder="Task description"
                className={`textarea textarea-bordered w-full ${
                  errors.description ? "textarea-error" : ""
                }`}
              />
              {errors.description && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.description.join(", ")}
                  </span>
                </label>
              )}
            </div>

            <button
              type="submit"
              className={`btn ${isSubmitting ? "loading" : ""}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddTask;