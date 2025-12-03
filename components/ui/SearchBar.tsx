import { BiSearch } from "react-icons/bi";

interface SearchInputProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  onSearch?: () => void; // optional callback if you want a clickable search button
}

export default function SearchInput({ value, onChange, placeholder = "Search...", onSearch }: SearchInputProps) {
  return (
    <div className="relative w-full">
  
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pr-12 pl-4 py-2 border bg-white border-gray-300 rounded-lg
                   focus:ring-blue-500 focus:border-blue-500 outline-blue-500 shadow-sm transition-shadow"
      />
     
      <button
        type="button"
        onClick={onSearch}
        className="absolute top-0 right-0 h-full w-10 flex items-center justify-center
                   bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition-colors"
      >
        <BiSearch size={20} />
      </button>
    </div>
  );
}
