"use client";

import { useEffect, useState, startTransition } from "react";
import { request } from "@/lib/api";
import { FetchTasksResponse, Task } from "@/types/Types";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Image from "next/image";

export default function TasksDashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

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
        position: item.position ?? idx,
        todo_date: item.todo_date,
      }));

      formatted.sort((a, b) => Number(a.position) - Number(b.position));
      setTasks(formatted);
    } catch (err) {
      console.error("Failed to load tasks", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    startTransition(() => fetchTasks());
  }, []);

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-600 text-xl animate-pulse">
        Loading dashboard...
      </div>
    );
  }

  if (tasks.length === 0) {
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

  const total = tasks.length;
  const completed = tasks.filter((t) => t.is_completed).length;
  const pending = total - completed;

  const priorityData = ["moderate", "low", "extreme"].map((p) => ({
    priority: p,
    count: tasks.filter((t) => t.priority === p).length,
  }));

  const statusData = [
    { name: "Completed", value: completed },
    { name: "Pending", value: pending },
  ];

  const COLORS = ["#4ade80", "#f87171"];

  return (
    <div className="space-y-10">
      <h2 className="text-3xl font-bold text-black relative inline-block">
        Tasks Dashboard
        <span className="absolute left-0 bottom-0 w-2/3 border-b-2 border-blue-600"></span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-md bg-white/70 backdrop-blur-xl shadow-md p-6 hover:shadow-xl transition-all">
          <p className="text-gray-500 text-sm">Total Tasks</p>
          <h2 className="text-5xl mt-2 font-bold">{total}</h2>
        </div>

        <div className="rounded-md bg-green-50 shadow-md p-6 hover:shadow-xl transition-all border border-green-100">
          <p className="text-green-600 text-sm font-medium">Completed</p>
          <h2 className="text-5xl mt-2 font-bold text-green-600">
            {completed}
          </h2>
        </div>

        <div className="rounded-md bg-red-50 shadow-md p-6 hover:shadow-xl transition-all border border-red-100">
          <p className="text-red-600 text-sm font-medium">Pending</p>
          <h2 className="text-5xl mt-2 font-bold text-red-600">{pending}</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white rounded-md shadow-md p-6 hover:shadow-xl transition-all">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Tasks by Priority
          </h2>

          <div className="w-full h-72">
            <ResponsiveContainer>
              <BarChart data={priorityData}>
                <XAxis dataKey="priority" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                  {priorityData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={["#4ade80", "#facc15", "#f87171"][index]} // green, yellow, red
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-md shadow-md p-6 hover:shadow-xl transition-all">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Completion Overview
          </h2>

          <div className="h-72 flex justify-center items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {statusData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
