import React, { useEffect, useState } from "react";
import {
  Forward,
  Clock,
  MapPin,
  Building2,
  ChevronDown,
  Eye,
  Loader2,
  ArrowBigUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useForwardIssue } from "@/api/query";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const departments = {
  Engineering: "engineering",
  Welfare: "welfare",
  Health: "health",
  Education: "education",
  Agriculture: "agriculture",
  Revenue: "revenue",
  Urban: "urban",
  Administration: "administration",
};

const departmentAuthorities = {
  administration: [
    { value: "Representative authority", label: "Representative authority" },
    { value: "secretary", label: "Secretary" },
    { value: "receptionist", label: "Receptionist" },
    { value: "clerk", label: "Clerk" },
  ],
  welfare: [
    { value: "welfare-secretary", label: "Welfare Secretary" },
    { value: "welfare-officer", label: "Welfare Officer" },
    { value: "welfare-inspector", label: "Welfare Inspector" },
    { value: "social-worker", label: "Social Worker" },
  ],
  engineering: [
    { value: "chief-engineer", label: "Chief Engineer" },
    { value: "executive-engineer", label: "Executive Engineer" },
    { value: "assistant-engineer", label: "Assistant Engineer" },
    { value: "technical-officer", label: "Technical Officer" },
  ],
  health: [
    { value: "medical-officer", label: "Medical Officer" },
    { value: "health-supervisor", label: "Health Supervisor" },
    { value: "health-inspector", label: "Health Inspector" },
    { value: "medical-superintendent", label: "Medical Superintendent" },
  ],
  education: [
    { value: "education-officer", label: "Education Officer" },
    { value: "school-inspector", label: "School Inspector" },
    { value: "education-coordinator", label: "Education Coordinator" },
    { value: "academic-supervisor", label: "Academic Supervisor" },
  ],
  agriculture: [
    { value: "agriculture-officer", label: "Agriculture Officer" },
    { value: "field-supervisor", label: "Field Supervisor" },
    { value: "extension-officer", label: "Extension Officer" },
    { value: "agriculture-inspector", label: "Agriculture Inspector" },
  ],
  revenue: [
    { value: "revenue-officer", label: "Revenue Officer" },
    { value: "tax-inspector", label: "Tax Inspector" },
    { value: "revenue-inspector", label: "Revenue Inspector" },
    { value: "assessment-officer", label: "Assessment Officer" },
  ],
  urban: [
    { value: "urban-planner", label: "Urban Planner" },
    { value: "development-officer", label: "Development Officer" },
    { value: "planning-supervisor", label: "Planning Supervisor" },
    { value: "zonal-officer", label: "Zonal Officer" },
  ],
};

function AuthIssueCard({ issue, removeIssueFromCache }) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate()
  const { mutate, isPending, isSuccess, reset ,isError} = useForwardIssue();
  const { toast } = useToast();
  useEffect(() => {
    if (isSuccess) {
      console.log("Issue forwarded successfully!");
      removeIssueFromCache(issue.id);
      //setIsConfirmOpen(false);
      setSelectedDepartment(null);
      setSelectedRole(null);
      reset(); // Reset mutation state
      toast({
        title: "Issue forwarded successfully!",
        description: "The issue has been forwarded to the selected department.",
        variant: "default",
      });
    }

    if(isError){
        
        setIsConfirmOpen(false)
        toast({
            title : "Failure",
            description : "Issue Forwardation failed",
            className : "bg-red-700 text-white"
        })
    }
  }, [isSuccess, issue.id, removeIssueFromCache, reset,isError]);

  const handleRoleSelect = (deptName, deptKey, role) => {
    setSelectedDepartment({ name: deptName, key: deptKey });
    setSelectedRole(role);
    setIsConfirmOpen(true);
  };
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const handleConfirmForward = () => {
    if (!selectedDepartment || !selectedRole) return;

    mutate({
      issueId: issue.id,
      department: selectedDepartment.key,
      role: selectedRole.value,
    });
  };

  // if(isSuccess){
  //     console.log("Issue forwarded successfully");
  //     removeIssueFromCache(issue.id);
  //     setIsConfirmOpen(false);
  // }

  return (
    <>
      <Card className="w-full bg-white shadow-sm hover:shadow-md transition-shadow duration-300 rounded-xl overflow-hidden">
        <CardHeader className="pb-4 bg-gradient-to-r from-blue-50 to-blue-100">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div className="flex-1">
              <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                {issue.title}
              </CardTitle>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="h-4 w-4" />
                <p className="text-sm">
                  Submitted by <span className="font-medium">Amansai</span> on{" "}
                  <span className="font-medium">
                    {formatDate(issue.createdAt)}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 md:ml-4">
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap ${
                  issue.status === "Pending"
                    ? "bg-amber-100 text-amber-800"
                    : issue.status === "In Progress"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-emerald-100 text-emerald-800"
                }`}
              >
                {issue.status}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-xl">
                <p className="text-gray-700 leading-relaxed mb-6">
                  {issue.description}
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Building2 className="h-5 w-5 text-blue-500" />
                    <span className="text-sm text-gray-700">
                      Department:{" "}
                      <span className="font-semibold">
                        {issue.departmentName || "Not Assigned"}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-blue-500" />
                    <span className="text-sm text-gray-700">
                      Location:{" "}
                      <span className="font-semibold">{issue.address}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ArrowBigUp className="h-5 w-5 text-blue-500" />
                    <span className="text-sm text-gray-700">
                      UpVotes:{" "}
                      <span className="font-semibold">{issue.upVotes.length}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden shadow-sm">
              <img
                src={
                  issue.image ||
                  "https://via.placeholder.com/400x300?text=No+Image"
                }
                alt={issue.title || "No Image Available"}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/400x300?text=No+Image";
                }}
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-100">
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => navigate(`/issue/${issue.id}`)}
            >
              <Eye className="h-4 w-4" />
              Details
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="gap-2">
                  <Forward className="h-4 w-4" />
                  Forward
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {Object.entries(departments).map(([deptName, deptKey]) => (
                  <DropdownMenuSub key={deptKey}>
                    <DropdownMenuSubTrigger className="gap-2 cursor-pointer">
                      <Building2 className="h-4 w-4" />
                      {deptName}
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        {departmentAuthorities[deptKey].map((role) => (
                          <DropdownMenuItem
                            key={role.value}
                            className="gap-2 cursor-pointer"
                            onClick={() =>
                              handleRoleSelect(deptName, deptKey, role)
                            }
                          >
                            {role.label}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <AlertDialog open={isConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Forward</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to forward this issue to{" "}
              {selectedRole?.label} in {selectedDepartment?.name} department?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmForward}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Forwarding...
                </>
              ) : (
                "Forward"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default AuthIssueCard;
