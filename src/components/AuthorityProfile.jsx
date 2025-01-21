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
    HardHat,
    Mail,
    Phone,
    Building2,
    PenSquare,
    LogOut,
   
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { useRecoilValue } from "recoil";
import { userAtom } from "@/store/user";
import { useFetchUser } from "@/api/query";
import Loader from "./Loader";


function AuthorityProfile() {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const user = useRecoilValue(userAtom)

// Sample authority data - in a real app this would come from an API

const {data,isLoading,isError} = useFetchUser()

const authorityData = {
    name: user ? user.name : "John Doe",
    email: user ? user.email : "john.doe@example.com",
    position: user ? user.type : "District Administrator",
    role: "District Administrator",
    officeName: "City Center Municipal Office",
    profileImage: "/authority-profile.jpg",
    stats: {
        resolvedIssues: 124,
        pendingIssues: 22,
        totalIssuesInArea: 156,
        resolutionRate: "89%",
    },
};
if(isLoading) return <div className="min-h-[80vh] flex items-center justify-center">
           
<Loader />

</div>
if(isError) return <div>Error fetching data</div>
console.log(data)
  return (
    <div className="">
                        {/* Profile Banner */}
                        <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg overflow-hidden">
                            <div className="absolute inset-0 bg-black/20"></div>
                            <div className="relative px-8 py-12">
                                <div className="absolute top-4 right-4">
                                    <button
                                        onClick={() => {
                                            // Add logout logic here
                                            alert("Logged out successfully!");
                                        }}
                                        className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center gap-2"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        Logout
                                    </button>
                                </div>
                                <div className="flex flex-col md:flex-row items-center gap-8">
                                    <div className="relative">
                                        <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-xl">
                                            <img
                                                src={data.profileImage}
                                                alt="Authority Profile"
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.src = "https://via.placeholder.com/400x400?text=Profile";
                                                }}
                                            />
                                        </div>
                                        
                                    </div>
                                    <div className="text-center md:text-left">
                                        <h2 className="text-3xl font-bold text-white mb-2">{data.name}</h2>
                                        <p className="text-blue-100 text-lg mb-4">{data.role}</p>
                                        <button
                                            onClick={() => setIsEditModalOpen(true)}
                                            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
                                        >
                                            <PenSquare className="h-4 w-4" />
                                            Edit Profile
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            {/* Contact Information */}
                            <div className="md:col-span-2">
                                <Card className="h-full">
                                    <CardContent className="p-6">
                                        <h3 className="text-xl font-semibold text-gray-900 mb-6">
                                            Contact Information
                                        </h3>
                                        <div className="grid sm:grid-cols-2 gap-6">
                                            <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                                                <div className="flex items-center gap-4">
                                                    <div className="p-3 bg-blue-100 rounded-xl">
                                                        <Mail className="h-6 w-6 text-blue-600" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-500">Email Address</p>
                                                        <p className="font-medium text-gray-900">
                                                            {data.email}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                                                <div className="flex items-center gap-4">
                                                    <div className="p-3 bg-blue-100 rounded-xl">
                                                        <Phone className="h-6 w-6 text-blue-600" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-500">Department</p>
                                                        <p className="font-medium text-gray-900">
                                                            {data.departmentName}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                                                <div className="flex items-center gap-4">
                                                    <div className="p-3 bg-blue-100 rounded-xl">
                                                        <Building2 className="h-6 w-6 text-blue-600" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-500">Office Location</p>
                                                        <p className="font-medium text-gray-900">
                                                            {data.office.name}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                                                <div className="flex items-center gap-4">
                                                    <div className="p-3 bg-blue-100 rounded-xl">
                                                        <Users className="h-6 w-6 text-blue-600" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-500">Department Role</p>
                                                        <p className="font-medium text-gray-900">
                                                            {data.role}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Quick Stats */}
                            <div>
                                <Card className="h-full">
                                    <CardContent className="p-6">
                                        <h3 className="text-xl font-semibold text-gray-900 mb-6">
                                            Performance Overview
                                        </h3>
                                        <div className="space-y-4">
                                            <div className="bg-green-50 rounded-xl p-4 border border-green-400">
                                                <div className="flex items-center justify-between mb-2 ">
                                                    <p className="text-sm font-medium text-green-600">
                                                        Resolved Issues
                                                    </p>
                                                    <span className="p-2 bg-green-100 rounded-full">
                                                        <CheckCircle className="h-5 w-5 text-green-600" />
                                                    </span>
                                                </div>
                                                <div className="flex items-end gap-2">
                                                    <p className="text-3xl font-bold text-green-700">
                                                        {authorityData.stats.resolvedIssues}
                                                    </p>
                                                    <p className="text-sm text-green-600 mb-1">issues</p>
                                                </div>
                                            </div>

                                            <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-500">
                                                <div className="flex items-center justify-between mb-2">
                                                    <p className="text-sm font-medium text-yellow-600">
                                                        Pending Issues
                                                    </p>
                                                    <span className="p-2 bg-yellow-100 rounded-full">
                                                        <AlertTriangle className="h-5 w-5 text-yellow-600" />
                                                    </span>
                                                </div>
                                                <div className="flex items-end gap-2">
                                                    <p className="text-3xl font-bold text-yellow-700">
                                                        {authorityData.stats.pendingIssues}
                                                    </p>
                                                    <p className="text-sm text-yellow-600 mb-1">issues</p>
                                                </div>
                                            </div>

                                            <div className="bg-blue-50 rounded-xl p-4 border border-blue-400">
                                                <div className="flex items-center justify-between mb-2">
                                                    <p className="text-sm font-medium text-blue-600">Success Rate</p>
                                                    <span className="p-2 bg-blue-100 rounded-full">
                                                        <BarChart2 className="h-5 w-5 text-blue-600" />
                                                    </span>
                                                </div>
                                                <div className="flex items-end gap-2">
                                                    <p className="text-3xl font-bold text-blue-700">
                                                        {authorityData.stats.resolutionRate}
                                                    </p>
                                                    <p className="text-sm text-blue-600 mb-1">completion</p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        {/* Edit Profile Modal */}
                        {isEditModalOpen && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                                <div className="bg-white rounded-xl w-full max-w-md p-6">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-xl font-semibold text-gray-900">Edit Profile</h3>
                                        <button
                                            onClick={() => setIsEditModalOpen(false)}
                                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                        >
                                            <X className="h-5 w-5" />
                                        </button>
                                    </div>
                                    <div className="space-y-5">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                defaultValue={data.name}
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="Enter your full name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                defaultValue={data.email}
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="Enter your email"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                defaultValue={authorityData.phone}
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="Enter your phone number"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Profile Image
                                            </label>
                                            <div className="flex gap-4 items-center">
                                                <img
                                                    src={authorityData.profileImage}
                                                    alt="Profile Preview"
                                                    className="w-16 h-16 rounded-full object-cover"
                                                />
                                                <input
                                                    type="url"
                                                    defaultValue={authorityData.profileImage}
                                                    className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    placeholder="Enter image URL"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-3 mt-8">
                                        <button
                                            onClick={() => setIsEditModalOpen(false)}
                                            className="px-6 py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={() => {
                                                setIsEditModalOpen(false);
                                                alert("Profile updated successfully!");
                                            }}
                                            className="px-6 py-2.5 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

  )
}

export default AuthorityProfile