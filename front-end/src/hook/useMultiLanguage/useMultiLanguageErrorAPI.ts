const useMultiLanguageErrorAPI = () => {
  const EMAIL_ALREADY_EXISTS = 'Tài khoản Email này đã được đăng ký.';
  const INVALID_EMAIL = 'Email điền sai định dạng.';
  const INVALID_TOKEN = 'Email đã được xác thực.';
  const USER_NOT_FOUND = 'Không tìm thấy tài khoản người dùng';
  const ACCOUNT_ALREADY_ACTIVE = 'Tài khoản đã được xác thực';
  const SEND_EMAIL_ERROR = 'Gửi Email xác thực thất bại';
  const INVALID_EMAIL_OR_PASSWORD = 'Email hoặc Mật khẩu không đúng';
  const INACTIVE_ACCOUNT = 'Tài khoản chưa được xác thực';
  const USER_IS_BLOCKED = 'Tài khoản đã bị chặn';
  const NEW_PASSWORD_CAN_NOT_BE_THE_SAME_WITH_OLD_PASSWORD =
    'Mật khẩu mới không được trùng với mật khẩu gần nhất. Vui lòng chọn mật khẩu khác.';
  const ACCOUNT_IS_NOT_VERIFIED = 'Tài khoản chưa được xác thực';
  const CANNOT_DELETE_OWN_ACCOUNT = 'Không thể xóa tài khoản của chính mình.';
  const INVALID_SORT_FIELD = 'Trường sắp xếp không hợp lệ.';
  const INVALID_SORT_DIRECTION = 'Hướng sắp xếp không hợp lệ.';
  const INVALID_PAGE_NUMBER = 'Số trang không hợp lệ.';
  const INVALID_PAGE_SIZE = 'Kích thước trang không hợp lệ.';
  const INVALID_DATE_FORMAT = 'Định dạng ngày không hợp lệ.';
  const INVALID_AGE = 'Tuổi không hợp lệ.';
  const ACCOUNT_IS_DELETED = 'Tài khoản đã bị xóa.';
  const ACCOUNT_IS_DISABLED = 'Tài khoản đã bị vo hiệu hóa.';

  return {
    EMAIL_ALREADY_EXISTS,
    INVALID_EMAIL,
    INVALID_TOKEN,
    USER_NOT_FOUND,
    ACCOUNT_ALREADY_ACTIVE,
    SEND_EMAIL_ERROR,
    INVALID_EMAIL_OR_PASSWORD,
    INACTIVE_ACCOUNT,
    USER_IS_BLOCKED,
    NEW_PASSWORD_CAN_NOT_BE_THE_SAME_WITH_OLD_PASSWORD,
    ACCOUNT_IS_NOT_VERIFIED,
    CANNOT_DELETE_OWN_ACCOUNT,
    INVALID_SORT_FIELD,
    INVALID_SORT_DIRECTION,
    INVALID_PAGE_NUMBER,
    INVALID_PAGE_SIZE,
    INVALID_DATE_FORMAT,
    INVALID_AGE,
    ACCOUNT_IS_DELETED,
    ACCOUNT_IS_DISABLED,
  };
};

export default useMultiLanguageErrorAPI;
