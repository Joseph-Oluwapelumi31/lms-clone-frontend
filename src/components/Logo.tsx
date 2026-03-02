import {BookOpen} from 'lucide-react'

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <BookOpen className="w-10 h-10 p-2 text-white rounded-lg bg-bg" />
      <span className="font-bold text-xl text-text">YOKLMS</span>
    </div>
  )
}

export default Logo