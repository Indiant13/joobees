export type AuthSession = {
  userId: string;
  email: string;
  name: string;
  avatarUrl?: string;
  provider: "google" | "github" | "apple" | "email";
  expiresAt: string;
};

export type AuthState = {
  status: "loading" | "authenticated" | "unauthenticated";
  session: AuthSession | null;
};

export type AuthContextValue = AuthState & {
  refresh: () => Promise<void>;
  loginWithProvider: (provider: AuthSession["provider"]) => Promise<void>;
  loginWithEmail: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};
