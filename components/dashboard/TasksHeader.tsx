import { BiPlus } from "react-icons/bi";

interface TasksHeaderProps {
  title?: string;
  onAddTask: () => void; // parent passes this
}

export default function TasksHeader({
  title = "Todos",
  onAddTask,
}: TasksHeaderProps) {
  return (
    <header className="mx-auto py-4 flex justify-between items-center">
      <h2 className="text-3xl font-bold text-black relative inline-block">
        {title}
        <span className="absolute left-0 bottom-0 w-2/3 border-b-2 border-blue-600"></span>
      </h2>

      <button
        onClick={onAddTask}
        className="flex items-center space-x-1 px-4 py-2 
                     bg-blue-600 text-white text-md font-medium rounded-lg 
                     shadow-md hover:bg-blue-700 transition-all duration-500
                     cursor-pointer
                     "
      >
        <BiPlus size={18} />
        <span>New Task</span>
      </button>
    </header>
  );
}
