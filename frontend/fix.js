const fs = require('fs');

const log = fs.readFileSync('C:/Users/saika/.gemini/antigravity-ide/brain/c2391e43-0fdb-4409-8e93-3ec46695e740/.system_generated/logs/transcript.jsonl', 'utf8');
const lines = log.split('\n');
for(let i=lines.length-1; i>=0; i--) {
  if (!lines[i]) continue;
  try {
    const step = JSON.parse(lines[i]);
    if (step.tool_calls) {
      step.tool_calls.forEach(tc => {
        if (tc.function.name === 'default_api:write_to_file') {
          const args = JSON.parse(tc.function.arguments);
          if (args.TargetFile && args.TargetFile.endsWith('FeatureStrip.tsx')) {
            fs.writeFileSync('components/home/FeatureStrip.tsx', args.CodeContent
              .replace(/#F5F3EE/gi, 'var(--color-brand-bg)')
              .replace(/#111111/gi, 'var(--color-brand-dark)')
              .replace(/#E8E4DD/gi, 'var(--color-brand-primary)')
              .replace(/#D1CCC4/gi, 'var(--color-border)')
              .replace(/#E63B2E/gi, 'var(--color-brand-accent)')
              .replace(/bg-\[var\(--color-([a-z-]+)\)\]/g, 'bg-$1')
              .replace(/text-\[var\(--color-([a-z-]+)\)(.*?)\]/g, 'text-$1$2')
              .replace(/border-\[var\(--color-([a-z-]+)\)(.*?)\]/g, 'border-$1$2')
              .replace(/from-\[var\(--color-([a-z-]+)\)\]/g, 'from-$1')
              .replace(/to-\[var\(--color-([a-z-]+)\)\]/g, 'to-$1')
            );
          }
          if (args.TargetFile && args.TargetFile.endsWith('TuiPreview.tsx')) {
            fs.writeFileSync('components/home/TuiPreview.tsx', args.CodeContent
              .replace(/#F5F3EE/gi, 'var(--color-brand-bg)')
              .replace(/#111111/gi, 'var(--color-brand-dark)')
              .replace(/#E8E4DD/gi, 'var(--color-brand-primary)')
              .replace(/#D1CCC4/gi, 'var(--color-border)')
              .replace(/#E63B2E/gi, 'var(--color-brand-accent)')
              .replace(/bg-\[var\(--color-([a-z-]+)\)\]/g, 'bg-$1')
              .replace(/text-\[var\(--color-([a-z-]+)\)(.*?)\]/g, 'text-$1$2')
              .replace(/border-\[var\(--color-([a-z-]+)\)(.*?)\]/g, 'border-$1$2')
              .replace(/from-\[var\(--color-([a-z-]+)\)\]/g, 'from-$1')
              .replace(/to-\[var\(--color-([a-z-]+)\)\]/g, 'to-$1')
            );
          }
        }
      });
    }
  } catch(e) {}
}
console.log('Done restoring FeatureStrip and TuiPreview.');
