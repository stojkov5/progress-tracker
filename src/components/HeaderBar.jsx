/* eslint react/prop-types: 0 */
import { Layout, Button } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

const HeaderBar = ({ collapsed, setCollapsed }) => {
  const { authState, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

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
      <div>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
        />
      </div>
      <div>
        {authState ? (
          <Button type="primary" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Button type="primary" onClick={() => navigate("/login")}>
            Login
          </Button>
        )}
      </div>
    </Header>
  );
};

export default HeaderBar;
