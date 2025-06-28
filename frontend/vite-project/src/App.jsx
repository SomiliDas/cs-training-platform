
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import { ToastContainer} from 'react-toastify'
import AdminDashboard from './pages/AdminDashboard'
import AttemptTaskPage from './pages/AttemptTaskPage'
import AuthPage from './pages/AuthPage'
import EachProgram from './pages/EachProgram'
import LandingPage from './pages/LandingPage'
import ProgramsPage from './pages/ProgramsPage'
import StudentProgressPage from './pages/StudentProgressPage'
import TasksDashboard from './pages/TasksDashboard'
import TopUpPage from './pages/TopUpPage'
import UserProilePage from './pages/UserProfilePage'
import WalletPage from './pages/WalletPage'
import EditProfile from './pages/EditProfile'
import GetAllStudents from './pages/GetAllStudents'
import CreateProgram from './pages/CreateProgram'
import UpdateProg from './pages/UpdateProg'
import AllTasks from './pages/AllTasks'
import PendingApprovals from './pages/PendingApprovals'
import ProgressTracker from './pages/ProgressTracker'
import MyProgs from './pages/MyProgs'
import ForgotPassword from './pages/ForgotPassword'



function App() {
  

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">

        <Route index element={<LandingPage/>} />
        <Route path='auth' element={<AuthPage/>} />
        <Route path='programs' element={<ProgramsPage/>} />
        <Route path = "forgotpassword" element={<ForgotPassword/>} />
        <Route path="admin/">
          <Route index element={<AdminDashboard/>}/>
          <Route path="getusers" element={<GetAllStudents/>}/>
          <Route path='createprogram' element={<CreateProgram/>}/>
          <Route path = "create/tasks" element={<TasksDashboard/>} />
          <Route path="studentprogress" element={<StudentProgressPage/>}/>
          <Route path='updateprog/:id' element={<UpdateProg/>} />
          <Route path="allTasks" element={<AllTasks/>} />
          <Route path = "pending" element={<PendingApprovals/>}/>
        
        </Route>

        <Route path="users/">
          <Route path='profile/:id' element={<UserProilePage/>}/>
          <Route path="tasks" element={<AttemptTaskPage/>} />
          <Route path='wallet' element={<WalletPage/>} />
          <Route path='topup' element={<TopUpPage/>}/>
          <Route path='program/:id' element={<EachProgram/>}/>
          <Route path='edit/:id' element={<EditProfile/>}/>
          <Route path='programs' element={<ProgramsPage/>} />
          <Route path = "track" element={<ProgressTracker/>}/>
          <Route path= "myProgs" element={<MyProgs/>} />
        </Route>
        

      </Route>
    )
  )


  return (
    <>
      <ToastContainer/>
      <RouterProvider router={router} />
    </>
  )
}

export default App
