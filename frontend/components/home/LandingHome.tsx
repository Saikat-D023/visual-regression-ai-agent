import { FeatureStrip } from "./FeatureStrip";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { HowItWorks } from "./HowItWorks";
import { BYOK } from "./BYOK";
import { TuiPreview } from "./TuiPreview";
import { Footer } from "./Footer";
import { Divider } from "./Divider";

export function LandingHome() {
  return (
    <main className="app-shell relative">
      <Header />
      <Hero />
      <Divider />
      <FeatureStrip />
      <Divider />
      <HowItWorks />
      <Divider />
      <BYOK />
      <Divider />
      <TuiPreview />
      <Divider />
      <Footer />
    </main>
  );
}
