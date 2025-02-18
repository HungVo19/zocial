import { Box, Breadcrumbs, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface BreadcrumbItf {
  listLink: { name: string; url: string }[];
}

const BreadcrumbComponent = ({ listLink }: BreadcrumbItf) => {
  const navigate = useNavigate();

  const handleNavigate = (url: string) => {
    navigate(url);
  };

  return (
    <Breadcrumbs
      sx={{ height: '24px', marginBottom: '16px' }}
      maxItems={4}
      aria-label='breadcrumb'
    >
      {listLink?.map((item, index) => {
        return item?.url ? (
          <Box
            key={index}
            sx={{ cursor: 'pointer', textDecoration: 'underline' }}
            onClick={() => handleNavigate(item?.url)}
          >
            {item?.name}
          </Box>
        ) : (
          <Typography key={index} sx={{ color: 'text.primary' }}>
            {item?.name}
          </Typography>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadcrumbComponent;
