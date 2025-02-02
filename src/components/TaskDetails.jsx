import { useParams, useNavigate } from "react-router-dom";
import { Card, Button } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import EditTaskModal from "/src/components/EditTaskModal";

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  
  const { data: tasks = [], refetch } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => JSON.parse(localStorage.getItem("tasks")) || [],
  });


  const task = tasks.find((t) => t.id === parseInt(id));

  if (!task) {
    return <p>Task not found!</p>;
  }

  return (
    <Card title={task.title} style={{ maxWidth: 600, margin: "auto", marginTop: 20 }}>
      <p><strong>Description:</strong> {task.description}</p>
      <p><strong>Status:</strong> {task.status}</p>
      <p><strong>Priority:</strong> {task.priority}</p>
      <p><strong>Due Date:</strong> {task.dueDate}</p>
      <p><strong>Notes:</strong> {task.notes || "No notes"}</p>
      
      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        <Button type="primary" onClick={() => setIsEditModalVisible(true)}>
          Edit Task
        </Button>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>

     
      <EditTaskModal
        isVisible={isEditModalVisible}
        handleClose={() => setIsEditModalVisible(false)}
        task={task}
        refetch={refetch}
      />
    </Card>
  );
};

export default TaskDetails;
