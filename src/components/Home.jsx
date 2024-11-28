import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { FaTachometerAlt, FaUser, FaCogs } from 'react-icons/fa';
import { IoLogOut } from "react-icons/io5";

function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [mahasiswaList, setMahasiswaList] = useState([
    { id: 1, nama: 'Gendon', umur: 20 },
    { id: 2, nama: 'Gondrong Memet', umur: 22 },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newNama, setNewNama] = useState('');
  const [newUmur, setNewUmur] = useState('');
  const [editId, setEditId] = useState(null);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const tambahMahasiswa = () => {
    const newMahasiswa = {
      id: mahasiswaList.length + 1,
      nama: newNama,
      umur: newUmur,
    };
    setMahasiswaList([...mahasiswaList, newMahasiswa]);
    resetForm();
  };

  const editMahasiswa = () => {
    const updatedMahasiswaList = mahasiswaList.map((mahasiswa) =>
      mahasiswa.id === editId ? { ...mahasiswa, nama: newNama, umur: newUmur } : mahasiswa
    );
    setMahasiswaList(updatedMahasiswaList);
    resetForm();
  };

  const resetForm = () => {
    setNewNama('');
    setNewUmur('');
    setEditId(null);
    setModalVisible(false);
  };

  const confirmDelete = (id) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Data ini akan dihapus!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Hapus',
    }).then((result) => {
      if (result.isConfirmed) {
        setMahasiswaList(mahasiswaList.filter((mahasiswa) => mahasiswa.id !== id));
        Swal.fire('Dihapus!', 'Data mahasiswa berhasil dihapus.', 'success');
      }
    });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-blue-600 text-white transition-all duration-300 ${
          isSidebarOpen ? 'w-64' : 'w-16'
        } flex flex-col`}
      >
        {/* Tombol Toggle */}
        <button
          className="p-4 hover:bg-blue-500 focus:outline-none"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </button>

        {/* Menu */}
        <nav className="flex-grow mt-4">
          <ul className="space-y-2">
            <li className="flex items-center space-x-4 px-4 py-2 hover:bg-blue-500">
              <FaTachometerAlt size={20} />
              {isSidebarOpen && <span>Dashboard</span>}
            </li>
            <li className="flex items-center space-x-4 px-4 py-2 hover:bg-blue-500">
              <FaUser size={20} />
              {isSidebarOpen && <span>Users</span>}
            </li>
            <li className="flex items-center space-x-4 px-4 py-2 hover:bg-blue-500">
              <FaCogs size={20} />
              {isSidebarOpen && <span>Settings</span>}
            </li>
            <li className="flex items-center space-x-4 px-4 py-2 hover:bg-blue-500">
              <IoLogOut size={20} />
              {isSidebarOpen && <span>logout</span>}
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-white shadow-lg rounded-md m-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Daftar Mahasiswa</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-400 mb-4"
          onClick={() => setModalVisible(true)}
        >
          Tambah Mahasiswa
        </button>

        <table className="table-auto w-full bg-white shadow-md rounded-md">
          <thead>
            <tr className="bg-blue-100 text-gray-800">
              <th className="px-4 py-2">No</th>
              <th className="px-4 py-2">Nama</th>
              <th className="px-4 py-2">Umur</th>
              <th className="px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {mahasiswaList.map((mahasiswa, index) => (
              <tr key={mahasiswa.id} className="hover:bg-blue-50">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{mahasiswa.nama}</td>
                <td className="px-4 py-2">{mahasiswa.umur}</td>
                <td className="px-4 py-2">
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-400 mr-2"
                    onClick={() => {
                      setEditId(mahasiswa.id);
                      setNewNama(mahasiswa.nama);
                      setNewUmur(mahasiswa.umur);
                      setModalVisible(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-400"
                    onClick={() => confirmDelete(mahasiswa.id)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      {/* Modal Tambah / Edit Mahasiswa */}
      {modalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="modal p-6 bg-white rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-4">
              {editId ? 'Edit Mahasiswa' : 'Tambah Mahasiswa'}
            </h2>
            <input
              type="text"
              value={newNama}
              onChange={(e) => setNewNama(e.target.value)}
              placeholder="Nama"
              className="w-full mb-4 border border-gray-300 rounded-md p-2"
            />
            <input
              type="number"
              value={newUmur}
              onChange={(e) => setNewUmur(e.target.value)}
              placeholder="Umur"
              className="w-full mb-4 border border-gray-300 rounded-md p-2"
            />
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-400"
                onClick={resetForm}
              >
                Batal
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-400"
                onClick={editId ? editMahasiswa : tambahMahasiswa}
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
