import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "/src/components/Sidebar";
import HeaderBar from "/src/components/HeaderBar";
import AddTaskModal from "../components/AddTaskModal";
import { useQueryClient } from "@tanstack/react-query";

const { Content } = Layout;

const AppLayout = () => {
  const [selectedPriority, setSelectedPriority] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const queryClient = useQueryClient();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar collapsed={collapsed} setSelectedPriority={setSelectedPriority} />
      <Layout>
        <HeaderBar collapsed={collapsed} setCollapsed={setCollapsed} showModal={() => setIsModalVisible(true)} />
        <Content style={{ padding: "16px" }}>
          <Outlet context={[selectedPriority]} />
        </Content>
      </Layout>

     
      <AddTaskModal
        isVisible={isModalVisible}
        handleClose={() => setIsModalVisible(false)}
        refetch={() => queryClient.invalidateQueries(["tasks"])}
      />
    </Layout>
  );
};

export default AppLayout;
