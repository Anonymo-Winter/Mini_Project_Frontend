import { useEffect, useState } from "react";
import { Mail, Phone, Building2, Users, PenSquare, X, LogOut } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card.jsx";
import axios from "axios";
import { useFetchUser } from "@/api/query";
import Loader from "./Loader";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useToast } from "@/hooks/use-toast";

function AuthorityProfile() {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
    const { data, isLoading, isError } = useFetchUser();
    const { toast } = useToast();
    const [err, setErr] = useState("");

    // State for form fields
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [otp, setOtp] = useState("");

    // Store initial values
    const [initialValues, setInitialValues] = useState({ name: "", email: "", profileImage: "" });

    useEffect(() => {
        if (data) {
            setName(data.name);
            setEmail(data.email);
            setProfileImage(data.profileImage);
            setInitialValues({ name: data.name, email: data.email, profileImage: data.profileImage });
        }
    }, [data]);

    const hasChanges =
        name !== initialValues.name || email !== initialValues.email || profileImage !== initialValues.profileImage;

    const handleUpdate = async () => {
        try {
            const id = data.id;

            // If email is being changed, request OTP
            if (email !== initialValues.email) {
                await axios.post(
                    "http://localhost:3000/auth/update-authority",
                    { name, email, profileImage, id },
                    { withCredentials: true }
                );
                setIsEditModalOpen(false);
                setIsOtpModalOpen(true); // Open OTP verification modal
                return;
            }

            // If email is not being changed, update profile directly
            await axios.post(
                "http://localhost:3000/auth/update-authority",
                { name, email, profileImage, id },
                { withCredentials: true }
            );
            toast({
                title: "Success",
                description: "Profile updated successfully",
                variant: "success",
            });
            setIsEditModalOpen(false);
        } catch (error) {
            console.log(error);
            toast({
                title: "Error",
                description: "Failed to update profile",
                variant: "destructive",
            });
        }
    };

    const handleOtpVerification = async () => {
        try {
            const id = data.id;
            const response = await axios.post(
                "http://localhost:3000/auth/verify-otp-email-update",
                { name, email, profileImage, id, otp },
                { withCredentials: true }
            );

            if (response.data.success) {
                toast({
                    title: "Success",
                    description: "Profile updated successfully",
                    variant: "success",
                });
                setIsOtpModalOpen(false);
                setIsEditModalOpen(false);
            } else {
                toast({
                    title: "Error",
                    description: response.data.error || "Failed to verify OTP",
                    variant: "destructive",
                });
            }
        } catch (error) {
            console.log(error);
            toast({
                title: "Error",
                description: error.response.data.error,
                variant: "destructive",
            });
        }
    };

    const handleCancel = () => {
        setIsEditModalOpen(false);
        setName(initialValues.name);
        setEmail(initialValues.email);
        setProfileImage(initialValues.profileImage);
    };

    if (isLoading)
        return (
            <div className="min-h-[80vh] flex items-center justify-center">
                <Loader />
            </div>
        );
    if (isError) return <div>Error fetching data</div>;

    return (
        <div className="">
            {/* Profile Banner */}
            <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative px-8 py-12">
                    <div className="absolute top-4 right-4">
                        <button
                            onClick={() => {
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
                            {!data.profileImage ? (
                                <Avatar className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-xl">
                                    <AvatarImage src="https://via.placeholder.com/150" alt="User Avatar" />
                                    <AvatarFallback className="text-5xl">{data.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                            ) : (
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
                            )}
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

            {/* Contact and Detail Information */}
            <div className="grid md:grid-cols-1 gap-6 mt-6">
                <Card className="h-full">
                    <CardContent className="p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h3>
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-blue-100 rounded-xl">
                                        <Mail className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Email Address</p>
                                        <p className="font-medium text-gray-900">{data.email}</p>
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
                                        <p className="font-medium text-gray-900">{data.departmentName}</p>
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
                                        <p className="font-medium text-gray-900">{data.office.name}</p>
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
                                        <p className="font-medium text-gray-900">{data.role}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
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
                                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image</label>
                                <input
                                    type="url"
                                    value={profileImage}
                                    onChange={(e) => setProfileImage(e.target.value)}
                                    className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 mt-8">
                            <button
                                onClick={handleCancel}
                                className="px-6 py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdate}
                                disabled={!hasChanges}
                                className={`px-6 py-2.5 text-white rounded-lg transition-colors ${
                                    hasChanges ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
                                }`}
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* OTP Verification Modal */}
            {isOtpModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-xl w-full max-w-md p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-semibold text-gray-900">Verify OTP</h3>
                            <button
                                onClick={() => setIsOtpModalOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Enter OTP</label>
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 mt-8">
                            <button
                                onClick={() => setIsOtpModalOpen(false)}
                                className="px-6 py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleOtpVerification}
                                className="px-6 py-2.5 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                            >
                                Verify OTP
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AuthorityProfile;
