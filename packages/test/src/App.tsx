export function App() {
  return (
    <>
      <main className="font-mono">
        <h1>Hello World!</h1>
        <br />
        <a href="/test" className="underline hover:underline-offset-4">
          Test Link
        </a>
        <div data-test={["one", "two"]} className={["text-red-700", "font-bold", { underline: true }]}>
          className with array
        </div>
      </main>

      <footer className="mt-10">This is my footer</footer>
    </>
  );
}
