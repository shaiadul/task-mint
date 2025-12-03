"use client";

import { Priority, Task, TaskErrors, TaskModalProps } from "@/types/Types";
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import InputField from "../ui/InputField";
import { request, ApiError } from "@/lib/api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { startLoading, stopLoading } from "@/redux/slices/loadingSlice";
import { AnimatePresence, motion } from "framer-motion";

interface EditTaskModalProps extends TaskModalProps {
  task?: Task;
}

export default function EditTaskModal({
  isOpen,
  onClose,
  onTaskCreated,
  task,
}: EditTaskModalProps) {
  const dispatch = useDispatch<AppDispatch>();

  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState<Priority>("moderate");
  const [description, setDescription] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  const [errors, setErrors] = useState<TaskErrors>({});

  useEffect(() => {
    if (isOpen && task) {
      setTitle(task.title || "");
      setDueDate(task.todo_date || "");
      setPriority(task.priority || "moderate");
      setDescription(task.description || "");
      setIsCompleted(task.is_completed || false);
      setErrors({});
    }
  }, [isOpen, task]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: TaskErrors = {};

    if (!title) newErrors.title = "Title is required.";
    if (!dueDate) newErrors.dueDate = "Due date is required.";
    if (!description) newErrors.description = "Description is required.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate() || !task) return;

    dispatch(startLoading("Updating task..."));

    try {
      const body = {
        title,
        description,
        priority: priority.toLowerCase(),
        todo_date: dueDate,
        is_completed: isCompleted,
      };

      await request({
        endpoint: `/todos/${task.id}/`,
        method: "PATCH",
        data: body,
      });

      onTaskCreated?.();
      onClose();
    } catch (err) {
      const error = err as ApiError;

      if (error.field) {
        setErrors((prev) => ({
          ...prev,
          [error.field!]: error.detail!,
        }));
      } else {
        console.log(error.detail || "Something went wrong.");
      }
    } finally {
      onTaskCreated?.();
      onClose();
      dispatch(stopLoading());
    }
  };

  const getPriorityBgColor = (p: Priority) => {
    switch (p) {
      case "extreme":
        return "bg-red-500";
      case "moderate":
        return "bg-green-500";
      case "low":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
        onClick={onClose}
      >
        <motion.div
          key="edit-modal"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center text-sm font-medium">
              <h2 className="text-xl font-bold text-black relative inline-block">
                Edit Task
                <span className="absolute left-0 bottom-0 w-2/3 border-b-2 border-blue-600"></span>
              </h2>

              <button
                onClick={onClose}
                className="text-md text-black font-bold hover:text-blue-500 underline cursor-pointer"
              >
                Go Back
              </button>
            </div>

            <InputField
              label="Title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              error={errors.title}
            />

            <InputField
              label="Due Date"
              name="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              error={errors.dueDate}
            />

            <div className="space-y-2">
              <label className="block text-sm text-gray-700">Priority</label>
              <div className="flex space-x-8">
                {(["extreme", "moderate", "low"] as Priority[]).map((p) => (
                  <label key={p} className="flex items-center space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full ${getPriorityBgColor(
                        p
                      )}`}
                    ></div>
                    <span
                      className={`text-md text-gray-700 font-normal capitalize`}
                    >
                      {p}
                    </span>

                    <input
                      type="checkbox"
                      checked={priority === p}
                      onChange={() => setPriority(p)}
                      className="h-4 w-4 rounded border-gray-400 text-blue-600 cursor-pointer"
                    />
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-700">Task Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                className={`w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-blue-500 resize-none ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Start writing here..."
              />
              {errors.description && (
                <p className="text-red-600 text-xs">{errors.description}</p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={isCompleted}
                onChange={() => setIsCompleted((prev) => !prev)}
                className="h-4 w-4 rounded border-gray-400 text-blue-600 cursor-pointer"
              />
              <span className="text-gray-700 text-sm font-medium">
                Completed
              </span>
            </div>
          </div>

          <div className="p-6 bg-gray-50 flex justify-between items-center">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 cursor-pointer"
            >
              Save
            </button>

            <button
              onClick={onClose}
              className="w-10 h-10 bg-red-500 text-white rounded-lg flex items-center justify-center hover:bg-red-600"
            >
              <AiOutlineDelete size={20} />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
