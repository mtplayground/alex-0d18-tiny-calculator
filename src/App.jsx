const tooling = [
  'Vite dev server',
  'React single-page app',
  'Tailwind utility styles',
  'ESLint checks',
  'Prettier formatting',
];

export function App() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-zinc-100">
      <section className="mx-auto flex max-w-4xl flex-col gap-8">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wider text-cyan-300">
            Ready for feature work
          </p>
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
            React SPA scaffold
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-zinc-300">
            The application shell is configured with React, Tailwind CSS,
            linting, and formatting so new calculator features can be built on a
            verified foundation.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {tooling.map((item) => (
            <div
              key={item}
              className="rounded-md border border-zinc-800 bg-zinc-900 p-4 shadow-sm"
            >
              <span className="text-sm font-medium text-zinc-200">{item}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
