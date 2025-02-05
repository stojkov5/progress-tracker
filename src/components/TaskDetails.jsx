import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Modal } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import EditTaskModal from "/src/components/EditTaskModal";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
const TaskDetails = () => {
  const { darkMode } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const { data: tasks = [], refetch } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => JSON.parse(localStorage.getItem("tasks")) || [],
  });

  const task = tasks.find((t) => t.id === parseInt(id));

  if (!task) {
    return <p>Task not found!</p>;
  }

  const deleteTask = () => {
    const updatedTasks = tasks.filter((t) => t.id !== task.id);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    refetch();
    navigate("/");
  };

  return (
    <Card className={darkMode ? 'dark-mode page-container' : 'page-container'}
      title={task.title}
      style={{ maxWidth: 600, margin: "auto", marginTop: 20 }}
    >
      <p>
        <strong>Description:</strong> {task.description}
      </p>
      <p>
        <strong>Status:</strong> {task.status}
      </p>
      <p>
        <strong>Priority:</strong> {task.priority}
      </p>
      <p>
        <strong>Due Date:</strong> {task.dueDate}
      </p>
      <p>
        <strong>Notes:</strong> {task.notes || "No notes"}
      </p>

      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        <Button className="add-task-btn" type="primary" onClick={() => setIsEditModalVisible(true)}>
          Edit Task
        </Button>
        <Button className="add-task-btn" onClick={() => navigate(-1)}>Go Back</Button>
        <Button className="add-task-btn" type="danger" onClick={() => setIsDeleteModalVisible(true)}>
          Delete Task
        </Button>
      </div>

      <EditTaskModal
        isVisible={isEditModalVisible}
        handleClose={() => setIsEditModalVisible(false)}
        task={task}
        refetch={refetch}
      />
      <Modal
        title="Delete Task"
        open={isDeleteModalVisible}
        onOk={deleteTask}
        onCancel={() => setIsDeleteModalVisible(false)}
        okText="Yes, Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this task?</p>
      </Modal>
    </Card>
  );
};

export default TaskDetails;
