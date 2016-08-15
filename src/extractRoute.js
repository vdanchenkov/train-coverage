import { decodeHTML } from 'entities'
import { parseDOM } from 'htmlparser2'
import { findOne } from 'domutils'

export default (html) => {
  const dom = parseDOM(html)
  const element = findOne((elem) => elem.attribs && elem.attribs.id === 'b-map', dom)
  if (element) {
    const attr = decodeHTML(element.attribs.onclick)
    return JSON.parse(attr.match("return (.+)")[1])['b-map']
  } else {
    throw new Error('Route data not found') 
  }
}
