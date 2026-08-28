import { BookOpenText, CheckCircle2, Database, Layers3 } from 'lucide-react';

import { ExamCard } from '@/components/exams/exam-card';
import { listExamSummaries } from '@/lib/exams/registry';

const architectureNotes = [
  {
    icon: Database,
    title: 'JSON-first content',
    description: 'Exam records live in data/exams, away from components.',
  },
  {
    icon: CheckCircle2,
    title: 'Pure answer checks',
    description: 'Scoring logic stays in lib and can be tested independently.',
  },
  {
    icon: Layers3,
    title: 'Ready to expand',
    description: 'New dates and levels plug into the same exam interface.',
  },
];

export default function Home() {
  const exams = listExamSummaries();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/80 bg-card/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-primary text-sm font-bold text-primary-foreground shadow-sm">
              日本
            </span>
            <div>
              <p className="font-semibold tracking-tight">JLPT Practice</p>
              <p className="text-xs text-muted-foreground">
                Focused exam preparation
              </p>
            </div>
          </div>
          <span className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground">
            Foundation release
          </span>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <p className="mb-4 flex items-center gap-2 text-sm font-semibold text-primary">
            <BookOpenText className="size-4" aria-hidden="true" />
            Practice with real exam structure
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-[-0.035em] text-balance sm:text-6xl">
            Build confidence, one Japanese question at a time.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            A clean starting point for focused JLPT practice. The first exam is
            mapped and ready for question content to be added next.
          </p>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border shadow-sm sm:grid-cols-3 lg:grid-cols-1">
          {architectureNotes.map(({ icon: Icon, title, description }) => (
            <article key={title} className="bg-card p-5">
              <Icon className="mb-4 size-5 text-primary" aria-hidden="true" />
              <h2 className="text-sm font-semibold">{title}</h2>
              <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                {description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border/80 bg-muted/45">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Exam library
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                Available practice sets
              </h2>
            </div>
            <p className="text-sm text-muted-foreground">
              {exams.length} exam scaffolded
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {exams.map((exam) => (
              <ExamCard key={exam.id} exam={exam} />
            ))}
          </div>
        </div>
      </section>

      <footer className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>Built for deliberate JLPT study.</p>
        <p>No account or database required.</p>
      </footer>
    </main>
  );
}
