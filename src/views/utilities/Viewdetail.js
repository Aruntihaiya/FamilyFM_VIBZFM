import axios from 'axios';
import moment from 'moment';
import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react';
import Pdf from './Pdf';
// import mylogo from "../component/fm_logo.png";
import { loadImage } from 'canvas';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { AiOutlineLogout } from 'react-icons/ai';
import mylogo from '../icons/fm_logo.png';
import './Invoice.css';
import { Modal, Button, Form } from 'react-bootstrap';
import ConfirmationModal from './ConformationModal';
import Share from './Share';
import { RWebShare } from 'react-web-share';
import { Box } from '@mui/material';

// import { Image } from 'canvas';

import { shortener } from 'c-url-shortener';
import Getclickupdata from './Getclickupdata';

const Viewdetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  // const history = useHistory();

  const [dataapi, setDataapi] = useState([]);
  const [contract, setcontract] = useState([]);
  const [invoicedata, setinvoicedata] = useState([]);
  const [signaturelist, setsignaturetlist] = useState([]);
  const [mindate, setmindate] = useState([]);
  const [maxdate, setmaxdate] = useState([]);
  const [orderamount, setorderamount] = useState([]);
  const [disorderamount, setdisorderamount] = useState([]);
  const [monthly, setmonthly] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [itemId, setItemId] = useState(null);

  const startMonth = moment(mindate).format('MMMM, YYYY');
  const endMonth = moment(maxdate).format('MMMM, YYYY');
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const [imageDataUrl, setImageDataUrl] = useState('');

  useEffect(() => {
    axios
      .post(
        'http://192.168.29.28:8080/api/public/agreementlist',
        {
          id: params.id,
        },
        {
          headers: { 'x-token': localStorage.getItem('token') },
        },
      )

      .then((response) => {
        setDataapi(response.data.data.details);
        setinvoicedata(response.data.data.itemlist);
        setsignaturetlist(response.data.data.signaturelist);
        setmaxdate(response.data.data.maxEndDate);
        setmindate(response.data.data.minStartDate);
        setorderamount(response.data.data.orderamount);
        setdisorderamount(response.data.data.disorderamount);
        setmonthly(response.data.data.monthlyshedule);
      });
  }, [params.id]);

  useEffect(() => {
    if (dataapi.length > 0) {
      axios
        .post(
          'http://192.168.29.28:8080/api/public/getimage',
          {
            file_name: dataapi[0].signature,
          },
          {
            headers: { 'x-token': localStorage.getItem('token') },
          },
        )

        .then((response) => {
          setImageDataUrl(response.data);
        });
    }
  }, [dataapi]);

  ////////////////////////////////////////////////////////////////////////////

  const handleDeleteClick = (id) => {
    setItemId(id);

    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    axios
      .post(
        `http://192.168.29.28:8080/api/public/makecontract/${itemId}`,
        {},
        {
          headers: { 'x-token': localStorage.getItem('token') },
        },
      )
      .then((response) => {
        if (response.status === 200) {
          toast.success(response.data.message);
          // After successful confirmation, navigate to the new route
          // ('/dashboard/contract');
          navigate('/dashboard/contract', { replace: true });
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        if (error.response) {
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log(error.message);
        }
      })
      .finally(() => {
        setShowConfirmation(false);
      });
  };

  const handleCancel = () => {
    console.log('Deletion canceled.');
    setShowConfirmation(false);
  };

  const setarray = [];
  var monthlydistribuion;
  var arr = [];
  var myarray = [];

  if (mindate < maxdate) {
    let date = moment(mindate);
    while (date < moment(maxdate).add('month')) {
      // console.log(date,"while.......")
      arr = myarray.push(date.format('MM'));
      setarray.push(date.format('MM'));

      date.add(1, 'month');
    }
  }
  console.log(setarray, 'totalmonth');

  const onmakecontract = (id) => {
    axios
      .post(
        `http://192.168.29.28:8080/api/public/makecontract/${id}`,
        {},
        {
          headers: { 'x-token': localStorage.getItem('token') },
        },
      )
      .then((response) => {
        console.log(response.data.status, 'dddsx');
        if (response.status == 200) {
          toast.success(response.data.message);
        } else {
          // toast.error(err.data.message);
        }
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

  const clickupcreatetask = (id) => {
    console.log(id, 'function');
    axios
      .post(`http://192.168.29.28:8080/api/public/createclickuptask/${id}`)
      .then((response) => {
        console.log(response.data.status, 'dddsx');
        if (response.status == 200) {
          toast.success(response.data.message);
        } else {
          // toast.error(err.data.message);
        }
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

  const myimg = loadImage('http://192.168.29.28:8080/Vibz_FM/uploads/signature-1693079730430.png');
  console.log(myimg, 'kmm');
  myimg
    .then((response) => {
      console.log(response.src, 'okk');
    })
    .catch((err) => {
      console.log('oh no!', err);
    });

  useEffect(() => {
    axios
      .post(`http://192.168.29.28:8080/api/public/getclickuptask`)
      .then((response) => {
        console.log(response, 'response');
      })
      .catch((error) => console.error('Error fetching tasks:', error));
  }, []);

  return (
    <div className="main-container">
      {dataapi.map((type) => {
        var startDate = new Date(type.id);
        var endDate = new Date(type.ed_date);

        const currentDate = moment(type.createdAt);
        const futureDate = currentDate.add(30, 'days');

        return (
          <>
            <div className="btn-group btn-group-justified ">
              {/* Your other JSX content */}
              <button className="btn create-invo ml-2" onClick={() => handleDeleteClick(type.id)}>
                Make Contract
              </button>
              {showConfirmation && (
                <ConfirmationModal
                  message="Are you sure you want to Convert this Quotation to Contract?"
                  onConfirm={handleConfirm}
                  onCancel={handleCancel}
                />
              )}

              <Pdf
                props={{
                  handleFunction: dataapi,
                  handleFunction2: invoicedata,
                  maxfunction: maxdate,
                  minfunction: mindate,
                  orderfunction: orderamount,
                  disorderfunction: monthly,
                  title: 'Quotation',
                  pdfimage: imageDataUrl,
                }}
              />
            </div>

            <div className="row mt-5">
              <div className=" col align-items-center mt-5">
                <img src={mylogo} alt="React Logo" className="img-con" />
              </div>

              <div className="vibzfm-add col">
                <br />
                Langsford Estate
                <br />
                P.O. Box W1102
                <br />
                All Saints Rd
                <br />
                St John's, Antigua
                <br />
                Tel (268) 560- 7578/9
                <br />
                Email: info@familyfm.ltd
                <br />
              </div>
            </div>

            <div className="invoice-heading">
              <div>Advertising Investment Quotations</div>
            </div>

            <div className="row" style={{ borderBottom: '2px solid black', paddingBottom: '10px' }}>
              <div className="col-md-6 col-sm-12 col-lg-8">

              {/* <div class="stats mt-2">
                <div class="d-flex justify-content-between p-price"><span>Quotations date:-</span>
                <span>{moment(type.createdAt).utc().format(' Do MMMM, YYYY')}</span></div>
                <div class="d-flex justify-content-between p-price"><span>Qoute Expiry Date:-</span>
                <span>{moment(futureDate).utc().format(' Do MMMM, YYYY')}</span></div>
                <div class="d-flex justify-content-between p-price"><span>Contact No:-</span><span>{type.phone}</span></div>
                <div class="d-flex justify-content-between p-price"><span>Start date:-</span><span>{moment(mindate).format(' Do MMMM, YYYY')}</span></div>
            </div> */}

                <table>
                  <tr>
                    <td className="view-details-01"> Quotations date:-</td>
                    <td className="view-details-02">
                      <span className='my-spn-detail'>{moment(type.createdAt).utc().format(' Do MMMM, YYYY')}</span>
                    
                    </td>
                  </tr>
                  <tr>
                    <td className="view-details-01"> Qoute Expiry Date:-</td>
                    <td className="view-details-02">
                      {moment(futureDate).utc().format(' Do MMMM, YYYY')}
                    </td>
                  </tr>
                  <tr>
                    <td className="view-details-01">Contact No:-</td>
                    <td className="view-details-02">{type.phone}</td>
                  </tr>
                  <tr>
                    <td className="view-details-01">Start date:-</td>
                    <td className="view-details-02">{moment(mindate).format(' Do MMMM, YYYY')}</td>
                  </tr>
                </table>
              </div>
              <div className=" col-md-6 col-sm-12 col-lg-4 ">


              
                <table>
                <tr>
                  <td className="view-details-01"> Sales Rep:-</td>
                  <td className="view-details-02"> {type.sales_rep}</td>
                </tr>
                <tr>
                  <td className="view-details-01"> Name:-</td>
                  <td className="view-details-02"> {type.name}</td>
                </tr>
                <tr>
                  <td className="view-details-01">Email:-</td>
                  <td className="view-details-02"> {type.email}</td>
                </tr>
                <tr>
                  <td className="view-details-01">End date:-</td>
                  <td className="view-details-02">
                    {' '}
                    {moment(maxdate).utc().format(' Do MMMM, YYYY')}
                  </td>
                </tr>
                <tr>
                  <td className="view-details-01">Advertiser:-</td>
                  <td className="view-details-02"> {type.advertiser}</td>
                </tr>
                </table>
              </div>
            </div>

            <div className="mt-3" style={{ borderBottom: '2px solid black' }}>
              <Box sx={{ overflow: 'auto' }}>
                <Box sx={{ width: '100%', display: 'table', tableLayout: 'fixed' }}>
                  <Table className="viewdetail-hd">
                    <thead className="text-center viewdetail-hd">
                      <th></th>

                      <th></th>
                      <th className="text-center" colSpan={7}>
                        {' '}
                        SPOTS OR PROGRSMMERS BY DAY{' '}
                      </th>
                    </thead>
                    <thead>
                      <tr>
                        <th>Dates torun</th>

                        <th>Hours TO Run</th>
                        <th>Mon</th>
                        <th>Tue</th>
                        <th>Wed</th>
                        <th>Thu</th>
                        <th>Fri</th>
                        <th>Sat</th>
                        <th>Sun</th>
                        <th>Total</th>
                        {/* <th>length</th> */}
                        <th>INSTRUCTIONS</th>
                      </tr>
                    </thead>

                    <tbody>
                      {invoicedata.map((item) => {
                        return (
                          <>
                            <tr className="tr-invoice">
                              <td>
                                {moment(item.start_date).utc().format(' Do MMMM') +
                                  '-' +
                                  moment(item.end_date).utc().format(' Do MMMM')}
                              </td>
                              <td>
                                {moment(item.starttime).format('LT') +
                                  '-' +
                                  moment(item.endtime).format('LT')}
                              </td>

                              <td>{(item.monday=='')?0:(item.monday)}</td>
                              <td>{(item.tuesday=='')?0:(item.tuesday)}</td>
                              <td>{(item.wednesday=='')?0:(item.wednesday)}</td>
                              <td>{(item.thursday=='')?0:(item.thursday)}</td>
                              <td>{(item.friday=='')?0:(item.friday)}</td>
                              <td>{(item.saturday=='')?0:(item.saturday)}</td>
                              <td>{(item.sunday=='')?0:(item.sunday)}</td>
                              <td>{item.total}</td>
                              

                              <td>{item.product_type}</td>
                            </tr>
                          </>
                        );
                      })}
                    </tbody>
                  </Table>
                </Box>
              </Box>
            </div>
            {dataapi.map((item) => {
              monthlydistribuion = (item.grandtotal / myarray.length).toFixed(2);

              console.log(monthlydistribuion, '123');
              return (
                <>
                  <div className="">
                    <Box sx={{ overflow: 'auto' }}>
                      <Box sx={{ width: '100%', display: 'table', tableLayout: 'fixed' }}>
                        <Table className="viewdetail-hd">
                          <thead className="">
                            <tr className="mytable">
                              {/* <th># HR PER WK </th> */}

                              <th>TOTAL COST OF PACKAGE</th>
                              {(item.trade=='0.00') ?<></>: <th>{item.discountdropdown}</th>}
                             
                              {/* <th>% ABST </th> */}
                              <th>ABST</th>
                              <th>TOTAL</th>
                            </tr>
                          </thead>
                          <tbody className="second-table-body">
                            <tr>
                              {/* <td>{item.weekhr}</td> */}

                              <td>${item.cost}</td>
                              
                                {(item.trade=='0.00') ?<></>:<td>${item.trade}</td>}
                              
                              
                              {/* <td>%{(item.discountabst)}</td> */}
                              <td>
                                ${(((item.cost - item.trade) * item.discountabst) / 100).toFixed(2)}
                              </td>
                              <td>${item.grandtotal}</td>
                            </tr>
                          </tbody>
                        </Table>
                      </Box>
                    </Box>
                  </div>

                  {startMonth === endMonth ? (
                    ''
                  ) : (
                    <>
                      <div className='viewdetail-hd' style={{ borderBottom: '2px solid black', paddingBottom: '5px' }}>
                        {' '}
                        <p style={{ marginTop: '8px' }}>
                          {' '}
                          Month Projected Billing [ABST Inclusive]:
                        </p>
                        {type.monthlydistribute == 'true' ? (
                          <div
                            style={{
                              display: 'grid',
                              gridTemplateColumns: 'auto auto auto auto',
                              marginTop: '30px',
                              textAlign: 'center',
                              gridGap: '10px',
                            }}
                          >
                            <div>
                              <div>Jan: {monthly.jan}</div>
                              <div>Feb: ${monthly.feb}</div>
                              <div>Mar: ${monthly.mar}</div>
                            </div>
                            <div>
                              <div>April: ${monthly.april}</div>
                              <div>May: ${monthly.may}</div>
                              <div>June: ${monthly.june}</div>
                            </div>
                            <div>
                              <div>July: ${monthly.july}</div>
                              <div>Aug: ${monthly.aug}</div>
                              <div>Sept: ${monthly.sept}</div>
                            </div>
                            <div>
                              <div>Oct: ${monthly.oct}</div>
                              <div>Nov: ${monthly.nov}</div>
                              <div>Dec: ${monthly.dec}</div>
                            </div>
                          </div>
                        ) : (
                          <div
                            style={{
                              display: 'grid',
                              gridTemplateColumns: 'auto auto auto auto',
                              marginTop: '30px',
                              textAlign: 'center',
                              gridGap: '10px',
                            }}
                          >
                            <div className='viewdetail-hd'>
                              {/* {console.log(monthlydistribuion,'2555555')} */}
                              <div>
                                Jan: ${myarray.includes('01') ? monthlydistribuion : '0.00'}
                              </div>
                              <div>
                                Feb: ${myarray.includes('02') ? monthlydistribuion : '0.00'}
                              </div>
                              <div>
                                Mar: ${myarray.includes('03') ? monthlydistribuion : '0.00'}
                              </div>
                            </div>
                            <div>
                              <div>
                                April: ${myarray.includes('04') ? monthlydistribuion : '0.00'}
                              </div>
                              <div>
                                May: ${myarray.includes('05') ? monthlydistribuion : '0.00'}
                              </div>
                              <div>
                                June: ${myarray.includes('06') ? monthlydistribuion : '0.00'}
                              </div>
                            </div>
                            <div>
                              <div>
                                July: ${myarray.includes('07') ? monthlydistribuion : '0.00'}
                              </div>
                              <div>
                                Aug: ${myarray.includes('08') ? monthlydistribuion : '0.00'}
                              </div>
                              <div>
                                Sept: ${myarray.includes('09') ? monthlydistribuion : '0.00'}
                              </div>
                            </div>
                            <div>
                              <div>
                                Oct: ${myarray.includes('10') ? monthlydistribuion : '0.00'}
                              </div>
                              <div>
                                Nov: ${myarray.includes('11') ? monthlydistribuion : '0.00'}
                              </div>
                              <div>
                                Dec: ${myarray.includes('12') ? monthlydistribuion : '0.00'}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      {type.monthlydistribute === 'true' ? (
                        <span
                          style={{
                            marginTop: '3px',
                            float: 'right',
                            fontSize: '10px',
                            color: 'red',
                          }}
                        >
                          {' '}
                          {/* * This {item.discountdropdown} Amount is not apply in Monthly breakdown */}
                        </span>
                      ) : (
                        <></>
                      )}
                    </>
                  )}
                </>
              );
            })}

            <div style={{ marginTop: '80px' }}>
              <div style={{ paddingBottom: '10px' }}>
                <div className="mt-3 viewdetail-hd">
                  <p style={{ textDecoration: 'underline', paddingBottom: '1px' }}>
                    Payment Schedule/Other Details:
                  </p>
                  <p>{type.paymentdue}</p>
                </div>
              </div>

              <div className="writing-field">
                <div>
                  <img
                    className="img-sign"
                    src={`http://192.168.29.28:8080/uploads/${type.signature}`}
                
                    alt={'signature'}
                  />

                  <div className="sing-1 viewdetail-hd">Family FM Representative </div>

                     
                </div>
               
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default Viewdetail;
