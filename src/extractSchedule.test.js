import { expect } from 'chai'
import extractSchedule from './extractSchedule'
import { readFileSync } from 'fs'
import { resolve } from 'path'

describe('extractSchedule', () => {
  const sample = readFileSync(resolve(__dirname, './fixtures/rasp.html'), 'utf8')

  it('works', () => {
    const schedule = extractSchedule(sample)
    expect(schedule).to.be.an('array')
    expect(schedule.length).to.be.eql(16)
    expect(schedule[0]).to.be.eql([
      '9606096',
      'Самара',
      null,
      new Date('2016-07-08T18:02:00+04:00').getTime()
    ])
    expect(schedule[schedule.length - 1]).to.be.eql([
      '2000003',
      'Москва (Казанский вокзал)',
      new Date('2016-07-09T09:08:00+03:00').getTime(),
      null
    ])
  })
}) 
