const fs = require('fs');

const logPath = 'C:/Users/saika/.gemini/antigravity-ide/brain/c2391e43-0fdb-4409-8e93-3ec46695e740/.system_generated/logs/transcript.jsonl';
if (!fs.existsSync(logPath)) {
  console.log("Log file not found!");
  process.exit(1);
}

const log = fs.readFileSync(logPath, 'utf8');
const lines = log.split('\n');

let restoredFeatureStrip = false;
let restoredTuiPreview = false;

// Iterate backwards to find the last valid write
for(let i=lines.length-1; i>=0; i--) {
  if (!lines[i]) continue;
  try {
    const step = JSON.parse(lines[i]);
    if (step.tool_calls) {
      step.tool_calls.forEach(tc => {
        if (tc.function.name === 'default_api:write_to_file' || tc.function.name === 'default_api:replace_file_content') {
          const args = JSON.parse(tc.function.arguments);
          
          if (!restoredFeatureStrip && args.TargetFile && args.TargetFile.endsWith('FeatureStrip.tsx') && args.CodeContent) {
            fs.writeFileSync('components/home/FeatureStrip.tsx', args.CodeContent);
            restoredFeatureStrip = true;
            console.log("Restored FeatureStrip");
          }
          if (!restoredTuiPreview && args.TargetFile && args.TargetFile.endsWith('TuiPreview.tsx') && args.CodeContent) {
            fs.writeFileSync('components/home/TuiPreview.tsx', args.CodeContent);
            restoredTuiPreview = true;
            console.log("Restored TuiPreview");
          }
        }
      });
    }
  } catch(e) {}
}

if (!restoredFeatureStrip || !restoredTuiPreview) {
  console.log("Failed to find original files in log.");
}
