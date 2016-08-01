import React, { Component } from 'react'
import Step from './Step.js'
import Widget from './Widget'
import './App.css'

class App extends Component {
  state = {}
  onPaste = (e) => {
    console.log(e.clipboardData.getData('text/html'))
  }
  render() {
    return (
      <div className="App">
        <p className="App-intro">
          На этой странице можно узнать когда будет работать мобильный интернет в поезде.
        </p>
        <Step number={1}>
          <p className="App-intro">
            Выберите станции отправления, прибытия и дату.
          </p>
          <Widget/>
        </Step>
        <Step number={2}>
          <p className="App-intro">
            Выберите рейс и перейдите на страницу маршрута.
          </p>
        </Step>
        <Step number={3}>
          <p className="App-intro">
            Нажмите ctrl+A, ctrl+C чтобы скопировать страницу маршрута целиком и вставьте ее в это поле:
          </p>
          <textarea onPaste={this.onPaste} style={{width: 700, height: 50}}></textarea>
        </Step>
      </div>
    )
  }
}

export default App
