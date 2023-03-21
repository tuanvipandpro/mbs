/* eslint-disable react-hooks/exhaustive-deps */
import { Layout, Statistic, Popover, message, Select, Input, InputNumber, Space, Spin, Table, Button, DatePicker, Divider, Modal } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react';
import moment from 'moment'

import CommonMenu from '../components/Menu'
import PaymentModal from '../components/modals/PaymentModal'
import MarketModal from '../components/modals/MarketModal'

import { TYPE_ENUM } from '../utils/constants'
import MarketAction from '../redux/actions/market'
import PersonAction from '../redux/actions/person'


const { Content, Footer, Sider } = Layout;

const types = TYPE_ENUM.map(e => {
  return {
    label: e,
    value: e
  }
})

const App = () => {
  const dispatch = useDispatch()
  const [collapsed, setCollapsed] = useState(false);
  const [tableData, setTableData] = useState([])
  const [totalData, setTotalData] = useState(1000)
  const [totalsData, setTotalsData] = useState([])
  const [optionsPerson, setOptionsPerson] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalTotalOpen, setIsModalTotalOpen] = useState(false)
  const [date, setDate] = useState(moment(new Date()))
  const [type, setType] = useState(TYPE_ENUM[0])
  const [totalMarket, setTotalMarket] = useState(1000)
  const [content, setContent] = useState('')
  const [marketer, setMarketer] = useState({})

  const [loading, setLoading] = useState(false)

  const [messageApi, contextHolder] = message.useMessage();

  const markets = useSelector(state => state.market.list)
  const total = useSelector(state => state.market.total)
  const totals = useSelector(state => state.market.totals)
  const amount = useSelector(state => state.market.amount)
  const persons = useSelector(state => state.person.options)
  const marketLoading = useSelector(state => state.market.loading)

  const loadingIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  );

  useEffect(() => {
    dispatch(MarketAction.onGetList())
    dispatch(PersonAction.onGetList())
  }, [])

  useEffect(() => {
    setTableData(markets)
    setTotalData(total)
    setTotalsData(totals)
  }, [markets])

  useEffect(() => {
    if (!marketLoading && loading) {
      setLoading(false)
      setIsModalOpen(false)
      dispatch(MarketAction.onGetList())
      messageApi.success('Ghi sổ chợ thành công')
    }
  }, [marketLoading])

  useEffect(() => {
    setOptionsPerson(persons)
  }, [persons])

  const resetDataModal = () => {
    setType('')
    setContent('')
    setMarketer({})
    setTotalMarket(1000)
    setDate(moment(new Date()))
  }

  const handleOk = () => {
    const data = {
      type: type,
      marketer: marketer,
      date: date,
      total: totalMarket,
      content: content
    }

    setLoading(true)
    dispatch(MarketAction.onCreate(data))
    resetDataModal()

  }

  const handleCancel = () => {
    resetDataModal()
    setIsModalOpen(false);
  }

  const columns = [
    {
      title: 'Ngày mua',
      dataIndex: 'date',
      key: 'date',
      render: (_, record) => {
        return `${moment(record.date).format('DD-MM-YYYY')}`
      },
    },
    {
      title: 'Nấu ăn',
      key: 'makerter_nm',
      render: (_, record) => {
        return `${record.marketer ? record.marketer.name : null}`
      },
    },
    {
      title: 'Loại',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Nội dung',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary"> Cập nhật </Button>
        </Space>
      ),
    },
  ];

  const columnTotals = [
    {
      title: 'Loại',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Tổng tiền (VND)',
      dataIndex: 'total',
      key: 'total',
    },
  ];

  const closeModal = () => {
    setIsModalTotalOpen(false)
  }

  const statisticTable = () => (
    <Table columns={columnTotals} dataSource={totalsData} 
      style={{ marginTop: '10px', width: '30vw'}} 
      size="small" pagination={false}
      bordered scroll={{y: '22vh'}}
    />
  )

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {contextHolder}
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div
          style={{
            height: 32,
            margin: 16,
            background: 'rgba(255, 255, 255, 0.2)',
          }}
        />
        <CommonMenu selected='2'/>
        {/* <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} /> */}
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: '0 16px', }}>
          <Space style={{ marginTop: '5px'}} >
            <Button onClick={() => setIsModalTotalOpen(true)}>Tổng kết</Button> 
            <Button onClick={() => setIsModalOpen(true)}>Ghi chợ</Button> 
          </Space>
          <Table columns={columns} dataSource={tableData} style={{ marginTop: '5px'}} 
            bordered scroll={{y: '32vh'}} pagination={false}
          />
          <Divider>Tổng cộng</Divider>
          <Space>
            <div>
              <Popover content={statisticTable} title={'Bảng thống kê tiền ăn'}>
                <Statistic title={`Tổng tiền`} value={totalData + 0} suffix={' VND'} style={{marginLeft: '1vw'}}/>
              </Popover>
            </div>
          </Space>
          <Modal title="Ghi sổ chợ" centered width={800} open={isModalOpen} footer={null} onOk={handleOk} onCancel={handleCancel}>
            {/* <Spin spinning={loading} indicator={loadingIcon}>
              <Space direction='vertical' style={{display: 'flex'}}>
                <DatePicker placeholder='Ngày ghi sổ' value={date} onChange={e => {setDate(e)}}/>
                <Space>
                  <Select allowClear options={types} defaultValue={types[0]} style={{width: 120}}
                    onChange={e => setType(e)}
                  />
                  <InputNumber defaultValue={1000} min={1000} style={{width: 120}} controls={false} 
                    onChange={value => setTotalMarket(value)}
                  />
                </Space>
                <Input placeholder="Nội dung ghi sổ" value={content} 
                  onChange={e => setContent(e.target.value)}
                />
                <Select placeholder="Người đi chợ" options={optionsPerson} style={{width: 250}}
                  onChange={e => {
                    setMarketer({
                      _id: optionsPerson.find(i => i.value === e)._id,
                      name: optionsPerson.find(i => i.value === e).name
                    })
                  }}
                />
              </Space>
            </Spin> */}
            <MarketModal persons={persons}/>
          </Modal>
          <Modal title="Quyết toán" 
            open={isModalTotalOpen} 
            onOk={() => setIsModalTotalOpen(false)}
            onCancel={() => setIsModalTotalOpen(false)}
            footer={null}
          >
            <PaymentModal total={totalData} totalList={totalsData} 
              persons={!persons ? [] : persons.map(e => {
                e.amount = amount
                return e
              })} 
              close={closeModal}
            />
          </Modal>
        </Content>
        <Footer style={{textAlign: 'center', height: '7vh'}}>
          Copyright of TuanLM ©2023
        </Footer>
      </Layout>
    </Layout>
  )
}
export default App;