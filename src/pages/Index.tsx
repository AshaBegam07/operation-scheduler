
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Dashboard } from "@/components/Dashboard";
import { DoctorManagement } from "@/components/DoctorManagement";
import { PatientManagement } from "@/components/PatientManagement";
import { OperationScheduler } from "@/components/OperationScheduler";
import { LoginForm } from "@/components/LoginForm";
import { ReportsView } from "@/components/ReportsView";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState("dashboard");
  const [userRole, setUserRole] = useState<"admin" | "user">("admin");

  const handleLogin = (role: "admin" | "user") => {
    setIsAuthenticated(true);
    setUserRole(role);
    console.log(`User logged in with role: ${role}`);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView("dashboard");
    console.log("User logged out");
  };

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (currentView) {
      case "doctors":
        return <DoctorManagement userRole={userRole} />;
      case "patients":
        return <PatientManagement userRole={userRole} />;
      case "scheduler":
        return <OperationScheduler userRole={userRole} />;
      case "reports":
        return <ReportsView userRole={userRole} />;
      default:
        return <Dashboard userRole={userRole} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        currentView={currentView} 
        onViewChange={setCurrentView}
        userRole={userRole}
        onLogout={handleLogout}
      />
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Index;
