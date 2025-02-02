/* eslint react/prop-types: 0 */
import { Modal, Form, Input, Select, DatePicker, Button } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";

const { Option } = Select;

const EditTaskModal = ({ isVisible, handleClose, task, refetch }) => {
  
  const formik = useFormik({
    initialValues: {
      title: task?.title || "",

      description: task?.description || "",
      status: task?.status || "To Do",
      priority: task?.priority || "Medium",
      dueDate: task?.dueDate || "",
      notes: task?.notes || "",
    },
    enableReinitialize: true, 
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
      status: Yup.string().required("Status is required"),
      priority: Yup.string().required("Priority is required"),
      dueDate: Yup.string().required("Due Date is required"),
    }),
    onSubmit: (values) => {
      
      const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const updatedTasks = storedTasks.map((t) =>
        t.id === task.id ? { ...t, ...values } : t
      );

      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

       
      handleClose();
      refetch();
    },
  });

  return (
    <Modal
      title="Edit Task"
      open={isVisible}
      onCancel={handleClose}
      footer={null}
    >
      <Form layout="vertical" onFinish={formik.handleSubmit}>
        <Form.Item
          label="Title"
          help={formik.touched.title && formik.errors.title}
        >
          <Input
            name="title"
            onChange={formik.handleChange}
            value={formik.values.title}
          />
        </Form.Item>

        <Form.Item
          label="Description"
          help={formik.touched.description && formik.errors.description}
        >
          <Input
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
          />
        </Form.Item>

        <Form.Item label="Status">
          <Select
            name="status"
            onChange={(value) => formik.setFieldValue("status", value)}
            value={formik.values.status}
          >
            <Option value="To Do">To Do</Option>
            <Option value="In Progress">In Progress</Option>
            <Option value="Completed">Completed</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Priority">
          <Select
            name="priority"
            onChange={(value) => formik.setFieldValue("priority", value)}
            value={formik.values.priority}
          >
            <Option value="High">High</Option>
            <Option value="Medium">Medium</Option>
            <Option value="Low">Low</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Due Date">
          <DatePicker
            style={{ width: "100%" }}
            value={formik.values.dueDate ? dayjs(formik.values.dueDate) : null}
            onChange={(date, dateString) =>
              formik.setFieldValue("dueDate", dateString)
            }
          />
        </Form.Item>

        <Form.Item label="Notes">
          <Input
            name="notes"
            onChange={formik.handleChange}
            value={formik.values.notes}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Save Changes
        </Button>
      </Form>
    </Modal>
  );
};

export default EditTaskModal;
