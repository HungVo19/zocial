import {Box, Button, Input, Select, Typography} from "@mui/joy";
import {useEffect, useState} from "react";
import Option from '@mui/joy/Option';
import {AsYouType, CountryCode, getCountryCallingCode, parsePhoneNumberFromString} from 'libphonenumber-js';
import {FlagImage} from 'react-international-phone';

const countries = [
    {iso2: 'VN', name: 'Vietnam'},
    {iso2: 'US', name: 'United States'},
    {iso2: 'GB', name: 'United Kingdom'},
]

const Demo = () => {

    const [phoneNumber, setPhoneNumber] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");
    const [nationality, setNationality] = useState("");
    const [tel, setTel] = useState("");
    const [error, setError] = useState<string | null>(null);

    // Validate phoneNumber
    useEffect(() => {
        if (phoneNumber.trim() === "") {
            setError(null);
            return;
        }
        const parsedNumber = parsePhoneNumberFromString(
            phoneNumber,
            selectedCountry ? (selectedCountry as CountryCode) : undefined
        );
        const isValid = parsedNumber?.isValid || false;
        setError(isValid ? null : "Số điện thoại không hợp lệ");
    }, [phoneNumber, selectedCountry]);

    // Handle phoneNumber change
    const handlePhoneNumberChange = (value: string) => {
        const countryForFormatting = selectedCountry ? (selectedCountry as CountryCode) : undefined;
        const asYouType = new AsYouType(countryForFormatting);
        const formatted = asYouType.input(value);
        const detectedCountry = asYouType.getCountry();
        if (detectedCountry) {
            setSelectedCountry(detectedCountry);
        }
        setPhoneNumber(formatted);
    }

    // Handle selectedCountry change
    const handleCountryChange = (value: string) => {
        const newCountry = value;
        setSelectedCountry(newCountry);
        if (phoneNumber) {
            const asYouType = new AsYouType(newCountry as CountryCode);
            const formattedNumber = asYouType.input(phoneNumber);
            setPhoneNumber(formattedNumber);
        }
    }

    // Handle nationality change
    const handleNationalityChange = (value: string) => {
        setNationality(value);
        setSelectedCountry(value as CountryCode);
        if (phoneNumber) {
            const asYouType = new AsYouType(value as CountryCode);
            const formattedNumber = asYouType.input(phoneNumber);
            setPhoneNumber(formattedNumber);
        }
    }

    const getInternationalPhoneFormat = () => {

        if (phoneNumber.trim() === "" && selectedCountry.trim() === "") {
            console.log("No phone number submitted");
            return;
        }

        const parsedNumber = parsePhoneNumberFromString(
            phoneNumber,
            selectedCountry ? (selectedCountry as CountryCode) : undefined
        );
        if (!parsedNumber || !parsedNumber.isValid) {
            setError("Invalid number");
            return;
        }

        // Convert to international format
        const internationalNumber = parsedNumber.formatInternational();
        setTel(internationalNumber)
        console.log("International format:", internationalNumber);
    }


    return (
        <Box sx={{display: 'flex', height: 'calc(100dvh - 64px)', marginBottom: '12rem'}}>
            <Box
                sx={{
                    margin: '0 auto',
                    marginTop: '12rem',
                }}>
                <Input
                    value={phoneNumber}
                    onChange={(e) => handlePhoneNumberChange(e.target.value)}
                    size='lg'
                    placeholder="Số điện thoại"
                    startDecorator={
                        <Select
                            variant="plain"
                            slotProps={{
                                listbox: {
                                    variant: 'outlined',
                                },
                            }}
                            sx={{mr: -1.5, '&:hover': {bgcolor: 'transparent'}}}
                            value={selectedCountry}
                            onChange={(_, value) => handleCountryChange(value)}
                        >
                            <Option value=''>Chọn mã quốc gia</Option>
                            {countries.map((data) => (
                                <Option key={data.iso2} value={data.iso2}>
                                    <FlagImage iso2={data.iso2.toLowerCase()} size="30px"/>
                                    {`${data.name} (+${getCountryCallingCode(data.iso2.toUpperCase() as CountryCode)})`}
                                </Option>
                            ))}
                        </Select>
                    }
                />
                {error && <div style={{color: 'red', marginTop: 8}}>{error}</div>}
                <Box sx={{marginTop: 5}}>
                    <Select
                        slotProps={{
                            listbox: {
                                variant: 'outlined',
                            },
                        }}
                        sx={{mr: -1.5, '&:hover': {bgcolor: 'transparent'}}}
                        value={nationality}
                        onChange={(_, value) => handleNationalityChange(value as CountryCode)}
                    >
                        <Option value=''>Chọn mã quốc gia</Option>
                        {countries.map((data) => (
                            <Option key={data.iso2} value={data.iso2}>
                                <FlagImage iso2={data.iso2.toLowerCase()} size="30px"/>{data.name}
                            </Option>
                        ))}
                    </Select>
                    <Box sx={{marginTop: 5, display: 'flex', gap: 2, flexWrap: 'wrap'}}>
                        <Button onClick={getInternationalPhoneFormat}>Lấy số điện thoại</Button>
                    </Box>
                    <Box sx={{marginTop: 5, display: 'flex', gap: 2, flexWrap: 'wrap'}}>
                        <Typography component="div">Số điện thoại gửi về backend là: {tel}</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Demo;