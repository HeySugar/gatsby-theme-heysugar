import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import PortableText from "../components/portable-text"
import { getReadableMood } from "../utils/ui"

function ResultPage({ data }) {
  const { result } = data

  return (
    <Layout>
      <div className="flex">
        <aside className="flex flex-col justify-between bg-gray-900 w-1/3 h-screen p-8">
          <header>
            <Link className="text-white text-xl hover:underline" to="/">
              &larr; Back to Summary
            </Link>
          </header>

          <section>
            <h1 className="text-6xl font-bold text-white">
              {result.bloodSugar}
            </h1>
            <ul>
              <li className="text-2xl text-gray-500 tracking-wide">
                {result.dateTime}
              </li>
              {result.mealTime !== "na" && (
                <li className="text-2xl text-gray-500 tracking-wide mt-2">
                  {result.mealTime === "before"
                    ? "Pre-Meal Test"
                    : result.mealTime === "after" && "Post-Meal Test"}
                </li>
              )}
              {result.alcohol && (
                <li
                  className="text-2xl text-pink-500 tracking-wide mt-2"
                  id="alcoholFlag"
                >
                  <span role="img" aria-labelledby="alcoholFlag">
                    🍺 Alcohol
                  </span>
                </li>
              )}
            </ul>
          </section>
        </aside>
        <div className="w-2/3 h-screen p-8 overflow-y-scroll scrolling-touch">
          <article>
            <h2 className="text-3xl font-medium mb-4">Notes</h2>
            {result._rawNotes ? (
              <PortableText blocks={result._rawNotes} />
            ) : (
              <p className="text-lg mb-4 leading-relaxed">
                No notes were taken for this reading.
              </p>
            )}
          </article>

          {result.meal.length > 0 && (
            <>
              <h3 className="text-3xl font-medium mt-8 mb-4">Meal</h3>

              <div className="flex flex-col">
                <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                  <div className="shadow-lg align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg mb-4">
                    <table className="min-w-full">
                      <thead className="bg-gray-200">
                        <tr>
                          <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">
                            Food
                          </th>
                          <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">
                            Total Carbs(g)
                          </th>
                          <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">
                            Total Fats(g)
                          </th>
                          <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">
                            Protein(g)
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {result.meal.map((meal, index) => {
                          const item = meal.food ? meal.food : meal

                          return (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                <div className="flex items-center">
                                  {item.image && (
                                    <div className="flex-shrink-0 h-10 w-10 mr-4">
                                      <img
                                        className="h-10 w-10 rounded-full"
                                        src={item.image.asset.url}
                                        alt={item.name}
                                      />
                                    </div>
                                  )}
                                  <div>
                                    <div className="text-sm leading-5 font-medium text-gray-900">
                                      {item.name}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                <div className="text-sm leading-5 text-gray-900">
                                  {item.nutrition.carbohydrates || "-"}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                <div className="text-sm leading-5 text-gray-900">
                                  {item.nutrition.fats || "-"}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                                {item.nutrition.protein || "-"}
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </>
          )}

          {result.mood.length > 0 && (
            <>
              <h3 className="text-3xl font-medium mt-8 mb-2">Mood</h3>
              <p className="mb-4">
                This describes how you are feeling at the time of the test.
              </p>
              <ul className="list-disc pl-8">
                {result.mood.map((mood, index) => (
                  <li key={index}>{getReadableMood(mood)}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($id: String) {
    result: sanityRecord(id: { eq: $id }) {
      id
      alcohol
      mood
      bloodSugar
      dateTime: loggedAt(formatString: "Do MMMM YYYY | HH:mma", locale: "en_GB")
      mealTime
      _rawNotes
      meal {
        ... on SanityFood {
          _id
          name
          foodType
          nutrition {
            carbohydrates
            fats
          }
          image {
            asset {
              url
            }
          }
        }
        ... on SanityFoodReference {
          food {
            name
            foodType
            nutrition {
              carbohydrates
              fats
            }
            image {
              asset {
                url
              }
            }
          }
        }
      }
    }
  }
`

export default ResultPage
