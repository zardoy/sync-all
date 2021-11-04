import { execSync } from 'child_process'
import execa from 'execa'
execSync('pnpm -v', { stdio: 'inherit' })
await execa('pnpm', ['-v'], { stdin: 'inherit' })
// console.log(process.env.PATH.split(':'))
