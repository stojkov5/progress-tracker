import { Layout, Menu, Select, Button } from "antd";
import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined, CheckCircleOutlined, ClockCircleOutlined, HourglassOutlined } from "@ant-design/icons";
import { GrInProgress } from "react-icons/gr";
const { Sider, Content, Header } = Layout;

const sidebarItems = [
  { key: "1", icon: <ClockCircleOutlined />, label: <Link to="/">All</Link> },
  { key: "2", icon: <HourglassOutlined />, label: <Link to="/tasks/to-do">To Do</Link> },
  { key: "3", icon: <GrInProgress /> ,label: <Link to="/tasks/in-progress">In Progress</Link> },
  { key: "4", icon: <CheckCircleOutlined />, label: <Link to="/tasks/completed">Completed</Link> },
];

const AppLayout = () => {
  const [selectedPriority, setSelectedPriority] = useState("");
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        collapsible
        collapsed={collapsed}
        onCollapse={(collapse) => setCollapsed(collapse)}
        style={{ overflow: "hidden" }}
      >
        <div className="sidebar-logo" />
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
      </Sider>
      <Layout>
        <Header style={{ padding: "0 16px", background: "#fff", display: "flex", alignItems: "center" }}>
          <Button type="text" icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} onClick={() => setCollapsed(!collapsed)} />
        </Header>
        <Content style={{ padding: "16px" }}>
          <Outlet context={[selectedPriority]} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
