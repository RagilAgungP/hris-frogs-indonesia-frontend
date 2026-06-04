import { COMPANIES, DEPARTMENTS, POSITIONS } from "@/lib/constants";
import type { Employee, Identity, IdentityDetail } from "@/lib/types";

const NAMES = [
  "Budi Santoso", "Siti Rahayu", "Agus Wijaya", "Dewi Lestari", "Rizki Pratama",
  "Ani Wulandari", "Hendra Gunawan", "Fitriani Putri", "Yoga Saputra", "Maya Sari",
  "Doni Kurniawan", "Rina Melati", "Fajar Nugroho", "Lestari Ayu", "Bayu Anggara",
  "Putri Maharani", "Eko Susilo", "Wulan Dari", "Adi Prasetyo", "Sari Indah",
  "Dimas Permana", "Nita Anggraini", "Gilang Ramadhan", "Citra Dewi", "Reza Fadillah",
  "Indah Permata", "Ahmad Fauzi", "Melati Surya", "Joko Widodo", "Kartika Sari",
];

function makeIdentity(i: number): Identity {
  return {
    pendidikan: i % 3 === 0 ? "S1" : "SMA",
    nik: `3201${String(i).padStart(12, "0")}`,
    tempat_lahir: i % 2 === 0 ? "Jakarta" : "Bandung",
    tanggal_lahir: `199${i % 10}-0${(i % 9) + 1}-15`,
    jenis_kelamin: i % 2 === 0 ? "Laki-laki" : "Perempuan",
    agama: "Islam",
    status_pernikahan: i % 3 === 0 ? "Menikah" : "Belum Menikah",
    golongan_darah: ["A", "B", "O", "AB"][i % 4],
  };
}

function makeDetail(i: number): IdentityDetail {
  const base = 5000000 + i * 250000;
  return {
    alamat: `Jl. Contoh No. ${i}, Jakarta Selatan`,
    no_hp: `0812${String(i).padStart(8, "0")}`,
    no_rekening: `123456789${String(i).padStart(3, "0")}`,
    nama_bank: "BCA",
    gaji_pokok: base,
    tunjangan_jabatan: 500000 + i * 10000,
    tunjangan_makan: 300000,
    tunjangan_transport: 200000,
  };
}

export function generateInitialEmployees(): Employee[] {
  return Array.from({ length: 30 }, (_, idx) => {
    const i = idx + 1;
    const branch = i <= 15 ? "FSI" : "ISTI";
    const branchKey = branch as keyof typeof COMPANIES;
    return {
      id: i,
      employee_id: `EMP${String(i).padStart(4, "0")}`,
      name: NAMES[idx],
      email: `employee${i}@company.com`,
      company: COMPANIES[branchKey],
      branch,
      department: DEPARTMENTS[i % DEPARTMENTS.length],
      position: POSITIONS[i % POSITIONS.length],
      status: i % 4 === 0 ? "Contract" : "Permanent",
      employee_condition: i % 7 === 0 ? "Resigned" : "Active",
      date_of_joining: new Date(2020 + (i % 5), i % 12, (i % 28) + 1)
        .toISOString()
        .split("T")[0],
      identity: makeIdentity(i),
      identityDetail: makeDetail(i),
    };
  });
}

export const initialEmployees = generateInitialEmployees();
