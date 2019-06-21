import React from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import { withRouter } from "react-router-dom";

let DataBase = (JSON.parse(window.localStorage.getItem('DataBase'))) ? JSON.parse(window.localStorage.getItem('DataBase')) : [];

class Auth extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        if (DataBase && DataBase.length) {
          let i = 0;
          DataBase.forEach(element => {
            if (values.username === element.nickname && values.password === element.password) {
              element.isOnline = true;
              window.localStorage.setItem('DataBase', JSON.stringify(DataBase));
              this.props.history.push('/field');
              i++;
            }
            if (i === 0) {
              message.error('Invalid user');
            }
          });
        }
      }
    });
  };

  toReg = () => {
    this.props.history.push('/reg');
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          <Button type="primary" className="login-form-button" onClick={this.toReg}>
            Register now
            </Button>
        </Form.Item>
      </Form>
    );
  }
}

const Auth1 = Form.create({ name: 'normal_login' })(Auth);

export default withRouter(Auth1);