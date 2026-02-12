import { SavedJobsList } from "@/features/saved-jobs/SavedJobsList";

export default function DashboardSavedPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Saved</h1>
      <div className="mt-4">
        <SavedJobsList />
      </div>
    </div>
  );
}
