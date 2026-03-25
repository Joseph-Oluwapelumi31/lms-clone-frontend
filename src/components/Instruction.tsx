import { Check } from 'lucide-react'

type InstructionProps = { bg: string };

const Instruction = ({ bg }: InstructionProps) => {
  return (
    <div className={`bg-${bg} p-6 rounded-2xl`}>
        <h2 className='font-bold text-text text-lg mb-4'>Lesson Instructions</h2>
        <div className='flex gap-2  mb-4'>
          <Check size={15} className='text-green-700'/>
          <p className='text-muted text-sm'>Watch video completely.</p>
        </div>
        <div className='flex gap-2 mb-4'>
          <Check size={15} className='text-green-700'/>
          <p className='text-muted text-sm'>Take notes during playback.</p>
        </div>
        <div className='flex gap-2 mb-4'>
          <Check size={15} className='text-green-700'/>
          <p className='text-muted text-sm'>Mark attendance when prompted.</p>
        </div>
        <div className='flex gap-2 mb-4'>
          <Check size={15} className='text-green-700'/>
          <p className='text-muted text-sm'>Complete the post-lesson quiz.</p>
        </div>   
    </div>
  )
}

export default Instruction