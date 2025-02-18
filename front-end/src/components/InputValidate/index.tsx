import Input from '@mui/joy/Input';
import { Box, Typography } from '@mui/material';

interface InputValidateItf {
  required?: boolean;
  value?: any;
  onChange: any;
  iconEndDecorator?: any;
  errorMessage?: any;
  placeholder?: string;
  name: string;
  id: string;
  type?: string;
  title?: string;
  maxLength?: number;
}

const InputValidate = ({
  required,
  value,
  onChange,
  iconEndDecorator,
  errorMessage,
  placeholder,
  name,
  id,
  type,
  title,
  maxLength,
}: InputValidateItf) => {
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
          {title}
          {required && (
            <Typography component='span' color='error'>
              *
            </Typography>
          )}
        </Box>
      )}
      <Box sx={{ position: 'relative', marginBottom: '32px' }}>
        <Input
            disabled={true}
          id={id}
          name={name}
          type={type ?? 'text'}
          size='lg'
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          endDecorator={iconEndDecorator}
          error={!!errorMessage}
          slotProps={{ input: { maxLength: maxLength } }}
        />
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
export default InputValidate;
