import { execSync } from 'child_process'
import { endGroup, startGroup } from '@actions/core'
import execa from 'execa'
startGroup('output')
execSync('pnpm -v', { stdio: 'inherit' })
await execa('pnpm', ['-v'], { stdin: 'inherit' })
// console.log(process.env.PATH.split(':'))
endGroup()
