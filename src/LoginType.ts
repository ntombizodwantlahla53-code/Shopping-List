export interface LoginTypes {
  id: number;
  email: string;
  password: string;
  
}

export interface LoginFormProps {
  onAddLink: (link: LoginTypes) => void;
  onView: () => void;
}

