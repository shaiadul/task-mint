export interface SignupValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export type SignupRequest = Omit<SignupValues, "confirmPassword">;

export interface SignupResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface LoginValues {
  email: string;
  password: string;
}

export interface InputFieldProps {
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export interface AuthErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export interface SectionHeaderProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export interface ApiError {
  detail?: string;
  field?: string;
}

export interface ApiResponse<T> {
  data: T;
}

export interface AccountValues {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  contactNumber: string;
  birthday: string;
}

// Optional: reusable InputField props
export interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

export interface SidebarProps {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
  values: UserProfile;
}

export interface NavItemProps {
  icon: React.ReactNode;
  title: string;
  isActive: boolean;
  onClick: () => void;
}

export interface LayoutProps {
  children: React.ReactNode;
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
  isSidebarOpen: boolean;
  values: UserProfile;
}

export interface ProfileAvatarProps {
  profile_image: string;
  first_name: string;
  email: string;
}
export interface ProfileImageUploadProps {
  image: string | null;
  onChange: (file: File) => void;
  error?: string;
  firstName?: string;
  email?: string;
}

export interface UserProfile {
  id?: number;
  email: string;
  first_name: string;
  last_name: string;
  address: string;
  contact_number: string;
  birthday: string | null;
  profile_image: string | null | File;
  bio?: string;
}

export type Priority = "extreme" | "moderate" | "low";

export interface Task {
  id: number ;
  title: string;
  description: string;
  priority: Priority;
  is_completed: boolean;
  position?: number;
  dueDate?: string;
  todo_date?: string;
}

export interface FetchTasksResponse {
  results: Task[];
}

export interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTaskCreated?: () => void;
}
export interface TaskErrors {
  title?: string;
  dueDate?: string;
  description?: string;
}

export interface TaskCardProps {
  task: Task;
  onDelete: (id: number | string) => void;
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, id: string) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>, id: string) => void;
  onClick?: () => void;
}
