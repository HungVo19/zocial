import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import PublicIcon from '@mui/icons-material/Public';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import Button from '@mui/material/Button';
import { Outlet, useNavigate } from 'react-router-dom';
import Input from '@mui/joy/Input';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useSelector } from 'react-redux';

const Header = () => {
  const navItems = [
    { name: 'Đăng nhập', url: '/login' },
    { name: 'Đăng ký', url: '/register' },
  ];

  const categorys = [
    { name: 'CNTT & Phần mềm', value: 'it' },
    { name: 'Thiết kế', value: 'design' },
    { name: 'Kinh doanh', value: 'business' },
    { name: 'Giảng dạy và học thuật', value: 'teaching' },
  ];

  const profiles = [
    { name: 'Dashboard', value: 'dashboard' },
    { name: 'Bài học đã lưu', value: 'lessons' },
    {
      name: 'Điều khoản sử dụng và Chính sách quyền riêng tư',
      value: 'terms',
    },
    { name: 'Đăng xuất', value: 'logout' },
  ];

  const userRole = useSelector((state: any) => state?.user?.userRole);
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorElProfile, setAnchorElProfile] = useState<null | HTMLElement>(
    null
  );
  const open = Boolean(anchorEl);
  const openProfile = Boolean(anchorElProfile);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickProfile = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElProfile(event.currentTarget);
  };

  const handleClose = (url: string) => {
    setAnchorEl(null);
    navigate(url);
  };

  const handleCloseProfile = (value: string) => {
    if (value === 'logout') {
      localStorage.removeItem('user_token');
      navigate('/login');
    }
    setAnchorElProfile(null);
  };

  const handleNavigate = (url: string) => {
    navigate(url);
  };

  return (
    <Box
      sx={{
        position: 'relative',
      }}
    >
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          width: '100%',
          zIndex: 1000,
        }}
      >
        <AppBar position='static'>
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Box
              onClick={() => handleNavigate('/')}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleNavigate('/');
                }
              }}
              tabIndex={0}
              sx={{
                textDecoration: 'unset',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '36px',
              }}
            >
              LMS
            </Box>
            <>
              <Button
                id='basic-button'
                variant='text'
                sx={{ color: '#fff' }}
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                endIcon={
                  open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
                }
                // disabled={userRole === 'ROLE_ANONIMOUS'}
              >
                Danh mục
              </Button>
              <Menu
                id='basic-menu'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                {categorys?.map((category, index) => (
                  <MenuItem
                    key={index}
                    onClick={() => handleClose(category?.value)}
                  >
                    {category?.name}
                  </MenuItem>
                ))}
              </Menu>
            </>
            <Input
              type='text'
              sx={{
                width: '100%',
                maxWidth: 500,
                minWidth: 200,
                margin: '0 20px',
              }}
              placeholder='Tìm kiếm'
              value={value}
              variant='plain'
              onChange={(event) => setValue(event.target.value)}
              endDecorator={<SearchIcon />}
            />
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                // disabled={userRole === 'ROLE_ANONIMOUS'}
                size='large'
                color='inherit'
              >
                {/*<ShoppingCartOutlinedIcon />*/}
              </IconButton>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                  <>
                    <IconButton color='inherit'>
                      <ChatBubbleOutlineOutlinedIcon />
                    </IconButton>
                    <IconButton color='inherit'>
                      <NotificationsOutlinedIcon />
                    </IconButton>
                    <IconButton color='inherit' onClick={handleClickProfile}>
                      <AccountCircleOutlinedIcon />
                    </IconButton>
                    <Menu
                      id='basic-menu'
                      anchorEl={anchorElProfile}
                      open={openProfile}
                      onClose={handleCloseProfile}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                      slotProps={{
                        paper: {
                          elevation: 0,
                          sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                              width: 32,
                              height: 32,
                              ml: -0.5,
                              mr: 1,
                            },
                            '&::before': {
                              content: '""',
                              display: 'block',
                              position: 'absolute',
                              top: 0,
                              right: 14,
                              width: 10,
                              height: 10,
                              bgcolor: 'background.paper',
                              transform: 'translateY(-50%) rotate(45deg)',
                              zIndex: 0,
                            },
                          },
                        },
                      }}
                      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                      {profiles?.map((profile, index) => (
                        <MenuItem
                          key={index}
                          onClick={() => handleCloseProfile(profile?.value)}
                        >
                          {profile?.name}
                        </MenuItem>
                      ))}
                    </Menu>
                  </>
              </Box>
              <IconButton size='large' edge='end' color='inherit'>
                <PublicIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <Outlet />
    </Box>
  );
};

export default Header;
