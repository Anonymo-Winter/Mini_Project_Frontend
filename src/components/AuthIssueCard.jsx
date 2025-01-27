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
  Mic,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
import AudioPlayerButton from "./AudioControlButton";
import DownloadReportButton from "./DownloadReport";
import { departments, departmentAuthorities } from "@/lib/department";

const StatusBadge = ({ status }) => {
  const statusStyles = {
    Pending: "bg-amber-100 text-amber-800 border border-amber-200",
    "In Progress": "bg-blue-100 text-blue-800 border border-blue-200",
    Completed: "bg-emerald-100 text-emerald-800 border border-emerald-200",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}>
      {status}
    </span>
  );
};

const InfoItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
    <Icon className="h-4 w-4 text-gray-500" />
    <span className="text-sm text-gray-600">
      {label}:{" "}
      <span className="font-medium text-gray-900">{value}</span>
    </span>
  </div>
);

function AuthIssueCard({ issue, removeIssueFromCache }) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();
  const { mutate, isPending, isSuccess, reset, isError } = useForwardIssue();
  const { toast } = useToast();

  useEffect(() => {
    if (isSuccess) {
      removeIssueFromCache(issue.id);
      setSelectedDepartment(null);
      setSelectedRole(null);
      reset();
      toast({
        title: "Success!",
        description: "Issue forwarded to the selected department.",
        className: "bg-green-700 text-white",
      });
    }

    if (isError) {
      setIsConfirmOpen(false);
      toast({
        title: "Error",
        description: "Failed to forward issue. Please try again.",
        className: "bg-red-700 text-white",
      });
    }
  }, [isSuccess, isError, issue.id, removeIssueFromCache, reset, toast]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <>
      <Card className="w-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
        <CardHeader className="p-6 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">
                {issue.title}
              </h2>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="h-4 w-4" />
                <p className="text-sm">
                  Submitted by{" "}
                  <span className="font-medium text-blue-600">Amansai</span>
                  {" • "}
                  <span className="font-medium">{formatDate(issue.createdAt)}</span>
                </p>
              </div>
            </div>
            <StatusBadge status={issue.status} />
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white rounded-xl">
                <p className="text-gray-700 leading-relaxed mb-6 text-base">
                  {issue.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <InfoItem
                    icon={Building2}
                    label="Department"
                    value={issue.departmentName || "Not Assigned"}
                  />
                  <InfoItem
                    icon={MapPin}
                    label="Location"
                    value={issue.address}
                  />
                  <InfoItem
                    icon={ArrowBigUp}
                    label="UpVotes"
                    value={issue.upVotes.length}
                  />
                  <InfoItem
                    icon={Mic}
                    label="Audio"
                    value={issue.audio ? "Available" : "Not Available"}
                  />
                </div>
              </div>
            </div>

            <div className="relative h-72 rounded-2xl overflow-hidden shadow-md group">
              <img
                src={issue.image || "https://via.placeholder.com/400x300?text=No+Image"}
                alt={issue.title || "Issue Image"}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>

          <div className="flex flex-wrap justify-end items-center gap-3 mt-8 pt-6 border-t border-gray-100">
            <DownloadReportButton issueId={issue.id} />
            
            <Button
              variant="outline"
              className="gap-2 hover:bg-gray-50"
              onClick={() => navigate(`/issue/${issue.id}`)}
            >
              <Eye className="h-4 w-4" />
              View Details
            </Button>

            {issue.audio && <AudioPlayerButton audioURL={issue.audio} />}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                  <Forward className="h-4 w-4" />
                  Forward Issue
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {Object.entries(departments).map(([deptName, deptKey]) => (
                  <DropdownMenuSub key={deptKey}>
                    <DropdownMenuSubTrigger className="gap-2">
                      <Building2 className="h-4 w-4" />
                      {deptName}
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        {departmentAuthorities[deptKey].map((role) => (
                          <DropdownMenuItem
                            key={role.value}
                            className="gap-2 cursor-pointer hover:bg-gray-100"
                            onClick={() => {
                              setSelectedDepartment({ name: deptName, key: deptKey });
                              setSelectedRole(role);
                              setIsConfirmOpen(true);
                            }}
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

      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-semibold">
              Confirm Forward
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              Are you sure you want to forward this issue to{" "}
              <span className="font-medium text-gray-900">
                {selectedRole?.label}
              </span>{" "}
              in{" "}
              <span className="font-medium text-gray-900">
                {selectedDepartment?.name}
              </span>{" "}
              department?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel className="mt-0">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                mutate({
                  issueId: issue.id,
                  department: selectedDepartment?.key,
                  role: selectedRole?.value,
                });
              }}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Forwarding...
                </>
              ) : (
                "Confirm Forward"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default AuthIssueCard;