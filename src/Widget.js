import React from 'react'

const style = {
  MozBoxShadow: '0 2px 3px rgba(0, 0, 0, 0.5)',
  WebkitBoxShadow: '0 2px 3px rgba(0, 0, 0, 0.5)',
  boxShadow: '0 2px 3px rgba(0, 0, 0, 0.5)',
  width: 700,
  height: 110,
  overflow: 'hidden',
  border: 0
}

export default () => (
  <iframe frameBorder={0}
          style={style}
          src="https://rasp.yandex.ru/informers/widgets/search/horiz/">
  </iframe>
)
