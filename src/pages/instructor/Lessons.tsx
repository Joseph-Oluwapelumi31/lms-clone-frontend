import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../../lib/api';
import type { Lesson } from '../../types/instructorDashboard';
import { Check, Download, Lock, Zap } from 'lucide-react';
import Instruction from '../../components/Instruction'

type LessonResponse = {
  data: Lesson;
};
type Tab = {
  key: string ; label: string
}
const tabs: Tab[] = [
  {key: 'overview', label: 'Overview'},
  {key: 'instruction', label: 'Instructions'}
]

const LessonDetail = () => {
  const { lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("instruction");
  

  useEffect(() => {
    if (!lessonId) {
      setError('Lesson ID is missing in URL.');
      setLoading(false);
      return;
    }

    const fetchLesson = async () => {
      try {
        setLoading(true);
        const res = await api.get<LessonResponse>(`/lessons/${lessonId}`);
        setLesson(res.data.data);
      } catch (err) {
        console.error('Failed to fetch lesson', err);
        setError('Could not load lesson. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [lessonId]);

  return (
    <section>
      {lesson?.type === 'video' && (
        <div className='lg:hidden' style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>

          <iframe
            src="https://www.youtube.com/embed/K0Jlr_eVFGM?si=J6cO3vxzTTa3mWgk"
            title="YouTube video player"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
            frameBorder="0"
            allowFullScreen
          ></iframe>
      </div>
      )}

    <div className=" max-w-4x bg-white p-4 md:hidden">
            
        <div>
          <h2 className='text-text font-bold text-xl'>Lecture {lesson?.order}</h2>
          <div className='text-text font-bold text-sm mb-4'>Week {lesson?.order}. <span className='text-muted'>{lesson?.type} Lesson</span></div>
          <div className='flex gap-2'>
            <div className='bg-slate-50 rounded-full py-2 px-4 flex gap-2 text-muted items-center justify-center w-50 text-sm'>
              <Lock size={15}/>
              <p>Attendance Locked</p>
            </div>
            <div className='border border- rounded-full flex px-4 gap-2 text-muted items-center text-sm'>
              <Zap size={15}/>
              <p>Quiz</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key;

              return (
                <button
                  key={tab.key}
                  className={`py-4 transition-colors hover:cursor-pointer font-bold text-md mb-4 ${
                    isActive
                      ? "text-text border-b-2 border-text"
                      : "text-muted"
                  }`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        {loading && <p className="text-center text-muted">Loading lesson...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}
        {!loading && !error && !lesson && <p className="text-center text-muted">Lesson not found.</p>}

        {activeTab === 'instruction' && 
          <Instruction bg={'slate-50'}/>
        }
        {activeTab === 'overview' &&
          <div>
            <h2 className='font-bold text-text text-lg mb-4'>Description</h2>
            <p>{lesson?.content}</p>

            

          </div>
        }
    </div>


    {/* Desktop and tablet section */}
    <div className='hidden md:block lg:grid lg:grid-cols-3 gap-4 '>
      <div className='  lg:col-span-2'>
      {lesson?.type === 'video' && (

        <div className='hidden rounded-2xl lg:block' style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>

          <iframe
            src="https://www.youtube.com/embed/K0Jlr_eVFGM?si=J6cO3vxzTTa3mWgk"
            title="YouTube video player"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      )}
        <div className='p-6 rounded-2xl my-4 bg-white'>
          <h2 className='text-text font-bold text-xl mb-4'>About this lesson</h2>
          <p className='text-muted'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio voluptatem deleniti quis quos vitae cum autem, doloribus excepturi cupiditate corrupti iure ducimus mollitia magnam maxime, recusandae repudiandae doloremque accusantium eligendi!</p>

        </div>
      </div>
      <div>
        <div className='bg-white p-6 rounded-2xl my-4'>
          <h2 className='text-text font-bold text-xl mb-4'>{lesson?.title}</h2>
          <div className='flex flex-col gap-4'>
            <Link to={''}>
              <div className='flex justify-center items-center gap-2 rounded-full py-3 bg-slate-50'>
                <Check className='bg-green-800 text-white rounded-full p-2 w-6 h-6 '/>
                <p className='text-green-800'>Attendance Marked</p>
              </div>
            </Link>
            <Link to={''}>
              <div className='flex justify-center items-center gap-2 rounded-full py-3 border border-blue-600 text-blue-800 hover:bg-blue-800 hover:text-white transition-all duration-200 '>
                <Zap className='  rounded-full w-4 h-6 '/>
                <p>Take Quiz</p>
              </div>
            </Link>
            <Link to={''}>
              <div className='flex justify-center items-center gap-2 rounded-full py-3 border border-[#6c757d] text-muted hover:bg-[#6c757d] hover:text-white transition-all duration-200 '>
                <Download className='rounded-full w-4 h-6 '/>
                <p>Lesson Resources</p>
              </div>
            </Link>
          </div>
        </div>

        <Instruction bg={'white'}/>
      </div>
      
    </div>
    </section>
    
    
  );
};


export default LessonDetail;
