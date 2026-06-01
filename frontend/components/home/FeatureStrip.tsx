const features = [
  "Folder upload",
  "Screenshot context",
  "Root cause trace",
  "Patch output",
];

export function FeatureStrip() {
  return (
    <section id="features" className="mx-auto w-full max-w-6xl px-5 pb-16">
      <div className="grid gap-3 sm:grid-cols-4">
        {features.map((feature) => (
          <div className="panel py-4 text-sm text-zinc-300" key={feature}>
            {feature}
          </div>
        ))}
      </div>
    </section>
  );
}
