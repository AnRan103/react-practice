import './index.scss';

import React, { Component } from 'react';
import { Layout, Button, Form, Input, InputNumber, Select  } from 'antd';
import moneyService from '@/service/money';

const { Header, Footer, Content } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;
class Home extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        moneyService.add(values);
      }
    });
  }
  handleSearch = () => {
    moneyService.getList();
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
    return (
      <Layout className="home">
        <Header>首页</Header>
        <Content className="home-content">
          <Button onClick={this.handleSearch} className="login-form-button">
            查询
          </Button>
          <Form onSubmit={this.handleSubmit}>
            <FormItem label="金额" {...formItemLayout}>
              {getFieldDecorator('money', {
                rules: [{ required: true, message: '请输入金额!' }],
              })(
                <InputNumber min={ 0 } placeholder="请输入金额" />
              )}
            </FormItem>
            <FormItem label="备注" {...formItemLayout}>
              {getFieldDecorator('note', {
                rules: [{ required: true, message: '请输入备注!' }],
              })(
                <Input placeholder="请输入备注" />
              )}
            </FormItem>
            <FormItem label="用户" {...formItemLayout}>
              {getFieldDecorator('userId', {
                rules: [{ required: true, message: '请选择用户!' }],
              })(
                <Select style={{ width: 120 }} placeholder="请选择用户">
                  <Option value="1">王安然</Option>
                </Select>
              )}
            </FormItem>
            <FormItem className="text-center">
              <Button type="primary" htmlType="submit" className="login-form-button">
                添加
              </Button>
            </FormItem>
          </Form>
        </Content>
        <Footer></Footer>
      </Layout>
    )
  }
}

export default Form.create()(Home);