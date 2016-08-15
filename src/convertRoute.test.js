import { expect } from 'chai'
import { default as convertRoute, findStationId }  from './convertRoute'
import rawRoute from './fixtures/rawRoute'
import rawSchedule from './fixtures/rawSchedule'

describe('convert', () => {
  it('converts example data with no errors', () => {
    expect(() => convertRoute(rawRoute, rawSchedule)).to.not.throw
  })

  const route = convertRoute(rawRoute, rawSchedule)

  it('returns array', () => {
    expect(route).to.be.an('array')
  })

  it('returns one entry per point', () => {
    expect(route.length).to.be.eql(3525)
  })

  describe('first entry of result', () => {
    it('contains pixel coords', () => {
      expect(route[0].pixel).to.be.eql([ 20946, 10674 ])
    })

    it('contains timestamp', () => {
      expect(route[0].time).to.be.eql(new Date('2016-07-08T18:02:00+04:00').getTime())
    })
  })

  describe('last entry of first segment', () => {
    const index = rawRoute.segments[0][0].length - 1
    // point at 49.899383000000036, 53.115878000000016

    it('contains pixel coords', () => {
      expect(route[index].pixel).to.be.eql([ 20925, 10684 ])
    })

    it('contains timestamp', () => {
      expect(route[index].time).to.be.eql(new Date('2016-07-08T18:24:00.000+04:00').getTime())
    })
  })

  describe('middle entry of first segment', () => {
    const index = (rawRoute.segments[0][0].length / 2 | 0) - 1
    // point at 49.899383000000036, 53.115878000000016

    it('contains pixel coords', () => {
      expect(route[index].pixel).to.be.eql([ 20937, 10687 ])
    })

    it('contains timestamp', () => {
      expect(route[index].time).to.be.eql(new Date('2016-07-08T18:14:19.249+04:00').getTime())
    })
  })
})


describe('findStation', () => {
  it('finds Samara station', () => {
    const station = findStationId(rawRoute.stations, [  50.119904, 53.184924 ])
    expect(station).to.be.eql(9606096)
  })

  it('finds Moscow station', () => {
    const station = findStationId(rawRoute.stations, [  37.65819300000005, 55.77371599999999 ])
    expect(station).to.be.eql(2000003)
  })

})
