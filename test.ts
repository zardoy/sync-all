import { execSync } from 'child_process'
import { endGroup, startGroup } from '@actions/core'
import execa from 'execa'
startGroup('output')
execSync('pnpm -v')
await execa('pnpm', ['-v'])
console.log(process.env.PATH.split(':'))
endGroup()
