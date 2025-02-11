import {Box, Divider, Input, Select} from "@mui/joy";
import React, {useState} from "react";
import Option from '@mui/joy/Option';

const countries = [
    {iso2: 'vn', name: 'Vietnam'},
    {iso2: 'us', name: 'United States'},
    {iso2: 'uk', name: 'United Kingdom'},
]


const Demo = () => {

    const [phoneNumber, setPhoneNumber] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");

    return (
        <Box
            sx={{
                height: 200,
                width: 900,
                my: 4,
                display: 'flex',
                margin: 'auto',
                alignItems: 'center',
                gap: 4,
                p: 2,
            }}>
            <Input
                size = 'lg'
                placeholder="Số điện thoại"
                sx = {{width : 'fullWidth'}}
                startDecorator={
                    <React.Fragment>
                        <Select
                            variant="plain"
                            slotProps={{
                                listbox: {
                                    variant: 'outlined',
                                },
                            }}
                            sx={{mr: -1.5, '&:hover': {bgcolor: 'transparent'}}}
                            value={selectedCountry}
                            onChange={(_, value) => setSelectedCountry(value!)}
                        >
                            <Option value=''>Chọn mã quốc gia</Option>
                            {countries.map((data) => (
                                <Option key={data.iso2} value={data.iso2}>
                                    {data.name}
                                </Option>
                            ))})
                        </Select>
                    </React.Fragment>
                }
                sx={{width: 300}}
            />
        </Box>
    )
}

export default Demo;