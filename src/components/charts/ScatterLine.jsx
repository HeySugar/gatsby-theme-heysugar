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

export default class Example extends PureComponent {
  render() {
    const { data } = this.props

    return (
      <div className="highlight-bar-charts" style={{ userSelect: "none" }}>
        <ResponsiveContainer width="100%" aspect={4.75 / 1.75}>
          <LineChart
            margin={{
              right: 40,
              left: 0,
              top: 40,
              bottom: 50,
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

            <Brush dataKey="result" height={50} stroke="#8884d8">
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
