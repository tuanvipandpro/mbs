import { TeamOutlined, ScheduleOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

import { useNavigate } from 'react-router-dom';

const getItem = (label, key, icon, children, type) => {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem('Bảng lương', '2', <ScheduleOutlined />),
  getItem('DQTT', '1', <TeamOutlined />),
];

const App = (props) => {
  const navigate = useNavigate()

  const onClick = (e) => {
    if (e.key === '1') navigate('/person')
    else navigate('/')
  };


  return (
    <Menu
      onClick={onClick}
      // style={{
      //   width: '18vw',
      //   height: '100vh',
      // }}
      defaultSelectedKeys={[props.selected]}
      // defaultOpenKeys={['sub1']}
      // mode="inline"
      theme='dark'
      items={items}
    />
  );
};
export default App;