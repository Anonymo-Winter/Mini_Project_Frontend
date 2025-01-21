import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ThumbsUp,
  MapPin,
  Calendar,
  Share2,
  ArrowLeft,
  AlertTriangle,
  Loader2,
  MessageSquare,
  Clock,
  Building2,
  User2,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ChevronUp,
  ChevronDown,
  Maximize2,
} from "lucide-react";
import MapWithMarkers from "./Map";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useFetchIssue } from "@/api/query";
import { cn } from "@/lib/utils";
import Progress from "@/components/Progress";
import Details from "@/components/Details";
import UpVoteButton from "@/components/UpVoteButton";


const MapCard = ({ issue, isExpanded, onToggle }) => (
  <Card className={cn(
    "shadow-xl transition-all duration-300",
    isExpanded ? "h-[70vh]" : "h-[400px]"
  )}>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
      <CardTitle className="flex items-center gap-2 text-lg">
        <MapPin className="h-5 w-5 text-blue-600" />
        Location Details
      </CardTitle>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="h-8 w-8 p-0"
        >
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${issue.latitude},${issue.longitude}`, '_blank')}
          className="h-8 w-8 p-0"
        >
          <Maximize2 className="h-4 w-4" />
        </Button>
      </div>
    </CardHeader>
    <CardContent className="p-0 relative h-[calc(100%-57px)]">
      <div className="absolute inset-0">
        <MapWithMarkers
          markers={[{
            title: issue.title,
            latitude: issue.latitude,
            longitude: issue.longitude,
            description: issue.address,
            imageUrl: issue.image,
          }]}
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm p-4 border-t z-[999]">
        <div className="flex items-start gap-3">
          <MapPin className="h-5 w-5 text-blue-600 mt-1" />
          <div>
            <p className="font-medium text-gray-900">{issue.address}</p>
            <p className="text-sm text-gray-500">
              {issue.latitude}, {issue.longitude}
            </p>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);
const IssueDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isVoted, setIsVoted] = useState(false);
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [showDetails, setShowDetails] = useState(true);
  const { data: issue, isLoading, isError } = useFetchIssue(id);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setShowDetails(scrollPosition < 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto" />
          <p className="text-gray-600 font-medium">Loading issue details...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <Card className="w-96 shadow-xl">
          <CardContent className="p-8 text-center space-y-4">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto" />
            <h3 className="text-xl font-semibold">Error Loading Issue</h3>
            <p className="text-gray-600">Please try again later.</p>
            <Button onClick={() => navigate(-1)} className="w-full">Return</Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  

  const getStatusConfig = (status) => {
    const configs = {
      PENDING: { color: "bg-yellow-100 text-yellow-800", icon: Clock },
      IN_PROGRESS: { color: "bg-blue-100 text-blue-800", icon: Loader2 },
      RESOLVED: { color: "bg-green-100 text-green-800", icon: CheckCircle2 },
      REJECTED: { color: "bg-red-100 text-red-800", icon: XCircle },
    };
    return configs[status] || configs.PENDING;
  };

  const statusConfig = getStatusConfig(issue.status);


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate(-1)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Badge className={cn("px-4 py-2", statusConfig.color)}>
              <statusConfig.icon className="h-4 w-4 mr-2" />
              {issue.status}
            </Badge>
           
          </div>
          <div className="flex gap-3">
            <UpVoteButton issueId={issue.id} upVotes={issue.upVotes} count={issue.upVotes.length} />
            
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-xl">
              <CardContent className="p-8 space-y-6">
                <div className="space-y-4">
                  <h1 className="text-3xl font-bold text-gray-900">{issue.title}</h1>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <Building2 className="mr-2 h-4 w-4" />
                      {issue.departmentName || "Unassigned Department"}
                    </span>
                    <span className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4" />
                      {issue.address}
                    </span>
                  </div>
                </div>
                
                <Separator />
                
                <div className="aspect-video rounded-xl overflow-hidden">
                  <img
                    src={issue.image || "/api/placeholder/1200/600"}
                    alt={issue.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="prose max-w-none">
                  <h2 className="text-xl font-semibold mb-4">Description</h2>
                  <p className="text-gray-700 leading-relaxed">{issue.description}</p>
                </div>
              </CardContent>
            </Card>

            {/* Updates Timeline */}
            
                <Progress issue={issue} />
             
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Issue Details */}
            <MapCard 
              issue={issue}
              isExpanded={isMapExpanded}
              onToggle={() => setIsMapExpanded(!isMapExpanded)}
            />

            <Details issue={issue} />

    
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetail;