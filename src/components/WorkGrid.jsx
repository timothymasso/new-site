import React from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import WorkCard from './WorkCard'

const allWork = [
  // Performances
  { 
    title: "New School Degree Recital", 
    category: "Performance", 
    year: "2024",
    path: "/performances/new-school-recital",
    type: "performance",
    thumbnail: "/assets/playing.webp"
  },
  { 
    title: "Radiohead Ensemble", 
    category: "Performance", 
    year: "2024",
    path: "/performances/radiohead-ensemble",
    type: "performance",
    thumbnail: "/assets/playing.webp"
  },
  { 
    title: "Improv Ensemble Fall 2023", 
    category: "Performance", 
    year: "2023",
    path: "/performances/improv-ensemble-fall-2023",
    type: "performance",
    thumbnail: "/assets/playing.webp"
  },
  { 
    title: "Charles Mingus Ensemble", 
    category: "Performance", 
    year: "2023",
    path: "/performances/mingus",
    type: "performance",
    thumbnail: "/assets/playing.webp"
  },
  { 
    title: "Steely Dan Ensemble", 
    category: "Performance", 
    year: "2022",
    path: "/performances/steely-dan",
    type: "performance",
    thumbnail: "/assets/playing.webp"
  },
  { 
    title: "Julius Hemphil Ensemble", 
    category: "Performance", 
    year: "2022",
    path: "/performances/julius-hemphil",
    type: "performance",
    thumbnail: "/assets/playing.webp"
  },
  { 
    title: "Afro Cuban Ensemble", 
    category: "Performance", 
    year: "2022",
    path: "/performances/afro-cuban",
    type: "performance",
    thumbnail: "/assets/playing.webp"
  },
  { 
    title: "The Kennedy Dream", 
    category: "Performance", 
    year: "2021",
    path: "/performances/kennedy-dream",
    type: "performance",
    thumbnail: "/assets/kdream.PNG"
  },
  { 
    title: "Unsilent Film Project", 
    category: "Performance", 
    year: "2021",
    path: "/performances/unsilent",
    type: "performance",
    thumbnail: "/assets/playing.webp"
  },
  // Projects
  { 
    title: "Honors Calculus Project", 
    category: "Data Project", 
    year: "2025",
    path: "/projects/calc-project",
    type: "project",
    thumbnail: "/assets/tc.jpg"
  },
  { 
    title: "IT1050 Programming Logic", 
    category: "Data Project", 
    year: "2025",
    path: "/projects/prog-logic",
    type: "project",
    thumbnail: "/assets/tc.jpg"
  },
  { 
    title: "Internet Geographies", 
    category: "Data Project", 
    year: "2024",
    path: "/projects/internet-geographies",
    type: "project",
    thumbnail: "/assets/tc.jpg"
  },
  { 
    title: "Notes From Stats 1", 
    category: "Data Project", 
    year: "2025",
    path: "/projects/stats-one",
    type: "project",
    thumbnail: "/assets/tc.jpg"
  },
  // Compositions
  { 
    title: "Milestones Arrangement", 
    category: "Composition", 
    year: "2022",
    path: "/compositions/milestones",
    type: "composition",
    thumbnail: "/assets/playing.webp"
  }
]

export default function WorkGrid() {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1, once: true })

  return (
    <section id="work" className="py-12 md:py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {allWork.map((item, index) => (
            <WorkCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
