
export type User = {
  username: string;
  admin: boolean;
} | null;

export type AuthContextType = {
  user: User;
  isAdmin:boolean;
};
