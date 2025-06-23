
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, Stethoscope, Activity } from "lucide-react";

interface DashboardProps {
  userRole: "admin" | "user";
}

export const Dashboard = ({ userRole }: DashboardProps) => {
  const adminStats = [
    { title: "Total Operations Today", value: "12", icon: Activity, color: "bg-blue-500" },
    { title: "Active Doctors", value: "24", icon: Stethoscope, color: "bg-green-500" },
    { title: "Scheduled Patients", value: "45", icon: Users, color: "bg-purple-500" },
    { title: "Available OT Rooms", value: "3/8", icon: Calendar, color: "bg-orange-500" },
  ];

  const userStats = [
    { title: "My Upcoming Surgeries", value: "2", icon: Calendar, color: "bg-blue-500" },
    { title: "Completed Operations", value: "8", icon: Activity, color: "bg-green-500" },
    { title: "My Doctors", value: "3", icon: Stethoscope, color: "bg-purple-500" },
    { title: "Pending Reports", value: "1", icon: Users, color: "bg-orange-500" },
  ];

  const stats = userRole === "admin" ? adminStats : userStats;

  const recentActivity = [
    { time: "10:30 AM", event: "Operation scheduled for Patient #1234", type: "schedule" },
    { time: "09:45 AM", event: "Dr. Smith completed surgery in OT-3", type: "complete" },
    { time: "09:15 AM", event: "Emergency surgery allocated to OT-1", type: "emergency" },
    { time: "08:30 AM", event: "Patient #5678 admitted for pre-op", type: "admission" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {userRole === "admin" ? "Admin Dashboard" : "Patient Portal"}
          </h1>
          <p className="text-gray-600 mt-2">
            Welcome to the Operation Theater Management System
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Last updated</p>
          <p className="text-sm font-medium">{new Date().toLocaleTimeString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from the hospital</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.event}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {userRole === "admin" ? (
                <>
                  <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-left transition-colors">
                    <Calendar className="w-6 h-6 text-blue-600 mb-2" />
                    <p className="text-sm font-medium text-gray-900">Schedule Surgery</p>
                  </button>
                  <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-left transition-colors">
                    <Users className="w-6 h-6 text-green-600 mb-2" />
                    <p className="text-sm font-medium text-gray-900">Add Patient</p>
                  </button>
                  <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-left transition-colors">
                    <Stethoscope className="w-6 h-6 text-purple-600 mb-2" />
                    <p className="text-sm font-medium text-gray-900">Manage Doctors</p>
                  </button>
                  <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg text-left transition-colors">
                    <Activity className="w-6 h-6 text-orange-600 mb-2" />
                    <p className="text-sm font-medium text-gray-900">View Reports</p>
                  </button>
                </>
              ) : (
                <>
                  <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-left transition-colors">
                    <Calendar className="w-6 h-6 text-blue-600 mb-2" />
                    <p className="text-sm font-medium text-gray-900">View Schedule</p>
                  </button>
                  <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-left transition-colors">
                    <Stethoscope className="w-6 h-6 text-green-600 mb-2" />
                    <p className="text-sm font-medium text-gray-900">My Doctors</p>
                  </button>
                  <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-left transition-colors">
                    <Activity className="w-6 h-6 text-purple-600 mb-2" />
                    <p className="text-sm font-medium text-gray-900">Medical History</p>
                  </button>
                  <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg text-left transition-colors">
                    <Users className="w-6 h-6 text-orange-600 mb-2" />
                    <p className="text-sm font-medium text-gray-900">Contact Support</p>
                  </button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
