import { SectionHeaderProps } from "@/types/Types";

export default function SectionHeader({
  title = "Create your account",
  subtitle = "Start managing your tasks efficiently",
  className = "",
}: SectionHeaderProps) {
  return (
    <div
      className={`my-10 flex flex-col justify-center items-center space-y-2 ${className}`}
    >
      <h2 className="text-3xl font-semibold text-gray-800 text-center">
        {title}
      </h2>

      {subtitle && <p className="text-gray-600 text-center">{subtitle}</p>}
    </div>
  );
}
