import { BookOpen, CirclePlay } from 'lucide-react'

function ResourceCard({ resource }) {
  const isVideo = resource.type === 'video'
  const Icon = isVideo ? CirclePlay : BookOpen

  return (
    <a href={resource.url} target="_blank" rel="noopener noreferrer" className="resource">
      <Icon size={16} aria-hidden="true" />
      <span className="resource__label">{resource.label}</span>
      <span className="resource__type">{isVideo ? 'Video' : 'Docs'}</span>
    </a>
  )
}

export default ResourceCard
