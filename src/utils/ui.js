function getStatisticClass(reading, settings) {
  let className = ""

  if (
    reading > settings.systemSettings.hypoLimit &&
    reading < settings.systemSettings.hyperLimit
  ) {
    className = "text-green-500"
  } else if (reading > settings.systemSettings.hyperLimit) {
    className = "text-red-500"
  } else if (reading < settings.systemSettings.hypoLimit) {
    className = "text-blue-500"
  }

  return className
}

/**
 * Return a readable mood value
 */
function getReadableMood(mood) {
  switch (mood) {
    case "happy":
      return "I feel happy"

    case "neutral":
      return "I feel neutral"

    case "anxious":
      return "I feel anxious"

    case "stressed":
      return "I feel stressed"

    case "tired":
      return "I feel tired"

    case "chilled":
      return "I feel chilled out"

    case "headache":
      return "I have a headache"

    case "menstruating":
      return "I'm on my period"

    case "sick":
      return "I feel sick/ill"

    case "hungover":
      return "I have a hangover"

    case "nervous":
      return "I feel nervous"

    case "pain":
      return "I'm in pain"

    case "hypo":
      return "I feel hypo"

    case "hypoAfter":
      return "I've just got out of a hypo"

    default:
      return ""
  }
}

export { getStatisticClass, getReadableMood }
