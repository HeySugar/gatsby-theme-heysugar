import React from "react"

import TableHead from "./TableHead"
import TableBody from "./TableBody"

export default function Table({ rows, header }) {
  return (
    <div className="flex flex-col">
      <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
          <table className="min-w-full">
            <TableHead header={header} />
            <TableBody rows={rows} />
          </table>
        </div>
      </div>
    </div>
  )
}
