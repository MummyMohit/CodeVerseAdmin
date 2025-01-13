import React, { useEffect, useState,useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import DataTable from '../share/Datatable';
import './userList.css'
import { UserContext } from '../ContextApi/Context';

const UserList = () => {
  const {data, setData} = useContext(UserContext)
  const [editId, setEditId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => setModalVisible(!modalVisible);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      age: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('First Name is Required'),
      lastName: Yup.string().required('Last Name is Required'),
      age: Yup.string().required('Age is Required'),
    }),
    onSubmit: (values) => {
      const payload = {
        firstName: values.firstName,
        lastName: values.lastName,
        age: values.age,
      };
      handleAddOrUpdate(payload);
      formik.resetForm();
    },
  });

  const handleAddOrUpdate = async (payload) => {
    try {
      if (editId !== null) {
        const response = await axios.put(`https://dummyjson.com/users/${editId}`, payload);
        const updatedUser = response.data;
        setData((prevData) =>
          prevData.map((item) => (item.id === editId ? { ...item, ...updatedUser } : item))
        );
        setEditId(null);
      } else {
        const response = await axios.post('https://dummyjson.com/users/add', payload);
        setData((prevData) => [...prevData, response.data]);
      }
      toggleModal();
    } catch (error) {
      console.error('Error while adding/updating user:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://dummyjson.com/users/${id}`);
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEdit = (user) => {
    setEditId(user.id);
    formik.setValues(user);
    toggleModal();
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/users');
      setData(response.data.users);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
 const datacount = data.length

  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'firstName', headerName: 'First Name', width: 170, sortable: true },
    { field: 'lastName', headerName: 'Last Name', width: 170, sortable: true },
    { field: 'age', headerName: 'Age', type: 'number', width: 170, sortable: true },
    {
      field: 'Action',
      headerName: 'Action',
      sortable: false,
      width: 200,
      renderCell: (params) => (
        <>
          <button
            className="btn btn-success me-2"
            onClick={() => handleEdit(params.row)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </button>
        </>
      ),
    },
  ];

  return (
    <div className="container">
      <h3>Total users {datacount}</h3>
      <button className="btn btn-success mb-3 Add-button" onClick={toggleModal}>
        Add New User
      </button>
      <DataTable rows={data} columns={columns} />

      {/* Modal */}
      {modalVisible && (
        <div className="modal show d-block" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editId ? 'Edit User' : 'Add New User'}</h5>
                <button type="button" className="btn-close" onClick={toggleModal}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={formik.handleSubmit}>
                  <div className="mb-3">
                    <label>First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                    />
                    {formik.touched.firstName && formik.errors.firstName && (
                      <div className="text-danger">{formik.errors.firstName}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label>Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="lastName"
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                    />
                    {formik.touched.lastName && formik.errors.lastName && (
                      <div className="text-danger">{formik.errors.lastName}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label>Age</label>
                    <input
                      type="text"
                      className="form-control"
                      name="age"
                      value={formik.values.age}
                      onChange={formik.handleChange}
                    />
                    {formik.touched.age && formik.errors.age && (
                      <div className="text-danger">{formik.errors.age}</div>
                    )}
                  </div>
                  <div className="modal-footer">
                    <button type="submit" className="btn btn-primary">
                      Save
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={toggleModal}>
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
