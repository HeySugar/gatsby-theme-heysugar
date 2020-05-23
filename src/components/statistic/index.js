/**
 * Statistic Component
 * This component is used to display a statistic on the homepage.
 * E.g. Average Blood Sugar
 */
import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"

function Statistic({ stat, children, valueClass }) {
  return (
    <div className="bg-white max-w-sm rounded overflow-hidden shadow-lg">
      <div className="px-6 pt-4">
        <div className="font-medium text-xl mb-2">{stat.title}</div>
        <p
          className={classnames("text-gray-700 text-base text-5xl font-bold", {
            [valueClass]: typeof valueClass !== "undefined",
          })}
        >
          {stat.value}
        </p>
      </div>
      <div className="px-6 py-4">{children}</div>
    </div>
  )
}

Statistic.propTypes = {
  valueClass: PropTypes.string,
  stat: PropTypes.shape({
    title: PropTypes.string,
    value: PropTypes.number,
  }).isRequired,
}

Statistic.defaultProps = {
  valueClass: undefined,
}

export default Statistic
