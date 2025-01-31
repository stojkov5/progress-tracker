import { Card, Row, Col } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useParams, useOutletContext } from "react-router-dom";
import { useMemo } from "react";

const TaskShow = () => {
  const { status } = useParams(); 
  const [selectedPriority] = useOutletContext(); 

  // Fetch tasks from JSON file
  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await fetch("/tasks.json");
      return response.json();
    },
  });

  // Filter tasks based on status and priority
  const filteredTasks = useMemo(() => {
    return tasks.filter(
      (task) =>
        (!status || task.status.toLowerCase().replace(" ", "-") === status) &&
        (!selectedPriority || task.priority === selectedPriority)
    );
  }, [tasks, status, selectedPriority]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>{status ? status.replace("-", " ").toUpperCase() + " Tasks" : "All Tasks"}</h2>

     
      <Row gutter={[16, 16]}>
        {filteredTasks.map((task) => (
          <Col key={task.id} xs={24} sm={12} md={8} lg={6}>
            <Card title={task.title}>{task.description}</Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default TaskShow;
