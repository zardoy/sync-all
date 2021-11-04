import { endGroup, startGroup } from '@actions/core'
startGroup('output')
console.log(process.env.PATH.split(':'))
endGroup()
