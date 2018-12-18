import './index.scss';

import React, { Component } from 'react';
import { Button, Form, Input, InputNumber, Select, Icon, DatePicker  } from 'antd';
import moneyService from '@/service/money';
import moment from 'moment';


const FormItem = Form.Item;
const Option = Select.Option;

class Fee extends Component{
  // 移除
  remove = (k) => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    if (keys.length === 1) return;
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }
  // 添加
  add = () => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(keys.length);
    // const list = form.getFieldValue("list");
    // const nextList = list.concat({
    //   pay_time: moment(),
    //   fee: "",
    //   payer: "",
    //   detail: ""
    // });
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
      // list: nextList,
    });
    // console.log(form.getFieldValue("list"), 'add');
  }
  // 提交
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        moneyService.add({ money: values.list });
        console.log('Received values of form: ', values);
      }
    });
  }


  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };
    getFieldDecorator('keys', { initialValue: [] });
    // getFieldDecorator('list', { initialValue: [{
    //   pay_time: moment(),
    //   fee: "",
    //   payer: "",
    //   detail: "",
    // }] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => {
      return (
          
      <div key={k} style={{height: 60}}>
        <FormItem
          { ...formItemLayoutWithOutLabel}
          required={false}
        >
          {getFieldDecorator(`list[${k}].pay_time`, {
            initialValue: moment().format('YYYY-MM-DD'),
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{
              // type: 'object',
              required: true,
              message: "请输入日期",
            }],
          })(
            // <DatePicker  placeholder="日期" />
            <Input placeholder="日期" />
          )}
        </FormItem>
        <FormItem
          { ...formItemLayoutWithOutLabel}
          required={false}
        >
          {getFieldDecorator(`list[${k}].fee`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{
              required: true,
              whitespace: true,
              message: "请输入金额",
            }],
          })(
            <InputNumber min={0} step={0.01} placeholder="金额" />
          )}
        </FormItem>
        <FormItem
          { ...formItemLayoutWithOutLabel}
          required={false}
        >
          {getFieldDecorator(`list[${k}].payer`, {
            initialValue: 1,
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{
              type: 'number',
              required: true,
              whitespace: true,
              message: "请输入付款人",
            }],
          })(
            <Select style={{width: 90}}>
              <Option value={1}>帆帆</Option>
              <Option value={2}>安然</Option>
              <Option value={3}>青春</Option>
            </Select>
            // <Input placeholder="付款人" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayoutWithOutLabel}
          required={false}
        >
          {getFieldDecorator(`list[${k}].detail`, {
            validateTrigger: ['onChange', 'onBlur'],
            // rules: [{
            //   required: true,
            //   whitespace: true,
            //   message: "请输入备注",
            // }],
          })(
            <Input placeholder="备注" />
          )}
        </FormItem>
        <FormItem>
          {keys.length > 1 ? (
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              disabled={keys.length === 1}
              onClick={() => this.remove(k)}
            />
          ) : null}
        </FormItem>
      </div>
      )
    });

    return (
      <Form onSubmit={this.handleSubmit} layout="inline">
        {formItems}
        <FormItem {...formItemLayoutWithOutLabel}>
          <Button type="dashed" onClick={this.add}>
            <Icon type="plus" /> Add field
          </Button>
        </FormItem>
        <FormItem {...formItemLayoutWithOutLabel}>
          <Button type="primary" htmlType="submit">Submit</Button>
        </FormItem>
      </Form>
    )
  }
};

export default Form.create()(Fee);
