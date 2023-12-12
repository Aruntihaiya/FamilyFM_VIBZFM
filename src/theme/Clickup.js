import React, { useState, useRef,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import SignatureCanvas from 'react-signature-canvas';
import { FiEdit, FiSave, FiX } from 'react-icons/fi';

import { AiOutlineLogout } from 'react-icons/ai';

import { DatePicker } from 'antd';
import 'antd/dist/reset.css';
import { Formik, Field } from 'formik';
import { TimePicker } from 'antd';
import './Form.css';

import axios from 'axios';
import SignaturePad from './SignaturePad';
import moment from 'moment';
import * as Yup from 'yup';

import 'bootstrap/dist/css/bootstrap.min.css';

// import { useEffect } from 'react';

import { Link, useNavigate, useParams,useLocation } from 'react-router-dom';
import Table from 'react-bootstrap/esm/Table';
import { Termcondition } from './Termcondition';
import Card from 'react-bootstrap/Card';
import { toast } from 'react-toastify';
import { Grid, Container, Typography, Box } from '@mui/material';
// components

import { Icon } from '@iconify/react';
// sections
import { Col, Row } from 'react-bootstrap';

import './Form.css';
// import { DateRangePicker } from 'rsuite';
import DateRangePicker from 'rsuite/DateRangePicker';
import 'rsuite/dist/rsuite.css';
import { DateTimePicker } from '@mui/lab';
import { iteratee } from 'lodash';
import Item from 'antd/es/list/Item';

const { RangePicker } = DatePicker;

const validationSchema = Yup.object({});

const Clickup = () => {
  const navigate = useNavigate();

  const [product_type, setproduct_type] = useState('');
  const [show, setShow] = useState(false);
const location = useLocation()


  const [event, setevent] = useState('');
  const [rate, setrate] = useState('');
  const [discount, setdiscount] = useState('');
  const [cost, setcost] = useState('');
  const [cost_tax, setcost_tax] = useState('');

  const [discounted_cost, setdiscounted_cost] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [apicallingState, setapicallingState] = useState([]);


  const [rowsData, setRowsData] = useState([]);
  const [abstdiscount, setabstdiscount] = useState(0);

  const [dates, setDates] = useState([]);
  const [startdate, setstartdate] = useState('');
  const [enddate, setenddate] = useState('');
  const [starttime, setstarttime] = useState('');
  const [endtime, setendtime] = useState('');
  const [qty, setqty] = useState('');
  const [mysign, setmysign] = useState('');
  const [loading, setLoading] = useState(false);
  const [timeRange, setTimeRange] = useState([]);
  const [mysignerror, setmysignerror] = useState(false);
  const [paymentdue, setpaymentdue] = useState('');
  const [mydropdown, setmydropdown] = useState('');
  // const[trade,settrade]
  const [errorMessage, setErrorMessage] = useState(false);
  const[mytotaled,setmytotaled]= useState()
  const [storage, setstorage] = useState([]);
  const [myupdata, setmyupdata] = useState([]);
  const [name, setname] = useState('');
  const [contractdate, setcontractdate] = useState('');
  const [salesrep, setsalesrep] = useState('');
  const [Advertiser, setAdvertiser] = useState('');
  const [paymenttext, setpaymenttext] = useState('');
  const [email, setemail] = useState('');
  const [phone, setphone] = useState('');
  const [myevent, setmyevent] = useState('');
  const [id, setid] = useState(false);
  const [myproduct, setmyproduct] = useState('');
  const [myproduct1, setmyproduct1] = useState('');
  const [porductitem, setproductitem] = useState([]);
  const [modalVisibility, setModalVisibility] = useState({});
  const [modalVisibility1, setModalVisibility1] = useState({});
  const [mytotal, setmytotal] = useState('');
  const [addnew, setaddnew] = useState();
  const [editingIndex, setEditingIndex] = useState(-1);

  // const [mycost, setmycost] = useState('');

  const [datascan, setdatascan] = useState([]);
  const [temprarydatascan, settemprarydatascan] = useState([]);
  const [mycost, setmycost] = useState('');
  const [trade, settrade] = useState('');
  const [abst, setabst] = useState();
  const [grandtotal, setgrandtotal] = useState('');
  const [discountabst, setdiscountabst] = useState('');
  const [itemlist, setitemlist] = useState([]);
  const [backupitemlist, setbackupitemlist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(500);
  const [handleupdate, sethandleupdate] = useState(false);
  const [originalItemlist, setOriginalItemlist] = useState([]);
  const [cancelState, setcancelState] = useState();

  const [error, seterror] = useState('');

  const [fields, setFields] = useState([
    {
      product_type: '',
      runDates: '',
      perWeeks: '',
      rate: '',
      discount: '',
      cost: '',
      cost_tax: '',
      discounted_cost: '',
      total: '',
      monday: '',
      tuesday: '',
      wednesday: '',
      thursday: '',
      friday: '',
      saturday: '',
      sunday: '',
      qty: '',
      runTimes: '',
    },
  ]);
  const [showModal1, setShowModal1] = useState(false);

  const handleClosetable = () => {
    setShowModal1(false);
    setFields([...fields]);
  };
  const handleShowtable = () => setShowModal1(true);


  const params = useParams();
  // console.log(params.id, 'ds');
  const [dataapi, setDataapi] = useState([]);

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
        setitemlist(response.data.data.itemlist);
        setapicallingState(response.data.data.itemlist)
        setid(response.data.data.details[0].id);
        setDataapi(response.data.data.details);
        setproductitem(response.data.data.itemlist);
        setname(response.data.data.details[0].name);

        setsalesrep(response.data.data.details[0].sales_rep);
        setmyevent(response.data.data.details[0].event);
        setemail(response.data.data.details[0].email);
        setphone(response.data.data.details[0].phone);
        setAdvertiser(response.data.data.details[0].advertiser);
        setmycost(response.data.data.details[0].cost);
        settrade(response.data.data.details[0].trade);
        setabst(response.data.data.details[0].abst);
        setmycost(response.data.data.details[0].cost);
        setdiscountabst(response.data.data.details[0].discountabst);
        setgrandtotal(response.data.data.details[0].grandtotal);
        setmydropdown(response.data.data.details[0].discountdropdown);
        setpaymenttext(response.data.data.details[0].paymentdue);
        
      });

  }, [params.id, addnew,cancelState]);
