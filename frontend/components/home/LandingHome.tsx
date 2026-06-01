import { FeatureStrip } from "./FeatureStrip";
import { Header } from "./Header";
import { Hero } from "./Hero";

export function LandingHome() {
  return (
    <main className="app-shell">
      <Header />
      <Hero />
      <FeatureStrip />
    </main>
  );
}
