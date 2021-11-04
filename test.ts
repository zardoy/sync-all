import { execSync } from 'child_process'
import execa from 'execa'
// execSync('pnpm -v', { stdio: 'inherit' })
console.log(process.version)
await execa('pnpm', ['i', '-g', 'vsce'], { stdio: 'inherit' })
await execa('vsce', ['-V'], { stdio: 'inherit' })
// console.log(process.env.PATH.split(':'))
