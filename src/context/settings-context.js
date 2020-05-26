/**
 * Settings Context
 * Context to retrieve user's application settings
 * from Sanity
 */

import React, { createContext, useContext } from "react"
import { useStaticQuery, graphql } from "gatsby"

const SettingsContext = createContext({})

function SettingsProvider({ children }) {
  const data = useStaticQuery(graphql`
    query {
      sanitySettings {
        systemSettings {
          unit
          hypoLimit
          hyperLimit
          showGraph
        }
      }
    }
  `)

  const { sanitySettings } = data

  return (
    <SettingsContext.Provider value={sanitySettings}>
      {children}
    </SettingsContext.Provider>
  )
}

function useSettings() {
  return useContext(SettingsContext)
}

export { SettingsProvider, useSettings }
