import moment from 'moment'
import { decodeHTML } from 'entities'
import { parseDOM } from 'htmlparser2'
import { selectAll, selectOne } from 'css-select'
import { getText } from 'domutils'

const parseTime = (timeElement, postfix) => {
  const el = selectOne(`.b-timetable__cell_type_${postfix} .i-time`, timeElement)
  if (!el) {
    return null
  }
  const attr = decodeHTML(el.attribs.onclick)
  const time = JSON.parse(attr.match(/return (.+)/)[1])['i-time']
  return moment(time.local + '+0300', 'DD MMM YYYY HH:mm Z')
    .utcOffset('+0300')
    .add(time.shifts['213'], 'minutes')
    .valueOf()
}

export default (html) => {
  const dom = parseDOM(html)
  return selectAll('tr.b-timetable__row', dom).map((row) => {
    const link = selectOne('a.b-link', row)
    const id = link.attribs.href.match(/\d+/)[0]
    const title = getText(link) 
    const arrival = parseTime(row, 'arrival')
    const departure = parseTime(row, 'departure')
    return [ id, title, arrival, departure ]
  })
}
