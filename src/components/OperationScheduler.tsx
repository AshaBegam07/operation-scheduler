
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, Plus, Edit, Trash2, AlertTriangle, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface Operation {
  id: string;
  patientName: string;
  doctorName: string;
  operationType: string;
  scheduledDate: string;
  scheduledTime: string;
  duration: number;
  otRoom: string;
  status: "scheduled" | "in-progress" | "completed" | "cancelled" | "emergency";
  priority: "routine" | "urgent" | "emergency";
  notes: string;
  preOpChecklist: boolean;
  postOpNotes: string;
}

interface OperationSchedulerProps {
  userRole: "admin" | "user";
}

export const OperationScheduler = ({ userRole }: OperationSchedulerProps) => {
  const [operations, setOperations] = useState<Operation[]>([
    {
      id: "1",
      patientName: "John Smith",
      doctorName: "Dr. Sarah Johnson",
      operationType: "Cardiac Bypass",
      scheduledDate: "2024-01-25",
      scheduledTime: "09:00",
      duration: 240,
      otRoom: "OT-1",
      status: "scheduled",
      priority: "urgent",
      notes: "Patient has history of diabetes. Pre-op completed.",
      preOpChecklist: true,
      postOpNotes: ""
    },
    {
      id: "2",
      patientName: "Maria Garcia",
      doctorName: "Dr. Michael Chen",
      operationType: "Brain Tumor Removal",
      scheduledDate: "2024-01-25",
      scheduledTime: "14:00",
      duration: 360,
      otRoom: "OT-2",
      status: "in-progress",
      priority: "emergency",
      notes: "Emergency case. Patient stable.",
      preOpChecklist: true,
      postOpNotes: ""
    },
    {
      id: "3",
      patientName: "Robert Johnson",
      doctorName: "Dr. Emily Rodriguez",
      operationType: "Knee Replacement",
      scheduledDate: "2024-01-24",
      scheduledTime: "10:30",
      duration: 120,
      otRoom: "OT-3",
      status: "completed",
      priority: "routine",
      notes: "Routine procedure. No complications expected.",
      preOpChecklist: true,
      postOpNotes: "Surgery completed successfully. Patient recovering well."
    }
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingOperation, setEditingOperation] = useState<Operation | null>(null);
  const [newOperation, setNewOperation] = useState({
    patientName: "",
    doctorName: "",
    operationType: "",
    scheduledDate: "",
    scheduledTime: "",
    duration: 60,
    otRoom: "",
    priority: "routine" as "routine" | "urgent" | "emergency",
    notes: ""
  });

  const handleAddOperation = () => {
    if (!newOperation.patientName || !newOperation.doctorName || !newOperation.operationType || !newOperation.scheduledDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    const operation: Operation = {
      id: Date.now().toString(),
      ...newOperation,
      status: "scheduled",
      preOpChecklist: false,
      postOpNotes: ""
    };

    setOperations([...operations, operation]);
    setNewOperation({
      patientName: "",
      doctorName: "",
      operationType: "",
      scheduledDate: "",
      scheduledTime: "",
      duration: 60,
      otRoom: "",
      priority: "routine",
      notes: ""
    });
    setIsAddDialogOpen(false);
    toast.success("Operation scheduled successfully");
    console.log("Operation scheduled:", operation);
  };

  const handleEditOperation = (operation: Operation) => {
    setEditingOperation(operation);
    setNewOperation({
      patientName: operation.patientName,
      doctorName: operation.doctorName,
      operationType: operation.operationType,
      scheduledDate: operation.scheduledDate,
      scheduledTime: operation.scheduledTime,
      duration: operation.duration,
      otRoom: operation.otRoom,
      priority: operation.priority,
      notes: operation.notes
    });
  };

  const handleUpdateOperation = () => {
    if (!editingOperation) return;

    const updatedOperations = operations.map(op =>
      op.id === editingOperation.id
        ? { ...op, ...newOperation }
        : op
    );

    setOperations(updatedOperations);
    setEditingOperation(null);
    setNewOperation({
      patientName: "",
      doctorName: "",
      operationType: "",
      scheduledDate: "",
      scheduledTime: "",
      duration: 60,
      otRoom: "",
      priority: "routine",
      notes: ""
    });
    toast.success("Operation updated successfully");
    console.log("Operation updated:", editingOperation.id);
  };

  const handleDeleteOperation = (id: string) => {
    setOperations(operations.filter(op => op.id !== id));
    toast.success("Operation cancelled successfully");
    console.log("Operation cancelled:", id);
  };

  const updateOperationStatus = (id: string, status: Operation["status"]) => {
    const updatedOperations = operations.map(op =>
      op.id === id ? { ...op, status } : op
    );
    setOperations(updatedOperations);
    toast.success(`Operation status updated to ${status}`);
    console.log("Operation status updated:", id, status);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "emergency":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "routine":
        return "bg-gray-100 text-gray-800";
      case "urgent":
        return "bg-orange-100 text-orange-800";
      case "emergency":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "emergency":
        return <AlertTriangle className="w-4 h-4" />;
      case "urgent":
        return <Clock className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {userRole === "admin" ? "Operation Scheduler" : "Surgery Schedule"}
          </h1>
          <p className="text-gray-600 mt-2">
            {userRole === "admin" 
              ? "Manage and schedule surgical operations" 
              : "View your upcoming and past surgeries"
            }
          </p>
        </div>
        {userRole === "admin" && (
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Schedule Operation
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Schedule New Operation</DialogTitle>
                <DialogDescription>
                  Enter the operation details below.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 max-h-96 overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="patientName">Patient Name*</Label>
                    <Input
                      id="patientName"
                      value={newOperation.patientName}
                      onChange={(e) => setNewOperation({...newOperation, patientName: e.target.value})}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="doctorName">Doctor*</Label>
                    <Select onValueChange={(value) => setNewOperation({...newOperation, doctorName: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select doctor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Dr. Sarah Johnson">Dr. Sarah Johnson</SelectItem>
                        <SelectItem value="Dr. Michael Chen">Dr. Michael Chen</SelectItem>
                        <SelectItem value="Dr. Emily Rodriguez">Dr. Emily Rodriguez</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="operationType">Operation Type*</Label>
                  <Select onValueChange={(value) => setNewOperation({...newOperation, operationType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select operation type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cardiac Bypass">Cardiac Bypass</SelectItem>
                      <SelectItem value="Brain Tumor Removal">Brain Tumor Removal</SelectItem>
                      <SelectItem value="Knee Replacement">Knee Replacement</SelectItem>
                      <SelectItem value="Appendectomy">Appendectomy</SelectItem>
                      <SelectItem value="Gallbladder Surgery">Gallbladder Surgery</SelectItem>
                      <SelectItem value="Cataract Surgery">Cataract Surgery</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="scheduledDate">Date*</Label>
                    <Input
                      id="scheduledDate"
                      type="date"
                      value={newOperation.scheduledDate}
                      onChange={(e) => setNewOperation({...newOperation, scheduledDate: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="scheduledTime">Time</Label>
                    <Input
                      id="scheduledTime"
                      type="time"
                      value={newOperation.scheduledTime}
                      onChange={(e) => setNewOperation({...newOperation, scheduledTime: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (min)</Label>
                    <Input
                      id="duration"
                      type="number"
                      value={newOperation.duration}
                      onChange={(e) => setNewOperation({...newOperation, duration: parseInt(e.target.value) || 60})}
                      placeholder="60"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="otRoom">OT Room</Label>
                    <Select onValueChange={(value) => setNewOperation({...newOperation, otRoom: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select OT room" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="OT-1">OT-1</SelectItem>
                        <SelectItem value="OT-2">OT-2</SelectItem>
                        <SelectItem value="OT-3">OT-3</SelectItem>
                        <SelectItem value="OT-4">OT-4</SelectItem>
                        <SelectItem value="OT-5">OT-5</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select value={newOperation.priority} onValueChange={(value: "routine" | "urgent" | "emergency") => setNewOperation({...newOperation, priority: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="routine">Routine</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                        <SelectItem value="emergency">Emergency</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={newOperation.notes}
                    onChange={(e) => setNewOperation({...newOperation, notes: e.target.value})}
                    placeholder="Additional notes, patient conditions, special requirements..."
                    rows={3}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddOperation}>Schedule Operation</Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6">
        {operations.map((operation) => (
          <Card key={operation.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {getPriorityIcon(operation.priority)}
                    <div>
                      <CardTitle className="text-lg">{operation.operationType}</CardTitle>
                      <CardDescription>
                        Patient: {operation.patientName} | Doctor: {operation.doctorName}
                      </CardDescription>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getPriorityColor(operation.priority)}>
                    {operation.priority}
                  </Badge>
                  <Badge className={getStatusColor(operation.status)}>
                    {operation.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Date & Time:</p>
                  <p className="font-medium">
                    {new Date(operation.scheduledDate).toLocaleDateString()}
                    {operation.scheduledTime && ` at ${operation.scheduledTime}`}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Duration:</p>
                  <p className="font-medium">{operation.duration} minutes</p>
                </div>
                <div>
                  <p className="text-gray-600">OT Room:</p>
                  <p className="font-medium">{operation.otRoom}</p>
                </div>
                <div className="flex items-center">
                  <p className="text-gray-600 mr-2">Pre-op:</p>
                  {operation.preOpChecklist ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <Clock className="w-4 h-4 text-orange-600" />
                  )}
                </div>
              </div>
              
              {operation.notes && (
                <div className="text-sm">
                  <p className="text-gray-600">Notes:</p>
                  <p className="font-medium bg-gray-50 p-2 rounded">{operation.notes}</p>
                </div>
              )}
              
              {operation.postOpNotes && (
                <div className="text-sm">
                  <p className="text-gray-600">Post-op Notes:</p>
                  <p className="font-medium bg-green-50 p-2 rounded">{operation.postOpNotes}</p>
                </div>
              )}
              
              {userRole === "admin" && (
                <div className="flex flex-wrap gap-2 pt-3 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditOperation(operation)}
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  {operation.status === "scheduled" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateOperationStatus(operation.id, "in-progress")}
                    >
                      Start Surgery
                    </Button>
                  )}
                  {operation.status === "in-progress" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateOperationStatus(operation.id, "completed")}
                    >
                      Complete Surgery
                    </Button>
                  )}
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteOperation(operation.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Cancel
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Operation Dialog */}
      <Dialog open={!!editingOperation} onOpenChange={() => setEditingOperation(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Operation</DialogTitle>
            <DialogDescription>
              Update the operation details below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 max-h-96 overflow-y-auto">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-patientName">Patient Name*</Label>
                <Input
                  id="edit-patientName"
                  value={newOperation.patientName}
                  onChange={(e) => setNewOperation({...newOperation, patientName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-doctorName">Doctor*</Label>
                <Select value={newOperation.doctorName} onValueChange={(value) => setNewOperation({...newOperation, doctorName: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dr. Sarah Johnson">Dr. Sarah Johnson</SelectItem>
                    <SelectItem value="Dr. Michael Chen">Dr. Michael Chen</SelectItem>
                    <SelectItem value="Dr. Emily Rodriguez">Dr. Emily Rodriguez</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-operationType">Operation Type*</Label>
              <Select value={newOperation.operationType} onValueChange={(value) => setNewOperation({...newOperation, operationType: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cardiac Bypass">Cardiac Bypass</SelectItem>
                  <SelectItem value="Brain Tumor Removal">Brain Tumor Removal</SelectItem>
                  <SelectItem value="Knee Replacement">Knee Replacement</SelectItem>
                  <SelectItem value="Appendectomy">Appendectomy</SelectItem>
                  <SelectItem value="Gallbladder Surgery">Gallbladder Surgery</SelectItem>
                  <SelectItem value="Cataract Surgery">Cataract Surgery</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-scheduledDate">Date*</Label>
                <Input
                  id="edit-scheduledDate"
                  type="date"
                  value={newOperation.scheduledDate}
                  onChange={(e) => setNewOperation({...newOperation, scheduledDate: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-scheduledTime">Time</Label>
                <Input
                  id="edit-scheduledTime"
                  type="time"
                  value={newOperation.scheduledTime}
                  onChange={(e) => setNewOperation({...newOperation, scheduledTime: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-duration">Duration (min)</Label>
                <Input
                  id="edit-duration"
                  type="number"
                  value={newOperation.duration}
                  onChange={(e) => setNewOperation({...newOperation, duration: parseInt(e.target.value) || 60})}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-otRoom">OT Room</Label>
                <Select value={newOperation.otRoom} onValueChange={(value) => setNewOperation({...newOperation, otRoom: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="OT-1">OT-1</SelectItem>
                    <SelectItem value="OT-2">OT-2</SelectItem>
                    <SelectItem value="OT-3">OT-3</SelectItem>
                    <SelectItem value="OT-4">OT-4</SelectItem>
                    <SelectItem value="OT-5">OT-5</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-priority">Priority</Label>
                <Select value={newOperation.priority} onValueChange={(value: "routine" | "urgent" | "emergency") => setNewOperation({...newOperation, priority: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="routine">Routine</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-notes">Notes</Label>
              <Textarea
                id="edit-notes"
                value={newOperation.notes}
                onChange={(e) => setNewOperation({...newOperation, notes: e.target.value})}
                rows={3}
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setEditingOperation(null)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateOperation}>Update Operation</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
