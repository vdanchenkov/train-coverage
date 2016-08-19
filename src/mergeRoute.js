import { lonLatToPixel } from 'mobile-coverage-russia'
import { aperture, sum } from 'ramda'
import { getDistance } from 'geolib'

const zoom = 7
const interpolation = 3

export const findStationId = (stations, lonLat) => {
  const dst = (a, b) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1])
  for (let station of stations) {
    if (getDistance(station[0], lonLat) < 1000) {
      return station[4]
    }
  }
  return null
}

export const processQueue = ({ start, end, points }) => {
  if (!start) {
    throw new Error('Start point is not defined');
  }
  if (!end) {
    throw new Error('End point is not defined');
  }

  const timespan = end[2] - start[3]
  const distances = aperture(2, points).map(([a, b]) => getDistance(a, b))
  const length = sum(distances)
  const speed = length / timespan // meters per millisecond

  let distanceCovered = 0
  return points.map((point, index) => {
    if (index > 0) {
      distanceCovered += distances[index - 1]
    }
    return {
      pixel: lonLatToPixel(zoom, point),
      point,
      time: Math.round(start[3] + distanceCovered / speed)
    }
  })
}

/**
* Returns station entry from schedule
*/
const getStation = (routeStations, schedule, point) => {
  const id = findStationId(routeStations, point)
  return schedule.find((s) => +s[0] === id)
}

export default ({ stations, segments}, schedule) => {
  let result = []
  let pointsQueue = null

  segments.forEach(([ segment ], segmentIndex) => {
    const segmentStartStation = getStation(stations, schedule, segment[ 0 ])
    const segmentFinishStation = getStation(stations, schedule, segment[ segment.length - 1 ])
    if (!pointsQueue) {
      // starting new queue
      pointsQueue = {
        start: segmentStartStation,
        points: []
      }
    }
    pointsQueue.points = [ ...pointsQueue.points, ...segment ]
    pointsQueue.end = segmentFinishStation
    if (pointsQueue.end) {
      result = result.concat(processQueue(pointsQueue))
      pointsQueue = null
    }
  })
  return result
}
