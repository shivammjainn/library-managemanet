
export type User = {
  username: string;
  admin: boolean;
} | null;

export type AuthContextType = {
  user: User;
  setUser: (user: User) => void;
};
