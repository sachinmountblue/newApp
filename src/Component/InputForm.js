import { Form, Input, Button, Checkbox, message } from "antd";
import { useForm } from "antd/lib/form/Form";
import Modal from "antd/lib/modal/Modal";

const InputForm = ({ title, visible, onCancel, onSubmit, initialValues }) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" type="danger" onClick={onCancel}>
          cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={() => {
            form
              .validateFields()
              .then((values) => {
                let tempObj = {
                  ...values,
                  action: "ADD",
                };
                if (initialValues != null) {
                  tempObj = {
                    ...values,
                    action: "EDIT",
                  };
                }
                console.log("THIS IS VALUE", tempObj);
                form.resetFields();
                onSubmit(tempObj);
              })
              .catch((err) => {
                return message.err;
              });
          }}
        >
          Submit
        </Button>,
      ]}
    >
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          ...initialValues,
          remember: true,
        }}
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox> Remember me </Checkbox>{" "}
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        ></Form.Item>
      </Form>
    </Modal>
  );
};

export default InputForm;
