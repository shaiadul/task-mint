"use client";
import { useState } from "react";
import SearchBar from "../ui/SearchBar";
import FilterDropdown, { DeadlineOption } from "../ui/FilterDropdown";

interface TaskControlsProps {
  onSearch: (query: string) => void;
  onFilter: (selected: DeadlineOption[]) => void;
}


export default function TaskControls({
  onSearch,
  onFilter,
}: TaskControlsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDeadlines, setSelectedDeadlines] = useState<DeadlineOption[]>(
    []
  );

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    onSearch(val);
  };

  const handleFilterChange = (selected: DeadlineOption[]) => {
    setSelectedDeadlines(selected);
    onFilter(selected);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4 my-10 w-full">
      <div className="flex-1 min-w-0">
        <SearchBar
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search your task here..."
        />
      </div>

      <div className="flex-none">
        <FilterDropdown
          options={[
            "Deadline Today",
            "Expires in 5 days",
            "Expires in 10 days",
            "Expires in 30 days",
          ]}
          selected={selectedDeadlines}
          onChange={handleFilterChange}
        />
      </div>
    </div>
  );
}
