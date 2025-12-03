"use client";
import React, { useEffect, useMemo, useState, startTransition } from "react";
import TaskModal from "./TaskModal";
import { FetchTasksResponse, Task } from "@/types/Types";
import TaskCard from "./TaskCard";
import TasksHeader from "./TasksHeader";
import TaskControls from "./TaskControls";
import Image from "next/image";
import { DeadlineOption } from "../ui/FilterDropdown";
import { request } from "@/lib/api";
import EditTaskModal from "./EditTaskModal";

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedDeadlines, setSelectedDeadlines] = useState<DeadlineOption[]>(
    []
  );
  const [draggedId, setDraggedId] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      const res = await request<undefined, FetchTasksResponse>({
        endpoint: "/todos/",
        method: "GET",
      });

      const formatted: Task[] = res.results.map((item, idx) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        priority: item.priority,
        is_completed: item.is_completed,
        // backend uses `position` (ensure fallback to index if missing)
        position: typeof item.position !== "undefined" ? item.position : idx,
        todo_date: item.todo_date,
      }));

      formatted.sort((a, b) => Number(a.position) - Number(b.position));
      setTasks(formatted);
    } catch (err) {
      console.log("Failed to fetch tasks", err);
    }
  };

  useEffect(() => {
    startTransition(() => {
      fetchTasks();
    });
  }, []);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    id: number | string
  ) => {
    setDraggedId(String(id));
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    targetId: number | string
  ) => {
    e.preventDefault();
    if (!draggedId) return;

    const draggedIndex = tasks.findIndex((t) => String(t.id) === draggedId);
    const targetIndex = tasks.findIndex(
      (t) => String(t.id) === String(targetId)
    );

    if (draggedIndex === -1 || targetIndex === -1) return;
    if (draggedIndex === targetIndex) return;

    const updated = [...tasks];
    const [draggedTask] = updated.splice(draggedIndex, 1);
    updated.splice(targetIndex, 0, draggedTask);

    updated.forEach((task, i) => (task.position = i + 1));

    setTasks(updated);
  };

  const handleDrop = async () => {
    if (!draggedId) return;
    setDraggedId(null);

    const draggedTask = tasks.find((t) => String(t.id) === draggedId);
    if (!draggedTask) return;

    try {
      await request({
        endpoint: `/todos/${draggedTask.id}/`,
        method: "PATCH",
        data: { position: draggedTask.position },
      });
    } catch (err) {
      console.log("Position update failed", err);
      fetchTasks();
    }
  };

  const deleteTask = async (taskId: number | string) => {
    try {
      setTasks((prev) => prev.filter((t) => String(t.id) !== String(taskId)));

      await request({
        endpoint: `/todos/${taskId}/`,
        method: "DELETE",
      });
    } catch (err) {
      console.error("Failed to delete task", err);
      await fetchTasks();
    }
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = searchQuery
        ? task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.description.toLowerCase().includes(searchQuery.toLowerCase())
        : true;

      const matchesDeadline =
        selectedDeadlines.length === 0
          ? true
          : selectedDeadlines.some((option) => {
              if (!task.todo_date) return false;
              const now = new Date();
              const due = new Date(task.todo_date);
              const diffDays =
                (due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);

              switch (option) {
                case "Deadline Today":
                  return (
                    due.getFullYear() === now.getFullYear() &&
                    due.getMonth() === now.getMonth() &&
                    due.getDate() === now.getDate()
                  );
                case "Expires in 5 days":
                  return diffDays >= 0 && diffDays <= 5;
                case "Expires in 10 days":
                  return diffDays >= 0 && diffDays <= 10;
                case "Expires in 30 days":
                  return diffDays >= 0 && diffDays <= 30;
                default:
                  return true;
              }
            });

      return matchesSearch && matchesDeadline;
    });
  }, [tasks, searchQuery, selectedDeadlines]);

  const renderTaskContent = () => {
    const isLoading = false;

    if (tasks.length === 0 && !isLoading) {
      return (
        <div className="flex flex-col items-center justify-center bg-white h-full px-16 py-28">
          <Image
            src="/images/global/emptylist.svg"
            width={200}
            height={200}
            alt="Empty state"
          />
          <p className="text-xl text-gray-500 mt-6">No todos yet</p>
        </div>
      );
    }

    if (tasks.length > 0 && filteredTasks.length === 0 && !isLoading) {
      return (
        <div className="flex flex-col items-center justify-center bg-white h-full px-16 py-28">
          <Image
            src="/images/global/emptylist.svg"
            width={200}
            height={200}
            alt="Empty state"
          />
          <p className="text-xl text-gray-500 mt-6">No todos yet</p>
        </div>
      );
    }

    const sorted = [...filteredTasks].sort(
      (a, b) => Number(a.position) - Number(b.position)
    );

    return (
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {sorted.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={deleteTask}
            handleDragStart={handleDragStart}
            handleDragOver={handleDragOver}
            onClick={() => {
              setEditingTask(task);
              setIsEditModalOpen(true);
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <main className="min-h-screen">
      <TasksHeader onAddTask={() => setIsModalOpen(true)} />

      <main className="mx-auto">
        <TaskControls
          onSearch={setSearchQuery}
          onFilter={setSelectedDeadlines}
        />

        <div className="overflow-hidden">
          <h1 className="text-xl md:text-2xl font-bold pb-5">Your Tasks</h1>
          {renderTaskContent()}
        </div>
      </main>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTaskCreated={fetchTasks}
      />
      <EditTaskModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onTaskCreated={fetchTasks}
        task={editingTask || undefined}
      />
    </main>
  );
};

export default Tasks;
