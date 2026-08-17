import { version } from '@/lib/version'

export default function Footer() {
  return (
    <footer className="py-2 text-center text-xs bg-storymixer-primary text-storymixer-white">
      <p>Designed and built by Megan Krenbrink.</p>
      <p className="text-storymixer-white/70">
        v{version.build} · {version.sha}
      </p>
    </footer>
  )
}
