export interface StaffDataType {
  id: string;
  email: string;
  phone_number: string;
  first_name: string;
  last_name: string;
  roles: string[];
}

export interface StaffPayload {
  email: string;
  password: string;
  confirm_password: string;
  phone: string;
  first_name: string;
  last_name: string;
}

export interface StaffDetailPayload {
  id: string;
  email: string;
  phone_number: string;
  first_name: string;
  last_name: string;
  roles: string[];
}
