import {useEffect, useState} from 'react';
import {Box, Button, Typography} from '@mui/material';
import BreadcrumbComponent from '../../components/Breadcrumbs';
import Divider from '@mui/joy/Divider';
import Input from '@mui/joy/Input';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import SelectValidate from '../../components/SelectValidate';
import {emailRegex, userNameRegex} from '../../utils/regex';
import {
    REQUIRED_EMAIL,
    REQUIRED_ROLE,
    REQUIRED_USERNAME,
    VALIDATE_DATE,
    VALIDATE_EMAIL,
    VALIDATE_PHONE_NUMBER,
    VALIDATE_USERNAME,
} from '../../utils/messageRegex';
import PopupConfirm from '../PopupConfirm';
import {useNavigate} from 'react-router-dom';
import {maxBirthDate, maxDate, minBirthDate, minDate,} from '../../utils/common';
import {FlagImage} from 'react-international-phone';
import {AsYouType, CountryCode, getCountryCallingCode, parsePhoneNumberFromString,} from 'libphonenumber-js';
import useCustomQuery from '../../hook/useQuery/useCustomQuery';
import {useMutation} from 'react-query';
import AlertMessage from '../../components/AlertMessage';
import ErrorMessage from '../../hook/useMultiLanguage/errorMessage';
import useMultiLanguageErrorAPI from '../../hook/useMultiLanguage/useMultiLanguageErrorAPI';
import {createAccountUser, getListGender, getListNation, getListRole,} from '../../api/application.api';
import MenuBar from "../../components/MenuBar";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

interface FormDataItf {
    email: string;
    username?: string;
    birthdate?: never;
    selectedCountry?: string;
    phoneNumber?: string;
    gender: string;
    nationality?: string;
    role?: string;
}

