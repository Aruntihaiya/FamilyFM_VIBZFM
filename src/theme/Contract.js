import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import moment from 'moment';
import { toast } from 'react-toastify';
import { RotatingLines } from 'react-loader-spinner';

import { FiArrowRight } from 'react-icons/fi';
import { AiOutlineLogout } from 'react-icons/ai';
import { AiOutlineDelete } from 'react-icons/ai';
import { GrOverview } from 'react-icons/gr';
import { CiEdit } from 'react-icons/ci';
import clickup from '../assets/images/logos/unnamed.png'
import secondimgclickup from '../assets/images/logos/disableimage.png'


import { Input, Select } from 'antd';

import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Field } from 'formik';
import { Option } from 'antd/es/mentions';
import { Grid, Container, Typography, Box} from '@mui/material';
// components

import { Icon } from '@iconify/react';
// sections
import { Col, Row } from 'react-bootstrap';
import { Card } from '@material-ui/core';
import Pdf from 'src/views/utilities/Pdf';
import ConfirmationModal from 'src/views/utilities/ConformationModal';

function Contract() {
  const navigate = useNavigate();
  const [isrole, setIsrole] = useState(parseInt(localStorage.getItem('role')));
  const [Data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [Delete, setDelete] = useState();
  const [mypdf, setmypdf] = useState([]);
  const [mainloader, setmainloader] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showConfirmation1, setShowConfirmation1] = useState(false);
  const [itemId, setItemId] = useState(null);
  const [itemIdToDelete, setItemIdToDelete] = useState(null);
  const [itemIdTopdf, setItemIdTopdf] = useState(null);
  

  const [sortOrder, setSortOrder] = useState('asc');
  const [totalrow, settotalrow] = useState('');
  var myrole = localStorage.getItem('role');

  useEffect(() => {
    setIsrole(parseInt(localStorage.getItem('role')));
    setmainloader(true);

    axios
      .post(
        'http://192.168.29.28:8080/api/public/contractlist',
        {
          page: currentPage,
          limit: itemsPerPage,
        },
        {
          headers: { 'x-token': localStorage.getItem('token') },
        },
      )

      .then((response) => {
        setData(response.data.results);
        settotalrow(response.data.totalRows);
        setmypdf(response.data.data);
        setmainloader(false);
        if (response.status.code == 401) {
          navigate('/login', { replace: true });
          localStorage.removeItem('token');

          toast.error(response.data.message.message);
        }
      })
      .catch((error) => {
        if (error.response.status == 500) {
          navigate('/login', { replace: true });
          localStorage.removeItem('token');
        }
        console.log(error);
        toast.error(error.response.data.message);
        setmainloader(true);
      });
  }, [Delete, currentPage]);

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
      moment(item.contract_date)
        .utc()
        .format('Do MMMM, YYYY')
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(item.phone).toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(item.sales_rep).toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(item.event).toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(item.orderid).toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  const onDelete = (id) => {
    axios
      .post(`http://192.168.29.28:8080/api/public/delete/${id}`)
      .then((response) => {
        console.log(response.data);
        if (response.code !== 200) {
          setDelete(!Delete);
        }
        toast.success(response.data.message);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.status);
          console.log(error.response.data);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log(error.message);
        }
      });
  };

  const [sortColumn, setSortColumn] = useState('name');

  const handleSort = (column) => {
    if (column === sortColumn) {
      const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
      setSortOrder(newSortOrder);
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };
  const sortedData = filteredData.sort((a, b) => {
    console.log(filteredData, 's45dsx');
    const columnA = a.name.toLowerCase();
    const columnB = b.name.toLowerCase();

    if (columnA < columnB) {
      return sortOrder === 'asc' ? -1 : 1;
    }
    if (columnA > columnB) {
      return sortOrder === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const handlepdfClick = (id) => {
    setItemIdTopdf(id);
    setShowConfirmation1(true);
  };

  const handlepdfchange=()=>{
    if (itemIdTopdf) {
  
    axios.post(`http://192.168.29.28:8080/api/public/updatepdfonclickup/${itemIdTopdf}`, {},
    {
      headers: { 'x-token': localStorage.getItem('token') },
    }).then((res) => {
      toast.success(res.data.message);
      setDelete(!Delete);
    console.log(res)
  }).catch((err)=>{
  
  })

 

 
  
  console.log('Item deleted!');
  setShowConfirmation1(false);
  }
  }




  const handleDeleteClick = (id) => {
    setItemIdToDelete(id);
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    if (itemIdToDelete) {
      axios
        .post(`http://192.168.29.28:8080/api/public/delete/${itemIdToDelete}`)

        .then((response) => {
          console.log(response.data);
          if (response.code !== 200) {
            setDelete(!Delete);
            // Perform any necessary actions on delete failure
          }
          toast.success(response.data.message);
        })
        .catch((error) => {
          // Handle error if API request fails
        });
      console.log('Item deleted!');
      setShowConfirmation(false);
    }
  };

  const handleCancel = () => {
    console.log('Deletion canceled.');
    setShowConfirmation(false);
  };

  const handleCancel1 = () => {
    console.log('Deletion canceled.');
    setShowConfirmation1(false);
  };

  return (
    <>
      <Container maxWidth="xl dashhead">


        
        {filteredData.length == 0 ? (
          <div className="nodata-container">
            <div className="nodata-header">
              <p style={{ paddingBottom: '50px', fontSize: '18px' }}>
                You haven't created any Contract yet
              </p>
              {/* <div className='btn create-invo' style={{ fontSize: '18px' ,textDecoration:'none' }}>
            <FaPlus />
            <Link to="/dashboard/agreement"> Add Quotation</Link>
            
            </div> */}
            </div>
          </div>
        ) : (
          <>
            <Card className="mt-3 py-3 px-3">
              {/* <div className="mt-3  img-con-ad">
     <div className="btn create-invo"><Link to='/dashboard/agreement'>Create Agreement +</Link></div>  
      
      </div> */}
              <div className="search-admin">
                <Input
                  placeholder="Search"
                  className="col-3 mt-2 mb-1 mx-3 input"
                  value={searchTerm}
                  onChange={handleSearch}
                ></Input>

                {mainloader ? (
                  <RotatingLines type="Oval" strokeColor="grey" height={150} width={150} />
                ) : (
                  <Box sx={{ overflow: "auto" }}>
                    <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
                  <Table className="" style={{}}>
                    <thead>
                      <tr className="head-row text-center">
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone No.</th>
                        <th>Event</th>
                        <th>Sales rep</th>
                      
                      </tr>
                    </thead>

                    {filteredData.map((item, index) => {
                      console.log(item.role, 's');
                      return (
                        <tbody>
                          <React.Fragment key={index}>
                            <tr onClick={() => handleRowClick(index)} className="text-center">
                              <td>{item.orderid}</td>
                              <td>{item.name}</td>
                              <td>{item.email}</td>
                              <td>{item.phone}</td>
                              {/* <td>{moment(item.contract_date).utc().format('MM/DD/YY')}</td> */}
                              <td>{item.event}</td>
                              <td>{item.sales_rep}</td>
                              <td>
                      <Icon style={{color:'green',fontSize: '19px'}} icon="akar-icons:edit" onClick={() =>navigate(`/dashboard/updateagreement/${item.id}`)} />
                         
                     
                      </td>
                              <td>
                                <Icon
                                  style={{ color: 'blue', fontSize: '19px', cursor: 'pointer' }}
                                  icon="carbon:view"
                                  onClick={() => navigate(`/dashboard/contractview/${item.id}`)}
                                />
                              </td>
                              <td>
                                {(myrole ==3)?<></>:  <Icon
                                  style={{ color: 'red', fontSize: '19px', cursor: 'pointer' }}
                                  icon="fluent:delete-32-regular"
                                  onClick={() => handleDeleteClick(item.id)}
                                />}
                              
                              </td>
                              
                              <td>
                                {
                                  (item.clickupdisable===true)? <img src={clickup} alt ='img' style={{width:"20px" ,cursor:"pointer"}} 
                                  onClick={()=>{handlepdfClick(item.id)}}
                                  />:<img src={secondimgclickup} alt ='img' style={{width:"18px"}} 
                            
                                  />
                                }
                             
                               </td>
                              
                            </tr>
                          </React.Fragment>
                        </tbody>
                      );
                    })}
                  </Table>
                  </Box>
                  </Box>
                )}
              </div>

              <Pagination
                style={{ alignItems: 'center' }}
                itemsPerPage={itemsPerPage}
                totalItems={totalrow}
                paginate={paginate}
              />
            </Card>
          </>
        )}
      </Container>
      {showConfirmation && (
        <ConfirmationModal
          message="Are you sure you want to delete this Contract?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          itemId={itemId}
        />
      )}
      {showConfirmation1 && (
        <ConfirmationModal
          message="Are you sure you want to sync Updated Contract PDF  with Clickup?"
          onConfirm={handlepdfchange}
          onCancel={handleCancel1}
          itemId={itemId}
        />
      )}
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
      </div>
    );
  }
}
export default Contract;
