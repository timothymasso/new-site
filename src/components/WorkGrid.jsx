import React, { useState } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import WorkCard from './WorkCard'

// Helper function to get YouTube thumbnail with fallback
const getYouTubeThumbnail = (videoId) => {
  if (!videoId) return null
  // Try hqdefault first as it's more reliable, then fallback to maxresdefault
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
}

const allWork = [
  // Performances
  { 
    title: "New School Degree Recital", 
    category: "Performance", 
    year: "2024",
    path: "/performances/new-school-recital",
    type: "performance",
    youtubeId: "3oJnpU6dzO4",
    thumbnail: "/assets/playing.webp"
  },
  { 
    title: "Radiohead Ensemble", 
    category: "Performance", 
    year: "2024",
    path: "/performances/radiohead-ensemble",
    type: "performance",
    youtubeId: "XmKAJfuxxoA",
    thumbnail: "/assets/playing.webp"
  },
  { 
    title: "Improv Ensemble Fall 2023", 
    category: "Performance", 
    year: "2023",
    path: "/performances/improv-ensemble-fall-2023",
    type: "performance",
    youtubeId: "HfmpWLo5oo4",
    thumbnail: "/assets/playing.webp"
  },
  { 
    title: "Charles Mingus Ensemble", 
    category: "Performance", 
    year: "2023",
    path: "/performances/mingus",
    type: "performance",
    youtubeId: "MhJe7zcYz50",
    thumbnail: "/assets/playing.webp"
  },
  { 
    title: "Steely Dan Ensemble", 
    category: "Performance", 
    year: "2022",
    path: "/performances/steely-dan",
    type: "performance",
    youtubeId: "0EgK2lqJP1E",
    thumbnail: "/assets/playing.webp"
  },
  { 
    title: "Julius Hemphil Ensemble", 
    category: "Performance", 
    year: "2022",
    path: "/performances/julius-hemphil",
    type: "performance",
    youtubeId: "bG930zKvAbk",
    thumbnail: "/assets/playing.webp"
  },
  { 
    title: "Afro Cuban Ensemble", 
    category: "Performance", 
    year: "2022",
    path: "/performances/afro-cuban",
    type: "performance",
    youtubeId: "zPAi5hWqmHw",
    thumbnail: "/assets/playing.webp"
  },
  { 
    title: "The Kennedy Dream", 
    category: "Performance", 
    year: "2021",
    path: "/performances/kennedy-dream",
    type: "performance",
    youtubeId: "P-zi1HWQoAs",
    thumbnail: "/assets/kdream.PNG"
  },
  { 
    title: "Unsilent Film Project", 
    category: "Performance", 
    year: "2021",
    path: "/performances/unsilent",
    type: "performance",
    youtubeId: "L_jJaFzohR4",
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
    category: "Code", 
    year: "2025",
    path: "/projects/prog-logic",
    type: "project",
    thumbnail: "/assets/tri-c-logo.svg"
  },
  { 
    title: "Internet Geographies", 
    category: "Data Project", 
    year: "2024",
    path: "/projects/internet-geographies",
    type: "project",
    thumbnail: "/assets/plane.webp"
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

// Map work items to use YouTube thumbnails when available
const workWithThumbnails = allWork.map(item => ({
  ...item,
  thumbnail: item.youtubeId ? getYouTubeThumbnail(item.youtubeId) : item.thumbnail
}))

const categories = ['All', 'Performance', 'Data Project', 'Code']

export default function WorkGrid() {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1, once: true })
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [hoveredCategory, setHoveredCategory] = useState(null)

  const filteredWork = selectedCategory === 'All' 
    ? workWithThumbnails 
    : workWithThumbnails.filter(item => item.category === selectedCategory)

  return (
    <section id="work" className="py-12 md:py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                onMouseEnter={() => setHoveredCategory(category)}
                onMouseLeave={() => setHoveredCategory(null)}
                className={`px-3 py-1 text-xs md:text-sm font-light transition-all rounded-full ${
                  selectedCategory === category
                    ? 'text-white bg-white/20 scale-110'
                    : hoveredCategory === category
                    ? 'text-white/90 bg-white/10 scale-105'
                    : 'text-white/60 hover:text-white/80'
                }`}
                style={{
                  transform: hoveredCategory === category && selectedCategory !== category ? 'scale(1.05)' : selectedCategory === category ? 'scale(1.1)' : 'scale(1)',
                  transition: 'all 0.2s ease',
                  fontFamily: category === 'Code' ? 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace' : 'inherit'
                }}
              >
                {category === 'Code' ? '<> Code' : category}
              </button>
            ))}
          </div>
          <p className="text-xs text-white/40">
            {filteredWork.length} {filteredWork.length === 1 ? 'thing' : 'things'} found
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredWork.map((item, index) => (
            <WorkCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
