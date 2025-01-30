import { Select } from "antd";

const PriorityFilter = ({ onChange }) => {
  return (
    <Select
      placeholder="Filter by Priority"
      style={{ width: "100%", marginBottom: 20 }}
      onChange={onChange}
      allowClear
    >
      <Select.Option value="High">High</Select.Option>
      <Select.Option value="Medium">Medium</Select.Option>
      <Select.Option value="Low">Low</Select.Option>
    </Select>
  );
};

export default PriorityFilter;
