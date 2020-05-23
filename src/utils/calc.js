/**
 * Calculation Helpers
 */

function getHyperCount(readings, settings) {
  const { hyperLimit } = settings.systemSettings

  return readings.edges.filter(edge => edge.node.bloodSugar >= hyperLimit)
    .length
}

function getHypoCount(readings, settings) {
  const { hypoLimit } = settings.systemSettings

  return readings.edges.filter(edge => edge.node.bloodSugar <= hypoLimit).length
}

function getAverageResult(readings) {
  const items = readings.edges.map(edge => edge.node.bloodSugar)
  const total = items.reduce((acc, val) => acc + val)

  return (total / items.length).toFixed(1)
}

export { getHyperCount, getHypoCount, getAverageResult }
