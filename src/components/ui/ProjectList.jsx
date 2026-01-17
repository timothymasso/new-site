import React from 'react'

const projects = {
  "Tri-C Post Degree Cert Classes": {
    2025: [
      { name: "Honors Calculus Project", path: "/content/_dataprojects/calcproject/" },
      { name: "IT1050 Programming Logic", path: "/content/_dataprojects/proglogic/" },
      { name: "Notes From Stats 1 (under construction)", path: "/content/_dataprojects/statsone/" }
    ]
  },
  "New School Class": {
    2024: [
      { name: "Internet Geographies Project", path: "/content/_dataprojects/internetgeo/" }
    ]
  }
}

export default function ProjectList() {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-white">Random Projects</h2>
      <ul className="list-none space-y-4">
        {Object.entries(projects).map(([category, years]) => (
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
