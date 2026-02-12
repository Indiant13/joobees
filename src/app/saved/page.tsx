import { SavedJobsList } from "@/features/saved-jobs/SavedJobsList";

export default function SavedJobsPage() {
  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-2xl font-semibold">Saved jobs</h1>
        <div className="mt-4">
          <SavedJobsList />
        </div>
      </section>
    </main>
  );
}
