export interface RegisterTypes {
  id: number;
  email: string;
  password: string;
  
}

export interface RegisterFormProps {
  onAddLink: (link: RegisterTypes) => void;
  
}

