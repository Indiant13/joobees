import { PortfolioEditor } from "@/features/portfolio/PortfolioEditor";

export default function DashboardPortfolioPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Portfolio</h1>
      <div className="mt-4">
        <PortfolioEditor />
      </div>
    </div>
  );
}
