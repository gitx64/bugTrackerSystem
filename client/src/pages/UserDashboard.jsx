import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function UserDashboard() {
  const [theme] = useState('dark')
  const [bugs, setBugs] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    severity: "low",
    status: "open",
    priority: "medium",
    assignedTo: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.title) return;

    const newBug = {
      id: bugs.length + 1,
      title: formData.title,
      description: formData.description,
      severity: formData.severity,
      status: formData.status,
      priority: formData.priority,
      assignedTo: formData.assignedTo,
      createdBy: "currentUserId", // replace with auth user
    };

    setBugs([...bugs, newBug]);
    setFormData({
      title: "",
      description: "",
      severity: "low",
      status: "open",
      priority: "medium",
      assignedTo: "",
    });
  };

  return (
    <div className="p-6 grid md:grid-cols-2 gap-6">
      {/* Bug Creation Form */}
      <Card className="shadow-md" >
        <CardHeader>
          <CardTitle>Create Bug</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Enter bug title"
            />
          </div>

          <div>
            <Label>Description</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Enter bug description"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Severity</Label>
              <Select
                value={formData.severity}
                onValueChange={(v) => handleChange("severity", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Status</Label>
              <Select
                value={formData.status}
                onValueChange={(v) => handleChange("status", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="inprogress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(v) => handleChange("priority", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Assigned To</Label>
              <Input
                value={formData.assignedTo}
                onChange={(e) => handleChange("assignedTo", e.target.value)}
                placeholder="User ID / Name"
              />
            </div>
          </div>

          <Button onClick={handleSubmit} className="w-full">
            Create Bug
          </Button>
        </CardContent>
      </Card>

      {/* Bug List */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>All Bugs</CardTitle>
        </CardHeader>
        <CardContent>
          {bugs.length === 0 ? (
            <p className="text-sm text-muted-foreground">No bugs created yet.</p>
          ) : (
            <div className="space-y-3">
              {bugs.map((bug) => (
                <Card key={bug.id} className="p-3">
                  <h3 className="font-semibold">{bug.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {bug.description}
                  </p>
                  <div className="text-xs mt-2 flex flex-wrap gap-2">
                    <span className="px-2 py-1 rounded bg-gray-100">
                      Severity: {bug.severity}
                    </span>
                    <span className="px-2 py-1 rounded bg-gray-100">
                      Status: {bug.status}
                    </span>
                    <span className="px-2 py-1 rounded bg-gray-100">
                      Priority: {bug.priority}
                    </span>
                    <span className="px-2 py-1 rounded bg-gray-100">
                      Assigned: {bug.assignedTo || "N/A"}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
