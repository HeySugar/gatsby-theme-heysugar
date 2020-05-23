import React from "react"

import { SettingsProvider } from "./src/context/settings-context"

export function wrapRootElement({ element }) {
  return <SettingsProvider>{element}</SettingsProvider>
}
