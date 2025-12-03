import { Priority, TaskCardProps } from "@/types/Types";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineDragIndicator } from "react-icons/md";
import { RiEdit2Line } from "react-icons/ri";

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onDelete,
  handleDragStart,
  handleDragOver,
  onClick,
}) => {
  const getPriorityStyle = (priority: Priority) => {
    switch (priority) {
      case "extreme":
        return "bg-red-100 text-red-700 ring-red-300";
      case "moderate":
        return "bg-green-100 text-green-700 ring-green-300";
      case "low":
        return "bg-yellow-100 text-yellow-700 ring-yellow-300";
    }
  };

  const priorityBorders = (priority: Priority) => {
    switch (priority) {
      case "extreme":
        return "border-red-200";
      case "moderate":
        return "border-green-200";
      case "low":
        return "border-yellow-200";
    }
  };

  const priorityStyle = getPriorityStyle(task.priority);
  const priorityBorder = priorityBorders(task.priority);

  // console.log("task data: ", task);

  return (
    <div
      className={`bg-white p-4 rounded-xl border ${priorityBorder} shadow-lg hover:shadow-xl transition-shadow duration-500 transform hover:scale-[1.01] cursor-grab active:cursor-grabbing`}
      draggable
      onDragStart={(e) => handleDragStart(e, String(task.id))}
      onDragOver={(e) => handleDragOver(e, String(task.id))}
      data-id={task.id}
      onClick={onClick}
    >
      <div className="flex justify-between items-start space-x-4">
        <h3
          className="flex-1 text-lg font-normal text-gray-800 truncate"
          title={task.title}
        >
          {task.title}
        </h3>

        <div className="shrink-0 flex items-center space-x-2">
          <span
            className={`px-3 py-1 text-xs font-semibold rounded ring-1 capitalize ${priorityStyle}`}
          >
            {task.priority}
          </span>

          <div className="text-gray-500 hover:text-gray-600 cursor-move">
            <MdOutlineDragIndicator size={24} />
          </div>
        </div>
      </div>

      <p className="text-md text-gray-500 my-3 line-clamp-2">
        {task.description}
      </p>

      <div className="mt-4 flex justify-between items-center text-md">
        <div className="flex items-center space-x-1 text-gray-500">
          <span>Due {task.todo_date}</span>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 text-blue-500 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer">
            <RiEdit2Line size={16} />
          </button>
          <button
            onClick={() => onDelete(String(task.id))}
            className="p-2 text-red-500 bg-red-50 rounded-lg hover:bg-red-100 transition-colors cursor-pointer"
          >
            <AiOutlineDelete size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
