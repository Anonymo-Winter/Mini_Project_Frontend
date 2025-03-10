
import { Route, Routes} from "react-router-dom";
import SignupForm from "./pages/UserSignup";
import OTPVerification from "./pages/VerifyOTP";
import AuthoritySignup from "./pages/AuthoritySignup";
import MapWithMarkers from "./pages/Map";
import Issue from "./pages/Issue";
import IssueDetail from "./pages/IssueDetail";
import LoginForm from "./pages/Login";
import ResetPassword from "./pages/Reset-password";
import IssueForm from "./components/SendIssue";
import Dashboard from "./pages/Dashboard";
import AudioRecorder from "./components/AudioRecorder";
import AuthorityLoginForm from "./pages/AuthoritySignin";

import Navbar from "./components/Navbar";
import UserProfile from "./pages/CitizenDashboard";
import { useFetchUser } from "./api/query";
import Loader from "./components/Loader";
import NotFoundPage from "./components/NotFound";




function App() {

  const {isLoading} = useFetchUser()
  if(isLoading) return (
    <div className="flex justify-center items-center h-screen">
      <Loader />
    </div>
  )
  return (
    <>
    
      <Routes>


<Route path="/" element={<Issue />} />
<Route path="/signup" element={<SignupForm />} />
<Route path="/signin" element={<LoginForm />} />
<Route path="/verify-otp" element={<OTPVerification />} />
<Route path="/reset-password" element={<ResetPassword />} />
<Route path="/AuthoritySignup" element={<AuthoritySignup />} />
<Route path="/authoritySignin" element={<AuthorityLoginForm />} />
<Route path="/map" element={<MapWithMarkers />} />
<Route path="/issue/:id" element={<IssueDetail />} />
<Route path="/send-issue/" element={<IssueForm />} />
<Route path="/dashboard" element={<Dashboard />} />
<Route path="/profile" element={<UserProfile />} />

<Route path="/audio" element={<AudioRecorder />} />
<Route path="*" element={<NotFoundPage />} />
</Routes>
      
    </>
  )
}

export default App
