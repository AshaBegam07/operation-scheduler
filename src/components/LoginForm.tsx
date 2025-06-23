
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Stethoscope } from "lucide-react";
import { toast } from "sonner";

interface LoginFormProps {
  onLogin: (role: "admin" | "user") => void;
}

export const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  const handleLogin = (role: "admin" | "user") => {
    if (!credentials.email || !credentials.password) {
      toast.error("Please fill in all fields");
      return;
    }

    console.log(`Login attempt: ${credentials.email} as ${role}`);
    toast.success(`Welcome! Logged in as ${role}`);
    onLogin(role);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
            <Stethoscope className="w-8 h-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-gray-900">OT Manager</CardTitle>
            <CardDescription className="text-gray-600">
              Hospital Operation Theater Management System
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="admin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="admin">Admin</TabsTrigger>
              <TabsTrigger value="user">User</TabsTrigger>
            </TabsList>

            <TabsContent value="admin" className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="admin-email">Email</Label>
                <Input
                  id="admin-email"
                  type="email"
                  placeholder="admin@hospital.com"
                  value={credentials.email}
                  onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-password">Password</Label>
                <Input
                  id="admin-password"
                  type="password"
                  placeholder="Enter password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                />
              </div>
              <Button 
                onClick={() => handleLogin("admin")} 
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Login as Admin
              </Button>
            </TabsContent>

            <TabsContent value="user" className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="user-email">Email</Label>
                <Input
                  id="user-email"
                  type="email"
                  placeholder="user@hospital.com"
                  value={credentials.email}
                  onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="user-password">Password</Label>
                <Input
                  id="user-password"
                  type="password"
                  placeholder="Enter password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                />
              </div>
              <Button 
                onClick={() => handleLogin("user")} 
                className="w-full bg-green-600 hover:bg-green-700"
              >
                Login as User
              </Button>
            </TabsContent>
          </Tabs>

          <div className="mt-4 text-center text-sm text-gray-500">
            Demo credentials: any email/password combination
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
