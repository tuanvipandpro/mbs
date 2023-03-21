/* eslint-disable react-hooks/exhaustive-deps */
import { Layout, Space, Table, Button, Modal, Input, DatePicker } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react';

import CommonMenu from '../components/Menu'

import PersonAction from '../redux/actions/person'

const { Content, Footer, Sider } = Layout;

const columns = [
  {
    title: 'Họ và tên',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Ngày Sinh',
    dataIndex: 'birthdate',
    key: 'birthdate',
  },
  {
    title: 'Địa chỉ',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button type="primary" danger> Xóa</Button>
      </Space>
    ),
  },
];

const App = () => {
  const dispatch = useDispatch()
  const [collapsed, setCollapsed] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [tableData, setTableData] = useState([])
  const persons = useSelector(state => state.person.list)

  useEffect(() => {
    dispatch(PersonAction.onGetList())
  }, [])

  useEffect(() => {
    setTableData(persons)
  }, [persons])

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }
  

  return (
    <Layout style={{ minHeight: '100vh', }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)',}} />
        <CommonMenu selected='1'/>
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: '0 16px', }}>
          <Button style={{ marginTop: '5px' }} onClick={() => setIsModalOpen(true)}>Thêm mới</Button>
          <Table columns={columns} dataSource={tableData} scroll={{y: '65vh'}} pagination={false} style={{ marginTop: '5px' }}/>
          <Modal title="Kết nạp mới" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <Space direction='vertical' style={{display: 'flex'}}>
            <Space>
              <Input placeholder='Họ Và Tên' style={{ width: 250 }}/>
              <DatePicker placeholder='Ngày Sinh'/>
            </Space>
            <Input placeholder='Địa chỉ'/>
          </Space>
          </Modal>
        </Content>
        <Footer style={{ textAlign: 'center', height: '7vh'}}>
          Copyright of TuanLM ©2023
        </Footer>
      </Layout>
    </Layout>
  );
};
export default App;