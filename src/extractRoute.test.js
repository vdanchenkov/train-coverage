import { expect } from 'chai'
import extractRoute from './extractRoute'
import { readFileSync } from 'fs'
import { resolve } from 'path'

describe('extractRoute', () => {
  const sample = readFileSync(resolve(__dirname, './fixtures/rasp.html'), 'utf8')
  const route = extractRoute(sample)

  it('returns first, last, segments, stations', () => {
    expect(Object.keys(route)).to.include('first', 'last', 'segments', 'stations')
  })

  it('returns stations', () => {
    expect(route.stations).to.be.an.array
    expect(route.stations.length).to.be.eql(15)
    expect(route.stations[0]).to.be.eql([ [ 50.11990322, 53.18492382 ], 'Самара', null, '18:02', 9606096 ])
    expect(route.stations[14]).to.be.eql([ [ 37.65795469, 55.7739398 ], 'Москва (Казанский вокзал)', '09:08', null, 2000003 ])
  })

  it('returns segments', () => {
    expect(route.segments).to.be.an.array
    expect(route.segments.length).to.be.eql(15)
    expect(route.segments[0][0]).to.be.array
    expect(route.segments[0][0].length).to.be.eql(101)
  })

  it('returns first station', () => {
    expect(route.first).to.be.eql([ 50.11990322, 53.18492382 ])
  })

  it('returns last station', () => {
    expect(route.last).to.be.eql([ 37.65795469, 55.7739398 ])
  })
})
