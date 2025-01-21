import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const chartData = [
  { name: 'Jan', issues: 4 },
  { name: 'Feb', issues: 7 },
  { name: 'Mar', issues: 5 },
  { name: 'Apr', issues: 8 },
];

export const ChartsSection = () => (
  <Card>
    <CardHeader>
      <CardTitle>Issues Overview</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="w-full overflow-x-auto">
        <LineChart width={600} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="issues" stroke="#8884d8" />
        </LineChart>
      </div>
    </CardContent>
  </Card>
);