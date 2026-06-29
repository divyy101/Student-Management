import React, { useEffect, useState } from 'react'
import api from '../services/api'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const StudentDashboard = () => {
  const navigate = useNavigate()
  const id = localStorage.getItem("id")
  const token = localStorage.getItem("token")
  const [data, setData] = useState({})
  const [allTeachers, setAllTeachers] = useState([])
  const [teacherId, setTeacherId] = useState("")
  const [project, setProject] = useState("")
  const [description, setDescription] = useState("")
  const [projects, setProjects] = useState([])

  const fetchUser = async () => {
    try {
      const user = await api.get(`/api/dashboard/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setData(user.data)
      console.log(user)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchTeachers = async () => {
    try {
      const teachers = await api.get('/api/allteachers')
      setAllTeachers(teachers.data)
    } catch (error) {
      console.log(error)
    }
  }

  const addproject = async (e) => {
    e.preventDefault()
    try {
      await api.post("/api/addproject", {
        studentId: id,
        teacherId,
        project,
        description
      })
      setProject("")
      setDescription("")
      setTeacherId("")
      fetchProjects()
      toast.success("Project Added Successfully")
    } catch (error) {
      console.log(error)
      toast.error("Failed to add project")
    }
  }

  const fetchProjects = async () => {
    try {
      const projectsDetails = await api.get('/api/student/projects', {
        headers: {
          studentid: `${id}`
        }
      })
      setProjects(projectsDetails.data)
    } catch (error) {
      console.log(error)
    }
  }

  const logout = () => {
    localStorage.clear()
    navigate("/")
  }

  const deleteProject = async (pid) => {
    try {
      await api.delete(`/api/delete/project/${pid}`)
      fetchProjects()
      toast.success("Project Deleted Successfully")
    } catch (error) {
      console.log(error)
      toast.error("Failed to delete project")
    }
  }

  useEffect(() => {
    fetchUser()
    fetchTeachers()
    fetchProjects()
  }, [])

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 font-sans">
      {/* Navbar Header */}
      <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
              {data.name?.charAt(0).toUpperCase() || 'S'}
            </div>
            <div>
              <p className="text-xs text-slate-500 font-semibold tracking-wide uppercase">Student Portal</p>
              <h1 className="text-lg font-bold text-slate-900 leading-tight">Welcome, {data.name || 'Student'}</h1>
            </div>
          </div>
          <button 
            onClick={logout}
            className="px-4 py-2 text-sm font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 hover:text-rose-700 rounded-lg transition-all cursor-pointer duration-200"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <main className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Submit Project Form (Columns 1 to 5) */}
        <section className="lg:col-span-5">
          <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm p-6 sticky top-24">
            <div className="flex items-center gap-2 mb-6">
              <span className="h-2 w-2 rounded-full bg-blue-600"></span>
              <h2 className="text-lg font-bold text-slate-900">Submit your Projects Here</h2>
            </div>
            
            <form onSubmit={addproject} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Project Name</label>
                <input 
                  type="text" 
                  value={project} 
                  onChange={(e) => setProject(e.target.value)} 
                  required
                  placeholder="Enter project name..."
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm placeholder:text-slate-400 bg-slate-50/50 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Project Description</label>
                <textarea 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  required
                  rows={4}
                  placeholder="Describe your project requirements and goals..."
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm placeholder:text-slate-400 bg-slate-50/50 focus:bg-white resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Select Teacher</label>
                <select 
                  value={teacherId}
                  onChange={(e) => setTeacherId(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm bg-slate-50/50 focus:bg-white text-slate-700"
                >
                  <option value="">Select Teacher</option>
                  {allTeachers.map((teacher) => (
                    <option key={teacher._id} value={teacher._id}>
                      {teacher.name}
                    </option>
                  ))}
                </select>
              </div>

              <button 
                type="submit"
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer text-center"
              >
                Submit Project
              </button>
            </form>
          </div>
        </section>

        {/* Right Side: Your Projects List (Columns 6 to 12) */}
        <section className="lg:col-span-7">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Your Projects</h2>
              <span className="px-2.5 py-0.5 text-xs font-bold bg-slate-200 text-slate-700 rounded-full">
                {projects.length}
              </span>
            </div>
          </div>

          {projects.length === 0 ? (
            <div className="bg-white rounded-xl border border-dashed border-slate-300 p-12 text-center shadow-sm">
              <div className="text-4xl mb-3">📁</div>
              <h3 className="text-slate-800 font-bold text-base mb-1">No Projects Found</h3>
              <p className="text-sm text-slate-500 max-w-sm mx-auto">Get started by filling out the submission form on the left to add your first project.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((proj) => (
                <div 
                  key={proj._id} 
                  className="bg-white rounded-xl border border-slate-200/60 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-bold text-slate-900 text-base leading-snug break-words max-w-[80%]">
                        {proj.project}
                      </h3>
                      <span className="px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-slate-100 text-slate-600 rounded">
                        {proj.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-3">
                      {proj.description}
                    </p>
                  </div>

                  <div className="border-t border-slate-100 pt-4 flex items-center justify-between mt-auto">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Teacher</span>
                      <span className="text-xs font-semibold text-slate-700 truncate max-w-[130px]">
                        {proj.teacherId?.name || "N/A"}
                      </span>
                    </div>

                    <button 
                      onClick={() => deleteProject(proj._id)}
                      className="px-3 py-1.5 text-xs font-semibold text-rose-600 hover:text-white bg-rose-50 hover:bg-rose-600 rounded-md transition-all cursor-pointer duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </main>
    </div>
  )
}

export default StudentDashboard
