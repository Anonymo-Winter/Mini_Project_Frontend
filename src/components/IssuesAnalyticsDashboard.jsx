import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import IssueHeatmap from "./PieChart";
import DashboardTopBar from "./DashboardTopBar";
import AnalyticsDashboard from "./Temp";
import DepartmentIssuesCard from "./DepartmentWiseBars";
import Loader from "./Loader";
import { useFetchAnalytics } from "@/api/query";
import { endOfMonth, startOfMonth } from "date-fns";

const IssueAnalyticsDashboard = () => {
  const [fromDate, setFromDate] = useState(startOfMonth(new Date()));
  const [departmentsData, setDepartmentsData] = useState([]);
  const [toDate, setToDate] = useState(endOfMonth(new Date()));
  let departmentData = [];
  const { data, isLoading, isSuccess, isError } = useFetchAnalytics(
    fromDate,
    toDate
  );
  useEffect(() => {
    if (isSuccess) {
      console.log(data);
      data.Issues?.forEach((issue) => {
        const department = issue.departmentName;
        const existingDepartment = departmentData.find(
          (d) => d.office === department
        );
        if (existingDepartment) {
          existingDepartment.total += 1;
          if (issue.status === "RESOLVED") {
            existingDepartment.resolved += 1;
          } else if (issue.status === "IN-PROGRESS") {
            existingDepartment.in_progress += 1;
          } else if (issue.status === "DISPUTED") {
            existingDepartment.disputed += 1;
          } else if (issue.status === "UNDER_REVIEW") {
            existingDepartment.under_review += 1;
          } else if (issue.status === "FORWARDED") {
            existingDepartment.forwarded += 1;
          }
        } else {
          departmentData.push({
            office: department,
            total: 1,
            resolved: issue.status === "RESOLVED" ? 1 : 0,
            disputed: issue.status === "DISPUTED" ? 1 : 0,
            in_progress: issue.status === "IN_PROGRESS" ? 1 : 0,
            under_review: issue.status === "UNDER_REVIEW" ? 1 : 0,
            forwarded: issue.status === "FORWARDED" ? 1 : 0,
          });
        }
      });
      setDepartmentsData(departmentData);
      //console.log(departmentData);
    }
  }, [isSuccess, data]);

  if (isError) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center"></div>
    );
  }

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884d8",
    "#82ca9d",
  ];

  

  return (
    <div className="w-full space-y-4 py-4">
      <DashboardTopBar setFromDate={setFromDate} setToDate={setToDate} />
      {isLoading ? (
        <div className="min-h-[80vh] flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Issues by Office */}
          <DepartmentIssuesCard
            departmentsData={departmentsData}
            isLoading={isLoading}
            error={false}
          />
          {/* Issue Status Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Issue Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data.byStatus}
                      dataKey="count"
                      nameKey="status"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {data.byStatus.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <IssueHeatmap issues={data.Issues} />
          <AnalyticsDashboard issues={data.Issues} />
        </div>
      )}
    </div>
  );
};

export default IssueAnalyticsDashboard;
