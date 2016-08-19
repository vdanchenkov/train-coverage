import React, { Component } from 'react'
import Step from './Step.js'
import Widget from './Widget'
import './App.css'
import Chart from './Chart'
import process from './process'

class App extends Component {
  url = (train) => `https://rasp.yandex.ru/threads/?number=${train}&train=yes`
  state = {
    graph: []
  }
  onSubmit = (e) => {
    window.open(this.url(this.state.trainNumber), '', 'width=500,height=700,left=400,top=100')
    e.preventDefault()
  }
  trainNumberChange = (e) => {
    this.setState({ trainNumber: e.target.value })
  }
  onPaste = (e) => {
    const html = e.clipboardData.getData('text/html')
    process(html).then(({ route, schedule }) => this.setState({ route, schedule }))
    e.preventDefault()
  }
  render() {
    return (
      <div className="App" onPaste={this.onPaste}>
        <p className="App-intro">
          На этой странице можно узнать в какое время будет работать мобильный интернет в вашей поездке по железной дороге.
        </p>
        <form onSubmit={this.onSubmit}>
          <input onChange={this.trainNumberChange} placeholder="Номер поезда"/>
          <input type="submit" value="Найти расписание"/>
        </form>
        <p className="App-intro">
          График движения с Яндекс расписаний откроется в новом окне, скопируйте открывшуюся страницу целиком, нажав ctrl+A, ctrl+C.
          Переключитесь обратно на эту страницу и вставьте содержимое в поле расположенное ниже.
        </p>
        <textarea onPaste={this.onPaste} style={{width: 700, height: 50}}></textarea>
        <Chart route={this.state.route} schedule={this.state.schedule}/>
      </div>
    )
  }
}

export default App
