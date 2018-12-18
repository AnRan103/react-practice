import './index.scss';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Button, Form, Input, InputNumber, Select, Table, Tag, Modal } from 'antd';
import moneyService from '@/service/money';

const { Header, Footer, Content } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: {
        list: [],
      },
      search: {
        state: '',
      },
      modal: {
        visible: false,
        data: [],
        list: [],
        sum: 0,
        average: 0,
      },
    };
    this.mounted = true;
  }
  getList() {
    moneyService.get(this.state.search).then((res) => {
      this.setState({
        data: res,
      });
    });
  }

  // 结算
  handleSubmit() {
    moneyService.getAverage().then((res) => {
      const sum = res.reduce((prev, next) => prev + next.total, 0);
      const average = sum / res.length;
      const list = [];
      const receiver = res.find(item => item.total > average);
      res.forEach((item) => {
        if (item.total < average) list.push({
          poster: item.payerName,
          receiver: receiver.payerName,
          money: average - item.total,
        });
      });
      console.log(sum, 'average');
      this.setState({
        modal: {
          data: res,
          sum,
          average,
          list,
          visible: true,
        }
      });
    });
  }
  // 完成结算
  handleOk = () => {
    // moneyService
    this.handleCancel();
  };
  // 关闭结算弹窗
  handleCancel = () => {
    this.setState({
      modal: {
        visible: false,
        data: [],
        list: [],
        sum: 0,
        average: 0,
      }
    });
  };
  handleSearchChange = (key, value) => {
    this.setState({
      search: {
        [key]: value,
      },
    });
  }
  // 查询
  handleSearch = () => {
    this.getList();
  }

  render() {
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
    const columns = [
      {
        title: '付款时间',
        dataIndex: 'pay_time',
        key: 'pay_time',
        render: text => text.split('T')[0],
      },
      {
        title: '金额',
        dataIndex: 'fee',
        key: 'fee',
      },
      {
        title: '状态',
        dataIndex: 'state',
        key: 'state',
        render: state => (
          <Tag color={ state === 1 ? 'red' : 'cyan'}>{ state === 1 ? '未结算' : '已结算' }</Tag>
        ),
      },
      {
        title: '付款人',
        dataIndex: 'payerName',
        key: 'payerName',
      },
      {
        title: '备注',
        dataIndex: 'detail',
        key: 'detail',
      },
    ];
    const averageColumns = [
      {
        title: '付款人',
        dataIndex: 'payerName',
        key: 'payerName',
      },
      {
        title: '金额',
        dataIndex: 'total',
        key: 'total',
      },
    ]
    return (
      <Layout className="home">
        <Header>首页</Header>
        <Content className="home-content">
          <div className="search-btn">
            <FormItem
              {...formItemLayout}
              label="状态："
              >
              <Select defaultValue="" style={{ width: 120 }} onChange={ this.handleSearchChange.bind(this, 'state') }>
                <Option value="">全部</Option>
                <Option value={1}>已结算</Option>
                <Option value={2}>未结算</Option>
              </Select>
            </FormItem>
            <Button onClick={this.handleSearch}>
              <Link to={`/fee`}>添加</Link>
            </Button>
            <Button onClick={this.handleSearch}>
              查询
            </Button>
            <Button onClick={() => this.handleSubmit()}>
              结算
            </Button>
          </div>
          <Table rowKey="id" columns={columns} pagination={false} dataSource={this.state.data.list} />
        </Content>
        <Footer></Footer>
        <Modal
          title="结算"
          visible={this.state.modal.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Table rowKey="payer" columns={averageColumns} pagination={false} dataSource={this.state.modal.data} />
          <p className="text-right check-sum">总金额：<span className="text-danger text-large">¥{this.state.modal.sum.toFixed(2)}</span></p>
          <p className="text-right check-sum">平均金额：<span className="text-danger text-large">¥{this.state.modal.average.toFixed(2)}</span></p>
          {
            this.state.modal.list.map((item, index) => (
              <p key={index}>{item.poster}给{item.receiver}{item.money.toFixed(2)}</p>
            ))
          }
        </Modal>
      </Layout>
    )
  }
}

export default Home;