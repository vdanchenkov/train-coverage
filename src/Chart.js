import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import d3 from 'd3'
import { range } from 'ramda'
import moment from 'moment'

const grid = (firstTime, lastTime) => {
  return range(firstTime / msPerGridStep | 0, lastTime / msPerGridStep | 0).map(x => x * msPerGridStep)
}

const msPerGridStep = 1000 * 60 * 15

class Chart extends Component {
  componentDidMount() {
    this.renderChart()
  }
  componentDidUpdate() {
    this.renderChart()
  }
  render() {
    return <div></div>
  }
  renderChart() {
    const el = ReactDOM.findDOMNode(this);
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
    const { route, schedule } = this.props
    if (route.length === 0) {
      return
    }

    // round first and last times to hours
    const firstTime = (route[0].time / msPerGridStep | 0) * msPerGridStep
    const lastTime = ((route[route.length - 1].time / msPerGridStep | 0) + 1) * msPerGridStep
    const yScale = 0.0001

    // padding 100
    const height = (lastTime - firstTime) * yScale + 200

    const area = d3.svg.area()
      .interpolate('basis')
      .x1(d => d.value * 98)
      .x0(0)
      .y(d => (d.time - firstTime) * yScale)

    const svg = d3.select(el).append("svg")
      .attr('width', 600)
      .attr('height', height)
      .style('padding', 100)
      .append('g')

    svg.append('path')
      .style('fill', '#9999FF')
      .style('stroke', '#000099')
      .style('stroke-width', 1)
      .attr('d', area(route))

    svg
      .selectAll('text')
      .data(schedule)
      .enter()
      .append('text')
      .attr('x', 200)
      .attr('y', (d, i) => (((d[3] || lastTime) + (d[2] || firstTime)) / 2 - firstTime) * yScale)
      .style('font-size', '2em')
      .text((d, i) => d[1])

    svg.append('g')
      .selectAll('line')
      .data(schedule)
      .enter()
      .append("line")
      .attr("x1", 195)
      .attr("x2", 195)
      .attr("y1", (d) => ((d[2] || firstTime) - firstTime) * yScale)
      .attr("y2", (d) => ((d[3] || lastTime) - firstTime) * yScale)
      .style('stroke-width', 2)
      .style('stroke', '#000000')

    const svgGrid = svg.append('g')
    grid(firstTime, lastTime).forEach(time => {
      console.log(time)
      svgGrid.append("line")
        .attr("x1", 150)
        .attr("x2", 190)
        .attr("y1", (time - firstTime) * yScale)
        .attr("y2", (time - firstTime) * yScale)
        .style('stroke-width', 1)
        .style('stroke', '#000099')

      svgGrid.append('text')
        .attr('x', 150)
        .attr('y', (time - firstTime) * yScale - 5)
        .text(moment(time).utcOffset('+03:00').format('HH:mm'))
    })
  }
}

Chart.defaultProps = {
  schedule: [
    [
      "9606304",
      "Ковылкино",
      1468015380000,
      1468015500000
    ],
    [
      "9606294",
      "Торбеево",
      1468017840000,
      1468018800000
    ],
    [
      "9606274",
      "Зубова Поляна",
      1468020240000,
      1468020360000
    ],
    [
      "9600856",
      "Сасово",
      1468023540000,
      1468023660000
    ],
  ],
  route: [
    { time: 1468015380000, value: 0.5 },
    { time: 1468023660000, value: 0.5 }
  ]
}

export default Chart
