import { Box, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";

interface DatePickerValidateItf {
  required?: boolean;
  value?: any;
  onChange?: any;
  iconEndDecorator?: any;
  errorMessage?: any;
  placeholder?: string;
  name?: string;
  type?: string;
  title?: string;
  maxDate?: any;
  minDate?: any;
}

const DatePickerValidate = ({
  required,
  title,
  onChange,
  placeholder,
  errorMessage,
  value,
  maxDate,
  minDate,
}: DatePickerValidateItf) => {
  return (
    <Box
      sx={{ display: 'grid', gridTemplateColumns: title ? '1fr 4fr' : '5fr' }}
    >
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
      <Box
        sx={{
          position: 'relative',
          marginBottom: '32px',
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
              disabled={true}
            format='DD/MM/YYYY'
            onChange={onChange}
            maxDate={maxDate}
            minDate={minDate}
            value= {dayjs('2022-04-17')}
            slotProps={{
              textField: {
                placeholder: placeholder,
                sx: {
                  height: '44px',
                  width: '100%',
                  '& .MuiInputBase-root': { height: 44 },
                },
              },
            }}
          />
        </LocalizationProvider>
        {errorMessage && (
          <Typography
            sx={{
              position: 'absolute',
              fontSize: 14,
              marginTop: '2px',
            }}
            color='error'
          >
            {errorMessage}
          </Typography>
        )}
      </Box>
    </Box>
  );
};
export default DatePickerValidate;
