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
  const total = items.length > 0 ? items.reduce((acc, val) => acc + val) : 0

  return total > 0 ? (total / items.length).toFixed(1) : total
}

export { getHyperCount, getHypoCount, getAverageResult }
