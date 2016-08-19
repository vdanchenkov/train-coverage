import extractRoute from './extractRoute'
import extractSchedule from './extractSchedule'
import mergeRoute from './mergeRoute'
import { mts3G, mts4G, megafon3G, createStorage, lonLatToPixel, coverage } from 'mobile-coverage-russia'

const storage = createStorage()
const zoom = 7
const interpolation = 3

const map = (z, x, y) => 'http://crossorigin.me/' + mts3G(z, x, y)

export default (html) => {
  return new Promise((resolve) => {
    const schedule = extractSchedule(html)
    const route = mergeRoute(extractRoute(html), schedule)
    const pixels = route.map(o => lonLatToPixel(zoom, o.point))

    coverage(map, storage, zoom, interpolation, pixels).then((levels) => {
      resolve({
        route: levels.map((level, i) => ({value: level, time: route[i].time})),
        schedule: schedule
      })
    })
  })
}
