import React from "react"

export default function TableHead({ header }) {
  return (
    <thead className="bg-gray-200">
      <tr>
        {header.titles.map((title, index) => (
          <th
            key={index}
            className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider"
          >
            {title}
          </th>
        ))}
      </tr>
    </thead>
  )
}
