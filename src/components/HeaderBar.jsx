import { Layout, Button } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined, PlusOutlined } from "@ant-design/icons";

const { Header } = Layout;

// eslint-disable-next-line react/prop-types
const HeaderBar = ({ collapsed, setCollapsed, showModal }) => {
  return (
    <Header
      style={{
        padding: "0 16px",
        background: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
      />
      <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
        Add Task
      </Button>
    </Header>
  );
};

export default HeaderBar;
