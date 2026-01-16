import React from 'react'

const performances = {
  "New School": {
    2024: [
      { name: "New School Degree Recital", path: "/_performances/new-school-recital/" },
      { name: "Radiohead Ensemble (under construction)", path: "/_performances/Radio-Head-Ensemble/" }
    ],
    2023: [
      { name: "Improv Ensemble Fall 2023", path: "/_performances/improv_ensemble_fall23/" },
      { name: "Charles Mingus Ensemble", path: "/_performances/mingus/" }
    ],
    2022: [
      { name: "Steely Dan Ensemble", path: "/_performances/steelydan/" },
      { name: "Julius Hemphil Ensemble", path: "/_performances/juliushemphil/" },
      { name: "Afro Cuban Ensemble", path: "/_performances/afrocuban/" }
    ],
    2021: [
      { name: "New School Studio Orchestra: The Kennedy Dream", path: "/_performances/kdream/" },
      { name: "Unsilent Film Project", path: "/_performances/unsilent/" }
    ]
  }
}

export default function PerformanceList() {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-white">Performances</h2>
      <ul className="list-none space-y-4">
        {Object.entries(performances).map(([category, years]) => (
          <li key={category} className="category">
            <span className="font-semibold text-white">{category}</span>
            <ul className="ml-4 mt-2 space-y-2">
              {Object.entries(years).map(([year, items]) => (
                <li key={year} className="year">
                  <span className="font-medium text-white">{year}</span>
                  <ul className="ml-4 mt-1 space-y-1">
                    {items.map((item, idx) => (
                      <li key={idx}>
                        <a 
                          href={item.path} 
                          className="text-green-400 hover:text-green-300 underline"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}
