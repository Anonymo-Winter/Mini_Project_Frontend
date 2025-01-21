// IssuesSection.tsx
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const dummyIssues = [
  { id: 1, title: "Server Outage", priority: "High", status: "Open" },
  { id: 2, title: "Database Error", priority: "Medium", status: "Pending" },
  { id: 3, title: "Security Breach", priority: "Critical", status: "In Progress" },
];

export const IssuesSection = () => (
  <div>
    <div className="mb-6">
      <Input
        placeholder="Search issues..."
        className="max-w-md"
        type="search"
        icon={<Search />}
      />
    </div>
    <div className="grid gap-6">
      {dummyIssues.map(issue => (
        <IssueCard key={issue.id} issue={issue} />
      ))}
    </div>
  </div>
);