import { FeatureStrip } from "./FeatureStrip";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { HowItWorks } from "./HowItWorks";
import { BYOK } from "./BYOK";
import { TuiPreview } from "./TuiPreview";
import { Footer } from "./Footer";

export function LandingHome() {
  return (
    <main className="app-shell relative">
      <Header />
      <Hero />
      <FeatureStrip />
      <HowItWorks />
      <BYOK />
      <TuiPreview />
      <Footer />
    </main>
  );
}
