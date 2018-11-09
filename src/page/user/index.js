import './index.scss';
import React, { Component } from 'react';
import { Layout, Button, Form, Icon, Input, Checkbox  } from 'antd';
import UserService from '@/service/user';
import {withRouter} from "react-router-dom";


const { Header, Footer, Content } = Layout;
const FormItem = Form.Item;
class User extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.login(values);
      }
    });
  }
  login(params) {
    UserService.login(params).then((res) => {
      this.props.history.push("/home");
      console.log('login success');
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Layout className="user">
        <Header className="header text-center">
          登陆页面
        </Header>
        <Content className="content">
          <div className="login-logo text-center">
            <Icon type="user" theme="outlined" className="login-logo-icon" />
          </div>
          <Form onSubmit={this.handleSubmit}>
            <FormItem>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input your name!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox>Remember me</Checkbox>
              )}
              <a className="login-form-forgot" href="#">Forgot password</a>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
              Or <a href="#">register now!</a>
            </FormItem>
          </Form>
        </Content>
        <Footer className="footer text-center">20181105wangar</Footer>
      </Layout>
    )
  }
}

export default withRouter(Form.create()(User));