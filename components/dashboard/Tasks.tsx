"use client";
import React, { useState, useMemo, useEffect, startTransition } from "react";
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

      const formatted: Task[] = res.results.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        priority: item.priority,
        is_completed: item.is_completed,
        order: item.position,
        todo_date: item.todo_date,
      }));

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

  const updateTasksOrder = async (newTasks: Task[]) => {
    try {
      for (let index = 0; index < newTasks.length; index++) {
        const task = newTasks[index];
        await request({
          endpoint: `/todos/${task.id}/`,
          method: "PATCH",
          data: { position: index },
        });
      }
      console.log("Task positions updated successfully");
    } catch (err) {
      console.error("Failed to update task order", err);
    }
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    id: number | string
  ) => {
    setDraggedId(String(id));
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", String(id));
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    targetId: number | string
  ) => {
    e.preventDefault();
    const draggedIndex = tasks.findIndex((t) => String(t.id) === draggedId);
    const targetIndex = tasks.findIndex(
      (t) => String(t.id) === String(targetId)
    );

    if (
      draggedIndex === -1 ||
      targetIndex === -1 ||
      draggedIndex === targetIndex
    )
      return;

    const newTasks = Array.from(tasks);
    const [movedTask] = newTasks.splice(draggedIndex, 1);
    newTasks.splice(targetIndex, 0, movedTask);

    setTasks(newTasks);
    setDraggedId(String(newTasks[targetIndex].id));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDraggedId(null);

    updateTasksOrder(tasks);
  };

  const deleteTask = async (taskId: number | string) => {
    try {
      setTasks((prev) => prev.filter((task) => task.id !== taskId));

      await request({
        endpoint: `/todos/${taskId}/`,
        method: "DELETE",
      });

      console.log(`Task ${taskId} deleted successfully`);
    } catch (err) {
      console.error(`Failed to delete task ${taskId}`, err);

      fetchTasks();
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

              switch (option) {
                case "Deadline Today":
                  return (
                    due.getFullYear() === now.getFullYear() &&
                    due.getMonth() === now.getMonth() &&
                    due.getDate() === now.getDate()
                  );
                case "Expires in 5 days":
                  return (
                    (due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24) <= 5
                  );
                case "Expires in 10 days":
                  return (
                    (due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24) <=
                    10
                  );
                case "Expires in 30 days":
                  return (
                    (due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24) <=
                    30
                  );
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

    return (
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {filteredTasks.map((task) => (
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
