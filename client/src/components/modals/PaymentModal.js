import { Button, message, Steps, theme, Table, Typography, InputNumber , Popconfirm} from 'antd'
import { useState } from 'react'

const { Text } = Typography;

const steps = [
  {
    title: 'Tiền chợ',
    content: 'First-content',
  },
  {
    title: 'Số ngày ăn',
    content: 'Second-content',
  },
  {
    title: 'Bảng tiền chợ',
    content: 'Last-content',
  },
]

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
]

const App = (props) => {
  const { token } = theme.useToken();
  const [ current, setCurrent ] = useState(0)
  // const [ total, setTotal ] = useState(props.total)
  const [ persons, setPersons ] = useState(props.persons)
  

  const next = () => {
    setCurrent(current + 1)
    if (current === 1) {
      let totalPieceDays = 0
      persons.forEach(e => {
        totalPieceDays = totalPieceDays + e.amount
      })

      setPersons(persons.map(e => {
        e.price = (props.total / totalPieceDays) * e.amount
        return e
      }))

      console.log(persons)
    }
  }

  const prev = () => {
    setCurrent(current - 1);
  }

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }))

  const columns = [
    {
      title: 'Họ và tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Ngày ăn',
      key: 'amount',
      render: (_, record) => (
        <InputNumber value={record.amount} min={1} max={31} onChange={value => {
          setPersons(persons.map(e => {
            e.amount = e._id === record._id ? value : e.amount
            return e
          }))
        }}/>
      )
    },
  ]

  const columnsResult = [
    {
      title: 'Họ và tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Tiền ăn',
      key: 'amount',
      render: (_, record) => (
        <Text strong>{`${record.price} VNĐ`}</Text>
      )
    },
  ]

  const contentStyle = {
    lineHeight: '260px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  }

  const confirm = () => {
    setCurrent(0)
    message.success('Processing complete!')
    props.close()
  }

  return (
    <>
      <Steps current={current} items={items} />
      <div style={contentStyle}>
        {current === 0 && (
          <Table columns={columnTotals} dataSource={props.totalList} 
            style={{ marginTop: '1px'}} 
            size="small" pagination={false}
            bordered scroll={{y: '22vh'}}
            footer = { () => (
              <Text strong>Tổng tiền : {(props.total + 0).toLocaleString("de-DE")} VND </Text>
            )}
          />
        )}
        {current === 1 && (
          <Table columns={columns} dataSource={props.persons} 
            style={{ marginTop: '1px'}} 
            size="small" pagination={false}
            bordered scroll={{y: '22vh'}}
          />
        )}
        {current === 2 && (
          <Table columns={columnsResult} dataSource={persons} 
            style={{ marginTop: '1px'}} 
            size="small" pagination={false}
            bordered scroll={{y: '22vh'}}
          />
        )}
      </div>
      <div className='btn-fun' style={{marginTop: 24,}}>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Tiếp
          </Button>
        )}
        {current === steps.length - 1 && (
          <Popconfirm placement='rightBottom' 
            title={'Xác nhận'} 
            description={'Bạn có chắc chắn muốn quyết toán tiền chợ như trên không?'}
            onConfirm={confirm}
            okText={'Xác nhận'}
            cancelText={'Hủy bỏ'}
          >
            <Button type="primary">Xác nhận</Button>
          </Popconfirm>
        )}
        {current > 0 && (
          <Button  style={{ margin: '0 8px', }} onClick={() => prev()}>
            Lùi
          </Button>
        )}
      </div>
    </>
  );
};
export default App;