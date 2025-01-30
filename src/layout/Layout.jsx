import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import PriorityFilter from "../components/PriorityFilter";
import Status from "../components/Status";

const { Sider, Content } = Layout;

const AppLayout = () => {
  const [selectedPriority, setSelectedPriority] = useState(""); // Store priority filter

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider width={250} style={{ background: "#fff", padding: "16px", borderRight: "1px solid #ddd" }}>
        <h2>Task Manager</h2>

        
        <PriorityFilter onChange={setSelectedPriority} />

     
        <Status/>
      </Sider>

    
      <Layout>
        <Content style={{ padding: "16px" }}>
          <Outlet context={[selectedPriority]} /> 
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
