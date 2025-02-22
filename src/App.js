import React, { useState } from 'react';
import RowMahasiswa from './components/Rowmahasiswa';
import RowTambahMahasiswa from './components/Rowtambahmahasiswa'

// Data awal tabel mahasiswa
const arrMahasiswas = [
  {
    nim: "18010245",
    nama: "Eka Putra",
    jurusan: "Teknik Informatika",
    asalProvinsi: "DKI Jakarta"
  },
  {
    nim: "19010214",
    nama: "LisaPermata",
    jurusan: "SistemInformasi",
    asalProvinsi: "SumateraBarat"
  },
  {
    nim: "20010710",
    nama: "RudiSetiawan",
    jurusan: "IlmuKomputer",
    asalProvinsi: "JawaTengah"
  },
  {
    nim: "20010790",
    nama: "Friska Ramadhani",
    jurusan: "Ilmu Komputer",
    asalProvinsi: "Kalimantan Barat"
  }
];

const App = () => {
  const [mahasiswas, setMahasiswas] = useState(arrMahasiswas);

  // handler untuk menambah data mahasiswa,
  // akan di-trigger dari komponen Row Tambah Mahasiswa
  const handleTambahMahasiswa = (data) => {
    const newMahasiswas = [
      ...mahasiswas, data
    ];
    setMahasiswas(newMahasiswas);
  }
  
  // handler untuk mengedit data mahasiswa
  // akan di-trigger dari komponen RowMahasiswa
  const handleEditMahasiswa = (data) => {
    // cari index dari mahasiswa yang akan diedit berdasarkan nomor nim
    const result = mahasiswas.findIndex(
      (mahasiswa) => mahasiswa.nim === data.nim
    );
    
    // copy mahasiswas karena fungsi splice akan mengubah array asal (mutate)
    const newMahasiswas = mahasiswas;
    newMahasiswas.splice(result, 1,data);
    setMahasiswas([...newMahasiswas]);
    
    // !! jika hanya menggunakan setMahasiswas(newMahasiswas),
    // react tidak akan me-re-render halaman karena
    // newMahasiswas = mahasiswa masih merujuk ke object yang sama.
  }
  
  // handler untuk menghapus data mahasiswa di komponen RowMahasiswa
  const handleHapusMahasiswa = (e) => {
    
    // cari index dari mahasiswa yang akan dihapus berdasarkan nomor nim
    const result = mahasiswas.findIndex(
      (mahasiswa) => mahasiswa.nim === e.target.id
    );
    // copy mahasiswas karena fungsi splice akan mengubah array asal (mutate)
    const newMahasiswas = mahasiswas;
    newMahasiswas.splice(result, 1);
    setMahasiswas([...newMahasiswas]);
    
    // Cara alternatif penghapusan dengan method filter
    // const newMahasiswas = mahasiswas.filter(
    // mahasiswa => mahasiswa.nim !== e.target.id
    // );
    // setMahasiswas (newMahasiswas);
  }

  return (
    <div className="container mt-5">


      <div className="row mt -5">
        <div className="col">
          <h1 className="text-center">Tabel Mahasiswa</h1>

          <table className="table mt-4">
            <thead>
              <tr>
                <th>NIM</th>
                <th>Nama</th>
                <th>Jurusan</th>
                <th>AsalProvinsi</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                mahasiswas.map((mahasiswa) =>
                  <RowMahasiswa
                    key={mahasiswa.nim}
                    mahasiswa={mahasiswa}
                    onEditMahasiswa={handleEditMahasiswa}
                    onHapusMahasiswa={handleHapusMahasiswa}
                  />
                )
              }
              <RowTambahMahasiswa 
                mahasiswas={mahasiswas}
                onTambahMahasiswa={handleTambahMahasiswa}
              />
            </tbody>
          </table>
        </div>
      </div>


    </div>
  )
}

// const App = () => {

// }
export default App;