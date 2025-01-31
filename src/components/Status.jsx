import { Link } from "react-router-dom";

const Status = () => {
  return (
    <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <Link to="/">All</Link>
      <Link to="/tasks/to-do">To Do</Link>
      <Link to="/tasks/in-progress">In Progress</Link>
      <Link to="/tasks/completed">Completed</Link>
    </nav>
  );
};

export default Status;
