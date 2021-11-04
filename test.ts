import { execSync } from 'child_process'
import { endGroup, startGroup } from '@actions/core'
import execa from 'execa'
startGroup('output')
console.log(execSync('pnpm -v'))
console.log(await execa('pnpm', ['-v']))
// console.log(process.env.PATH.split(':'))
endGroup()
