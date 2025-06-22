import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <section className="">
      <h2>Hello world!</h2>
    </section>
  );
}
