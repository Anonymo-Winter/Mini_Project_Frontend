import React, { useState } from "react";
import { 
    LayoutDashboard, 
    Users, 
    AlertTriangle, 
    CheckCircle, 
    BarChart2, 
    Forward, 
    Settings, 
    Menu, 
    X,
    Wrench, 
    Zap,
    MapPin, 
    Trash2,
    Droplet, 
    Leaf, 
    HardHat
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import Forwarded from "@/components/Forwarded";
import Conflicts from "@/components/Conflicts";
import RepresentativeIssues from "@/components/RepresentativeIssues";
import AuthorityProfile from "@/components/AuthorityProfile";
import SubordinateIssues from "@/components/SubordinateIssues";

const SubordinateDashboardPage = () => {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    

    const navigationItems = [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
        { id: "issues", label: "Issues", icon: AlertTriangle },
        { id: "settings", label: "Settings", icon: Settings },
    ];

   

    // Sample data - in a real app this would come from an API
    const analyticsData = {
        totalIssues: 156,
        resolvedIssues: 124,
        pendingIssues: 22,
        conflictIssues: 10,
    };



    

    

    const renderContent = () => {
        switch (activeTab) {
            case "dashboard":
                return (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">Total Issues</CardTitle>
                                <LayoutDashboard className="h-4 w-4 text-gray-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{analyticsData.totalIssues}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">Resolved</CardTitle>
                                <CheckCircle className="h-4 w-4 text-green-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{analyticsData.resolvedIssues}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">Pending</CardTitle>
                                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{analyticsData.pendingIssues}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">Conflicts</CardTitle>
                                <AlertTriangle className="h-4 w-4 text-red-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{analyticsData.conflictIssues}</div>
                            </CardContent>
                        </Card>
                    </div>
                );
            case "issues":
                return (
                    <SubordinateIssues />
                );
            case "settings":
                return (
                    <AuthorityProfile />
                );
            default:
                return <div>Select a tab</div>;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside 
                className={`
                    fixed top-0 left-0 z-40 h-screen w-64 
                    bg-white border-r shadow-sm
                    transform transition-transform duration-200 ease-in-out
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    lg:translate-x-0
                `}
            >
                <div className="flex flex-col h-full">
                    <div className="h-16 flex items-center px-6 border-b">
                        <h1 className="text-xl font-bold text-gray-800">Municipal Dashboard</h1>
                    </div>
                    <nav className="flex-1 overflow-y-auto p-4">
                        {navigationItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        setActiveTab(item.id);
                                        setIsSidebarOpen(false);
                                    }}
                                    className={`
                                        w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium
                                        transition-colors duration-150
                                        ${activeTab === item.id 
                                            ? 'bg-blue-50 text-blue-600' 
                                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                        }
                                        my-2
                                    `}
                                >
                                    <Icon className="h-5 w-5" />
                                    {item.label}
                                </button>
                            );
                        })}
                    </nav>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="lg:pl-64 flex flex-col min-h-screen">
                {/* Mobile Header */}
                <header className="lg:hidden bg-white border-b px-4 py-3 flex items-center justify-between sticky top-0 z-30">
                    <h1 className="text-xl font-bold text-gray-800">Municipal Dashboard</h1>
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 rounded-md hover:bg-gray-100"
                    >
                        {isSidebarOpen ? (
                            <X className="h-6 w-6 text-gray-600" />
                        ) : (
                            <Menu className="h-6 w-6 text-gray-600" />
                        )}
                    </button>
                </header>

                {/* Main Content */}
                <main className="flex-1 overflow-auto">
                    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">
                                {navigationItems.find(item => item.id === activeTab)?.label}
                            </h2>
                        </div>
                        {renderContent()}
                    </div>
                </main>
            </div>

            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </div>
    );
};

export default SubordinateDashboardPage;