// console.log(JSON.stringify(state))


    const updatetotal = itemlist.reduce(
      (accumulator, item) => accumulator + (parseFloat(item.cost) || 0),
      0,
    );

    console.log(updatetotal,'sdsdds123')
  
   
     var total =updatetotal;


   console.log(total,'sddsds')









  const updateAPIData = () => {
    axios
      .post(`http://192.168.29.28:8080/api/public/updateagreement/${id}`, {
        sales_rep: salesrep,
        advertiser: Advertiser,
        name: name,
        event: myevent,
        phone: phone,
        email: email,
        fields: datascan,
        cost: total,
        trade: trade,
        grandtotal: grand,
        discountdropdown: mydropdown,
        abst:  myvalue125,
        paymentdue: paymenttext,
      })
      .then((response) => {
        toast.success(response.data.message);
      });
  };

  var valuess = [];

  const enableEdit = (index) => {
    // const updatedata = [...itemlist];

    // updatedata.splice(0, 1);

    // setitemlist(updatedata);

    setEditingIndex(index);
    setIsDisabled(true);
    setcancelState(!cancelState);
  };


  const cancelEdit = (id) => {
  
setitemlist([])
      // setcancelState("update"+(!cancelState));
      // navigate(`/dashboard/updateagreement/${params.id}`, {state:{updatestate:cancelState} });
      // setitemlist(itemlist)
      setEditingIndex(-1);
      setIsDisabled(true)
      setcancelState(!cancelState);
      // Now, itemlist contains the removed item added back
      // console.log('Removed Item:', itemlist);
    // }
  };


  // useEffect(()=>{
 
  //   const updatetotal = itemlist.reduce(
  //     (accumulator, item) => accumulator + (parseFloat(item.cost) || 0),
  //     0,
  //   );
  
  //   const currenttotal = fields
  //     .slice(500)
  //     .reduce((accumulator, item) => accumulator + (parseFloat(item.cost) || 0), 0);
  
  //     setmytotaled(updatetotal + currenttotal) ;
  // },[itemlist,fields])
  
  
  // useEffect(() => {
  //    debugger
  //   let totaldiscount = total - trade;
  //   let myvalue = ((totaldiscount * abstdiscount) / 100).toFixed(2);
  //   setabst(myvalue);
  //   let grand = Number(totaldiscount) + Number(abst);
  //   setgrandtotal(grand);
  
  // }, [abstdiscount]);
  
   
  // useEffect(() => {
  // debugger
    let totaldiscount =total  - trade;
    let myvalue125 = ((totaldiscount * abstdiscount) / 100).toFixed(2);
    // setabst(myvalue);
    let grand = Number(totaldiscount) + Number( myvalue125);
    // setgrandtotal(grand);
  
  // }, [ trade]);

  
  
  

  const saveChanges = (id, i) => {
    // Implement logic to save changes to the backend or update your data
    // After saving, disable editing and enable other rows
    setEditingIndex(-1);
    setIsDisabled(true);

    axios
      .post(`http://192.168.29.28:8080/api/public/updatedproductitem`, {
        id: id,
        product_type: itemlist[i].product_type,
        start_date: itemlist[i].startdate,
        end_date: itemlist[i].enddate,
        starttime: itemlist[i].starttime,
        total: itemlist[i].total,
        endtime: itemlist[i].endtime,
        sunday: itemlist[i].sunday,
        monday: itemlist[i].monday,
        tuesday: itemlist[i].tuesday,
        wednesday: itemlist[i].wednesday,
        thursday: itemlist[i].thursday,
        friday: itemlist[i].friday,
        saturday: itemlist[i].saturday,
        rate: itemlist[i].rate,
        cost: itemlist[i].cost,
        jan: itemlist[i].jan,
        feb: itemlist[i].feb,
        mar: itemlist[i].mar,
        april: itemlist[i].april,
        may: itemlist[i].may,
        june: itemlist[i].june,
        july: itemlist[i].july,
        aug: itemlist[i].aug,
        sept: itemlist[i].sept,
        oct: itemlist[i].oct,
        nov: itemlist[i].nov,
        dec: itemlist[i].dec,
      })
      .then((response) => {
        toast.success('Updated Successfully');
      });
  };


  const addproductitem = () => {
    const isFormValid = fields.slice(500).every((item, index) => {
      return (
        item.product_type &&
        item.runDates.startdate &&
        item.runDates.enddate &&
        item.runTimes.starttime &&
        item.runTimes.endtime &&
        item.total &&
        item.rate &&
        item.cost
      );
    });
    if (isFormValid) {
      var myfield = fields.slice(500);
      axios
        .post(`http://192.168.29.28:8080/api/public/addproductitem`, {
          fields: myfield,
          formid: params.id,
        })
        .then((response) => {
     
          if (response.data.code == 200) {
            setaddnew(!addnew);

            toast.success('Added Successfully');
            handleClosetable();
          }
        });
    } else {
      // alert('Please fill all fields before adding.');
      toast.error('Please fill all fields before adding');
    }
  };

  function handleAdd() {
    const newrow = {
      product_type: '',
      runDates: '',
      perWeeks: '',
      rate: '',
      discount: '',
      cost: '',
      cost_tax: '',
      discounted_cost: '',
      total: '',
      monday: 0,
      tuesday: 0,
      wednesday: 0,
      thursday: 0,
      friday: 0,
      saturday: 0,
      sunday: 0,
      qty: '',
      runTimes: '',
      jan: 0,
      feb: 0,
      mar: 0,
      april: 0,
      may: 0,
      june: 0,
      july: 0,
      aug: 0,
      sept: 0,
      oct: 0,
      nov: 0,
      dec: 0,
    };

    const updatedFields = [...fields];
    updatedFields[currentIndex] = newrow;
    setFields(updatedFields);

    setCurrentIndex(currentIndex + 1);
  }

  // console.log(fields, 'indexting');
  function datehandle(i, startdate, enddate) {
    const values = [...fields];

    let start = moment(startdate, 'YYYY-MM-DD'); //Pick 0.01 format
    let end = moment(enddate, 'YYYY-MM-DD'); //right now (or define an end date yourself)
    let weekdayMonCounter = 0;
    let weekdayTueCounter = 0;
    let weekdayWedCounter = 0;
    let weekdayThuCounter = 0;
    let weekdayFriCounter = 0;
    let weekdaySatCounter = 0;
    let weekdaySunCounter = 0;

    while (start <= end) {
      if (start.format('ddd') === 'Mon') {
        weekdayMonCounter++;
        start = moment(start, 'YYYY-MM-DD').add(1, 'days');
      } else if (start.format('ddd') === 'Tue') {
        weekdayTueCounter++;
        start = moment(start, 'YYYY-MM-DD').add(1, 'days');
      } else if (start.format('ddd') === 'Wed') {
        weekdayWedCounter++;
        start = moment(start, 'YYYY-MM-DD').add(1, 'days');
      } else if (start.format('ddd') === 'Thu') {
        weekdayThuCounter++;
        start = moment(start, 'YYYY-MM-DD').add(1, 'days');
      } else if (start.format('ddd') === 'Fri') {
        weekdayFriCounter++;
        start = moment(start, 'YYYY-MM-DD').add(1, 'days');
      } else if (start.format('ddd') === 'Sat') {
        weekdaySatCounter++;
        start = moment(start, 'YYYY-MM-DD').add(1, 'days');
      } else if (start.format('ddd') === 'Sun') {
        weekdaySunCounter++;
        start = moment(start, 'YYYY-MM-DD').add(1, 'days');
      }
    }

    let startDate = moment(startdate).format('YYYY-MM-DD');
    let endDate = moment(enddate).format('YYYY-MM-DD');
    let betweenMonths = [];
    let montharray = [];
    var totalcost;

    if (startDate < endDate) {
      let date = moment(startDate).startOf('month');
      while (date < moment(endDate).endOf('month')) {
        // console.log(date,"while.......")
        betweenMonths.push(date.format('MM'));
        montharray.push(date.format('MM'));

        date.add(1, 'month');
      }
    }

    values[i]['jan'] = 0.0;
    values[i]['feb'] = 0.0;
    values[i]['mar'] = 0.0;

    values[i]['april'] = 0.0;
    values[i]['may'] = 0.0;
    values[i]['sept'] = 0.0;
    values[i]['oct'] = 0.0;
    values[i]['nov'] = 0.0;
    values[i]['dec'] = 0.0;

    values[i]['june'] = 0.0;
    values[i]['july'] = 0.0;
    values[i]['aug'] = 0.0;

    for (let j = 0; j < betweenMonths.length; j++) {
      if (j == 0) {
        let eendDate = moment(startDate).endOf('month');

        let startdateofmonth = moment(eendDate).format('YYYY-MM-DD');

        let weekdayMonCounter1 = 0;
        let weekdayTueCounter1 = 0;
        let weekdayWedCounter1 = 0;
        let weekdayThuCounter1 = 0;
        let weekdayFriCounter1 = 0;
        let weekdaySatCounter1 = 0;
        let weekdaySunCounter1 = 0;

        let currentDate = moment(startDate); // Create a separate variable to iterate over the dates
        let enddingdate = moment(startdateofmonth);

        while (currentDate <= enddingdate) {
          if (currentDate.format('ddd') === 'Mon') {
            weekdayMonCounter1++;
          } else if (currentDate.format('ddd') === 'Tue') {
            weekdayTueCounter1++;
          } else if (currentDate.format('ddd') === 'Wed') {
            weekdayWedCounter1++;
          } else if (currentDate.format('ddd') === 'Thu') {
            weekdayThuCounter1++;
          } else if (currentDate.format('ddd') === 'Fri') {
            weekdayFriCounter1++;
          } else if (currentDate.format('ddd') === 'Sat') {
            weekdaySatCounter1++;
          } else if (currentDate.format('ddd') === 'Sun') {
            weekdaySunCounter1++;
          }

          currentDate.add(1, 'day');
        }

        totalcost =
          (Number(values[i]['monday']) * weekdayMonCounter1 +
            Number(values[i]['tuesday']) * weekdayTueCounter1 +
            Number(values[i]['wednesday']) * weekdayWedCounter1 +
            Number(values[i]['thursday']) * weekdayThuCounter1 +
            Number(values[i]['friday']) * weekdayFriCounter1 +
            Number(values[i]['saturday']) * weekdaySatCounter1 +
            Number(values[i]['sunday']) * weekdaySunCounter1) *
          fields[i].rate;
      } else if (j == betweenMonths.length - 1) {
        let eendDate = moment(endDate).startOf('month');

        let startdateofmonth = moment(eendDate).format('YYYY-MM-DD');

        let weekdayMonCounter2 = 0;
        let weekdayTueCounter2 = 0;
        let weekdayWedCounter2 = 0;
        let weekdayThuCounter2 = 0;
        let weekdayFriCounter2 = 0;
        let weekdaySatCounter2 = 0;
        let weekdaySunCounter2 = 0;

        let enddingdate = moment(endDate); // Create a separate variable to iterate over the dates
        let currentDate = moment(startdateofmonth);

        while (currentDate <= enddingdate) {
          if (currentDate.format('ddd') === 'Mon') {
            weekdayMonCounter2++;
          } else if (currentDate.format('ddd') === 'Tue') {
            weekdayTueCounter2++;
          } else if (currentDate.format('ddd') === 'Wed') {
            weekdayWedCounter2++;
          } else if (currentDate.format('ddd') === 'Thu') {
            weekdayThuCounter2++;
          } else if (currentDate.format('ddd') === 'Fri') {
            weekdayFriCounter2++;
          } else if (currentDate.format('ddd') === 'Sat') {
            weekdaySatCounter2++;
          } else if (currentDate.format('ddd') === 'Sun') {
            weekdaySunCounter2++;
          }

          currentDate.add(1, 'day');
        }

        totalcost =
          (Number(values[i]['monday']) * weekdayMonCounter2 +
            Number(values[i]['tuesday']) * weekdayTueCounter2 +
            Number(values[i]['wednesday']) * weekdayWedCounter2 +
            Number(values[i]['thursday']) * weekdayThuCounter2 +
            Number(values[i]['friday']) * weekdayFriCounter2 +
            Number(values[i]['saturday']) * weekdaySatCounter2 +
            Number(values[i]['sunday']) * weekdaySunCounter2) *
          fields[i].rate;
      } else {
        let eendDate = moment(betweenMonths[j].concat('-01')).endOf('month');

        let startdateofmonth = moment(eendDate).format('YYYY-MM-DD');
        let mystartDate = moment(betweenMonths[j].concat('-01')).format('YYYY-MM-DD');

        let weekdayMonCounter1 = 0;
        let weekdayTueCounter1 = 0;
        let weekdayWedCounter1 = 0;
        let weekdayThuCounter1 = 0;
        let weekdayFriCounter1 = 0;
        let weekdaySatCounter1 = 0;
        let weekdaySunCounter1 = 0;

        let currentDate = moment(mystartDate); // Create a separate variable to iterate over the dates
        let enddingdate = moment(startdateofmonth);

        while (currentDate <= enddingdate) {
          if (currentDate.format('ddd') === 'Mon') {
            weekdayMonCounter1++;
          } else if (currentDate.format('ddd') === 'Tue') {
            weekdayTueCounter1++;
          } else if (currentDate.format('ddd') === 'Wed') {
            weekdayWedCounter1++;
          } else if (currentDate.format('ddd') === 'Thu') {
            weekdayThuCounter1++;
          } else if (currentDate.format('ddd') === 'Fri') {
            weekdayFriCounter1++;
          } else if (currentDate.format('ddd') === 'Sat') {
            weekdaySatCounter1++;
          } else if (currentDate.format('ddd') === 'Sun') {
            weekdaySunCounter1++;
          }

          currentDate.add(1, 'day');
        }

        totalcost =
          (Number(values[i]['monday']) * weekdayMonCounter1 +
            Number(values[i]['tuesday']) * weekdayTueCounter1 +
            Number(values[i]['wednesday']) * weekdayWedCounter1 +
            Number(values[i]['thursday']) * weekdayThuCounter1 +
            Number(values[i]['friday']) * weekdayFriCounter1 +
            Number(values[i]['saturday']) * weekdaySatCounter1 +
            Number(values[i]['sunday']) * weekdaySunCounter1) *
          fields[i].rate;

        // console.log(totalcost, 'middletotalcost');
      }
      var myresult = Number(betweenMonths[j]);
    }

    values[i]['total'] =
      Number(values[i]['monday']) +
      Number(values[i]['tuesday']) +
      Number(values[i]['wednesday']) +
      Number(values[i]['thursday']) +
      Number(values[i]['friday']) +
      Number(values[i]['saturday']) +
      Number(values[i]['sunday']);

    values[i]['qty'] =
      Number(values[i]['monday']) * weekdayMonCounter +
      Number(values[i]['tuesday']) * weekdayTueCounter +
      Number(values[i]['wednesday']) * weekdayWedCounter +
      Number(values[i]['thursday']) * weekdayThuCounter +
      Number(values[i]['friday']) * weekdayFriCounter +
      Number(values[i]['saturday']) * weekdaySatCounter +
      Number(values[i]['sunday']) * weekdaySunCounter;

    values[i]['total'] =
      Number(values[i]['monday']) +
      Number(values[i]['tuesday']) +
      Number(values[i]['wednesday']) +
      Number(values[i]['thursday']) +
      Number(values[i]['friday']) +
      Number(values[i]['saturday']) +
      Number(values[i]['sunday']);

    setFields(values);

    fields[i].cost = (
      (Number(values[i]['monday']) * weekdayMonCounter +
        Number(values[i]['tuesday']) * weekdayTueCounter +
        Number(values[i]['wednesday']) * weekdayWedCounter +
        Number(values[i]['thursday']) * weekdayThuCounter +
        Number(values[i]['friday']) * weekdayFriCounter +
        Number(values[i]['saturday']) * weekdaySatCounter +
        Number(values[i]['sunday']) * weekdaySunCounter) *
      fields[i].rate
    ).toFixed(2);

    fields[i].discounted_cost = fields[i].cost - fields[i].discount;

    fields[i].cost_tax =
      Math.round((fields[i].discounted_cost + (fields[i].discounted_cost * 15) / 100) * 100) / 100;

    if (fields[i].product_type === '') {
    } else {
      setproduct_type(fields[i].product_type);
    }
  }

  function handleChange1(i, event, fieldname) {
    // console.log(i, 'indexinffg');
    const values = [...fields];
    values[i][event.target.name] = event.target.value;

    let start = moment(startdate, 'YYYY-MM-DD'); //Pick 0.01 format
    let end = moment(enddate, 'YYYY-MM-DD'); //right now (or define an end date yourself)
    let weekdayMonCounter = 0;
    let weekdayTueCounter = 0;
    let weekdayWedCounter = 0;
    let weekdayThuCounter = 0;
    let weekdayFriCounter = 0;
    let weekdaySatCounter = 0;
    let weekdaySunCounter = 0;

    while (start <= end) {
      if (start.format('ddd') === 'Mon') {
        weekdayMonCounter++;
        start = moment(start, 'YYYY-MM-DD').add(1, 'days');
      } else if (start.format('ddd') === 'Tue') {
        weekdayTueCounter++;
        start = moment(start, 'YYYY-MM-DD').add(1, 'days');
      } else if (start.format('ddd') === 'Wed') {
        weekdayWedCounter++;
        start = moment(start, 'YYYY-MM-DD').add(1, 'days');
      } else if (start.format('ddd') === 'Thu') {
        weekdayThuCounter++;
        start = moment(start, 'YYYY-MM-DD').add(1, 'days');
      } else if (start.format('ddd') === 'Fri') {
        weekdayFriCounter++;
        start = moment(start, 'YYYY-MM-DD').add(1, 'days');
      } else if (start.format('ddd') === 'Sat') {
        weekdaySatCounter++;
        start = moment(start, 'YYYY-MM-DD').add(1, 'days');
      } else if (start.format('ddd') === 'Sun') {
        weekdaySunCounter++;
        start = moment(start, 'YYYY-MM-DD').add(1, 'days');
      }
    }

    let startDate = moment(startdate).format('YYYY-MM-DD');
    let endDate = moment(enddate).format('YYYY-MM-DD');
    let betweenMonths = [];
    let montharray = [];
    var totalcost;

    if (startDate < endDate) {
      let date = moment(startDate).startOf('month');

      while (date < moment(endDate).endOf('month')) {
        betweenMonths.push(date.format('MM'));
        montharray.push(date.format('YYYY-MM'));

        date.add(1, 'month');
      }
    }

    values[i]['jan'] = 0.0;
    values[i]['feb'] = 0.0;
    values[i]['mar'] = 0.0;

    values[i]['april'] = 0.0;
    values[i]['may'] = 0.0;
    values[i]['sept'] = 0.0;
    values[i]['oct'] = 0.0;
    values[i]['nov'] = 0.0;
    values[i]['dec'] = 0.0;

    values[i]['june'] = 0.0;
    values[i]['july'] = 0.0;
    values[i]['aug'] = 0.0;

    for (let j = 0; j < betweenMonths.length; j++) {
      if (j == 0) {
        let eendDate = moment(startDate).endOf('month');

        let startdateofmonth = moment(eendDate).format('YYYY-MM-DD');

        let weekdayMonCounter1 = 0;
        let weekdayTueCounter1 = 0;
        let weekdayWedCounter1 = 0;
        let weekdayThuCounter1 = 0;
        let weekdayFriCounter1 = 0;
        let weekdaySatCounter1 = 0;
        let weekdaySunCounter1 = 0;

        let currentDate = moment(startDate);
        let enddingdate = moment(startdateofmonth);

        while (currentDate <= enddingdate) {
          if (currentDate.format('ddd') === 'Mon') {
            weekdayMonCounter1++;
          } else if (currentDate.format('ddd') === 'Tue') {
            weekdayTueCounter1++;
          } else if (currentDate.format('ddd') === 'Wed') {
            weekdayWedCounter1++;
          } else if (currentDate.format('ddd') === 'Thu') {
            weekdayThuCounter1++;
          } else if (currentDate.format('ddd') === 'Fri') {
            weekdayFriCounter1++;
          } else if (currentDate.format('ddd') === 'Sat') {
            weekdaySatCounter1++;
          } else if (currentDate.format('ddd') === 'Sun') {
            weekdaySunCounter1++;
          }

          currentDate.add(1, 'day');
        }

        totalcost =
          (Number(values[i]['monday']) * weekdayMonCounter1 +
            Number(values[i]['tuesday']) * weekdayTueCounter1 +
            Number(values[i]['wednesday']) * weekdayWedCounter1 +
            Number(values[i]['thursday']) * weekdayThuCounter1 +
            Number(values[i]['friday']) * weekdayFriCounter1 +
            Number(values[i]['saturday']) * weekdaySatCounter1 +
            Number(values[i]['sunday']) * weekdaySunCounter1) *
          fields[i].rate;
      } else if (j == betweenMonths.length - 1) {
        let eendDate = moment(endDate).startOf('month');

        let startdateofmonth = moment(eendDate).format('YYYY-MM-DD');

        let weekdayMonCounter2 = 0;
        let weekdayTueCounter2 = 0;
        let weekdayWedCounter2 = 0;
        let weekdayThuCounter2 = 0;
        let weekdayFriCounter2 = 0;
        let weekdaySatCounter2 = 0;
        let weekdaySunCounter2 = 0;

        let enddingdate = moment(endDate); // Create a separate variable to iterate over the dates
        let currentDate = moment(startdateofmonth);

        while (currentDate <= enddingdate) {
          if (currentDate.format('ddd') === 'Mon') {
            weekdayMonCounter2++;
          } else if (currentDate.format('ddd') === 'Tue') {
            weekdayTueCounter2++;
          } else if (currentDate.format('ddd') === 'Wed') {
            weekdayWedCounter2++;
          } else if (currentDate.format('ddd') === 'Thu') {
            weekdayThuCounter2++;
          } else if (currentDate.format('ddd') === 'Fri') {
            weekdayFriCounter2++;
          } else if (currentDate.format('ddd') === 'Sat') {
            weekdaySatCounter2++;
          } else if (currentDate.format('ddd') === 'Sun') {
            weekdaySunCounter2++;
          }

          currentDate.add(1, 'day');
        }

        totalcost =
          (Number(values[i]['monday']) * weekdayMonCounter2 +
            Number(values[i]['tuesday']) * weekdayTueCounter2 +
            Number(values[i]['wednesday']) * weekdayWedCounter2 +
            Number(values[i]['thursday']) * weekdayThuCounter2 +
            Number(values[i]['friday']) * weekdayFriCounter2 +
            Number(values[i]['saturday']) * weekdaySatCounter2 +
            Number(values[i]['sunday']) * weekdaySunCounter2) *
          fields[i].rate;
      } else {
        let eendDate = moment(betweenMonths[j].concat('-01')).endOf('month');

        let startdateofmonth = moment(eendDate).format('YYYY-MM-DD');
        let mystartDate = moment(betweenMonths[j].concat('-01')).format('YYYY-MM-DD');

        let weekdayMonCounter1 = 0;
        let weekdayTueCounter1 = 0;
        let weekdayWedCounter1 = 0;
        let weekdayThuCounter1 = 0;
        let weekdayFriCounter1 = 0;
        let weekdaySatCounter1 = 0;
        let weekdaySunCounter1 = 0;

        let currentDate = moment(mystartDate);
        let enddingdate = moment(startdateofmonth);

        while (currentDate <= enddingdate) {
          if (currentDate.format('ddd') === 'Mon') {
            weekdayMonCounter1++;
          } else if (currentDate.format('ddd') === 'Tue') {
            weekdayTueCounter1++;
          } else if (currentDate.format('ddd') === 'Wed') {
            weekdayWedCounter1++;
          } else if (currentDate.format('ddd') === 'Thu') {
            weekdayThuCounter1++;
          } else if (currentDate.format('ddd') === 'Fri') {
            weekdayFriCounter1++;
          } else if (currentDate.format('ddd') === 'Sat') {
            weekdaySatCounter1++;
          } else if (currentDate.format('ddd') === 'Sun') {
            weekdaySunCounter1++;
          }

          currentDate.add(1, 'day');
        }

        totalcost =
          (Number(values[i]['monday']) * weekdayMonCounter1 +
            Number(values[i]['tuesday']) * weekdayTueCounter1 +
            Number(values[i]['wednesday']) * weekdayWedCounter1 +
            Number(values[i]['thursday']) * weekdayThuCounter1 +
            Number(values[i]['friday']) * weekdayFriCounter1 +
            Number(values[i]['saturday']) * weekdaySatCounter1 +
            Number(values[i]['sunday']) * weekdaySunCounter1) *
          fields[i].rate;

        // console.log(totalcost, 'middletotalcost');
      }
      var myresult = Number(betweenMonths[j]);
      console.log(betweenMonths[j], 'ds');
      switch (myresult) {
        case 1:
          values[i]['jan'] = Number(totalcost);
          console.log(totalcost, 'janupdate');
          break;
        case 2:
          values[i]['feb'] = Number(totalcost);
          console.log(totalcost, 'febupdate');
          break;
        case 3:
          values[i]['mar'] = Number(totalcost);
          console.log(totalcost, 'marupdate');

          break;
        case 4:
          values[i]['april'] = Number(totalcost);
          console.log(totalcost, 'april');
          break;
        case 5:
          values[i]['may'] = Number(totalcost);
          console.log(totalcost, 'may');
          break;
        case 6:
          values[i]['june'] = Number(totalcost);
          console.log(totalcost, 'june');
          break;
        case 7:
          values[i]['july'] = Number(totalcost);
          console.log(totalcost, 'july');
          break;
        case 8:
          values[i]['aug'] = Number(totalcost);
          console.log(totalcost, 'aug');
          break;
        case 9:
          values[i]['sept'] = Number(totalcost);
          console.log(totalcost, 'sept');
          break;
        case 10:
          values[i]['oct'] = Number(totalcost);
          console.log(totalcost, 'oct');
          break;
        case 11:
          values[i]['nov'] = Number(totalcost);
          console.log(totalcost, 'nov');
          break;
        case 12:
          values[i]['dec'] = Number(totalcost);
          console.log(totalcost, 'dec');
          break;

        default:
          console.log('none value selected');
      }
    }

    values[i]['total'] =
      Number(values[i]['monday']) +
      Number(values[i]['tuesday']) +
      Number(values[i]['wednesday']) +
      Number(values[i]['thursday']) +
      Number(values[i]['friday']) +
      Number(values[i]['saturday']) +
      Number(values[i]['sunday']);

    values[i]['qty'] =
      Number(values[i]['monday']) * weekdayMonCounter +
      Number(values[i]['tuesday']) * weekdayTueCounter +
      Number(values[i]['wednesday']) * weekdayWedCounter +
      Number(values[i]['thursday']) * weekdayThuCounter +
      Number(values[i]['friday']) * weekdayFriCounter +
      Number(values[i]['saturday']) * weekdaySatCounter +
      Number(values[i]['sunday']) * weekdaySunCounter;

    values[i]['total'] =
      Number(values[i]['monday']) +
      Number(values[i]['tuesday']) +
      Number(values[i]['wednesday']) +
      Number(values[i]['thursday']) +
      Number(values[i]['friday']) +
      Number(values[i]['saturday']) +
      Number(values[i]['sunday']);

    setFields(values);

    fields[i].cost = (
      (Number(values[i]['monday']) * weekdayMonCounter +
        Number(values[i]['tuesday']) * weekdayTueCounter +
        Number(values[i]['wednesday']) * weekdayWedCounter +
        Number(values[i]['thursday']) * weekdayThuCounter +
        Number(values[i]['friday']) * weekdayFriCounter +
        Number(values[i]['saturday']) * weekdaySatCounter +
        Number(values[i]['sunday']) * weekdaySunCounter) *
      fields[i].rate
    ).toFixed(2);

    fields[i].discounted_cost = fields[i].cost - fields[i].discount;

    fields[i].cost_tax =
      Math.round((fields[i].discounted_cost + (fields[i].discounted_cost * 15) / 100) * 100) / 100;

    if (fields[i].product_type === '') {
      // setErrorMessage1(false);
    } else {
      // setErrorMessage1(true);
      setproduct_type(fields[i].product_type);
    }
  }

  const signRef = useRef();
  const handleClear = () => {
    console.log(signRef.current.clear());
    setmysign('');
  };

  const options = {
    penColor: 'red',
    onEnd: () => signRef.current.toDataURL(),
  };

  const handleClose = (index) => {
    setModalVisibility((prevVisibility) => ({
      ...prevVisibility,
      [index]: false,
    }));
  };
  const handleClose1 = (index) => {
    setModalVisibility1((prevVisibility1) => ({
      ...prevVisibility1,
      [index]: false,
    }));
  };

  const handleShow = (index) => {
    setModalVisibility((prevVisibility) => ({
      ...prevVisibility,
      [index]: true,
    }));
  };
  const handleShow1 = (index) => {
    setModalVisibility1((prevVisibility1) => ({
      ...prevVisibility1,
      [index]: true,
    }));
  };






  const handledropdown = (event) => {
    setmydropdown(event.target.value);
  };
  function handle123(i, startdate, enddate) {
    const values = [...itemlist];

    let start = moment(startdate, 'YYYY-MM-DD');
    let end = moment(enddate, 'YYYY-MM-DD');
    let weekdayMonCounter = 0;
    let weekdayTueCounter = 0;
    let weekdayWedCounter = 0;
    let weekdayThuCounter = 0;
    let weekdayFriCounter = 0;
    let weekdaySatCounter = 0;
    let weekdaySunCounter = 0;

    while (start <= end) {
      if (start.format('ddd') === 'Mon') {
        weekdayMonCounter++;
        start = moment(start, 'YYYY-MM-DD').add(1, 'days');
      } else if (start.format('ddd') === 'Tue') {
        weekdayTueCounter++;
        start = moment(start, 'YYYY-MM-DD').add(1, 'days');
      } else if (start.format('ddd') === 'Wed') {
        weekdayWedCounter++;
        start = moment(start, 'YYYY-MM-DD').add(1, 'days');
      } else if (start.format('ddd') === 'Thu') {
        weekdayThuCounter++;
        start = moment(start, 'YYYY-MM-DD').add(1, 'days');
      } else if (start.format('ddd') === 'Fri') {
        weekdayFriCounter++;
        start = moment(start, 'YYYY-MM-DD').add(1, 'days');
      } else if (start.format('ddd') === 'Sat') {
        weekdaySatCounter++;
        start = moment(start, 'YYYY-MM-DD').add(1, 'days');
      } else if (start.format('ddd') === 'Sun') {
        weekdaySunCounter++;
        start = moment(start, 'YYYY-MM-DD').add(1, 'days');
      }
    }

    let startDate = moment(startdate).format('YYYY-MM-DD');
    let endDate = moment(enddate).format('YYYY-MM-DD');
    let betweenMonths = [];
    let montharray = [];
    var totalcost;

    if (startDate < endDate) {
      let date = moment(startDate).startOf('month');
      while (date < moment(endDate).endOf('month')) {
        // console.log(date,"while.......")
        betweenMonths.push(date.format('MM'));
        montharray.push(date.format('MM'));

        date.add(1, 'month');
      }
    }

    values[i]['jan'] = 0.0;
    values[i]['feb'] = 0.0;
    values[i]['mar'] = 0.0;

    values[i]['april'] = 0.0;
    values[i]['may'] = 0.0;
    values[i]['sept'] = 0.0;
    values[i]['oct'] = 0.0;
    values[i]['nov'] = 0.0;
    values[i]['dec'] = 0.0;

    values[i]['june'] = 0.0;
    values[i]['july'] = 0.0;
    values[i]['aug'] = 0.0;

    for (let j = 0; j < betweenMonths.length; j++) {
      if (j == 0) {
        let eendDate = moment(startDate).endOf('month');
        console.log(eendDate, 'enddate12');

        let startdateofmonth = moment(eendDate).format('YYYY-MM-DD');
        console.log(startdateofmonth, 'vuxzd');

        let weekdayMonCounter1 = 0;
        let weekdayTueCounter1 = 0;
        let weekdayWedCounter1 = 0;
        let weekdayThuCounter1 = 0;
        let weekdayFriCounter1 = 0;
        let weekdaySatCounter1 = 0;
        let weekdaySunCounter1 = 0;

        let currentDate = moment(startDate);
        let enddingdate = moment(startdateofmonth);

        while (currentDate <= enddingdate) {
          if (currentDate.format('ddd') === 'Mon') {
            weekdayMonCounter1++;
          } else if (currentDate.format('ddd') === 'Tue') {
            weekdayTueCounter1++;
          } else if (currentDate.format('ddd') === 'Wed') {
            weekdayWedCounter1++;
          } else if (currentDate.format('ddd') === 'Thu') {
            weekdayThuCounter1++;
          } else if (currentDate.format('ddd') === 'Fri') {
            weekdayFriCounter1++;
          } else if (currentDate.format('ddd') === 'Sat') {
            weekdaySatCounter1++;
          } else if (currentDate.format('ddd') === 'Sun') {
            weekdaySunCounter1++;
          }

          currentDate.add(1, 'day');
        }

        totalcost =
          (Number(values[i]['monday']) * weekdayMonCounter1 +
            Number(values[i]['tuesday']) * weekdayTueCounter1 +
            Number(values[i]['wednesday']) * weekdayWedCounter1 +
            Number(values[i]['thursday']) * weekdayThuCounter1 +
            Number(values[i]['friday']) * weekdayFriCounter1 +
            Number(values[i]['saturday']) * weekdaySatCounter1 +
            Number(values[i]['sunday']) * weekdaySunCounter1) *
          values[i].rate;

        console.log(totalcost, 'totalcosting123');
      } else if (j == betweenMonths.length - 1) {
        let eendDate = moment(endDate).startOf('month');

        let startdateofmonth = moment(eendDate).format('YYYY-MM-DD');

        let weekdayMonCounter2 = 0;
        let weekdayTueCounter2 = 0;
        let weekdayWedCounter2 = 0;
        let weekdayThuCounter2 = 0;
        let weekdayFriCounter2 = 0;
        let weekdaySatCounter2 = 0;
        let weekdaySunCounter2 = 0;

        let enddingdate = moment(endDate); // Create a separate variable to iterate over the dates
        let currentDate = moment(startdateofmonth);

        while (currentDate <= enddingdate) {
          if (currentDate.format('ddd') === 'Mon') {
            weekdayMonCounter2++;
          } else if (currentDate.format('ddd') === 'Tue') {
            weekdayTueCounter2++;
          } else if (currentDate.format('ddd') === 'Wed') {
            weekdayWedCounter2++;
          } else if (currentDate.format('ddd') === 'Thu') {
            weekdayThuCounter2++;
          } else if (currentDate.format('ddd') === 'Fri') {
            weekdayFriCounter2++;
          } else if (currentDate.format('ddd') === 'Sat') {
            weekdaySatCounter2++;
          } else if (currentDate.format('ddd') === 'Sun') {
            weekdaySunCounter2++;
          }

          currentDate.add(1, 'day');
        }

        totalcost =
          (Number(values[i]['monday']) * weekdayMonCounter2 +
            Number(values[i]['tuesday']) * weekdayTueCounter2 +
            Number(values[i]['wednesday']) * weekdayWedCounter2 +
            Number(values[i]['thursday']) * weekdayThuCounter2 +
            Number(values[i]['friday']) * weekdayFriCounter2 +
            Number(values[i]['saturday']) * weekdaySatCounter2 +
            Number(values[i]['sunday']) * weekdaySunCounter2) *
          values[i].rate;
      } else {
        let eendDate = moment(betweenMonths[j].concat('-01')).endOf('month');

        let startdateofmonth = moment(eendDate).format('YYYY-MM-DD');
        let mystartDate = moment(betweenMonths[j].concat('-01')).format('YYYY-MM-DD');

        let weekdayMonCounter1 = 0;
        let weekdayTueCounter1 = 0;
        let weekdayWedCounter1 = 0;
        let weekdayThuCounter1 = 0;
        let weekdayFriCounter1 = 0;
        let weekdaySatCounter1 = 0;
        let weekdaySunCounter1 = 0;

        let currentDate = moment(mystartDate); // Create a separate variable to iterate over the dates
        let enddingdate = moment(startdateofmonth);

        while (currentDate <= enddingdate) {
          if (currentDate.format('ddd') === 'Mon') {
            weekdayMonCounter1++;
          } else if (currentDate.format('ddd') === 'Tue') {
            weekdayTueCounter1++;
          } else if (currentDate.format('ddd') === 'Wed') {
            weekdayWedCounter1++;
          } else if (currentDate.format('ddd') === 'Thu') {
            weekdayThuCounter1++;
          } else if (currentDate.format('ddd') === 'Fri') {
            weekdayFriCounter1++;
          } else if (currentDate.format('ddd') === 'Sat') {
            weekdaySatCounter1++;
          } else if (currentDate.format('ddd') === 'Sun') {
            weekdaySunCounter1++;
          }

          currentDate.add(1, 'day');
        }

        totalcost =
          (Number(values[i]['monday']) * weekdayMonCounter1 +
            Number(values[i]['tuesday']) * weekdayTueCounter1 +
            Number(values[i]['wednesday']) * weekdayWedCounter1 +
            Number(values[i]['thursday']) * weekdayThuCounter1 +
            Number(values[i]['friday']) * weekdayFriCounter1 +
            Number(values[i]['saturday']) * weekdaySatCounter1 +
            Number(values[i]['sunday']) * weekdaySunCounter1) *
          values[i].rate;

        // console.log(totalcost, 'middletotalcost');
      }
      var myresult = Number(betweenMonths[j]);
      console.log(betweenMonths[j], 'ds');
      switch (myresult) {
        case 1:
          values[i]['jan'] = Number(totalcost);
          console.log(totalcost, 'jan');
          break;
        case 2:
          values[i]['feb'] = Number(totalcost);
          console.log(totalcost, 'feb');
          break;
        case 3:
          values[i]['mar'] = Number(totalcost);
          console.log(totalcost, 'mar');

          break;
        case 4:
          values[i]['april'] = Number(totalcost);
          console.log(totalcost, 'april');
          break;
        case 5:
          values[i]['may'] = Number(totalcost);
          console.log(totalcost, 'may');
          break;
        case 6:
          values[i]['june'] = Number(totalcost);
          console.log(totalcost, 'june');
          break;
        case 7:
          values[i]['july'] = Number(totalcost);
          console.log(totalcost, 'july');
          break;
        case 8:
          values[i]['aug'] = Number(totalcost);
          console.log(totalcost, 'aug');
          break;
        case 9:
          values[i]['sept'] = Number(totalcost);
          console.log(totalcost, 'sept');
          break;
        case 10:
          values[i]['oct'] = Number(totalcost);
          console.log(totalcost, 'oct');
          break;
        case 11:
          values[i]['nov'] = Number(totalcost);
          console.log(totalcost, 'nov');
          break;
        case 12:
          values[i]['dec'] = Number(totalcost);
          console.log(totalcost, 'dec');
          break;

        default:
          console.log('none value selected');
      }
    }

    values[i]['total'] =
      Number(values[i]['monday']) +
      Number(values[i]['tuesday']) +
      Number(values[i]['wednesday']) +
      Number(values[i]['thursday']) +
      Number(values[i]['friday']) +
      Number(values[i]['saturday']) +
      Number(values[i]['sunday']);

    values[i]['qty'] =
      Number(values[i]['monday']) * weekdayMonCounter +
      Number(values[i]['tuesday']) * weekdayTueCounter +
      Number(values[i]['wednesday']) * weekdayWedCounter +
      Number(values[i]['thursday']) * weekdayThuCounter +
      Number(values[i]['friday']) * weekdayFriCounter +
      Number(values[i]['saturday']) * weekdaySatCounter +
      Number(values[i]['sunday']) * weekdaySunCounter;

    values[i]['total'] =
      Number(values[i]['monday']) +
      Number(values[i]['tuesday']) +
      Number(values[i]['wednesday']) +
      Number(values[i]['thursday']) +
      Number(values[i]['friday']) +
      Number(values[i]['saturday']) +
      Number(values[i]['sunday']);

    values[i].cost = (
      (Number(values[i]['monday']) * weekdayMonCounter +
        Number(values[i]['tuesday']) * weekdayTueCounter +
        Number(values[i]['wednesday']) * weekdayWedCounter +
        Number(values[i]['thursday']) * weekdayThuCounter +
        Number(values[i]['friday']) * weekdayFriCounter +
        Number(values[i]['saturday']) * weekdaySatCounter +
        Number(values[i]['sunday']) * weekdaySunCounter) *
      values[i].rate
    ).toFixed(2);

    console.log(values[i].rate, 'myzsdh');
    itemlist[i].discounted_cost = itemlist[i].cost - itemlist[i].discount;

    itemlist[i].cost_tax =
      Math.round((itemlist[i].discounted_cost + (itemlist[i].discounted_cost * 15) / 100) * 100) /
      100;
  }

  function handleChange(i, event, fieldname) {
    // console.log(i, 'updated index');
    // console.log(fields, 'fields updated');

    const values = [...itemlist];

    values[i][event.target.name] = event.target.value;

    let start = moment(itemlist[i].start_date, 'YYYY-MM-DD');
    let end = moment(itemlist[i].end_date, 'YYYY-MM-DD');
    let weekdayMonCounter = 0;
    let weekdayTueCounter = 0;
    let weekdayWedCounter = 0;
    let weekdayThuCounter = 0;
    let weekdayFriCounter = 0;
    let weekdaySatCounter = 0;
    let weekdaySunCounter = 0;

    while (start <= end) {
      if (start.format('ddd') === 'Mon') {
        weekdayMonCounter++;
        start = moment(start, 'YYYY-MM-DD').add(1, 'days');
      } else if (start.format('ddd') === 'Tue') {
        weekdayTueCounter++;
        start = moment(start, 'YYYY-MM-DD').add(1, 'days');
      } else if (start.format('ddd') === 'Wed') {
        weekdayWedCounter++;
        start = moment(start, 'YYYY-MM-DD').add(1, 'days');
      } else if (start.format('ddd') === 'Thu') {
        weekdayThuCounter++;
        start = moment(start, 'YYYY-MM-DD').add(1, 'days');
      } else if (start.format('ddd') === 'Fri') {
        weekdayFriCounter++;
        start = moment(start, 'YYYY-MM-DD').add(1, 'days');
      } else if (start.format('ddd') === 'Sat') {
        weekdaySatCounter++;
        start = moment(start, 'YYYY-MM-DD').add(1, 'days');
      } else if (start.format('ddd') === 'Sun') {
        weekdaySunCounter++;
        start = moment(start, 'YYYY-MM-DD').add(1, 'days');
      }
    }

    let startDate = moment(startdate).format('YYYY-MM-DD');

    console.log(startDate, 'startdate wala');

    // console.log(itemlist[i].start_date,'MYDATE012')
    let endDate = moment(enddate).format('YYYY-MM-DD');

    let betweenMonths = [];
    let montharray = [];
    var totalcost;

    if (startDate < endDate) {
      let date = moment(startDate).startOf('month');

      while (date < moment(endDate).endOf('month')) {
        betweenMonths.push(date.format('MM'));
        montharray.push(date.format('YYYY-MM'));

        date.add(1, 'month');
      }
    }

    console.log(betweenMonths, 'monthly array');

    for (let j = 0; j < betweenMonths.length; j++) {
      if (j == 0) {
        let eendDate = moment(startDate).endOf('month');
        console.log(eendDate, 'enddate12');

        let startdateofmonth = moment(eendDate).format('YYYY-MM-DD');
        console.log(startdateofmonth, 'vuxzd');

        let weekdayMonCounter1 = 0;
        let weekdayTueCounter1 = 0;
        let weekdayWedCounter1 = 0;
        let weekdayThuCounter1 = 0;
        let weekdayFriCounter1 = 0;
        let weekdaySatCounter1 = 0;
        let weekdaySunCounter1 = 0;

        let currentDate = moment(startDate);
        let enddingdate = moment(startdateofmonth);

        while (currentDate <= enddingdate) {
          if (currentDate.format('ddd') === 'Mon') {
            weekdayMonCounter1++;
          } else if (currentDate.format('ddd') === 'Tue') {
            weekdayTueCounter1++;
          } else if (currentDate.format('ddd') === 'Wed') {
            weekdayWedCounter1++;
          } else if (currentDate.format('ddd') === 'Thu') {
            weekdayThuCounter1++;
          } else if (currentDate.format('ddd') === 'Fri') {
            weekdayFriCounter1++;
          } else if (currentDate.format('ddd') === 'Sat') {
            weekdaySatCounter1++;
          } else if (currentDate.format('ddd') === 'Sun') {
            weekdaySunCounter1++;
          }

          currentDate.add(1, 'day');
        }

        totalcost =
          (Number(values[i]['monday']) * weekdayMonCounter1 +
            Number(values[i]['tuesday']) * weekdayTueCounter1 +
            Number(values[i]['wednesday']) * weekdayWedCounter1 +
            Number(values[i]['thursday']) * weekdayThuCounter1 +
            Number(values[i]['friday']) * weekdayFriCounter1 +
            Number(values[i]['saturday']) * weekdaySatCounter1 +
            Number(values[i]['sunday']) * weekdaySunCounter1) *
          values[i].rate;

        console.log(totalcost, 'totalcosting123');
      } else if (j == betweenMonths.length - 1) {
        let eendDate = moment(endDate).startOf('month');

        let startdateofmonth = moment(eendDate).format('YYYY-MM-DD');

        let weekdayMonCounter2 = 0;
        let weekdayTueCounter2 = 0;
        let weekdayWedCounter2 = 0;
        let weekdayThuCounter2 = 0;
        let weekdayFriCounter2 = 0;
        let weekdaySatCounter2 = 0;
        let weekdaySunCounter2 = 0;

        let enddingdate = moment(endDate); // Create a separate variable to iterate over the dates
        let currentDate = moment(startdateofmonth);

        while (currentDate <= enddingdate) {
          if (currentDate.format('ddd') === 'Mon') {
            weekdayMonCounter2++;
          } else if (currentDate.format('ddd') === 'Tue') {
            weekdayTueCounter2++;
          } else if (currentDate.format('ddd') === 'Wed') {
            weekdayWedCounter2++;
          } else if (currentDate.format('ddd') === 'Thu') {
            weekdayThuCounter2++;
          } else if (currentDate.format('ddd') === 'Fri') {
            weekdayFriCounter2++;
          } else if (currentDate.format('ddd') === 'Sat') {
            weekdaySatCounter2++;
          } else if (currentDate.format('ddd') === 'Sun') {
            weekdaySunCounter2++;
          }

          currentDate.add(1, 'day');
        }

        totalcost =
          (Number(values[i]['monday']) * weekdayMonCounter2 +
            Number(values[i]['tuesday']) * weekdayTueCounter2 +
            Number(values[i]['wednesday']) * weekdayWedCounter2 +
            Number(values[i]['thursday']) * weekdayThuCounter2 +
            Number(values[i]['friday']) * weekdayFriCounter2 +
            Number(values[i]['saturday']) * weekdaySatCounter2 +
            Number(values[i]['sunday']) * weekdaySunCounter2) *
          values[i].rate;
      } else {
        let eendDate = moment(betweenMonths[j].concat('-01')).endOf('month');

        let startdateofmonth = moment(eendDate).format('YYYY-MM-DD');
        let mystartDate = moment(betweenMonths[j].concat('-01')).format('YYYY-MM-DD');

        let weekdayMonCounter1 = 0;
        let weekdayTueCounter1 = 0;
        let weekdayWedCounter1 = 0;
        let weekdayThuCounter1 = 0;
        let weekdayFriCounter1 = 0;
        let weekdaySatCounter1 = 0;
        let weekdaySunCounter1 = 0;

        let currentDate = moment(mystartDate); // Create a separate variable to iterate over the dates
        let enddingdate = moment(startdateofmonth);

        while (currentDate <= enddingdate) {
          if (currentDate.format('ddd') === 'Mon') {
            weekdayMonCounter1++;
          } else if (currentDate.format('ddd') === 'Tue') {
            weekdayTueCounter1++;
          } else if (currentDate.format('ddd') === 'Wed') {
            weekdayWedCounter1++;
          } else if (currentDate.format('ddd') === 'Thu') {
            weekdayThuCounter1++;
          } else if (currentDate.format('ddd') === 'Fri') {
            weekdayFriCounter1++;
          } else if (currentDate.format('ddd') === 'Sat') {
            weekdaySatCounter1++;
          } else if (currentDate.format('ddd') === 'Sun') {
            weekdaySunCounter1++;
          }

          currentDate.add(1, 'day');
        }

        totalcost =
          (Number(values[i]['monday']) * weekdayMonCounter1 +
            Number(values[i]['tuesday']) * weekdayTueCounter1 +
            Number(values[i]['wednesday']) * weekdayWedCounter1 +
            Number(values[i]['thursday']) * weekdayThuCounter1 +
            Number(values[i]['friday']) * weekdayFriCounter1 +
            Number(values[i]['saturday']) * weekdaySatCounter1 +
            Number(values[i]['sunday']) * weekdaySunCounter1) *
          values[i].rate;

      }
      var myresult = Number(betweenMonths[j]);
      console.log(betweenMonths[j], 'ds');
      switch (myresult) {
        case 1:
          values[i]['jan'] = Number(totalcost);
          console.log(totalcost, 'jan');
          break;
        case 2:
          values[i]['feb'] = Number(totalcost);
          console.log(totalcost, 'feb');
          break;
        case 3:
          values[i]['mar'] = Number(totalcost);
          console.log(totalcost, 'mar');

          break;
        case 4:
          values[i]['april'] = Number(totalcost);
          console.log(totalcost, 'april');
          break;
        case 5:
          values[i]['may'] = Number(totalcost);
          console.log(totalcost, 'may');
          break;
        case 6:
          values[i]['june'] = Number(totalcost);
          console.log(totalcost, 'june');
          break;
        case 7:
          values[i]['july'] = Number(totalcost);
          console.log(totalcost, 'july');
          break;
        case 8:
          values[i]['aug'] = Number(totalcost);
          console.log(totalcost, 'aug');
          break;
        case 9:
          values[i]['sept'] = Number(totalcost);
          console.log(totalcost, 'sept');
          break;
        case 10:
          values[i]['oct'] = Number(totalcost);
          console.log(totalcost, 'oct');
          break;
        case 11:
          values[i]['nov'] = Number(totalcost);
          console.log(totalcost, 'nov');
          break;
        case 12:
          values[i]['dec'] = Number(totalcost);
          console.log(totalcost, 'dec');
          break;

        default:
          console.log('none value selected');
      }
    }

    values[i]['total'] =
      Number(values[i]['monday']) +
      Number(values[i]['tuesday']) +
      Number(values[i]['wednesday']) +
      Number(values[i]['thursday']) +
      Number(values[i]['friday']) +
      Number(values[i]['saturday']) +
      Number(values[i]['sunday']);

    values[i]['qty'] =
      Number(values[i]['monday']) * weekdayMonCounter +
      Number(values[i]['tuesday']) * weekdayTueCounter +
      Number(values[i]['wednesday']) * weekdayWedCounter +
      Number(values[i]['thursday']) * weekdayThuCounter +
      Number(values[i]['friday']) * weekdayFriCounter +
      Number(values[i]['saturday']) * weekdaySatCounter +
      Number(values[i]['sunday']) * weekdaySunCounter;

    values[i]['total'] =
      Number(values[i]['monday']) +
      Number(values[i]['tuesday']) +
      Number(values[i]['wednesday']) +
      Number(values[i]['thursday']) +
      Number(values[i]['friday']) +
      Number(values[i]['saturday']) +
      Number(values[i]['sunday']);

    console.log(values[i]['total'], 'total123');

    var mytotal = values[i]['total'];

    values[i].cost = (
      (Number(values[i]['monday']) * weekdayMonCounter +
        Number(values[i]['tuesday']) * weekdayTueCounter +
        Number(values[i]['wednesday']) * weekdayWedCounter +
        Number(values[i]['thursday']) * weekdayThuCounter +
        Number(values[i]['friday']) * weekdayFriCounter +
        Number(values[i]['saturday']) * weekdaySatCounter +
        Number(values[i]['sunday']) * weekdaySunCounter) *
      values[i].rate
    ).toFixed(2);

    sethandleupdate(!handleupdate);
  }

  const handle = () => {
    if (
      signRef.current === '' ||
      signRef.current === undefined ||
      signRef.current === null ||
      signRef.current.isEmpty()
    ) {
      return;
    } else {
      setmysign(signRef.current.toDataURL());
    }
  };

  console.log(mysign, 'file');

  const taxcost = () => {
    var tax = (calrate * 15) / 100 - discount + '';
    var totaltax = tax + calrate;
    setcost_tax(totaltax);
    return totaltax;
  };

  var costing;
  const discountcost = () => {
    costing = calrate - discount;
    setdiscounted_cost(costing);
    return costing;
  };

  const calculate = (index, event) => {
    setevent(event);
  };

  console.log(mysign, 'dd');

  var calrate;
  const ratecaculate = () => {
    calrate = event * rate;
    setcost(calrate);

    return calrate;
  };

  console.log(startdate, enddate, 'startdate');

  const handleDelete = (index1) => {
    const values = fields.filter((data, i) => i !== index1);

    setFields(values);
  };

  var orderid = Math.floor(100000 + Math.random() * 900000);

  const handlePaymentDue = (event) => {
    if (event.target.value === null || event.target.value === '') {
      setErrorMessage(false);
    } else {
      setErrorMessage(true);
      setpaymentdue(event.target.value);
    }
  };

  useEffect(() => {
    setitemlist((itemlist) => [...itemlist]);
  }, [handleupdate]);

  return (
    <Container maxWidth>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
        <h3 className=" heading-nw" style={{ color: '#000' }}>
          Updated Agreement
        </h3>
        <button
          className="btn update-btn"
          // style={{ float: 'right' }}
          type="submit"
          onClick={updateAPIData}
        >
          update
        </button>
      </div>

      <Formik
        initialValues={{
          Contract_date: '',
          sales_rep: '',
          Advertiser: '',
          name: '',
          event: '',
          phone: '',
          email: '',
          start_date: '',
          end_date: '',
          product_type: '',
          termsAndConditions: false,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          if (mysign === '' || mysign === undefined || mysign === null) {
            setmysignerror(true);
          } else {
            setmysignerror(false);

            setTimeout(() => setLoading(false), 1000);
          }

          if (name === '') {
            setmysignerror(true);
          } else {
            setmysignerror(false);
          }
        }}
      >
        {({ errors, touched, values, handleSubmit, isSubmitting }) => (
          <Form className="form-con form-inline" onSubmit={handleSubmit}>
            {dataapi.map((item) => {
              return (
                <>
                  <Card className="mt-3 px-3 py-3">
                    <div className="form ">
                      <div className="row">
                        <Col item xs={12} sm={6} md={4}>
                          <div className="form-group">
                            <label htmlFor="name" className="label-con">
                              Name
                            </label>
                            <div className="input-er-con">
                              <Field
                                name="name"
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setname(e.target.value)}
                              />
                              {errors.name && touched.name ? (
                                <div className="error-message">{errors.name}</div>
                              ) : null}
                            </div>
                          </div>
                        </Col>

                        <Col item xs={12} sm={6} md={4}>
                          <div className="form-group">
                            <label htmlFor="sales_rep" className="label-con">
                              Sales Rep
                            </label>
                            <div className="input-er-con">
                              <Field
                                name="sales_rep"
                                type="text"
                                className="form-control"
                                placeholder="Sales Rep"
                                value={salesrep}
                                onChange={(e) => setsalesrep(e.target.value)}
                              />
                              {errors.sales_rep && touched.sales_rep ? (
                                <div className="error-message">{errors.sales_rep}</div>
                              ) : null}
                            </div>
                          </div>
                        </Col>
                        <Col item xs={12} sm={6} md={4}>
                          <div className="form-group">
                            <label htmlFor="Advertiser" className="label-con">
                              Advertiser
                            </label>
                            <div className="input-er-con">
                              <Field
                                name="Advertiser"
                                type="text"
                                className="form-control"
                                placeholder="Advertiser"
                                value={Advertiser}
                                onChange={(e) => setAdvertiser(e.target.value)}
                              />
                              {errors.Advertiser && touched.Advertiser ? (
                                <div className="error-message">{errors.Advertiser}</div>
                              ) : null}
                            </div>
                          </div>
                        </Col>
                        <Col item xs={12} sm={6} md={4}>
                          <div className="form-group">
                            <label htmlFor="event" className="label-con">
                              Event
                            </label>
                            <div className="input-er-con">
                              <Field
                                name="event"
                                type="text"
                                className="form-control"
                                placeholder="Event"
                                value={myevent}
                                onChange={(e) => setmyevent(e.target.value)}
                              />
                              {errors.event && touched.event ? (
                                <div className="error-message">{errors.event}</div>
                              ) : null}
                            </div>
                          </div>
                        </Col>
                        <Col item xs={12} sm={6} md={4}>
                          <div className="form-group">
                            <label htmlFor="phone" className="label-con">
                              Phone
                            </label>
                            <div className="input-er-con">
                              <Field
                                name="phone"
                                min={0}
                                type="phone"
                                className="form-control"
                                placeholder="Phone"
                                value={phone}
                                onChange={(e) => setphone(e.target.value)}
                              />
                              {errors.phone && touched.phone ? (
                                <div className="error-message">{errors.phone}</div>
                              ) : null}
                            </div>
                          </div>
                        </Col>
                        <Col item xs={12} sm={6} md={4}>
                          <div className="form-group">
                            <label htmlFor="email" className="label-con">
                              Email
                            </label>
                            <div className="input-er-con">
                              <Field
                                name="email"
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setemail(e.target.value)}
                              />
                              {errors.email && touched.email ? (
                                <div className="error-message">{errors.email}</div>
                              ) : null}
                            </div>
                          </div>
                        </Col>
                      </div>
                    </div>
                  </Card>

                  {/* /////////////////////////////////////////////////////////////////////// */}
                  <h5 className=" heading-nw mt-5 pb-3" style={{ color: '#000' }}>
                    Update Existing Product Item
                  </h5>
                  <Card className=" px-3 py-3">
                    <div className="">
                      <div className="">
                        <div className="" id="">
                          <Box sx={{ overflow: 'auto' }}>
                            <Box sx={{ width: '100%', display: 'table', tableLayout: 'fixed' }}>
                              <Table className="">
                                <thead className="tr-row">
                                  <tr>
                                    <th>Product Type</th>
                                    <th>Run Dates</th>
                                    <th>Run Time</th>
                                    <th className="th-perwk">Per Weeks</th>
                                    <th>Rate</th>

                                    <th>Cost</th>

                                    <th></th>
                                  </tr>
                                </thead>
                                <tbody>
                                  { itemlist &&
                                    itemlist.map((field, index) => {
                                      {
                                      }

                                      var startdate123 = moment(field.start_date);
                                      var enddate123 = moment(field.end_date);

                                      return (
                                        <>
                                          <tr key={index}>
                                            {console.log(index, '1st inner wla map')}
                                            <td>
                                              {console.log(field.product_type, 'product_type')}
                                              <div
                                                className="form-group"
                                                style={{ width: '238px' }}
                                              >
                                                <select
                                                  disabled={isDisabled && editingIndex !== index}
                                                  value={field.product_type}
                                                  name="product_type"
                                                  // id="product_type"
                                                  className="dropdown"
                                                  onChange={(event) =>
                                                    handleChange(index, event,)
                                                  }
                                                >
                                                  <option value="Spots">Spots</option>
                                                  <option value="Mentions">Mentions</option>
                                                  <option value="1/2 Hr Sponsorship">
                                                    1/2 Hr Sponsorship
                                                  </option>
                                                  <option value="Outside Broadcast">
                                                    Outside Broadcast
                                                  </option>
                                                  <option value="Carnival Package">
                                                    Carnival Package
                                                  </option>
                                                  <option value="New Year Package">
                                                    New Year Package
                                                  </option>
                                                  <option value="Digital Signage">
                                                    Digital Signage
                                                  </option>
                                                  <option value="Vibz FM Promotions">
                                                    Vibz FM Promotions
                                                  </option>
                                                  <option value="Song Release">Song Release</option>
                                                </select>
                                              </div>
                                            </td>

                                            <td colspan="1" className="form-group">
                                              <div className="form-group">
                                                <div
                                                  style={{ border: 'none' }}
                                                  className="date-range"
                                                >
                                                  <DateRangePicker
                                                    selected={[field.start_date, field.end_date]}
                                                    disabled={isDisabled && editingIndex !== index}
                                                    defaultValue={[
                                                      new Date(field.start_date),
                                                      new Date(field.end_date),
                                                    ]}
                                                    name="runDates"
                                                    onChange={(values, event) => {
                                                      if (event.length === 0) {
                                                        console.log('Requires selection');
                                                      } else {
                                                        console.log('Selection made');
                                                      }

                                                      if (values !== null) {
                                                        handle123(index, values[0], values[1]);
                                                        setDates(values);
                                                        setstartdate(values[0]);
                                                        setenddate(values[1]);
                                                        console.log(startdate, 'mydating');
                                                        console.log(values[0], 'testing4545');

                                                        valuess = [...itemlist];
                                                        valuess[index].startdate = values[0];
                                                        valuess[index].enddate = values[1];
                                                      } else {
                                                        handle123(
                                                          index,
                                                          itemlist[index].start_date,
                                                          itemlist[index].end_date,
                                                        );
                                                        console.log(
                                                          itemlist[index].start_date,
                                                          '8525',
                                                        );
                                                      }
                                                    }}
                                                  />
                                                </div>
                                              </div>
                                            </td>

                                            <td>
                                              <div className="date-range">
                                                <DateRangePicker
                                                  disabled={isDisabled && editingIndex !== index}
                                                  defaultValue={[
                                                    new Date(field.starttime),
                                                    new Date(field.endtime),
                                                  ]}
                                                  name="runTimes"
                                                  onChange={(values, event) => {
                                                    if (event.length === 0) {
                                                      console.log('requires');
                                                    } else {
                                                      console.log('not');
                                                    }

                                                    if (values !== null) {
                                                      console.log(values.length);
                                                      console.log(event.length, 'event');

                                                      setTimeRange(
                                                        values.map((item) => {
                                                          return item;
                                                        }),
                                                      );

                                                      setstarttime(event[0]);
                                                      setendtime(event[1]);

                                                      valuess = [...itemlist];
                                                      valuess[index].starttime = values[0];
                                                      valuess[index].endtime = values[1];

                                                      setstarttime(values[0]);
                                                      setendtime(values[1]);

                                                      console.log(values);
                                                    }
                                                  }}
                                                  format="H:mm aa"
                                                  placeholder={['Start Time', 'End Time']}
                                                />
            
                                              </div>
                                            </td>

                                            <td>
                                              <div className="form-group">
                                                <Form.Control
                                                  onClick={() => handleShow(index)}
                                                  className="popup-btn"
                                                  type="total"
                                                  name="total"
                                                  disabled={isDisabled && editingIndex !== index}
                                                  value={field.total}
                                                  placeholder="Select Days"
                                                />

                                                <Modal
                                                  className="pop-btn"
                                                  style={{ marginTop: '60px' }}
                                                  show={modalVisibility[index]}
                                                  key={`modal-${index}`}
                                                  onHide={() => handleClose(index)}
                                                >
                                                  <Modal.Header closeButton>
                                                    <Modal.Title>select Days</Modal.Title>
                                                  </Modal.Header>
                                                  <Modal.Body>
                                                    <Form
                                                      className="popup-container"
                                                      validated={false}
                                                    >
                                                      <Form.Group
                                                        className="popup-grp mb-3 px-3"
                                                        id="mon"
                                                        controlId="exampleForm.ControlInput1"
                                                      >
                                                        <div className="label-con1">1</div>
                                                        <Form.Label
                                                          name="monday"
                                                          className="label-con1"
                                                        >
                                                          Monday
                                                        </Form.Label>
                                                        <Form.Control
                                                          style={{ height: '40px' }}
                                                          className="popup-control"
                                                          type="number"
                                                          min={0}
                                                          value={field.monday}
                                                          onChange={(event) =>
                                                            handleChange(index, event, 'monday')
                                                          }
                                                          name="monday"
                                                          placeholder="monday"
                                                          autoFocus
                                                        />
                                                      </Form.Group>
                                                      <Form.Group
                                                        className="popup-grp mb-3 px-3"
                                                        id="tues"
                                                        controlId="exampleForm.ControlInput1"
                                                      >
                                                        <div className="label-con1">2</div>
                                                        <Form.Label className="label-con1">
                                                          Tuesday
                                                        </Form.Label>
                                                        <Form.Control
                                                          style={{ height: '40px' }}
                                                          className="popup-control"
                                                          type="number"
                                                          min={0}
                                                          defaultValue={field.tuesday}
                                                          onChange={(event) =>
                                                            handleChange(index, event, 'tuesday')
                                                          }
                                                          name="tuesday"
                                                          placeholder="tuesday"
                                                        />
                                                      </Form.Group>
                                                      <Form.Group
                                                        className="popup-grp mb-3 px-3"
                                                        id="wed"
                                                        controlId="exampleForm.ControlInput1"
                                                      >
                                                        <div className="label-con1">3</div>
                                                        <Form.Label className="label-con1">
                                                          Wednesday
                                                        </Form.Label>
                                                        <Form.Control
                                                          style={{ height: '40px' }}
                                                          className="popup-control"
                                                          type="number"
                                                          min={0}
                                                          defaultValue={field.wednesday}
                                                          onChange={(event) =>
                                                            handleChange(index, event, 'wednesday')
                                                          }
                                                          name="wednesday"
                                                          placeholder="Wednesday"
                                                        />
                                                      </Form.Group>
                                                      <Form.Group
                                                        className="popup-grp mb-3 px-3"
                                                        id="thurs"
                                                        controlId="exampleForm.ControlInput1"
                                                      >
                                                        <div className="label-con1">4</div>
                                                        <Form.Label className="label-con1">
                                                          Thursday
                                                        </Form.Label>
                                                        <Form.Control
                                                          style={{ height: '40px' }}
                                                          type="number"
                                                          min={0}
                                                          className="popup-control"
                                                          defaultValue={field.thursday}
                                                          onChange={(event) =>
                                                            handleChange(index, event, 'thursday')
                                                          }
                                                          name="thursday"
                                                          placeholder="thursday"
                                                        />
                                                      </Form.Group>
                                                      <Form.Group
                                                        className="popup-grp mb-3 px-3 "
                                                        id="fri"
                                                        controlId="exampleForm.ControlInput1"
                                                      >
                                                        <div className="label-con1">5</div>
                                                        <Form.Label className="label-con1">
                                                          Friday
                                                        </Form.Label>
                                                        <Form.Control
                                                          style={{ height: '40px' }}
                                                          className="popup-control"
                                                          type="number"
                                                          min={0}
                                                          defaultValue={field.friday}
                                                          onChange={(event) =>
                                                            handleChange(index, event, 'friday')
                                                          }
                                                          name="friday"
                                                          placeholder="friday"
                                                        />
                                                      </Form.Group>
                                                      <Form.Group
                                                        className="popup-grp mb-3 px-3"
                                                        id="sat"
                                                        controlId="exampleForm.ControlInput1"
                                                      >
                                                        <div className="label-con1">6</div>
                                                        <Form.Label className="label-con1">
                                                          Saturday
                                                        </Form.Label>
                                                        <Form.Control
                                                          style={{ height: '40px' }}
                                                          className="popup-control"
                                                          type="number"
                                                          min={0}
                                                          defaultValue={field.saturday}
                                                          onChange={(event) =>
                                                            handleChange(index, event, 'saturday')
                                                          }
                                                          name="saturday"
                                                          placeholder="saturday"
                                                        />
                                                      </Form.Group>
                                                      <Form.Group
                                                        className="popup-grp mb-3 px-3"
                                                        controlId="exampleForm.ControlInput1"
                                                      >
                                                        <div className="label-con1">7</div>
                                                        <Form.Label className="label-con1">
                                                          Sunday
                                                        </Form.Label>
                                                        <Form.Control
                                                          style={{ height: '40px' }}
                                                          className="popup-control"
                                                          type="number"
                                                          min={0}
                                                          defaultValue={field.sunday}
                                                          onChange={(event) =>
                                                            handleChange(index, event, 'sunday')
                                                          }
                                                          name="sunday"
                                                          placeholder="sunday"
                                                        />
                                                      </Form.Group>
                                                      <Form.Group
                                                        className="popup-grp mb-3 px-3"
                                                        controlId="exampleForm.ControlInput1"
                                                      >
                                                        <div className="label-con1">8</div>
                                                        <Form.Label className="label-con1">
                                                          Total
                                                        </Form.Label>
                                                        <Form.Control
                                                          style={{ height: '40px' }}
                                                          className="popup-control"
                                                          type="total"
                                                          name="total"
                                                          min={1}
                                                          Value={field.total}
                                                          onChange={(event) =>
                                                            handleChange(index, event, 'total')
                                                          }
                                                          placeholder="total"
                                                        />
                                                      </Form.Group>
                                                    </Form>
                                                  </Modal.Body>
                                                  <Modal.Footer>
                                                    <Button
                                                      variant="secondary"
                                                      onClick={() => handleClose(index)}
                                                    >
                                                      Close
                                                    </Button>
                                                  </Modal.Footer>
                                                </Modal>
                                              </div>
                                            </td>

                                            <td style={{}}>
                                              <div className="form-group">
                                                <input
                                                  disabled={isDisabled && editingIndex !== index}
                                                  style={{ width: '88px' }}
                                                  value={field.rate}
                                                  onChange={(event) =>
                                                    handleChange(index, event, 'rate')
                                                  }
                                                  step="any"
                                                  name="rate"
                                                  type="number"
                                                  min={0}
                                                  className="form-control as"
                                                />
                                              </div>
                                            </td>

                                            <td style={{}}>
                                              <div className="form-group">
                                                <input
                                                  disabled={isDisabled && editingIndex !== index}
                                                  style={{ width: '88px' }}
                                                  step="0.01"
                                                  value={field.cost}
                                                  onChange={(event) => handleChange(index, event)}
                                                  name="cost"
                                                  min={0}
                                                  type="number"
                                                  className="form-control as"
                                                />
                                              </div>
                                            </td>
                                            <td>
                                              <div
                                                className="btn-update"
                                                style={{ float: 'right' }}
                                              >
                                                {editingIndex === index ? (
                                                  <>
                                                    <FiSave
                                                      size={25}
                                                      color={'green'}
                                                      onClick={() => saveChanges(field.id, index)}
                                                    />
                                                    <FiX
                                                      size={25}
                                                      color={'red'}
                                                      onClick={() => cancelEdit(field.id)}
                                                    />
                                                  </>
                                                ) : (
                                                  <FiEdit
                                                    size={25}
                                                    color={'blue'}
                                                    onClick={() => enableEdit(index)}
                                                  />
                                                )}
                                              </div>
                                            </td>
                                          </tr>
                                        </>
                                      );
                                    })}
                                </tbody>
                              </Table>
                            </Box>
                          </Box>
                        </div>
                      </div>
                      <div style={{ float: 'right' }}>
                        <div>
                          <span className="totalcosttext">cost:</span>
                          <input
                            className="totalcost1"
                            type="number"
                            Value={total}
                            onChange={(e) => setmycost(e.target.value)}
                            // disabled={isDisabled}
                            readOnly
                          />
                        </div>
                        <div>
                          <select
                            className="discountdropdown"
                            defaultValue={mydropdown}
                            name="discount_type"
                            id="discount_type"
                            // className="dropdown"
                            onChange={(event) => handledropdown(event)}
                          >
                            <option value="Trade">Trade</option>
                            <option value="Sponsorship">Sponsorship</option>
                            <option value="Discount">Discount</option>
                            <option value="Charity">Charity</option>
                          </select>

                          <input
                            className="totalcost2"
                            type="number"
                            min="0"
                            Value={trade}
                            onChange={(e) => settrade(e.target.value)}
                          />
                        </div>
                        <div>
                          <span className="totaltext" style={{ paddingRight: '5px' }}>
                            Abst%:
                          </span>
                          <input
                            className="totalcost5"
                            min="0"
                            type="number"
                            Value={discountabst}
                            onChange={(e) => setabstdiscount(e.target.value)}
                          />
                          {console.log( myvalue125,'asdfg')}
                          <input
                          
                            className="totalcost3"
                            type="number"
                            min="0"
                            // Value={ myvalue125}
                            defaultValue={abst}
                            onChange={(e) => setabst(e.target.value)}
                            readOnly
                          />
                        </div>
                        <div>
                          <span className="totalcosttext">Total:</span>
                          <input
                            className="totalcost4"
                            type="number"
                            Value={grand}
                            onChange={(e) => setgrandtotal(e.target.value)}
                            
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                  </Card>

                  <h5 className=" heading-nw mt-5 pb-3" style={{ color: '#000' }}>
                    Add New
                  </h5>

                  <>
                 
                  </>

                  <Card className="mt-5 px-3 py-3">
                    <>
                      {' '}
                      <div>
                        <p style={{ color: 'red' }}>Additional Details*</p>
                        <textarea
                          type="text"
                          className="payment_input"
                          style={{ width: '100%' }}
                          value={paymenttext}
                          onChange={(e) => setpaymenttext(e.target.value)}
                        />
                      </div>
                    </>
                    <Row>
                      <Col item xs={12} sm={4} md={4}>
                        <div className="chcek-box">
                          <div>
                            {errors.termsAndConditions && touched.termsAndConditions ? (
                              <div className="error-message">{errors.termsAndConditions}</div>
                            ) : null}
                          </div>
                        </div>
                      </Col>
                      <Col item xs={12} sm={12} md={12}>
                        <div></div>
                      </Col>
                    </Row>
                  </Card>
                </>
              );
            })}
          </Form>
        )}
      </Formik>

 
    </Container>
  );
};

export default Clickup;
