import React, { PureComponent } from "react"
import {
  Brush,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"

const data = [
  { result: 5.7, datetime: "10-05-2020" },
  { result: 8.4, datetime: "10-05-2020" },
  { result: 3.2, datetime: "10-05-2020" },
  { result: 4.4, datetime: "10-05-2020" },
  { result: 5.0, datetime: "11-05-2020" },
  { result: 8.5, datetime: "11-05-2020" },
  { result: 2.4, datetime: "11-05-2020" },
  { result: 14.3, datetime: "11-05-2020" },
  { result: 12.2, datetime: "12-05-2020" },
  { result: 15.6, datetime: "12-05-2020" },
  { result: 13.4, datetime: "12-05-2020" },
  { result: 12.2, datetime: "12-05-2020" },
  { result: 10.2, datetime: "13-05-2020" },
  { result: 5.4, datetime: "13-05-2020" },
  { result: 2.2, datetime: "13-05-2020" },
  { result: 3.6, datetime: "13-05-2020" },
  { result: 5.7, datetime: "14-05-2020" },
  { result: 6.4, datetime: "15-05-2020" },
  { result: 3.2, datetime: "16-05-2020" },
  { result: 5.4, datetime: "16-05-2020" },
  { result: 5.0, datetime: "16-05-2020" },
  { result: 2.5, datetime: "16-05-2020" },
  { result: 7.4, datetime: "17-05-2020" },
  { result: 18.3, datetime: "17-05-2020" },
  { result: 5.2, datetime: "18-05-2020" },
  { result: 3.6, datetime: "18-05-2020" },
  { result: 6.4, datetime: "18-05-2020" },
  { result: 8.2, datetime: "19-05-2020" },
  { result: 3.2, datetime: "19-05-2020" },
]

const initialState = {
  data,
  left: 0,
  right: 0,
}

export default class Example extends PureComponent {
  constructor(props) {
    super(props)
    this.state = initialState
  }

  render() {
    const { data, animation, left, right } = this.state

    return (
      <div className="highlight-bar-charts" style={{ userSelect: "none" }}>
        <ResponsiveContainer width="100%" aspect={4.0 / 1.75}>
          <LineChart
            margin={{
              right: 40,
              left: 0,
              top: 40,
              bottom: 40,
            }}
            data={data}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              allowDataOverflow
              dataKey="datetime"
              type="category"
              // angle={-70}
              textAnchor="end"
            />
            <YAxis
              allowDataOverflow
              type="number"
              dataKey="result"
              yAxisId="1"
            />
            <Tooltip />
            <Line
              yAxisId="1"
              type="natural"
              dataKey="result"
              stroke="#8884d8"
              animationDuration={300}
            />

            <Brush dataKey="result" height={30} stroke="#8884d8">
              <AreaChart data={data}>
                <Area
                  yAxisId="1"
                  type="natural"
                  dataKey="result"
                  stroke="#8884d8"
                  fill="#8884d8"
                  animationDuration={300}
                />
              </AreaChart>
            </Brush>
          </LineChart>
        </ResponsiveContainer>
      </div>
    )
  }
}
