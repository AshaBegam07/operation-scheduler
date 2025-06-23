
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlus, Edit, Trash2, Stethoscope } from "lucide-react";
import { toast } from "sonner";

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  email: string;
  phone: string;
  status: "active" | "inactive";
  experience: number;
}

interface DoctorManagementProps {
  userRole: "admin" | "user";
}

export const DoctorManagement = ({ userRole }: DoctorManagementProps) => {
  const [doctors, setDoctors] = useState<Doctor[]>([
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      specialization: "Cardiothoracic Surgery",
      email: "sarah.johnson@hospital.com",
      phone: "+1-555-0101",
      status: "active",
      experience: 15
    },
    {
      id: "2",
      name: "Dr. Michael Chen",
      specialization: "Neurosurgery",
      email: "michael.chen@hospital.com",
      phone: "+1-555-0102",
      status: "active",
      experience: 12
    },
    {
      id: "3",
      name: "Dr. Emily Rodriguez",
      specialization: "Orthopedic Surgery",
      email: "emily.rodriguez@hospital.com",
      phone: "+1-555-0103",
      status: "inactive",
      experience: 8
    }
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    specialization: "",
    email: "",
    phone: "",
    experience: 0
  });

  const handleAddDoctor = () => {
    if (!newDoctor.name || !newDoctor.specialization || !newDoctor.email) {
      toast.error("Please fill in all required fields");
      return;
    }

    const doctor: Doctor = {
      id: Date.now().toString(),
      ...newDoctor,
      status: "active"
    };

    setDoctors([...doctors, doctor]);
    setNewDoctor({ name: "", specialization: "", email: "", phone: "", experience: 0 });
    setIsAddDialogOpen(false);
    toast.success("Doctor added successfully");
    console.log("Doctor added:", doctor);
  };

  const handleEditDoctor = (doctor: Doctor) => {
    setEditingDoctor(doctor);
    setNewDoctor({
      name: doctor.name,
      specialization: doctor.specialization,
      email: doctor.email,
      phone: doctor.phone,
      experience: doctor.experience
    });
  };

  const handleUpdateDoctor = () => {
    if (!editingDoctor) return;

    const updatedDoctors = doctors.map(doc =>
      doc.id === editingDoctor.id
        ? { ...doc, ...newDoctor }
        : doc
    );

    setDoctors(updatedDoctors);
    setEditingDoctor(null);
    setNewDoctor({ name: "", specialization: "", email: "", phone: "", experience: 0 });
    toast.success("Doctor updated successfully");
    console.log("Doctor updated:", editingDoctor.id);
  };

  const handleDeleteDoctor = (id: string) => {
    setDoctors(doctors.filter(doc => doc.id !== id));
    toast.success("Doctor removed successfully");
    console.log("Doctor deleted:", id);
  };

  const toggleDoctorStatus = (id: string) => {
    const updatedDoctors = doctors.map(doc =>
      doc.id === id
        ? { ...doc, status: doc.status === "active" ? "inactive" : "active" as "active" | "inactive" }
        : doc
    );
    setDoctors(updatedDoctors);
    console.log("Doctor status toggled:", id);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {userRole === "admin" ? "Doctor Management" : "Our Doctors"}
          </h1>
          <p className="text-gray-600 mt-2">
            {userRole === "admin" 
              ? "Manage hospital doctors and their information" 
              : "View available doctors and their specializations"
            }
          </p>
        </div>
        {userRole === "admin" && (
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <UserPlus className="w-4 h-4 mr-2" />
                Add Doctor
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Doctor</DialogTitle>
                <DialogDescription>
                  Enter the doctor's information below.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name*</Label>
                  <Input
                    id="name"
                    value={newDoctor.name}
                    onChange={(e) => setNewDoctor({...newDoctor, name: e.target.value})}
                    placeholder="Dr. John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialization">Specialization*</Label>
                  <Select onValueChange={(value) => setNewDoctor({...newDoctor, specialization: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select specialization" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cardiothoracic Surgery">Cardiothoracic Surgery</SelectItem>
                      <SelectItem value="Neurosurgery">Neurosurgery</SelectItem>
                      <SelectItem value="Orthopedic Surgery">Orthopedic Surgery</SelectItem>
                      <SelectItem value="General Surgery">General Surgery</SelectItem>
                      <SelectItem value="Plastic Surgery">Plastic Surgery</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email*</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newDoctor.email}
                    onChange={(e) => setNewDoctor({...newDoctor, email: e.target.value})}
                    placeholder="doctor@hospital.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={newDoctor.phone}
                    onChange={(e) => setNewDoctor({...newDoctor, phone: e.target.value})}
                    placeholder="+1-555-0100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Input
                    id="experience"
                    type="number"
                    value={newDoctor.experience}
                    onChange={(e) => setNewDoctor({...newDoctor, experience: parseInt(e.target.value) || 0})}
                    placeholder="5"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddDoctor}>Add Doctor</Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <Card key={doctor.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Stethoscope className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{doctor.name}</CardTitle>
                    <CardDescription>{doctor.specialization}</CardDescription>
                  </div>
                </div>
                <Badge variant={doctor.status === "active" ? "default" : "secondary"}>
                  {doctor.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1">
                <p className="text-sm text-gray-600">Email: {doctor.email}</p>
                <p className="text-sm text-gray-600">Phone: {doctor.phone}</p>
                <p className="text-sm text-gray-600">Experience: {doctor.experience} years</p>
              </div>
              
              {userRole === "admin" && (
                <div className="flex space-x-2 pt-3 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditDoctor(doctor)}
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleDoctorStatus(doctor.id)}
                  >
                    {doctor.status === "active" ? "Deactivate" : "Activate"}
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteDoctor(doctor.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Doctor Dialog */}
      <Dialog open={!!editingDoctor} onOpenChange={() => setEditingDoctor(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Doctor</DialogTitle>
            <DialogDescription>
              Update the doctor's information below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Full Name*</Label>
              <Input
                id="edit-name"
                value={newDoctor.name}
                onChange={(e) => setNewDoctor({...newDoctor, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-specialization">Specialization*</Label>
              <Select value={newDoctor.specialization} onValueChange={(value) => setNewDoctor({...newDoctor, specialization: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cardiothoracic Surgery">Cardiothoracic Surgery</SelectItem>
                  <SelectItem value="Neurosurgery">Neurosurgery</SelectItem>
                  <SelectItem value="Orthopedic Surgery">Orthopedic Surgery</SelectItem>
                  <SelectItem value="General Surgery">General Surgery</SelectItem>
                  <SelectItem value="Plastic Surgery">Plastic Surgery</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-email">Email*</Label>
              <Input
                id="edit-email"
                type="email"
                value={newDoctor.email}
                onChange={(e) => setNewDoctor({...newDoctor, email: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-phone">Phone</Label>
              <Input
                id="edit-phone"
                value={newDoctor.phone}
                onChange={(e) => setNewDoctor({...newDoctor, phone: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-experience">Years of Experience</Label>
              <Input
                id="edit-experience"
                type="number"
                value={newDoctor.experience}
                onChange={(e) => setNewDoctor({...newDoctor, experience: parseInt(e.target.value) || 0})}
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setEditingDoctor(null)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateDoctor}>Update Doctor</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
