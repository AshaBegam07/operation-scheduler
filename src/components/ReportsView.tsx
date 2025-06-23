
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { FileText, Download, Eye, Calendar, TrendingUp, Activity } from "lucide-react";
import { toast } from "sonner";

interface Report {
  id: string;
  title: string;
  type: "surgery" | "patient" | "doctor" | "operational";
  date: string;
  status: "draft" | "completed" | "reviewed";
  description: string;
}

interface ReportsViewProps {
  userRole: "admin" | "user";
}

export const ReportsView = ({ userRole }: ReportsViewProps) => {
  const [reports] = useState<Report[]>([
    {
      id: "1",
      title: "Monthly Surgery Report - January 2024",
      type: "surgery",
      date: "2024-01-31",
      status: "completed",
      description: "Comprehensive analysis of all surgical procedures performed in January"
    },
    {
      id: "2",
      title: "Patient Satisfaction Survey Q4 2023",
      type: "patient",
      date: "2024-01-15",
      status: "reviewed",
      description: "Patient feedback and satisfaction metrics for the fourth quarter"
    },
    {
      id: "3",
      title: "OT Utilization Report",
      type: "operational",
      date: "2024-01-20",
      status: "completed",
      description: "Operating theater usage statistics and efficiency metrics"
    },
    {
      id: "4",
      title: "Dr. Johnson Performance Review",
      type: "doctor",
      date: "2024-01-10",
      status: "draft",
      description: "Quarterly performance evaluation and surgical outcomes"
    }
  ]);

  // Sample data for charts
  const surgeryData = [
    { month: 'Jan', surgeries: 45, successful: 43, complications: 2 },
    { month: 'Feb', surgeries: 52, successful: 50, complications: 2 },
    { month: 'Mar', surgeries: 48, successful: 46, complications: 2 },
    { month: 'Apr', surgeries: 58, successful: 55, complications: 3 },
    { month: 'May', surgeries: 62, successful: 60, complications: 2 },
    { month: 'Jun', surgeries: 55, successful: 53, complications: 2 }
  ];

  const otUtilizationData = [
    { name: 'OT-1', value: 85, color: '#3b82f6' },
    { name: 'OT-2', value: 92, color: '#10b981' },
    { name: 'OT-3', value: 78, color: '#f59e0b' },
    { name: 'OT-4', value: 88, color: '#ef4444' },
    { name: 'OT-5', value: 73, color: '#8b5cf6' }
  ];

  const handleDownloadReport = (reportId: string, title: string) => {
    toast.success(`Downloading ${title}...`);
    console.log("Download report:", reportId);
  };

  const handleViewReport = (reportId: string, title: string) => {
    toast.success(`Opening ${title}...`);
    console.log("View report:", reportId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "reviewed":
        return "bg-blue-100 text-blue-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "surgery":
        return "bg-red-100 text-red-800";
      case "patient":
        return "bg-blue-100 text-blue-800";
      case "doctor":
        return "bg-green-100 text-green-800";
      case "operational":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {userRole === "admin" ? "Reports & Analytics" : "My Reports"}
          </h1>
          <p className="text-gray-600 mt-2">
            {userRole === "admin" 
              ? "Comprehensive hospital analytics and reporting" 
              : "View your medical reports and surgery history"
            }
          </p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          {userRole === "admin" && <TabsTrigger value="analytics">Analytics</TabsTrigger>}
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{reports.length}</div>
                <p className="text-xs text-muted-foreground">Available reports</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">This Month</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">New reports generated</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1</div>
                <p className="text-xs text-muted-foreground">Reports need attention</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest report updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Monthly Surgery Report completed</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Patient Survey results reviewed</p>
                      <p className="text-xs text-gray-500">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">OT Utilization draft created</p>
                      <p className="text-xs text-gray-500">3 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Surgery Success Rate</span>
                    <span className="font-bold text-green-600">96.5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Average OT Utilization</span>
                    <span className="font-bold text-blue-600">83.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Patient Satisfaction</span>
                    <span className="font-bold text-purple-600">4.8/5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Average Surgery Time</span>
                    <span className="font-bold text-orange-600">142 min</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {reports.map((report) => (
              <Card key={report.id} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-8 h-8 text-blue-600" />
                      <div>
                        <CardTitle className="text-lg">{report.title}</CardTitle>
                        <CardDescription>{report.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getTypeColor(report.type)}>
                        {report.type}
                      </Badge>
                      <Badge className={getStatusColor(report.status)}>
                        {report.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>Generated: {new Date(report.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewReport(report.id, report.title)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownloadReport(report.id, report.title)}
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {userRole === "admin" && (
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Surgery Trends</CardTitle>
                  <CardDescription>Monthly surgery statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={surgeryData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="successful" fill="#10b981" name="Successful" />
                      <Bar dataKey="complications" fill="#ef4444" name="Complications" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>OT Utilization</CardTitle>
                  <CardDescription>Operating theater usage percentage</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={otUtilizationData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {otUtilizationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Key hospital performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <TrendingUp className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-lg">Surgery Success</h3>
                    <p className="text-2xl font-bold text-green-600">96.5%</p>
                    <p className="text-sm text-gray-600">+2.1% from last month</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Activity className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-lg">OT Efficiency</h3>
                    <p className="text-2xl font-bold text-blue-600">83.2%</p>
                    <p className="text-sm text-gray-600">+5.3% from last month</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <FileText className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-lg">Patient Satisfaction</h3>
                    <p className="text-2xl font-bold text-purple-600">4.8/5</p>
                    <p className="text-sm text-gray-600">+0.2 from last month</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Calendar className="w-8 h-8 text-orange-600" />
                    </div>
                    <h3 className="font-semibold text-lg">Avg. Surgery Time</h3>
                    <p className="text-2xl font-bold text-orange-600">142 min</p>
                    <p className="text-sm text-gray-600">-8 min from last month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};
