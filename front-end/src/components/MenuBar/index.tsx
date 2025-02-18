import { useState } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MenuBar = () => {
  const navigate = useNavigate();
  const [openId, setOpenId] = useState('');
  const [selected, setSelected] = useState('1');
  const userRole = useSelector((state: any) => state?.user?.userRole);

  const handleClick = (id: string, idChild?: string, url?: string) => {
    setOpenId(openId === id && !idChild ? '' : id);
    setSelected(idChild ? idChild : id);
    url && navigate(url);
  };

  const MENU_BAR_ROLE_ADMIN = [
    { id: '1', name: 'Dashboard', url: '/dashboard', child: [] },
    { id: '2', name: 'Quản lý người dùng', url: '/account-list', child: [] },
    {
      id: '3',
      name: 'Quản lý khóa học',
      url: '/course-list',
      child: [
        {
          id: '3.1',
          name: 'Quản lý khóa học',
          url: '/course-list',
        },
        { id: '3.2', name: 'Quản lý lộ trình học tập', url: '/learning-path' },
        {
          id: '3.3',
          name: 'Quản lý nội dung khóa học',
          url: '/course-content',
        },
        { id: '3.4', name: 'Đánh giá và xác định giá', url: '/evaluate' },
      ],
    },
    {
      id: '4',
      name: 'Liên lạc',
      url: '/contact',
      child: [
        { id: '4.1', name: 'Nhắn tin', url: '/contact' },
        { id: '4.2', name: 'Thông báo', url: '/notification' },
        { id: '4.3', name: 'Giao tiếp và hợp tác', url: '/communicate' },
      ],
    },
    { id: '5', name: 'Live streaming', url: '/live-stream', child: [] },
    { id: '6', name: 'Settings', url: '/setting', child: [] },
  ];

  const MENU_BAR_ROLE_USER = [
    { id: '1', name: 'Trang chủ', url: '/', child: [] },
    { id: '2', name: 'Quản lý người dùng', url: '/account-list', child: [] },
    {
      id: '3',
      name: 'Quản lý khóa học',
      url: '/course-list',
      child: [
        {
          id: '3.1',
          name: 'Quản lý nội dung khóa học',
          url: '/course-content',
        },
        { id: '3.2', name: 'Quản lý lộ trình học tập', url: '/learning-path' },
        {
          id: '3.3',
          name: 'Quản lý nội dung khóa học',
          url: '/course-content',
        },
        { id: '3.4', name: 'Đánh giá và xác định giá', url: '/evaluate' },
      ],
    },
    {
      id: '4',
      name: 'Liên lạc',
      url: '/contact',
      child: [
        { id: '4.1', name: 'Nhắn tin', url: '/texting' },
        { id: '4.2', name: 'Thông báo', url: '/notification' },
        { id: '4.3', name: 'Giao tiếp và hợp tác', url: '/communicate' },
      ],
    },
    { id: '5', name: 'Live streaming', url: '/live-stream', child: [] },
    { id: '6', name: 'Settings', url: '/setting', child: [] },
  ];

  const MENU_BAR: any = {
    ROLE_ADMIN: MENU_BAR_ROLE_ADMIN,
    ROLE_TEACHER: MENU_BAR_ROLE_ADMIN,
    ROLE_STUDENT: MENU_BAR_ROLE_USER,
    ROLE_ANONIMOUS: MENU_BAR_ROLE_USER,
  };

  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 260,
        borderRight: '1px solid #1976D2',
      }}
      component='nav'
      aria-labelledby='nested-list-subheader'
    >
      {MENU_BAR[userRole].map((data: any) => {
        return data.child.length > 0 ? (
          <Box key={data.id}>
            <ListItemButton
              selected={selected === data.id}
              onClick={() => handleClick(data.id, '', data?.url)}
            >
              <ListItemText primary={data.name} />
              {openId === data.id ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openId === data.id} timeout='auto' unmountOnExit>
              <List component='div' disablePadding>
                {data.child.map((dataChild: any) => (
                  <ListItemButton
                    selected={selected === dataChild.id}
                    onClick={() =>
                      handleClick(data.id, dataChild.id, dataChild?.url)
                    }
                    key={dataChild.id}
                    sx={{ pl: 4 }}
                  >
                    <ListItemText primary={dataChild.name} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </Box>
        ) : (
          <ListItemButton
            key={data.id}
            selected={selected === data.id}
            onClick={() => handleClick(data.id, '', data?.url)}
          >
            <ListItemText primary={data.name} />
          </ListItemButton>
        );
      })}
    </List>
  );
};

export default MenuBar;
