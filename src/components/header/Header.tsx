import { HeaderUserMenu } from "@/features/user-menu/HeaderUserMenu";
import { PostJobTrigger } from "@/features/post-job/PostJobTrigger";

export type HeaderProps = {
  title: string;
  subtitle: string;
};

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="border-b border-blue-800/40 bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-6">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold sm:text-3xl">{title}</h1>
          <p className="text-sm text-blue-100 sm:text-base">{subtitle}</p>
        </div>
        <nav className="flex items-center gap-3 text-sm sm:gap-4">
          <PostJobTrigger />
          <HeaderUserMenu />
        </nav>
      </div>
    </header>
  );
}
