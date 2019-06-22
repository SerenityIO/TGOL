import React from 'react';
import {
    Form,
    Input,
    Tooltip,
    Icon,
    Button,
    message
} from 'antd';
import { withRouter } from "react-router-dom";

let DataBase = (JSON.parse(window.localStorage.getItem('DataBase'))) ? JSON.parse(window.localStorage.getItem('DataBase')) : [];
console.log('DataBase', DataBase);


class RegistrationForm extends React.Component {
    state = {
        confirmDirty: false,

    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            let temp = 0;
            if (!err) {
                temp = 0;
                if (DataBase.length !== 0) {
                    DataBase.forEach(comp => {

                        if (comp.email === values.email || comp.nickname === values.nickname) {

                            temp = 1;
                        }

                        else {

                            DataBase.push(
                                {
                                    nickname: values.nickname,
                                    email: values.email,
                                    password: values.password,
                                    isOnline: false
                                }
                            );
                            window.localStorage.setItem('DataBase', JSON.stringify(DataBase));
                            this.props.history.push('/auth');
                        }
                    });
                    if (temp === 1) {
                        message.error('This user already exist');
                    }
                }
                else {
                    DataBase.push(
                        {
                            nickname: values.nickname,
                            email: values.email,
                            password: values.password,
                            isOnline: false
                        }
                    );
                    window.localStorage.setItem('DataBase', JSON.stringify(DataBase));
                    this.props.history.push('/auth');
                }
            }
        });
    };

    handleConfirmBlur = e => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };


    toLogin = () => {
        this.props.history.push('/auth');
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        return (
            <div className="enter">
                <Form className="regForm" {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item label="E-mail">
                        {getFieldDecorator('email', {
                            rules: [
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="Password" hasFeedback>
                        {getFieldDecorator('password', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                                {
                                    validator: this.validateToNextPassword,
                                },
                            ],
                        })(<Input.Password />)}
                    </Form.Item>
                    <Form.Item label="Confirm Password" hasFeedback>
                        {getFieldDecorator('confirm', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                {
                                    validator: this.compareToFirstPassword,
                                },
                            ],
                        })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                    </Form.Item>
                    <Form.Item
                        label={
                            <span>
                                Nickname&nbsp;
                <Tooltip title="What do you want others to call you?">
                                    <Icon type="question-circle-o" />
                                </Tooltip>
                            </span>
                        }
                    >
                        {getFieldDecorator('nickname', {
                            rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" className="login-form-button" htmlType="submit">
                            Register
            </Button>
                        <Button type="primary" className="login-form-button" onClick={this.toLogin}>Login now</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

const RegistrationForm1 = Form.create({ name: 'register' })(RegistrationForm);

export default withRouter(RegistrationForm1);
