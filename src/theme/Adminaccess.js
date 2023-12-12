import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import {Pagination} from 'react-bootstrap/Pagination';
import Table from 'react-bootstrap/Table';
import { trackPromise, usePromiseTracker, promiseInProgress } from 'react-promise-tracker';

import BootstrapSwitchButton from 'react-bootstrap/Button';
import moment from 'moment';
import { toast, ToastContainer } from 'react-toastify';
import './Adminpanel.css';
import { RotatingLines } from 'react-loader-spinner';

import { Card } from '@material-ui/core';
import { Grid, Container, Typography,Box } from '@mui/material';

import { Icon } from '@iconify/react';
// sections
import { Col, Row, Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignatureModal from './SignatureModal';

import { AiOutlineLogout } from 'react-icons/ai';
import { AiOutlineDelete } from 'react-icons/ai';
import { Input } from 'antd';

import { Link, Navigate, useNavigate } from 'react-router-dom';
import { BooleanSchema } from 'yup';

function Adminaccess() {
  // const params = useParams();
  const navigate = useNavigate();
  const { promiseInProgress } = usePromiseTracker({ delay: 5000 });
  const [Data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [Delete, setDelete] = useState();
  const [mainloader, setmainloader] = useState(true);

  var myrole = localStorage.getItem('role');

  const [status, setStatus] = useState(false);

  const path = 'http:///Vibz_FM/uploads/';

  const [showModal, setShowModal] = useState(false);
  const [currentsignature, setcurrentsignature] = useState('');

  const openModal = (signature) => {
    setcurrentsignature(signature);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setcurrentsignature('');
  };

  useEffect(() => {
    setmainloader(true);
    trackPromise(
      axios
        .post(
          'http://192.168.29.28:8080/api/public/adminaccess',
          {},
          {
            headers: { 'x-token': localStorage.getItem('token') },
          },
        )

        .then((response) => {
          setmainloader(false);
          setData(response.data.data);
          console.log(response, 'sds');

          if (response.data.code == 401) {
            navigate('/login', { replace: true });
            localStorage.removeItem('token');
            toast.error(response.data.message.message);
          }
        })
        .catch((error) => {
          setmainloader(true);
        }),
    );
  }, []);

  const [expandedRow, setExpandedRow] = useState(null);

  const handleRowClick = (rowId) => {
    setExpandedRow(expandedRow === rowId ? null : rowId);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredData = Data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(item.mobile).toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleToggle = (id) => {
    axios.post(`http://192.168.29.28:8080/api/public/salesrepverified/${id}`).then((response) => {
      console.log(response.data.id, '11111111');
      setStatus(response.data.data.id === false ? true : false);

      getdata();
      toast.success(response.data.message);
    });
  };

  const getdata = () => {
    axios
      .post(
        'http://192.168.29.28:8080/api/public/adminaccess',
        {},
        {
          headers: { 'x-token': localStorage.getItem('token') },
        },
      )

      .then((response) => {
        setData(response.data.data);

        console.log(response, 'sds');
      });
  };

  return (
    <>
      <Container maxWidth="xl dashhead mt-3 "   >
        {/* {Data[0].name !=='not avaliable'  ? ( */}
        {promiseInProgress === true ? (
              <RotatingLines type="Oval" strokeColor="grey" height={150} width={150} />
            ) : (
              <>
              {Data.length!==0 ?  <Card className="mb-5 px-3 py-3">
          <div className="search-admin">
            <Input
              placeholder="Search"
              className="col-3 mt-2  mb-1 mx-3 input "
              value={searchTerm}
              onChange={handleSearch}
            ></Input>

         
              <div className="table-responsive " id="style-2">
              <Box sx={{ overflow: "auto" }}>
                    <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
                <Table className="ad-table table-responsive ">
                  <thead>
                    <tr className="head-row text-center">
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Phone No.</th>

                      {myrole == 3 ? (
                        <></>
                      ) : (
                        <>
                          <th>View Signature</th>
                          <th>Action</th>
                        </>
                      )}
                      
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    { (
                      currentItems.map((item, index) => {
                        const firstTwoDigits = item.mobile.slice(0, 4);
                        const lastTwoDigits = item.mobile.slice(-2);
                        const firstTwoDigitsemail = item.email.slice(0, 4);
                        const lastTwoDigitsemail = item.email.slice(-4);

                        // Replace the middle digits with "x"
                        const maskedPart = 'x'.repeat(item.mobile.length - 4);
                        const maskedPartemail = 'x'.repeat(item.email.length - 4);
                        const maskedPhoneNumber = `${firstTwoDigits}${maskedPart}${lastTwoDigits}`;
                        const maskedPhoneNumberemail = `${firstTwoDigitsemail}${maskedPartemail}${lastTwoDigitsemail}`;

                        console.log(item.signature, 'ffdf');
                        return (
                          <React.Fragment key={index}>
                            <tr
                              onClick={() => handleRowClick(index)}
                              className="tr-whitespace text-center cont-tainer"
                            >
                              <td>{item.name}</td>
                              <td>{item.lastname}</td>
                              {myrole == 3 ? (
                                <td>{maskedPhoneNumberemail}</td>
                              ) : (
                                <td>{item.email}</td>
                              )}
                              {myrole == 3 ? <td>{maskedPhoneNumber}</td> : <td>{item.mobile}</td>}

                              {myrole == 3 ? (
                                <></>
                              ) : (
                                <>
                                  <td className="text-center">
                                    <Icon
                                      style={{
                                        color: 'blue',
                                        fontSize: '19px',
                                        cursor: 'pointer',
                                      }}
                                      icon="carbon:view"
                                      onClick={() => {
                                        openModal(item.signature);
                                      }}
                                    />
                                  </td>
                                  <td className="bt-design">
                                    <button
                                      className={item.status === true ? 'Active' : 'Inactive'}
                                      onClick={() => handleToggle(item.id)}
                                    >
                                      {item.status == true ? 'Active' : 'Inactive'}
                                    </button>
                                  </td>
                                </>
                              )}
                            </tr>
                          </React.Fragment>
                        );
                      })
                    ) }
                  </tbody>
                </Table>
                </Box>
                  </Box>
              </div>
      
          </div>

          <Pagination
            style={{ alignItems: 'center' }}
            itemsPerPage={itemsPerPage}
            totalItems={filteredData.length}
            paginate={paginate}
          />
        </Card>:<> 
                    
                    <div className="nodata-container">
                      <div className="nodata-header">
                        <p style={{ paddingBottom: '50px', fontSize: '18px' }}>
                          You don't have sales Representative{' '}
                        </p>
                      </div>
                    </div>
                
                </>
              }
      
        </>
  )}
      
        <SignatureModal showModal={showModal} closeModal={closeModal} item={currentsignature} />
      </Container>
    </>
  );

  function Pagination({ itemsPerPage, totalItems, paginate }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <div>
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li key={number} className="page-item">
              <button
                onClick={() => paginate(number)}
                className="page-link"
                disabled={number === currentPage}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>

        <ToastContainer />
      </div>
    );
  }
}
export default Adminaccess;
