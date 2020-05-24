const React = require("react")
const { SettingsProvider } = require("./src/context/settings-context")

exports.wrapRootElement = ({ element }) => {
  return <SettingsProvider>{element}</SettingsProvider>
}
