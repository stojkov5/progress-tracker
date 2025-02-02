import { Card, Row, Col } from "antd";
import { useMemo } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const TaskShow = () => {
  const { status } = useParams();
  const [selectedPriority] = useOutletContext();

  
  const {
    data: tasks = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const storedTasks = JSON.parse(localStorage.getItem("tasks"));
      if (storedTasks !== null) return storedTasks;

      const response = await fetch("/tasks.json");
      const defaultTasks = await response.json();
      localStorage.setItem("tasks", JSON.stringify(defaultTasks));
      return defaultTasks;
    },
  });

  
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
            <Card title={task.title}>
              <p>{task.description}</p>
              <p>
                <strong>Priority:</strong> {task.priority}
              </p>
              <p>
                <strong>Status:</strong> {task.status}
              </p>
              <p>
                <strong>Due Date:</strong> {task.dueDate}
              </p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default TaskShow;
