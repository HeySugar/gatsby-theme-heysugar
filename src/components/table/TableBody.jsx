import React from "react"
import classnames from "classnames"
import { Link } from "gatsby"

import { useSettings } from "../../context/settings-context"

function calculateTotalNutrients(items) {
  return items.length ? items.reduce((total, amount) => total + amount) : null
}

export default function TableBody({ rows }) {
  const settings = useSettings()

  return (
    <tbody className="bg-white">
      {rows.map(row => {
        const { node } = row
        const carbs = node.meal.map(meal =>
          meal.food
            ? meal.food.nutrition.carbohydrates
            : meal.nutrition.carbohydrates
        )

        return (
          <tr key={node.id}>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              <div className="text-sm leading-5 text-gray-900">{node.date}</div>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              <div className="text-sm leading-5 text-gray-900">{node.time}</div>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              <span
                className={classnames(
                  "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                  {
                    "bg-green-100 text-green-800":
                      node.bloodSugar > settings.systemSettings.hypoLimit &&
                      node.bloodSugar < settings.systemSettings.hyperLimit,
                    "bg-red-100 text-red-800":
                      node.bloodSugar > settings.systemSettings.hyperLimit,
                    "bg-blue-100 text-blue-800":
                      node.bloodSugar < settings.systemSettings.hypoLimit,
                  }
                )}
              >
                {node.bloodSugar}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              <div className="text-sm leading-5 text-gray-900">
                {node.insulinDose ? `${node.insulinDose} units` : "-"}
              </div>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              <div className="text-sm leading-5 text-gray-900">
                {calculateTotalNutrients(carbs)
                  ? `${calculateTotalNutrients(carbs)}g`
                  : "-"}
              </div>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              <div className="flex justify-center">
                <Link
                  className="text-blue-700 hover:underline"
                  to={`/result/${node.id}`}
                >
                  View
                </Link>
              </div>
            </td>
          </tr>
        )
      })}
    </tbody>
  )
}
