import React, { Component } from 'react'
import Step from './Step.js'
import Widget from './Widget'
import extractRoute from './extractRoute'
import convertRoute from './convertRoute'
import './App.css'

class App extends Component {
  url = (train) => `https://rasp.yandex.ru/threads/?number=${train}&train=yes`
  state = {}
  onSubmit = (e) => {
    window.open(this.url(this.state.trainNumber), '', 'width=500,height=700,left=400,top=100')
    e.preventDefault()
  }
  trainNumberChange = (e) => {
    this.setState({ trainNumber: e.target.value })
  }
  onPaste = (e) => {
    this.setState({ route: convertRoute(extractRoute(e.clipboardData.getData('text/html'))) })
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
        <div>
          {JSON.stringify(this.state.route)}
        </div>
      </div>
    )
  }
}

export default App
