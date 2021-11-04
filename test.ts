import { execSync } from 'child_process'
import execa from 'execa'
// execSync('pnpm -v', { stdio: 'inherit' })
await execa('pnpm', ['i', '-g', 'vsce'], { stdio: 'inherit' })
await execa('vsce', ['-v'], { stdio: 'inherit' })
// console.log(process.env.PATH.split(':'))
