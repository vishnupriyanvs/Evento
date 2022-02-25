import React from "react";
import { Modal, Form, Input, Radio } from "antd";


const ModalFormComponent = ({ visible, onCancel, onCreate, form }) => {
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title="Update Event"
        okText="Submit"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical">
          <Form.Item label="Title">
            {getFieldDecorator("title", {
              rules: [
                {
                  required: true,
                //   message: "Please input the title of collection!"
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Description">
            {getFieldDecorator("description")(<Input type="textarea" />)}
          </Form.Item>
          <Form.Item className="collection-create-form_last-form-item">
            {getFieldDecorator("modifier", {
              initialValue: "public"
            })(
              <Radio.Group>
                <Radio value="public">Public</Radio>
                <Radio value="private">Private</Radio>
              </Radio.Group>
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  };
  
  const ModalForm = Form.create({ name: "modal_form" })(ModalFormComponent);
  
  export default ModalForm;
  