import { Card, Row, Col, Table, Radio, Button, Checkbox } from "antd";
import { CiViewTable, CiGrid41 } from "react-icons/ci";
import { useMemo, useState } from "react";
import {
  useParams,
  useOutletContext,
  Link,
  useNavigate,
} from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AddTaskModal from "./AddTaskModal";

const TaskShow = () => {
  const { status } = useParams();
  const [selectedPriority] = useOutletContext();
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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
      <p className="login-text">
        Login to show tasks
      </p>
    );
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

 
  const toggleTaskCompletion = (taskId, event) => {
    event.stopPropagation(); 

    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        if (task.status !== "Completed") {
          return { ...task, previousStatus: task.status, status: "Completed" };
        } else {
          return { ...task, status: task.previousStatus || "To Do" };
        }
      }
      return task;
    });

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    queryClient.invalidateQueries(["tasks"]); 
  };

  const getPriorityTextStyle = (priority) => {
    switch (priority) {
      case "High":
        return { color: "#ff4d4f", fontWeight: "bold" }; 
      case "Medium":
        return { color: "#ffa940", fontWeight: "bold" }; 
      case "Low":
        return { color: "#52c41a", fontWeight: "bold" }; 
      default:
        return { color: "#595959" }; 
    }
  };

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "High":
        return { borderLeft: "6px solid #ff4d4f", background: "#fff1f0" };
      case "Medium":
        return { borderLeft: "6px solid #ffa940", background: "#fff7e6" };
      case "Low":
        return { borderLeft: "6px solid #52c41a", background: "#f6ffed" };
      default:
        return { borderLeft: "6px solid #d9d9d9", background: "#f9f9f9" };
    }
  };

  const columns = [
    {
      title: "Mark",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <Checkbox
          checked={record.status === "Completed"}
          onClick={(e) => toggleTaskCompletion(record.id, e)}
          className="custom-checkbox"
        />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text, record) => <Link to={`/task/${record.id}`}>{text}</Link>,
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      render: (priority) => (
        <span style={getPriorityTextStyle(priority)}>{priority}</span>
      ),
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
    <div className="page-container">
      <div className="task-show-header"
        style={{
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Radio.Group value={viewMode} onChange={handleViewChange}>
          <Radio.Button value="cards">
            <CiGrid41 />
          </Radio.Button>
          <Radio.Button value="table">
            <CiViewTable />
          </Radio.Button>
        </Radio.Group>
        <h2 className="task-category-title">
          {status
            ? status.replace("-", " ").toUpperCase() + " Tasks"
            : "All Tasks"}
        </h2>
        <Button
          className="add-task-btn"
          type="primary"
          onClick={() => setIsModalVisible(true)}
        >
          + Add Task
        </Button>
      </div>

      {viewMode === "cards" && (
        <Row gutter={[16, 16]}>
          {filteredTasks.map((task) => (
            <Col key={task.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                style={getPriorityStyle(task.priority)}
                className="task-card"
                title={
                  <div className="">
                    <Checkbox
                      checked={task.status === "Completed"}
                      onClick={(e) => toggleTaskCompletion(task.id, e)}
                      className="custom-checkbox"
                    />
                    <Link className="task-card-title" to={`/task/${task.id}`}>{task.title}</Link>
                  </div>
                }
                onClick={() => navigate(`/task/${task.id}`)}
              >
               
                <p>
                  <strong>Priority:</strong>{" "}
                  <span style={getPriorityTextStyle(task.priority)}>
                    {task.priority}
                  </span>
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
        <div className="table-container" style={{ overflowX: "auto" }}>
          <Table
            dataSource={filteredTasks}
            columns={columns}
            scroll={{ x: "max-content" }}
            rowKey="id"
          />
        </div>
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
