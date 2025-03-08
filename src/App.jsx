import { Navigate, Route, Routes, useLocation } from "react-router-dom";
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

const PrivateRoute = ({ children }) => {
    const { data } = useFetchUser();
    const location = useLocation();
    const type = data?.type || data?.role;

    if (!data) {
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }

    if (type && type !== "citizen" && location.pathname !== "/dashboard") {
        return <Navigate to="/dashboard" state={{ from: location }} replace />;
    }

    return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
    const location = useLocation();
    const { data } = useFetchUser();

    const authPages = ["/signin", "/signup", "/AuthoritySignup", "/authoritySignin"];

    if (data && authPages.includes(location.pathname)) {
        // Redirect to the attempted page or default to auction
        const intendedPath = location.state?.from?.pathname || "/issues";
        return <Navigate to={intendedPath} replace />;
    }

    return children;
};

function App() {
    const { data: user, error, isError, isLoading } = useFetchUser();

    if (isLoading)
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader />
            </div>
        );
    return (
        <>
            <Routes>
                <Route path="/" element={<Navbar />} />
                <Route
                    path="/signup"
                    element={
                        <RedirectAuthenticatedUser>
                            <SignupForm />
                        </RedirectAuthenticatedUser>
                    }
                />
                <Route path="/signin" element={<LoginForm />} />
                <Route
                    path="/verify-otp"
                    element={
                        <RedirectAuthenticatedUser>
                            <OTPVerification />
                        </RedirectAuthenticatedUser>
                    }
                />
                <Route
                    path="/reset-password"
                    element={
                        <RedirectAuthenticatedUser>
                            <ResetPassword />
                        </RedirectAuthenticatedUser>
                    }
                />
                <Route
                    path="/AuthoritySignup"
                    element={
                        <RedirectAuthenticatedUser>
                            <AuthoritySignup />
                        </RedirectAuthenticatedUser>
                    }
                />
                <Route
                    path="/authoritySignin"
                    element={
                        <RedirectAuthenticatedUser>
                            <AuthorityLoginForm />
                        </RedirectAuthenticatedUser>
                    }
                />
                <Route
                    path="/map"
                    element={
                        <PrivateRoute>
                            <MapWithMarkers />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/issues"
                    element={
                        <PrivateRoute>
                            <Issue />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/issue/:id"
                    element={
                        <PrivateRoute>
                            <IssueDetail />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/send-issue/"
                    element={
                        <PrivateRoute>
                            <IssueForm />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <Dashboard type={user?.type || user?.role} />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <PrivateRoute>
                            <UserProfile />
                        </PrivateRoute>
                    }
                />

                <Route path="/audio" element={<AudioRecorder />} />
                <Route path="*" element={<h1>404</h1>} />
            </Routes>
        </>
    );
}

export default App;
