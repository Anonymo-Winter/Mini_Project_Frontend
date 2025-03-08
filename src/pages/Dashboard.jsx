import UserProfile from "./CitizenDashboard";
import DashboardPage from "./AuthorityDashboard";
import SubordinateDashboardPage from "./SubOrdinateDashboard";

function Dashboard({ type }) {
    if (type === "citizen") {
        return <UserProfile />;
    } else if (type === "Representative authority") {
        return <DashboardPage />;
    }
    return <SubordinateDashboardPage />;
}

export default Dashboard;
