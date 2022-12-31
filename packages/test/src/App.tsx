export function App() {
  return (
    <>
      <main className="font-mono">
        <h1>Hello World!</h1>
        <br />
        <a href="/test" className="underline hover:underline-offset-4">
          Test Link
        </a>
        <div className={["text-red-700", "font-bold"]}>className with array</div>
      </main>

      <footer className="mt-10">This is my footer</footer>
    </>
  );
}
