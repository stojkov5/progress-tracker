import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await fetch("/tasks.json");
      return response.json();
    },
  });
  return (
    <div>
      <h1>Task Manager</h1>

      {isLoading ? (
        <p>Loading tasks...</p>
      ) : (
        tasks.map((task) => <p key={task.id}>{task.title}</p>)
      )}
    </div>
  );
};

export default Dashboard;
