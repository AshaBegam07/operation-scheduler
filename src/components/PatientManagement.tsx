
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlus, Edit, Trash2, Users, Calendar } from "lucide-react";
import { toast } from "sonner";

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  address: string;
  medicalHistory: string;
  emergencyContact: string;
  status: "active" | "discharged" | "critical";
  admissionDate: string;
}

interface PatientManagementProps {
  userRole: "admin" | "user";
}

export const PatientManagement = ({ userRole }: PatientManagementProps) => {
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: "1",
      name: "John Smith",
      age: 45,
      gender: "Male",
      email: "john.smith@email.com",
      phone: "+1-555-0201",
      address: "123 Main St, City, State 12345",
      medicalHistory: "Hypertension, Diabetes Type 2",
      emergencyContact: "Jane Smith +1-555-0202",
      status: "active",
      admissionDate: "2024-01-15"
    },
    {
      id: "2",
      name: "Maria Garcia",
      age: 32,
      gender: "Female",
      email: "maria.garcia@email.com",
      phone: "+1-555-0203",
      address: "456 Oak Ave, City, State 12345",
      medicalHistory: "Asthma, Allergies (Penicillin)",
      emergencyContact: "Carlos Garcia +1-555-0204",
      status: "critical",
      admissionDate: "2024-01-20"
    },
    {
      id: "3",
      name: "Robert Johnson",
      age: 67,
      gender: "Male",
      email: "robert.johnson@email.com",
      phone: "+1-555-0205",
      address: "789 Pine St, City, State 12345",
      medicalHistory: "Heart Disease, Previous Cardiac Surgery",
      emergencyContact: "Linda Johnson +1-555-0206",
      status: "discharged",
      admissionDate: "2024-01-10"
    }
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [newPatient, setNewPatient] = useState({
    name: "",
    age: 0,
    gender: "",
    email: "",
    phone: "",
    address: "",
    medicalHistory: "",
    emergencyContact: ""
  });

  const handleAddPatient = () => {
    if (!newPatient.name || !newPatient.email || !newPatient.phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    const patient: Patient = {
      id: Date.now().toString(),
      ...newPatient,
      status: "active",
      admissionDate: new Date().toISOString().split('T')[0]
    };

    setPatients([...patients, patient]);
    setNewPatient({
      name: "",
      age: 0,
      gender: "",
      email: "",
      phone: "",
      address: "",
      medicalHistory: "",
      emergencyContact: ""
    });
    setIsAddDialogOpen(false);
    toast.success("Patient added successfully");
    console.log("Patient added:", patient);
  };

  const handleEditPatient = (patient: Patient) => {
    setEditingPatient(patient);
    setNewPatient({
      name: patient.name,
      age: patient.age,
      gender: patient.gender,
      email: patient.email,
      phone: patient.phone,
      address: patient.address,
      medicalHistory: patient.medicalHistory,
      emergencyContact: patient.emergencyContact
    });
  };

  const handleUpdatePatient = () => {
    if (!editingPatient) return;

    const updatedPatients = patients.map(patient =>
      patient.id === editingPatient.id
        ? { ...patient, ...newPatient }
        : patient
    );

    setPatients(updatedPatients);
    setEditingPatient(null);
    setNewPatient({
      name: "",
      age: 0,
      gender: "",
      email: "",
      phone: "",
      address: "",
      medicalHistory: "",
      emergencyContact: ""
    });
    toast.success("Patient updated successfully");
    console.log("Patient updated:", editingPatient.id);
  };

  const handleDeletePatient = (id: string) => {
    setPatients(patients.filter(patient => patient.id !== id));
    toast.success("Patient removed successfully");
    console.log("Patient deleted:", id);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "critical":
        return "bg-red-100 text-red-800";
      case "discharged":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Patient Management</h1>
          <p className="text-gray-600 mt-2">Manage patient records and information</p>
        </div>
        {userRole === "admin" && (
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <UserPlus className="w-4 h-4 mr-2" />
                Add Patient
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Patient</DialogTitle>
                <DialogDescription>
                  Enter the patient's information below.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 max-h-96 overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name*</Label>
                    <Input
                      id="name"
                      value={newPatient.name}
                      onChange={(e) => setNewPatient({...newPatient, name: e.target.value})}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      value={newPatient.age}
                      onChange={(e) => setNewPatient({...newPatient, age: parseInt(e.target.value) || 0})}
                      placeholder="30"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select onValueChange={(value) => setNewPatient({...newPatient, gender: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email*</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newPatient.email}
                      onChange={(e) => setNewPatient({...newPatient, email: e.target.value})}
                      placeholder="patient@email.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone*</Label>
                    <Input
                      id="phone"
                      value={newPatient.phone}
                      onChange={(e) => setNewPatient({...newPatient, phone: e.target.value})}
                      placeholder="+1-555-0100"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={newPatient.address}
                    onChange={(e) => setNewPatient({...newPatient, address: e.target.value})}
                    placeholder="123 Main St, City, State 12345"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="medicalHistory">Medical History</Label>
                  <Input
                    id="medicalHistory"
                    value={newPatient.medicalHistory}
                    onChange={(e) => setNewPatient({...newPatient, medicalHistory: e.target.value})}
                    placeholder="Previous conditions, allergies, etc."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">Emergency Contact</Label>
                  <Input
                    id="emergencyContact"
                    value={newPatient.emergencyContact}
                    onChange={(e) => setNewPatient({...newPatient, emergencyContact: e.target.value})}
                    placeholder="Name +1-555-0100"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddPatient}>Add Patient</Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {patients.map((patient) => (
          <Card key={patient.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{patient.name}</CardTitle>
                    <CardDescription>{patient.age} years old, {patient.gender}</CardDescription>
                  </div>
                </div>
                <Badge className={getStatusColor(patient.status)}>
                  {patient.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Email:</p>
                  <p className="font-medium">{patient.email}</p>
                </div>
                <div>
                  <p className="text-gray-600">Phone:</p>
                  <p className="font-medium">{patient.phone}</p>
                </div>
              </div>
              
              <div className="text-sm">
                <p className="text-gray-600">Address:</p>
                <p className="font-medium">{patient.address}</p>
              </div>
              
              <div className="text-sm">
                <p className="text-gray-600">Medical History:</p>
                <p className="font-medium">{patient.medicalHistory}</p>
              </div>
              
              <div className="text-sm">
                <p className="text-gray-600">Emergency Contact:</p>
                <p className="font-medium">{patient.emergencyContact}</p>
              </div>

              <div className="flex items-center text-sm text-gray-600 pt-2 border-t">
                <Calendar className="w-4 h-4 mr-1" />
                Admitted: {new Date(patient.admissionDate).toLocaleDateString()}
              </div>
              
              {userRole === "admin" && (
                <div className="flex space-x-2 pt-3 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditPatient(patient)}
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeletePatient(patient.id)}
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

      {/* Edit Patient Dialog */}
      <Dialog open={!!editingPatient} onOpenChange={() => setEditingPatient(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Patient</DialogTitle>
            <DialogDescription>
              Update the patient's information below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 max-h-96 overflow-y-auto">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Full Name*</Label>
                <Input
                  id="edit-name"
                  value={newPatient.name}
                  onChange={(e) => setNewPatient({...newPatient, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-age">Age</Label>
                <Input
                  id="edit-age"
                  type="number"
                  value={newPatient.age}
                  onChange={(e) => setNewPatient({...newPatient, age: parseInt(e.target.value) || 0})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-gender">Gender</Label>
              <Select value={newPatient.gender} onValueChange={(value) => setNewPatient({...newPatient, gender: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email*</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={newPatient.email}
                  onChange={(e) => setNewPatient({...newPatient, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-phone">Phone*</Label>
                <Input
                  id="edit-phone"
                  value={newPatient.phone}
                  onChange={(e) => setNewPatient({...newPatient, phone: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-address">Address</Label>
              <Input
                id="edit-address"
                value={newPatient.address}
                onChange={(e) => setNewPatient({...newPatient, address: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-medicalHistory">Medical History</Label>
              <Input
                id="edit-medicalHistory"
                value={newPatient.medicalHistory}
                onChange={(e) => setNewPatient({...newPatient, medicalHistory: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-emergencyContact">Emergency Contact</Label>
              <Input
                id="edit-emergencyContact"
                value={newPatient.emergencyContact}
                onChange={(e) => setNewPatient({...newPatient, emergencyContact: e.target.value})}
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setEditingPatient(null)}>
              Cancel
            </Button>
            <Button onClick={handleUpdatePatient}>Update Patient</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
