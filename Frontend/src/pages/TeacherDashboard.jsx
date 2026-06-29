import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { 
  FiCheck, 
  FiX, 
  FiClock, 
  FiUser, 
  FiMail, 
  FiBookOpen, 
  FiLogOut, 
  FiLock,
  FiActivity
} from 'react-icons/fi'

const TeacherDashboard = () => {
  const id = localStorage.getItem("id")
  const token = localStorage.getItem("token")
  const navigate = useNavigate()
  
  const [data, setData] = useState({})
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [aProjects, setAProjects] = useState([])
  const [rProjects, setRProjects] = useState([])

  const fetchUser = async () => {
    try {
      const user = await axios.get(`http://localhost:4500/api/dashboard/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setData(user.data)
    } catch (error) {
      console.error("Error fetching user info:", error)
    }
  }

  const fetchTeacherProjects = async () => {
    try {
      setLoading(true)
      const projectsDetails = await axios.get('http://localhost:4500/api/teacher/projects', {
        headers: {
          teacherid: `${id}`
        }
      })
      setProjects(projectsDetails.data)
      console.log(projectsDetails.data)
    } catch (error) {
      console.error("Error fetching teacher projects:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchTeacherApproveProjects = async () => {
    try {
      setLoading(true)
      const projectsDetails = await axios.get('http://localhost:4500/api/teacher/projects', {
        headers: {
          teacherid: `${id}`
        }
      })
     
      const approvedProjects = projectsDetails.data.filter(project=>
        project.status === "approved"
      )
      const rejectedProjects = projectsDetails.data.filter(project=>
        project.status === "rejected"
      )
      setAProjects(approvedProjects)
      setRProjects(rejectedProjects)
      
    } catch (error) {
      console.error("Error fetching teacher projects:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!id || !token) {
      navigate("/")
      return
    }
    fetchUser()
    fetchTeacherProjects()
    fetchTeacherApproveProjects()
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    navigate("/")
  }

  const approved = async (projectId) => {
    try {
      await axios.patch(`http://localhost:4500/project/approve/${projectId}`)
      fetchTeacherProjects()
      fetchTeacherApproveProjects()
    } catch (error) {
      console.error("Approve failed:", error)
    }
  }

  const reject = async (projectId) => {
    try {
      await axios.patch(`http://localhost:4500/project/reject/${projectId}`)
      fetchTeacherProjects()
      fetchTeacherApproveProjects()
    } catch (error) {
      console.error("Reject failed:", error)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 font-sans">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 w-full bg-white/85 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-indigo-600 font-semibold tracking-wider">Teacher Portal</p>
            <h1 className="text-lg font-extrabold text-slate-900 leading-tight">Welcome, {data.name || 'Instructor'}</h1>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 hover:text-rose-700 rounded-lg transition-all cursor-pointer duration-200"
          >
            <FiLogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Header section with count */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Total Projects</h2>
            <span className="px-2.5 py-0.5 text-xs font-bold bg-slate-200 text-slate-700 rounded-full">
              {projects.length}
            </span>
          </div>
        </div>

        {/* Project Submissions Grid */}
        <section>
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white border border-slate-200/60 rounded-xl shadow-xs">
              <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-sm font-semibold text-slate-500">Loading submission queues...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="bg-white rounded-xl border border-dashed border-slate-300 p-16 text-center shadow-xs">
              <div className="text-5xl mb-4">📂</div>
              <h3 className="text-slate-800 font-extrabold text-lg mb-1">No Projects Found</h3>
              <p className="text-sm text-slate-500 max-w-sm mx-auto">There are no project submissions at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((proj) => {
                const isPending = proj.status === 'pending' || proj.status === 'Pending';
                return (
                  <div 
                    key={proj._id} 
                    className="bg-white rounded-xl border border-slate-200/60 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
                  >
                    {/* Top Gray Accent Line */}
                    <div className="h-1.5 w-full bg-slate-300"></div>
                    
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <h3 className="font-extrabold text-slate-900 text-base leading-snug break-words max-w-[70%] group-hover:text-indigo-600 transition-colors">
                          {proj.project}
                        </h3>
                        <span className="px-2.5 py-0.5 text-[10px] font-extrabold tracking-wider border rounded-full bg-slate-50 text-slate-600 border-slate-200">
                          {proj.status}
                        </span>
                      </div>
                      
                      <p className="text-sm text-slate-600 leading-relaxed mb-6 flex-1 line-clamp-4">
                        {proj.description}
                      </p>

                      {/* Student Info Details */}
                      <div className="bg-slate-50 rounded-lg p-3.5 border border-slate-100 flex flex-col gap-2 mt-auto">
                        <span className="text-[10px] font-bold text-slate-400 tracking-wider">Submitted By</span>
                        <div className="flex items-center gap-2">
                          <FiUser className="w-4 h-4 text-slate-500 flex-shrink-0" />
                          <span className="text-xs font-semibold text-slate-700 truncate">
                            {proj.studentId?.name || "Unknown Student"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FiMail className="w-4 h-4 text-slate-500 flex-shrink-0" />
                          <span className="text-xs text-slate-500 truncate">
                            {proj.studentId?.email || "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Footer */}
                    <div className="border-t border-slate-100 bg-slate-50/50 p-4 flex items-center justify-between">
                      <button 
                        onClick={() => reject(proj._id)}
                        disabled={!isPending}
                        className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold border rounded-lg transition-all ${
                          isPending 
                            ? "text-rose-600 hover:text-white bg-rose-50 hover:bg-rose-600 border-rose-200/50 hover:border-rose-600 cursor-pointer" 
                            : "text-slate-400 bg-slate-100 border-slate-200 cursor-not-allowed opacity-60"
                        }`}
                      >
                        <FiX className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>
                      
                      <button 
                        onClick={() => approved(proj._id)}
                        disabled={!isPending}
                        className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold border rounded-lg transition-all ${
                          isPending 
                            ? "text-emerald-600 hover:text-white bg-emerald-50 hover:bg-emerald-600 border-emerald-200/50 hover:border-emerald-600 cursor-pointer" 
                            : "text-slate-400 bg-slate-100 border-slate-200 cursor-not-allowed opacity-60"

                        }`}
                      >
                        <FiCheck className="w-3.5 h-3.5" />
                        <span>Accept</span>
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}


        </section>

        {/* Approved & Rejected Projects Sections */}
        <section className="mt-12 pt-10 border-t border-slate-200/80 space-y-8">
          {/* Approved Projects */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              Approved Projects ({aProjects.length})
            </h3>
            {aProjects.length === 0 ? (
              <p className="text-sm text-slate-400 bg-white border border-slate-200/60 rounded-xl p-4 text-center shadow-xs">
                No approved projects yet.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {aProjects.map((project) => (
                  <p key={project._id} className="px-4 py-3.5 bg-emerald-50/60 text-emerald-800 border border-emerald-200/40 rounded-xl font-bold text-sm shadow-xs truncate">
                    {project.project || project.projectTitle}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Rejected Projects */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500"></span>
              Rejected Projects ({rProjects.length})
            </h3>
            {rProjects.length === 0 ? (
              <p className="text-sm text-slate-400 bg-white border border-slate-200/60 rounded-xl p-4 text-center shadow-xs">
                No rejected projects yet.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {rProjects.map((project) => (
                  <p key={project._id} className="px-4 py-3.5 bg-rose-50/60 text-rose-800 border border-rose-200/40 rounded-xl font-bold text-sm shadow-xs truncate">
                    {project.project || project.projectTitle}
                  </p>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}

export default TeacherDashboard
