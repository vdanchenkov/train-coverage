import React from 'react'

const styles = {
  component: {
    backgroundColor: '#FFE',
    padding: '16px 20px 20px 20px',
    margin: '32px 0',
    border: '1px solid #EDA',
    borderRadius: 16
  },
  label: {
    fontSize: 'x-large',
    marginBottom: 10
  }
}

export default ({number, children}) => {
  return (
    <div style={styles.component}>
      <div style={styles.label}>Шаг {number}</div>
      {children}
    </div>
  )
}
