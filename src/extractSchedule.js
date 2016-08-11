import { decodeHTML } from 'entities'
import moment from 'moment'

const parseTime = (html) => {
  const match = html.match(/onclick="return (.*?)"/)
  if (!match) {
    return undefined
  }
  const time = JSON.parse(decodeHTML(match[1]))['i-time']
  return moment(time.local + '+0300', 'DD MMM YYYY HH:mm Z')
    .utcOffset('+0300')
    .add(time.shifts['213'], 'minutes')
    .valueOf()
}

export default (html) => {
  const matches = html.match(/<tr class="b-timetable__row.*?<\/tr>/g)
  return matches.map(fragment => {
    let [id, title] = fragment.match(/<a class="b-link" href="\/station\/(\d*)">([^<]*)<\/a>/).slice(1)
    const arrival = parseTime(fragment.match(/<td class="b-timetable__cell b-timetable__cell_type_arrival">(.*?)<\/td>/)[0])
    const departure = parseTime(fragment.match(/<td class="b-timetable__cell b-timetable__cell_type_departure">(.*?)<\/td>/)[0])
    return [id, title, arrival, departure]
  })
}
