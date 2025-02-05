/* eslint react/prop-types: 0 */
import { Layout, Button,Switch } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined, SunOutlined,MoonOutlined} from "@ant-design/icons";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

const HeaderBar = ({ collapsed, setCollapsed }) => {
  const { authState, logout, darkMode, toggleDarkMode } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Header
      style={{
        padding: "0 16px",
        background: "#8dbfed",
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
         <h1 className="header-title">Progress Tracker</h1>
       </div>
      <div className="header-right"> 
      <Switch
          checked={darkMode}
          onChange={toggleDarkMode}
          checkedChildren={<MoonOutlined />}
          unCheckedChildren={<SunOutlined />}
        />
        
        {authState ? (
          <Button className="login-btn" type="primary" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Button className="login-btn" type="primary" onClick={() => navigate("/login")}>
            Login
          </Button>
        )}
      </div>
    </Header>
  );
};

export default HeaderBar;
