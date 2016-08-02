import { decodeHTML } from 'entities'

export default (html) => {
  const match = /onclick="return ([^"]*)" id="b-map"/.exec(html)
  if (match[1]) {
    return JSON.parse(decodeHTML(match[1]))['b-map']
  } else {
    throw new Error('Route data not found')
  }
}
