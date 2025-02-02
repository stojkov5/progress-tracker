import { Card, Row, Col, Table, Radio, Button } from "antd";
import { CiViewTable, CiGrid41 } from "react-icons/ci";
import { useMemo, useState } from "react";
import {
  useParams,
  useOutletContext,
  Link,
  useNavigate,
} from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AddTaskModal from "./AddTaskModal";

const TaskShow = () => {
  const { status } = useParams();
  const [selectedPriority] = useOutletContext();
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();

  const [viewMode, setViewMode] = useState(
    () => localStorage.getItem("viewMode") || "cards"
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleViewChange = (e) => {
    const newView = e.target.value;
    setViewMode(newView);
    localStorage.setItem("viewMode", newView);
  };

  const {
    data: tasks = [],
    isLoading,
    refetch,
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

  if (!authState) {
    return (
      <p style={{ textAlign: "center", marginTop: "20px" }}>
        Login to show tasks
      </p>
    );
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text, record) => <Link to={`/task/${record.id}`}>{text}</Link>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
    },
  ];

  return (
    <div>
      <h2>
        {status
          ? status.replace("-", " ").toUpperCase() + " Tasks"
          : "All Tasks"}
      </h2>

      <div
        style={{
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Radio.Group value={viewMode} onChange={handleViewChange}>
          <Radio.Button value="cards">
            <CiGrid41 />
          </Radio.Button>
          <Radio.Button value="table"><CiViewTable /></Radio.Button>
        </Radio.Group>
        <Button type="primary" onClick={() => setIsModalVisible(true)}>
          + Add Task
        </Button>
      </div>

      {viewMode === "cards" && (
        <Row gutter={[16, 16]}>
          {filteredTasks.map((task) => (
            <Col key={task.id} xs={24} sm={12} md={8} lg={6}>
              <Card title={<Link to={`/task/${task.id}`}>{task.title}</Link>}>
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
      )}

      {viewMode === "table" && (
        <Table
          dataSource={filteredTasks}
          columns={columns}
          rowKey="id"
          onRow={(record) => ({
            onClick: () => navigate(`/task/${record.id}`),
          })}
        />
      )}

      <AddTaskModal
        isVisible={isModalVisible}
        handleClose={() => setIsModalVisible(false)}
        refetch={refetch}
      />
    </div>
  );
};

export default TaskShow;
