const { execSync } = require('child_process');
const fs = require('fs');

function run(cmd) {
  return execSync(cmd, { encoding: 'utf-8', maxBuffer: 1024 * 1024 * 20 });
}

function main() {
  const sessionsRaw = run('entire session list --json');
  const sessions = JSON.parse(sessionsRaw);

  console.log(`Found ${sessions.length} session(s).`);

  const enriched = sessions.map((s) => {
    let detail = {};
    try {
      const infoRaw = run(`entire session info ${s.session_id} --json`);
      detail = JSON.parse(infoRaw);
    } catch (e) {
      detail = { error: 'could not fetch detail' };
    }
    return detail;
  });

  fs.writeFileSync('handoff-data.json', JSON.stringify(enriched, null, 2));
  console.log('Wrote handoff-data.json');
}

main();