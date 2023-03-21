import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Space, InputNumber, DatePicker, Typography } from 'antd';
import { TYPE_ENUM } from '../../utils/constants'
import { useState } from 'react';
import moment from 'moment'

const { Text } = Typography

const types = TYPE_ENUM.map(e => {
  return {
    label: e,
    value: e
  }
})

const App = (props) => {
  const [form] = Form.useForm()
  const [date, setDate] = useState(null)
  const [marketer, setMarketer] = useState(null)

  const onFinish = (values) => {
    console.log('Received values of form:', values)
  }

  const handleChange = (value) => {
    setMarketer(props.persons.find(e => e._id === value))
    form.setFieldsValue({sights: [],})
  }

  return (
    <Form
      form={form}
      name="dynamic_form_complex"
      onFinish={onFinish}
      autoComplete="off"
    >
      <Space style={{display: 'flex'}}>
        <Form.Item
          name="date"
          label="Ngày chợ"
          rules={[{ required: true, message: 'Vui lòng chọn ngày đi chợ', },]}
        >
          <DatePicker placeholder='Ngày ghi sổ' value={date} onChange={e => setDate(e)}/>
        </Form.Item>
        <Form.Item
          name="marketer"
          style={{width: 300,}}
          label="Người đi chợ"
          rules={[{ required: true, message: 'Vui lòng chọn người đi chợ', },]}
        >
          <Select options={props.persons} onChange={handleChange} disabled={!date}/>
        </Form.Item>
      </Space>
      <Form.List name="list">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field) => (
              <Space key={field.key} align="baseline">
                <Form.Item
                  {...field}
                  name={[field.name, 'type']}
                  rules={[{ required: true,  message: 'Vui lòng nhập danh mục', },]}
                  label="Danh mục"
                >
                  <Select options={types} style={{width: 100,}}/>
                </Form.Item>
                <Form.Item
                  {...field}
                  label="Nội dung"
                  name={[field.name, 'content']}
                  rules={[{ required: true,  message: 'Vui lòng nhập nội dung', },]}
                >
                  <Input placeholder='Nội dung'/>
                </Form.Item>
                <Form.Item
                  {...field}
                  label="Tổng tiền"
                  name={[field.name, 'price']}
                  rules={[{ required: true,  message: 'Vui lòng nhập tổng tiền', },]}
                >
                  <InputNumber placeholder='Giá tiền' min={0} style={{ width: 100, }} 
                    onChange={value => {
                      console.log(value)
                    }}/>
                </Form.Item>

                <MinusCircleOutlined onClick={() => remove(field.name)} />
              </Space>
            ))}

            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />} disabled={!marketer}>
                Ghi thêm
              </Button>
            </Form.Item>
            <Text strong>Tổng tiền {0} VND </Text>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Ghi chợ
        </Button>
      </Form.Item>
    </Form>
  )
}
export default App