import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { 
  Building2, 
  User, 
  MapPin, 
  Calendar, 
  AlertCircle, 
  CheckCircle,
  Clock,
  Users,
  User2,
  Phone
} from 'lucide-react';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';

function Details({ issue }) {
  const formatDate = (date) => {
    if (!date) return null;
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(new Date(date));
  };

  const getStatusColor = (status) => {
    const colors = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      IN_PROGRESS: 'bg-blue-100 text-blue-800',
      RESOLVED: 'bg-green-100 text-green-800',
      UNDER_REVIEW: 'bg-purple-100 text-purple-800',
      FORWARDED: 'bg-orange-100 text-orange-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card className="border-none shadow-xl bg-white/95 backdrop-blur sticky top-6 transition-all duration-300 hover:shadow-2xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold flex items-center justify-between">
          <span>Issue Details</span>
          <Badge className={cn("px-3 py-1", getStatusColor(issue.status))}>
            {issue.status.replace('_', ' ')}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 md:p-6">
        <div className="space-y-6">
          {/* Department Section */}
          <div className="flex items-start gap-3 group">
            <Building2 className="h-5 w-5 text-blue-500 mt-1 group-hover:scale-110 transition-transform duration-300" />
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-500">Department</label>
              <p className="text-lg font-semibold text-gray-900">
                {issue.departmentName || "Under Review"}
              </p>
              
            </div>
          </div>

          {/* Assignment Section */}
          <div className="flex items-start gap-3 group">
            <User className="h-5 w-5 text-blue-500 mt-1 group-hover:scale-110 transition-transform duration-300" />
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-500">Assigned To</label>
              <p className="text-lg font-semibold text-gray-900">
                {issue.assignedTo?.name || "Not yet forwarded"}
              </p>
              {issue.assignedTo && (
                <>
                  <p className="text-sm text-gray-500">{issue.assignedTo.role}</p>
                  <p className="text-sm text-gray-500">
                    <Clock className="h-4 w-4 inline mr-1" />
                    Assigned: {formatDate(issue.assignedToDate)}
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Office Section */}
          <div className="flex items-start gap-3 group">
            <Building2 className="h-5 w-5 text-blue-500 mt-1 group-hover:scale-110 transition-transform duration-300" />
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-500">Office</label>
              <p className="text-lg font-semibold text-gray-900">
                {issue.office?.name}
              </p>
            </div>
          </div>

          {/* Location Section */}
          <div className="flex items-start gap-3 group">
            <MapPin className="h-5 w-5 text-blue-500 mt-1 group-hover:scale-110 transition-transform duration-300" />
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-500">Location</label>
              <p className="text-lg font-semibold text-gray-900">{issue.location}</p>
              <p className="text-sm text-gray-500">{issue.address}</p>
            </div>
          </div>
          {!issue.isAnonymous && <div className="flex items-start gap-3 group">
            <User2 className="h-5 w-5 text-blue-500 mt-1 group-hover:scale-110 transition-transform duration-300" />
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-500">Raised By</label>
              <p className="text-lg font-semibold text-gray-900">{issue.user.name}</p>
              <p className="text-sm text-gray-500 flex items-center gap-1"><Phone size={13} /> {issue.user.phone}</p>
            </div>
          </div>}

          {/* Additional Info */}
          <div className="pt-4 border-t border-gray-100">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-500" />
                <span className="text-sm text-gray-600">
                  Created: {formatDate(issue.createdAt)}
                </span>
              </div>
              
              {issue.isAnonymous && (
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-gray-600">Anonymous Report</span>
                </div>
              )}

              {issue.dispute && (
                <div className="col-span-2 flex items-start gap-2 bg-red-50 p-2 rounded-md">
                  <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
                  <span className="text-sm text-red-600">{issue.disputeMessage}</span>
                </div>
              )}

              {issue.ResolutionConfirmation && (
                <div className="col-span-2 flex items-center gap-2 bg-green-50 p-2 rounded-md">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-600">Resolution Confirmed</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default Details;