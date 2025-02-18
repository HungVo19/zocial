export const emailRegex =
  /^(?=.{1,255})(?![.−])(?!(.∗[.−]2))(?!.∗[.−])(?![.−​])(?!(.∗[.−​]2))(?!.∗[.−​])(?!.@.@)([a-zA-Z0-9._+-]{1,64})@((?!-)[a-zA-Z0-9-]{1,63}(?<!-)(.[a-zA-Z0-9-]{1,63})*).[a-zA-Z]{2,}$/;
export const userNameRegex = /^[A-Za-z\s]+$/;
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,20}$/;
