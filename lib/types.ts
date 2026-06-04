export type Branch = "FSI" | "ISTI";
export type EmployeeStatus = "Permanent" | "Contract";
export type EmployeeCondition = "Active" | "Resigned";
export type PkwtStatus = "active" | "almost expired" | "expired";

export interface Identity {
  pendidikan: string;
  nik: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  jenis_kelamin: string;
  agama: string;
  status_pernikahan: string;
  golongan_darah: string;
}

export interface IdentityDetail {
  alamat: string;
  no_hp: string;
  no_rekening: string;
  nama_bank: string;
  gaji_pokok: number;
  tunjangan_jabatan: number;
  tunjangan_makan: number;
  tunjangan_transport: number;
}

export interface Employee {
  id: number;
  employee_id: string;
  name: string;
  email: string;
  company: string;
  branch: Branch;
  department: string;
  position: string;
  status: EmployeeStatus;
  employee_condition: EmployeeCondition;
  date_of_joining: string;
  identity: Identity;
  identityDetail: IdentityDetail;
}

export interface Pkwt {
  id: number;
  employee_id: number;
  employee_name: string;
  employee_department: string;
  employee_position: string;
  contract_number: string;
  start_date: string;
  end_date: string;
  company: string;
  branch: Branch;
  status: PkwtStatus;
  file_name?: string;
}

export interface Surat {
  id: string;
  perihal: string;
  kepada: string;
  division: string;
  jenis: string;
  no_surat: string;
  tanggal: string;
}

export interface Ticket {
  id: string;
  title: string;
  category: string;
  priority: string;
  status: string;
  created_at: string;
}

export interface MenuAccessUser {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "Approved" | "Not Approved";
}

export interface SettingItem {
  id: number;
  name: string;
}

export interface DepartmentRow {
  id: number;

  // OKR
  objective?: string;
  keyResult?: string;
  owner?: string;
  weight?: number;
  target?: number;
  actual?: number;
  progress?: number;

  // FORM / SOP / MEMO
  title?: string;
  description?: string;
  documentNumber?: string;
  revision?: string;
  isoScope?: string;
  file?: string;
}
