import { Layout, Menu, Select } from "antd";
import { Link } from "react-router-dom";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  HourglassOutlined,
} from "@ant-design/icons";
import { GrInProgress } from "react-icons/gr";

const { Sider } = Layout;

const sidebarItems = [
  { key: "1", icon: <ClockCircleOutlined />, label: <Link to="/">All</Link> },
  {
    key: "2",
    icon: <HourglassOutlined />,
    label: <Link to="/tasks/to-do">To Do</Link>,
  },
  {
    key: "3",
    icon: <GrInProgress />,
    label: <Link to="/tasks/in-progress">In Progress</Link>,
  },
  {
    key: "4",
    icon: <CheckCircleOutlined />,
    label: <Link to="/tasks/completed">Completed</Link>,
  },
  
];

// eslint-disable-next-line react/prop-types
const Sidebar = ({ collapsed, setSelectedPriority }) => {
  return (
    <Sider collapsedWidth="0" collapsible collapsed={collapsed}>
     <div className="sidebar-container">
     <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]} items={sidebarItems} />
      {!collapsed && (
        <div style={{ padding: "16px" }}>
          <Select
            placeholder="Filter by Priority"
            style={{ width: "100%" }}
            onChange={setSelectedPriority}
            allowClear
          >
            <Select.Option value="High">High</Select.Option>
            <Select.Option value="Medium">Medium</Select.Option>
            <Select.Option value="Low">Low</Select.Option>
          </Select>
        </div>
      )}
     </div>
     
    </Sider>
  );
};

export default Sidebar;
