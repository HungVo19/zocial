import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import { Box, Typography } from '@mui/material';

interface SelectValidateItf {
  required?: boolean;
  value: any;
  name?: string;
  onChange: any;
  autoFocus?: boolean;
  errorMessage?: string;
  dataSelect: any;
  defaultValue?: string;
  title?: string;
  formData: string[];
}

const SelectValidate = ({
  required,
  value,
  name,
  onChange,
  autoFocus,
  errorMessage,
  dataSelect,
  defaultValue,
  title,
  formData,
}: SelectValidateItf) => {
  return (
    <Box
      sx={{ display: 'grid', gridTemplateColumns: title ? '1fr 4fr' : '5fr' }}
    >
      {title && (
        <Box
          sx={{
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            marginRight: '40px',
          }}
        >
          {title}{' '}
          {required && (
            <Typography component='span' color='error'>
              *
            </Typography>
          )}
        </Box>
      )}
      <Box sx={{ position: 'relative', marginBottom: '32px' }}>
        <Select
            // disabled={true}
          size='lg'
          value={value}
          onChange={(_, newValue) => onChange(newValue, name)}
          autoFocus={autoFocus}
          sx={{
            borderColor: errorMessage && 'rgba(196, 28, 28, 0.4)',
            color: errorMessage && '#C41C1C',
          }}
        >
          <Option value=''>{defaultValue}</Option>
          {dataSelect?.map((data: any, index: string) => {
            const firstKey = formData?.[0];
            const secondKey = formData?.[1];

            return (
              <Option key={index} value={data?.[`${firstKey}`]}>
                {data?.[`${secondKey}`] ?? data?.[`${firstKey}`]}
              </Option>
            );
          })}
        </Select>
        {errorMessage && (
          <Typography
            sx={{ position: 'absolute', fontSize: 14, marginTop: '2px' }}
            color='error'
          >
            {errorMessage}
          </Typography>
        )}
      </Box>
    </Box>
  );
};
export default SelectValidate;
