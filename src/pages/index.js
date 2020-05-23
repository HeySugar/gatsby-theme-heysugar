import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Table from "../components/table"
import Statistic from "../components/statistic"

import { useSettings } from "../context/settings-context"
import { getStatisticClass } from "../utils/ui"
import { getHyperCount, getHypoCount, getAverageResult } from "../utils/calc"

/**
 * Build up the example table data
 */
const tableConfig = {
  header: {
    titles: ["Date", "Time", "Result", "Total Carbs", "Total Fats", ""],
  },
}

function IndexPage({ data }) {
  const { records, settings } = data

  const config = useSettings()
  const hyperCount = getHyperCount(records, config)
  const hypoCount = getHypoCount(records, config)
  const averageReading = getAverageResult(records)
  const bloodSugarClassName = getStatisticClass(averageReading, config)

  return (
    <Layout>
      <SEO title="Home" />
      <section
        id="search-members"
        className="w-full pb-64 bg-gray-900 border-t-8 border-gray-700"
      >
        <div className="max-w-6xl mx-auto py-3 px-5 mt-12 text-center">
          <h2 className="text-gray-200 text-xl lg:text-5xl font-bold mt-3">
            Blood Sugars for {settings.profile.givenName}{" "}
            {settings.profile.familyName}
          </h2>
        </div>
      </section>

      <div className="container mx-auto -mt-64">
        <div className="mt-12 flex flex-col">
          <div className="my-8 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <section className="mb-12">
              <div className="flex justify-between">
                <Statistic
                  valueClass={bloodSugarClassName}
                  stat={{
                    title: "Average Blood Sugar (mmol/L)",
                    value: parseFloat(averageReading),
                  }}
                >
                  This is your average blood sugar based on tests recorded over
                  the last 30 days.
                </Statistic>

                <Statistic
                  stat={{
                    title: "Total Hyper Results",
                    value: hyperCount,
                  }}
                >
                  This is the total number of tests that have resulted in high
                  readings over the last 30 days.
                </Statistic>

                <Statistic
                  stat={{
                    title: "Total Hypo Results",
                    value: hypoCount,
                  }}
                >
                  This is the total number of tests that have resulted in low
                  readings over the last 30 days.
                </Statistic>
              </div>
            </section>
            <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200 mb-12">
              <Table header={tableConfig.header} rows={records.edges} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  {
    records: allSanityRecord(sort: { fields: loggedAt, order: DESC }) {
      edges {
        node {
          id
          bloodSugar
          date: loggedAt(formatString: "DD/MM/YYYY (dddd)", locale: "en_GB")
          time: loggedAt(formatString: "HH:mma", locale: "en_GB")
          meal {
            ... on SanityFood {
              _id
              name
              nutrition {
                carbohydrates
                fats
              }
            }
            ... on SanityFoodReference {
              food {
                name
                nutrition {
                  carbohydrates
                  fats
                }
              }
            }
          }
        }
      }
    }
    settings: sanitySettings {
      profile {
        givenName
        familyName
      }
    }
  }
`

export default IndexPage
