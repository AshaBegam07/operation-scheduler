
import { 
  Calendar, 
  Users, 
  UserPlus, 
  BarChart3, 
  Home,
  LogOut,
  Stethoscope,
  ClipboardList
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  userRole: "admin" | "user";
  onLogout: () => void;
}

export const Sidebar = ({ currentView, onViewChange, userRole, onLogout }: SidebarProps) => {
  const adminMenuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "doctors", label: "Doctors", icon: Stethoscope },
    { id: "patients", label: "Patients", icon: Users },
    { id: "scheduler", label: "OT Scheduler", icon: Calendar },
    { id: "reports", label: "Reports", icon: BarChart3 },
  ];

  const userMenuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "doctors", label: "View Doctors", icon: Stethoscope },
    { id: "scheduler", label: "Surgery Schedule", icon: Calendar },
    { id: "reports", label: "My Reports", icon: ClipboardList },
  ];

  const menuItems = userRole === "admin" ? adminMenuItems : userMenuItems;

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 shadow-lg">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Stethoscope className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">OT Manager</h1>
            <p className="text-sm text-gray-500 capitalize">{userRole} Panel</p>
          </div>
        </div>
      </div>

      <nav className="mt-6 px-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => {
                    onViewChange(item.id);
                    console.log(`Navigation: Switched to ${item.label}`);
                  }}
                  className={cn(
                    "w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors duration-200",
                    currentView === item.id
                      ? "bg-blue-50 text-blue-700 border-r-4 border-blue-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <button
          onClick={onLogout}
          className="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};