const UpdateAccount = () => {
    const listBreadcrumb = [
        {name: 'Dashboard', url: '/dashboard'},
        {name: 'Quản lý người dùng', url: '/account-list'},
        {name: 'Thông tin người dùng', url: ''},
    ];

    const newErrors = {
        email: '',
        username: '',
        birthdate: '',
        selectedCountry: '',
        phoneNumber: '',
        gender: '',
        nationality: '',
        role: '',
    };

    const [formData, setFormData] = useState<FormDataItf>({
        email: '',
        username: '',
        birthdate: null,
        selectedCountry: '',
        phoneNumber: '',
        gender: '',
        nationality: '',
        role: '',
    });

    const [errors, setErrors] = useState({
        email: '',
        username: '',
        birthdate: '',
        selectedCountry: '',
        phoneNumber: '',
        gender: '',
        nationality: '',
        role: '',
    });

    const {useQueryWithoutParams} = useCustomQuery();
    const navigate = useNavigate();
    const LANGUAGE: Record<string, string> = useMultiLanguageErrorAPI();
    const [openConfirm, setOpenConfirm] = useState(false);
    const [shouldFocus, setShouldFocus] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const {data: listNation} = useQueryWithoutParams({
        api: getListNation,
        key: 'listNation',
        options: {
            refetchOnWindowFocus: false,
        },
    });

    const {data: listGender} = useQueryWithoutParams({
        api: getListGender,
        key: 'listGender',
        options: {
            refetchOnWindowFocus: false,
        },
    });

    const {data: listRole} = useQueryWithoutParams({
        api: getListRole,
        key: 'listRole',
        options: {
            refetchOnWindowFocus: false,
        },
    });

    const {
        mutate: mutateCreateAccountUser,
        isSuccess,
        isLoading,
        error: createAccountError,
    } = useMutation({
        mutationFn: createAccountUser,
        onSuccess: () => {
            Object.keys(formData).forEach((key) => {
                formData[key as keyof typeof formData] =
                    key === 'birthdate' ? null : '';
            });
            setOpenSnackbar(true);
            setTimeout(() => {
                setOpenSnackbar(false);
            }, 5000);
        },
        onError: () => {
            setOpenSnackbar(true);
            setTimeout(() => {
                setOpenSnackbar(false);
            }, 5000);
        },
    });

    const handleChange = (e: any) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleDateChange = (date: any) => {
        if (
            (date && (date.isBefore(minDate) || date.isAfter(maxDate))) ||
            (date && !date.isValid()) ||
            date.isAfter(maxBirthDate, 'day') ||
            date.isBefore(minBirthDate, 'day')
        ) {
            newErrors.birthdate = VALIDATE_DATE;
        } else {
            newErrors.birthdate = '';
        }
        setFormData({...formData, birthdate: date});
        setErrors(newErrors);
    };

    const handlePhoneNumberChange = (value: string) => {
        const countryForFormatting = formData?.selectedCountry
            ? (formData?.selectedCountry as CountryCode)
            : undefined;
        const asYouType = new AsYouType(countryForFormatting);
        const formatted = asYouType.input(value);
        const detectedCountry = asYouType.getCountry();

        if (detectedCountry) {
            setFormData({
                ...formData,
                selectedCountry: detectedCountry,
            });
        }

        setFormData({
            ...formData,
            phoneNumber: formatted,
            selectedCountry:
                formatted && detectedCountry
                    ? detectedCountry
                    : formData.selectedCountry,
        });
    };

    const handleSelectChange = (newValue: string, nameValue: string) => {
        setFormData((prev) => ({
            ...prev,
            [nameValue]: newValue,
        }));
    };

    const handleConfirmCancel = () => {
        navigate('/account-list');
        setOpenConfirm(false);
    };

    const handleConfirmUpdate = () => {
        setOpenConfirm(true);
    };
    const validate = () => {
        // Username
        if (!formData.username) {
            newErrors.username = REQUIRED_USERNAME;
        } else if (!userNameRegex.test(formData.username)) {
            newErrors.username = VALIDATE_USERNAME;
        }

        // Email
        if (!formData.email) {
            newErrors.email = REQUIRED_EMAIL;
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = VALIDATE_EMAIL;
        }

        // Role
        if (!formData.role) {
            newErrors.role = REQUIRED_ROLE;
        }

        if (errors?.birthdate) {
            newErrors.birthdate = VALIDATE_DATE;
        } else {
            newErrors.birthdate = '';
        }

        // PhoneNumber
        const parsedNumber = parsePhoneNumberFromString(
            formData?.phoneNumber!,
            formData?.selectedCountry
                ? (formData?.selectedCountry as CountryCode)
                : undefined
        );
        const isValid = parsedNumber?.isValid;

        if (
            !formData?.phoneNumber ||
            (formData?.phoneNumber && formData?.phoneNumber.trim() === '') ||
            isValid
        ) {
            newErrors.phoneNumber = '';
        } else {
            newErrors.phoneNumber = VALIDATE_PHONE_NUMBER;
        }

        // Set the error message
        setErrors(newErrors);
        return Object.values(newErrors).every((err) => err === '');
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (validate()) {
            const parsedNumber: any = parsePhoneNumberFromString(
                formData?.phoneNumber!,
                formData?.selectedCountry
                    ? (formData?.selectedCountry as CountryCode)
                    : undefined
            );

            const payload = {
                ...formData,
                phoneNumber: parsedNumber?.formatInternational(),
                birthdate: formData?.birthdate?.format('DD/MM/YYYY'),
            };
            mutateCreateAccountUser(payload);
        }
    };

    useEffect(() => {
        if (!formData?.selectedCountry && formData?.nationality) {
            setFormData({...formData, selectedCountry: formData?.nationality});
        }
    }, [formData?.nationality]);

    useEffect(() => {
        const firstError =
            Object.entries(errors).find(([_, value]) => value !== '')?.[0] || '';

        if (firstError !== 'role') {
            window.document.getElementById(firstError)?.focus();

            setShouldFocus(false);
        } else {
            setShouldFocus(true);
        }
    }, [errors]);

    return (
        <Box sx={{display: 'flex', height: 'calc(100dvh - 64px)'}}>
            <MenuBar/>
            <Box sx={{width: '100%', padding: '10px 20px'}}>
                <AlertMessage
                    openSnackbar={openSnackbar}
                    keyName='verify'
                    isSeverity={isSuccess}
                    message={
                        isSuccess ? (
                            <div>Tài khoản được đăng ký thành công.</div>
                        ) : createAccountError?.response?.data?.data?.messageError ? (
                            `${
                                LANGUAGE[
                                    ErrorMessage[
                                        createAccountError?.response?.data?.data?.messageError
                                        ]
                                    ]
                            }`
                        ) : (
                            'Something went wrong !!!'
                        )
                    }
                />
                <PopupConfirm
                    openConfirm={openConfirm}
                    handleConfirm={handleConfirmCancel}
                    handleCloseConfirm={() => setOpenConfirm(false)}
                    buttonCancel='Hủy bỏ'
                    buttonSubmit='Xác nhận'
                    title='Bạn có chắc chắn hủy bỏ thay đổi không?'
                />
                <Typography
                    variant='h5'
                    sx={{
                        fontWeight: 'bold',
                        marginBottom: '8px',
                    }}
                >
                    Quản lý người dùng
                </Typography>
                <BreadcrumbComponent listLink={listBreadcrumb}/>
                <Typography
                    variant='h6'
                    sx={{
                        fontWeight: 'bold',
                        marginBottom: '8px',
                    }}
                >
                    Thông tin người dùng
                </Typography>
                <Box
                    component='form'
                    onSubmit={handleSubmit}
                    sx={{
                        display: 'grid',
                        justifyContent: 'center',
                        marginTop: '60px',
                        width: '100%',
                    }}
                >
                    <Box
                        sx={{display: 'grid', gridTemplateColumns: '1fr 4fr'}}
                    >
                        <Box
                            sx={{
                                height: '44px',
                                display: 'flex',
                                alignItems: 'center',
                                marginRight: '40px',
                            }}
                        ><Typography component="span" sx={{marginRight: '4px'}}>Email</Typography>
                        </Box>
                        <Box sx={{position: 'relative', marginBottom: '32px'}}>
                            <Input
                                disabled={true}
                                type='text'
                                value='votranhung@luvina.net'
                            />
                        </Box>
                    </Box>
                    <Box
                        sx={{display: 'grid', gridTemplateColumns: '1fr 4fr'}}
                    >
                        <Box
                            sx={{
                                height: '44px',
                                display: 'flex',
                                alignItems: 'center',
                                marginRight: '40px',
                            }}
                        ><Typography component="span" sx={{marginRight: '4px'}}>Họ và tên</Typography>
                            <Typography component='span' color='error'>
                                (*)
                            </Typography>
                        </Box>
                        <Box sx={{position: 'relative', marginBottom: '32px'}}>
                            <Input
                                type='text'
                                value='Vo Tran Hung'
                            />
                        </Box>
                    </Box>
                    <Box
                        sx={{display: 'grid', gridTemplateColumns: '1fr 4fr'}}
                    >
                        <Box
                            sx={{
                                height: '44px',
                                display: 'flex',
                                alignItems: 'center',
                                marginRight: '40px',
                            }}
                        >
                            <Typography component='span'>
                                Ngày sinh
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                position: 'relative',
                                marginBottom: '32px',
                            }}
                        >
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    format='DD/MM/YYYY'
                                    maxDate={maxDate}
                                    minDate={minDate}
                                    value={dayjs('2022-04-17')}
                                    slotProps={{
                                        textField: {
                                            placeholder: 'DD/MM/YYYY',
                                            sx: {
                                                height: '44px',
                                                width: '100%',
                                                '& .MuiInputBase-root': {height: 44},
                                            },
                                        },
                                    }}
                                />
                            </LocalizationProvider>
                        </Box>
                    </Box>
                    <SelectValidate
                        title='Quốc tịch'
                        defaultValue='Việt Nam'
                        value={formData?.gender}
                        name='gender'
                        onChange={handleSelectChange}
                        dataSelect={listGender?.data}
                        formData={['displayName']}
                    />
                    <Box sx={{display: 'grid', gridTemplateColumns: '1fr 4fr'}}>
                        <Box
                            sx={{
                                height: '44px',
                                display: 'flex',
                                alignItems: 'center',
                                marginRight: '40px',
                            }}
                        >
                            Số điện thoại
                        </Box>
                        <Box sx={{position: 'relative', marginBottom: '32px'}}>
                            <Input
                                sx={{
                                    height: '44px',
                                    fontSize: 18,
                                    borderColor: errors?.phoneNumber && 'rgba(196, 28, 28, 0.4)',
                                    color: errors?.phoneNumber && '#C41C1C',
                                }}
                                value='938190389'
                                onChange={(e) => handlePhoneNumberChange(e.target.value)}
                                placeholder='Số điện thoại'
                                startDecorator={
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Select
                                            variant='plain'
                                            value='VN'
                                            onChange={(_, value) =>
                                                setFormData({...formData, selectedCountry: value!})
                                            }
                                            slotProps={{
                                                listbox: {
                                                    variant: 'outlined',
                                                },
                                            }}
                                            sx={{
                                                fontSize: 18,
                                                ml: -1.5,
                                                '&:hover': {bgcolor: 'transparent'},
                                                width: '240px',
                                            }}
                                        >
                                            <Option value=''>Chọn mã Quốc gia</Option>
                                            {listNation?.data?.map((data: any) => (
                                                <Option key={data.countryCode} value={data.countryCode}>
                                                    <FlagImage
                                                        iso2={data.countryCode.toLowerCase()}
                                                        size='30px'
                                                    />
                                                    {`${data.displayName} (+${getCountryCallingCode(data.countryCode.toUpperCase() as CountryCode)})`}
                                                </Option>
                                            ))}
                                        </Select>
                                        <Divider orientation='vertical'/>
                                    </Box>
                                }
                            />
                            {errors?.phoneNumber && (
                                <Typography
                                    sx={{
                                        position: 'absolute',
                                        fontSize: 14,
                                        marginTop: '2px',
                                    }}
                                    color='error'
                                >
                                    {errors?.phoneNumber}
                                </Typography>
                            )}
                        </Box>
                    </Box>
                    <SelectValidate
                        title='Giới tính'
                        defaultValue='Nam'
                        value={formData?.gender}
                        name='gender'
                        onChange={handleSelectChange}
                        dataSelect={listGender?.data}
                        formData={['displayName']}
                    />
                    <Box
                        sx={{ display: 'grid', gridTemplateColumns: '1fr 4fr' }}
                    >
                        <Box
                            sx={{
                                height: '44px',
                                display: 'flex',
                                alignItems: 'center',
                                marginRight: '40px',
                            }}
                        >
                            Vai trò
                        </Box>
                        <Box sx={{ position: 'relative', marginBottom: '32px' }}>
                            <Select
                                disabled={true}
                                size='lg'
                                value=''
                            >
                                <Option value=''>Quản trị viên</Option>
                            </Select>
                        </Box>
                    </Box>
                    <Box
                        sx={{ display: 'grid', gridTemplateColumns: '1fr 4fr' }}
                    >
                            <Box
                                sx={{
                                    height: '44px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginRight: '40px',
                                }}
                            >
                                Trạng thái
                            </Box>
                        <Box sx={{ position: 'relative', marginBottom: '32px' }}>
                            <Select
                                size='lg'
                                value=''
                            >
                                <Option value=''>Hoạt động</Option>
                            </Select>
                        </Box>
                    </Box>
            <Box sx={{display: 'flex', justifyContent: 'right', gap: '16px'}}>
                <Button
                    onClick={() => {
                       setOpenConfirm(true)
                            }}
                    variant='outlined'
                >
                    Hủy bỏ
                </Button>
                <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    disabled={isLoading}
                >
                    Xác nhận
                </Button>
            </Box>
        </Box>
</Box>
</Box>
)
    ;
};
export default UpdateAccount;
