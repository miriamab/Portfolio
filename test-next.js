const fs = require('fs');
const code = fs.readFileSync('app/projects/[id]/page.tsx', 'utf8');
console.log(code.length);
