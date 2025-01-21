import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Activity, CheckCircle2, Clock, ChevronRight } from 'lucide-react';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';

function Progress({ issue }) {
  const getProgressSteps = () => {
    const steps = [
      { label: 'Submitted', icon: CheckCircle2, complete: true },
      { label: 'Under Review', icon: CheckCircle2, complete: ['IN_PROGRESS', 'RESOLVED', 'UNDER_REVIEW', 'FORWARDED'].includes(issue.status) },
      { label: 'Forwarded', icon: CheckCircle2, complete: ['IN_PROGRESS', 'RESOLVED', 'FORWARDED'].includes(issue.status) },
      { label: 'In Progress', icon: CheckCircle2, complete: ['IN_PROGRESS', 'RESOLVED'].includes(issue.status) },
      { label: 'Resolved', icon: CheckCircle2, complete: issue.status === 'RESOLVED' }
    ];
    return steps;
  };

  const getCount = (status) => {
    const statusMap = {
      'RESOLVED': 4,
      'FORWARDED': 2,
      'PENDING': 0,
      'IN_PROGRESS': 3,
      'UNDER_REVIEW': 1
    };
    return statusMap[status] || 0;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <Card className="border-none shadow-xl bg-white/95 backdrop-blur transition-all duration-300 hover:shadow-2xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <Activity className="h-5 w-5 text-blue-600 animate-pulse" />
          Progress Tracking
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 md:p-8">
        {/* Progress Steps */}
        <div className="mb-8 md:mb-12 overflow-x-auto">
          <div className="relative min-w-[600px] md:min-w-0">
            {/* Progress Bar */}
            <div className="absolute top-5 w-full h-1.5 bg-gray-100 rounded-full">
              <div 
                className="absolute h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-700 ease-in-out"
                style={{ width: `${(getCount(issue?.status)/4) * 100}%` }}
              />
            </div>
            
            {/* Steps */}
            <div className="relative flex justify-between">
              {getProgressSteps().map((step, index) => (
                <div key={index} className="flex flex-col items-center group">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 transform",
                    step.complete ? "bg-blue-600 text-white scale-100" : "bg-gray-100 text-gray-400 scale-90",
                    "group-hover:scale-110"
                  )}>
                    <step.icon className="h-5 w-5" />
                  </div>
                  <span className={cn(
                    "mt-2 text-sm font-medium transition-colors duration-300",
                    step.complete ? "text-blue-600" : "text-gray-400"
                  )}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Updates Timeline */}
        <div className="space-y-4 px-2 md:px-3 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent">
          {issue.updates.map((update, index) => (
            <div 
              key={update.id}
              className={cn(
                "relative pl-6 md:pl-8 pb-6",
                index !== issue.updates.length - 1 && "border-l-2 border-blue-200"
              )}
            >
              <div className="absolute left-0 transform -translate-x-1/2 w-4 h-4 rounded-full bg-blue-600 shadow-md shadow-blue-200" />
              <div className="bg-gray-50 rounded-xl p-4 md:p-6 ml-2 md:ml-4 hover:bg-blue-50/50 transition-all duration-300 hover:shadow-md">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{update.description}</p>
                    <div className="flex flex-wrap items-center gap-2 md:gap-3 mt-3 text-sm text-gray-500">
                      <Clock className="h-4 w-4 text-blue-500" />
                      <span>{formatDate(update.createdAt)}</span>
                      <Badge variant="secondary" className="bg-blue-50 text-blue-600 hover:bg-blue-100">
                        {update.type || "Update"}
                      </Badge>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default Progress;