import dayjs from 'dayjs';

export const minDate = dayjs('1900-01-01'); // Ngày nhỏ nhất hợp lệ
export const maxDate = dayjs('2099-12-31'); // Ngày lớn nhất hợp lệ
export const minBirthDate = dayjs().subtract(100, 'year'); // Ngày sinh xa nhất hợp lệ
export const maxBirthDate = dayjs(); // Ngày sinh gần nhất hợp lệ
