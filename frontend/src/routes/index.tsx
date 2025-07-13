import Features from "@/components/pages/landing/Features";
import Header from "@/components/pages/landing/Header";
import Hero from "@/components/pages/landing/Hero";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <Features />
      </main>
      {/* <Footer /> */}
    </div>
  );
}
