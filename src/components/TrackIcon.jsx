import {
  Binary, Brain, ChartLine, Cloud, CodeXml, Gamepad2, Infinity as InfinityIcon,
  Layers, PenTool, Route, Server, ShieldCheck, Smartphone,
} from 'lucide-react'

// Components are values, so a plain object can map each track key to its icon component.
const icons = {
  frontend: CodeXml,
  backend: Server,
  fullstack: Layers,
  aiml: Brain,
  datascience: ChartLine,
  devops: InfinityIcon,
  cloud: Cloud,
  cybersecurity: ShieldCheck,
  android: Smartphone,
  uiux: PenTool,
  gamedev: Gamepad2,
  dsa: Binary,
}

function TrackIcon({ trackKey, size = 18 }) {
  const Icon = icons[trackKey] ?? Route
  return <Icon size={size} aria-hidden="true" />
}

export default TrackIcon
