import { HeaderUserMenu } from "@/features/user-menu/HeaderUserMenu";

export type HeaderProps = {
  title: string;
  subtitle: string;
  postJobHref: string;
};

export function Header({ title, subtitle, postJobHref }: HeaderProps) {
  return (
    <header className="border-b border-blue-800/40 bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold sm:text-3xl">{title}</h1>
          <p className="text-sm text-blue-100 sm:text-base">{subtitle}</p>
        </div>
        <nav className="flex flex-wrap items-center gap-3 text-sm">
          <a
            href={postJobHref}
            className="rounded-full border border-blue-300/40 px-3 py-1 text-blue-50 transition hover:border-white hover:text-white"
          >
            Post a job
          </a>
          <HeaderUserMenu />
        </nav>
      </div>
    </header>
  );
}
