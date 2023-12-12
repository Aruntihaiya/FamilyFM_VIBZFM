import React, { useEffect, useState, useRef } from 'react';
import { Box, styled } from '@mui/system';
// import { Breadcrumb, SimpleCard } from 'app/components';
import Grid from '@mui/material/Grid';
// import SimpleRadio from '../material-kit/radio/SimpleRadio';
// import SimpleRadioNew from '../material-kit/radio/SimpleRadioNew';
import { makeStyles } from '@material-ui/core/styles';
import SignatureCanvas from 'react-signature-canvas';

import { Button, Input, TextField } from '@material-ui/core';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import CreateIcon from '@mui/icons-material/Create';
import KeyIcon from '@mui/icons-material/Key';
import PersonPinIcon from '@material-ui/icons/PersonPin';
// import SimpleForms from '../material-kit/forms/SimpleForms';
import Typography from '@material-ui/core/Typography';
// import Singleimage from '../material-kit/uploadimage/Singleimage';
// import Label from '../material-kit/tables/Label';
// import face from '../../../../src/public/assets/images/face.jpg';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { ErrorMessage, Field, Formik } from 'formik';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
// import useAuth from 'app/hooks/useAuth';
import { NavLink, useNavigate } from 'react-router-dom';
// import div from '../material-kit/forms/div';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { FolderOpenOutlined } from '@ant-design/icons';
import { Button as Buttonimage, Space, Upload } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
}));

const useStyles = makeStyles((theme) => ({
  file: {
    width: '100%',
    padding: '14px',
    border: '1px solid #ffffff',
  },
  profile0: {
    boxShadow: 'rgb(0 0 0 / 10%) 0px 10px 50px',
    backgroundColor: '#fff !important;',
    backdropFilter: 'blur(20px)',
    borderStyle: 'solid',
    borderColor: '#f5f5f5',
    borderBottomwidth: 'thin',
    marginBottom: '1px',
    padding: '0px 14px',
  },
  profile04: {
    padding: '0px 0px !important',
  },
  profile01: {
    boxShadow: 'rgb(0 0 0 / 10%) 0px 10px 50px',
    backgroundColor: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    color: '#000',
    borderRadius: '0px',
    padding: '20px 0px',
  },
  profilepic: {
    borderRadius: '0%',
    width: '300px',
    boxShadow: 'rgb(0 0 0 / 10%) 0px 10px 50px',
    border: '2px solid #d9c9c9',
    padding: '10px',
  },
  ty: {
    fontSize: '17px',
    fontWeight: '700',
    padding: '0px 12px',
    // textAlign: 'start',
  },
  ty1: {
    fontSize: '15px',
    padding: '10px 12px',
    width: '100%',
  },
  ty0: {
    // backgroundImage: 'linear-gradient(to right, #8e2de2, #4a00e0)',
    backgroundImage: 'linear-gradient(to right, rgb(10 37 64), #5d87ff )',
    boxShadow: 'rgb(17 12 46 / 15%) 0px 48px 100px 0px',
    color: '#fff',
    borderRadius: '50%',
    padding: '10px 10px 3px',
    textAlign: 'center',
  },
  btn2: {
    width: '200px',
    textAlign: 'center',
    backgroundColor: '#5d87ff ',
    fontWeight: '600',
    boxShadow: '5px 5px 10px rgb(3 167 124 / 50%)',
  },
  btn3: {
    width: '100px',
    textAlign: 'center',
    backgroundColor: '#5d87ff ',
    fontWeight: '600',
    boxShadow: '5px 5px 10px rgb(3 167 124 / 50%)',
  },
  btn4: {
    width: '200px',
    textAlign: 'center',
    backgroundColor: '#5d87ff ',
    fontWeight: '600',
    boxShadow: '5px 5px 10px rgb(3 167 124 / 50%)',
    // float:"left"
  },
lbl1:{
  height:'10px'
}
}));

const handleChange = (event) => {
  console.log(event.target.name);
};
// inital login credentials
// const initialValues = {
//   Fname: `vguvj`,
//   Lname: 'Tihaiya',
// //   Company: 'Impretosys',
//   Mobile: '8982250526',

// };
const uppercaseRegex = /(?=.*[A-Z])/;
const lowercaseRegex = /(?=.*[a-z])/;
const numberRegex = /(?=.*[0-9])/;
const specialCharRegex = /(?=.*[!@#$%^&*])/;

const initialValuestab2 = {
  Oldpassword: '',
  Newpassword: '',
  Confirmpassword: '',
  // Gender: 'male'
  // AttachDocument: '',
  // Note: ''
};

const initialValuestab3 = {};
// form field validation schema
const validationSchema = Yup.object().shape({
  Fname: Yup.string()
    .min(6, 'Reference must be 6 character length')
    .required('Reference is required!'),
  Lname: Yup.string()
    .min(6, 'Category must be 6 character length')
    .required('Category is required!'),
  Company: Yup.string().min(6, 'Amount must be 6 character length').required('Amount is required!'),
  Mobile: Yup.string().min(6, 'Amount must be 6 character length').required('Amount is required!'),
});

const validationSchematab2 = Yup.object().shape({
  Oldpassword: Yup.string()
    .required('Old Password is required')
    .min(6, 'Password must be at least 6 characters'),

  Newpassword: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long')
    .matches(uppercaseRegex, 'Password must contain at least one uppercase letter')
    .matches(lowercaseRegex, 'Password must contain at least one lowercase letter')
    .matches(numberRegex, 'Password must contain at least one number')
    .matches(specialCharRegex, 'Password must contain at least one special character'),

  Confirmpassword: Yup.string().oneOf([Yup.ref('Newpassword'), null], 'Passwords must match'),
});

const validationSchematab3 = Yup.object().shape({});

const Adminprofile = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState();
  const [gender, setgender] = useState('male');
    const [preview, setPreview] = useState(null);
  const [name, setname] = useState('');
  const [lname, setlname] = useState('');
  const [mobile, setmobile] = useState('');
  const [email, setemail] = useState('');
  const [role, setrole] = useState('');
  const [image, setimage] = useState('');
  const [selectedFile, setSelectedFile] = useState('file1');
  const [isedit,setisedit] = useState(true);
  const [update, setupdate] = useState();




  const [file, setFile] = useState('');



  const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },


    // onChange(info) {
    //   if (info.file.status !== 'uploading') {
    //     console.log(info.file, info.fileList);
    //     setimage(info.file, info.fileList[0].originFileObj);
    //   }

    //   if (info.file.status === 'done') {
    //     setimage(info.file, info.fileList[0].originFileObj);
    //     console.log(`${info.file.name} file uploaded successfully`);
    //   } else if (info.file.status === 'error') {
    //     console.log(`${info.file.name} file upload failed.`);
    //   }
    // },
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.value);
    console.log(event.target.value);

    const value = event.target.value;
  };


  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    console.log(event.target.name);
  };
  // const handleImageChange = (info) => {
  //   if (info.file.status !== 'uploading') {
  //     console.log(info.file, info.fileList);
  //     setimage(info.file, info.fileList[0].originFileObj);
  //   }

  //   if (info.file.status === 'done') {
  //     setimage(info.file, info.fileList[0].originFileObj);
  //     console.log(`${info.file.name} file uploaded successfully`);
  //   } else if (info.file.status === 'error') {
  //     console.log(`${info.file.name} file upload failed.`);
  //   }
  // };

  const signRef = useRef();
  const handleClear = () => {
    console.log(signRef.current.clear());
    setFile('');
  };

  const options = {
    penColor: 'red',
    onEnd: () => signRef.current.toDataURL(),
  };

  function handleFileSelect(event) {
    const selectedFile = event.target.files[0];

    if (!selectedFile) {
      setFile(null);
      setPreview(null);
      return;
    }

    setFile(selectedFile);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
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
      const base64String = signRef.current.toDataURL(); // Replace with your base64 string
      const fileName = 'image.png'; // Replace with the desired file name

      const byteString = atob(base64String.split(',')[1]);
      const mimeString = base64String.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);

      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      const blob = new Blob([ab], { type: mimeString });
      const file = new File([blob], fileName, { type: 'image/png' });

      setFile(file);
    }

    console.log(file, 'file');
  };


const cancelEdit=()=>{
  setisedit(true)
  setFile(image)
  console.log(image,'image')
  console.log('image')
}




  const updateprofileData = () => {
    // console.log('sdsddfds');


    const formData = new FormData();

            formData.append('name', name);
            formData.append('lastname', lname);
            formData.append('mobile', mobile);
            formData.append('signature', file);
    axios
      .post(
        `http://192.168.29.28:8080/api/public/updateprofile`,
        formData,
        {
          headers: { 'x-token': localStorage.getItem('token') },
        },
      )
      .then((response) => {
        if (response.data.code === 200) {
          toast.success('Profile update Successfully', {
       
            position: toast.POSITION.TOP_CENTER,
          });
       
          setupdate(!update);
          setisedit(true)
        }
      });
  };
  var myrole = localStorage.getItem('role');
 useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.post(
        'http://192.168.29.28:8080/api/public/profileupdate',
        {},
        {
          headers: { 'x-token': localStorage.getItem('token') },
        }
      );

      console.log(response.data.data[0].name);
      setlname(response.data.data[0].lastname);
      setmobile(response.data.data[0].mobile);
      setname(response.data.data[0].name);
      setemail(response.data.data[0].email);
      setrole(response.data.data[0].role);
      setimage(response.data.data[0].signature)
 
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  fetchData();
}, [update]); 


  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState('');
  const handleFormSubmit = (values) => {
    console.log(values, 'ddddf');
  };

  const handleFormSubmittab2 = (values) => {
    axios
      .post(
        `http://192.168.29.28:8080/api/public/changepassword`,
        {
          Oldpassword: values.Oldpassword,
          Newpassword: values.Newpassword,
          Confirmpassword: values.Confirmpassword,
        },
        {
          headers: { 'x-token': localStorage.getItem('token') },
        },
      )
      .then((response) => {
        console.log(response.data.message,'ddd');
        console.log(response.data.code,'dsdsds');
     
          toast.success(response.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
    
      })
      .catch((error) => {
        console.log(error.response.data.message);
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  return (
    <Container>
      <Box className="">
    
      </Box>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box className={classes.profile01}>
              <Typography className={classes.ty}>Profile</Typography>
              <AccordionSummary
                style={{ display: ' grid' }}
                className={classes.profile04}
              ></AccordionSummary>
         
              <Typography><span style={{fontWeight:'700'}}>Email</span> {email}</Typography>
              <Typography><span style={{fontWeight:'700'}}>Role</span> {role == 1 ? 'admin' : 'Sales Reprentative'}</Typography>
            </Box>
          </Grid>
        </Grid>

        {(myrole==3) ? <></>:<>
         {<Accordion
          expanded={expanded === 'panel1'}
          onChange={handleChange('panel1')}
          className={classes.profile0}
        >
          <AccordionSummary
            expandIcon={<ArrowForwardIosSharpIcon style={{ fontSize: '15px' }} />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            className={classes.profile04}
          >
            <Typography className={classes.ty0}>
              <CreateIcon />
            </Typography>
            <Typography className={classes.ty1}>Edit Profile</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Formik
              onSubmit={handleFormSubmit}
              initialValues={{
                Fname: name,
                Lname: lname,
                Mobile: mobile,
              }}
            >
              {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                <form>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={12} lg={12}>
                      <Field
                        fullWidth
                        type="text"
                        name="Fname"
                        label="First Name"
                        onBlur={handleBlur}
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                        as={TextField}
                        helperText={touched.Fname && errors.Fname}
                        error={Boolean(errors.Fname && touched.Fname)}
                      />
             
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}></Grid>
                    <Grid item xs={12} md={12} lg={12}>
                      <Field
                        fullWidth
                        type="text"
                        name="Lname"
                        label="Last Name"
                        onBlur={handleBlur}
                        value={lname}
                        onChange={(e) => setlname(e.target.value)}
                        as={TextField}
                        helperText={touched.Lname && errors.Lname}
                        error={Boolean(errors.Lname && touched.Lname)}
                      />
                    </Grid>

                    <Grid item xs={12} md={12} lg={12}>
                      <Field
                        fullWidth
                        type="text"
                        name="Mobile"
                        label="Phone Number"
                        onBlur={handleBlur}
                        value={mobile}
                        onChange={(e) => setmobile(e.target.value)}
                        as={TextField}
                        helperText={touched.Mobile && errors.Mobile}
                        error={Boolean(errors.Mobile && touched.Mobile)}
                      />
                    </Grid>
                    {isedit === true ? (
  <>
    <Grid item xs={12} md={12} lg={12}>
      <img src={`http://192.168.29.28:8080/uploads/${image}`} alt="Signature" className={classes.profilepic} />
           

    </Grid>
    <Grid item xs={12} md={12} lg={12}>
      <LoadingButton
        variant="contained"
        type="button"
        loading={loading}
        className={classes.btn2}
        onClick={() => setisedit(false)} 
      >
        Edit Signature 
      </LoadingButton>
    </Grid>
  </>
) : (
  <>
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
    <RadioGroup
      row
      aria-label="fileAttachment"
      name="fileAttachment"
      value={selectedFile}
      onChange={handleFileChange}
    >
      <FormControlLabel className={classes.lbl2} value="file1" control={<Radio />}label="Signature" />
      <FormControlLabel value="file2" control={<Radio />} label="Attach your signature" />
    </RadioGroup>

    {selectedFile === 'file1' && (
    <div className="signature-pad-res" id="canvas-signature" style={{width:'400px',height:'200px'}} >
    <SignatureCanvas ref={signRef} options={options} onEnd={handle} />
  

    <div className="">
     
      <LoadingButton
        variant="contained"
        type="button"
        loading={loading}
        className={classes.btn3}
        onClick={handleClear}
        
      >
        Clear
      </LoadingButton>
    
    </div>
  </div>
    )}

    {selectedFile === 'file2' && (
      <div id="signature" style={{height:'180px'}} >
         <input
                      type="file"
                      checked={selectedFile === 'file2'}
                      onChange={handleFileSelect}
                     />{preview && (
                      <img src={preview}
                        id="signature"
                        alt="File preview"
                        style={{ height: '80%', width: '70%' }}/>
                    )}
      </div>
    )}
     <LoadingButton
        variant="contained"
        type="button"
        loading={loading}
        className={classes.btn4}
        onClick={() => cancelEdit()} 
        
      >
        cancel Edit
      </LoadingButton>
      </div>
  </>
)}

                   
   

                    <Grid item xs={12} md={12} lg={12}>
                      <LoadingButton
                        variant="contained"
                        type="button"
                        loading={loading}
                        className={classes.btn2}
                        onClick={updateprofileData}
                      >
                        Update Details
                      </LoadingButton>
                    </Grid>
                  </Grid>
                </form>
              )}
            </Formik>
          </AccordionDetails>
        </Accordion> }</>}
       
        <Accordion
          expanded={expanded === 'panel2'}
          onChange={handleChange('panel2')}
          className={classes.profile0}
        >

          
          <AccordionSummary
            expandIcon={<ArrowForwardIosSharpIcon style={{ fontSize: '15px' }} />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
            className={classes.profile04}
          >
            <Typography className={classes.ty0}>
              <KeyIcon />
            </Typography>
            <Typography className={classes.ty1}>Change Password</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Formik
              onSubmit={handleFormSubmittab2}
              initialValues={initialValuestab2}
              validationSchema={validationSchematab2}
            >
              {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={12} lg={12}>
                      <Field
                        fullWidth
                        type="password"
                        name="Oldpassword"
                        label="Old Password"
                        onBlur={handleBlur}
                        value={values.Oldpassword}
                        onChange={handleChange}
                        as={TextField}
                        helperText={touched.Oldpassword && errors.Oldpassword}
                        error={Boolean(errors.Oldpassword && touched.Oldpassword)}
                      />
                    </Grid>

                    <Grid item xs={12} md={12} lg={12}>
                      <Field
                        fullWidth
                        type="password"
                        name="Newpassword"
                        label="New Password"
                        onBlur={handleBlur}
                        value={values.Newpassword}
                        onChange={handleChange}
                        as={TextField}
                        helperText={touched.Newpassword && errors.Newpassword}
                        error={Boolean(errors.Newpassword && touched.Newpassword)}
                      />
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                      <Field
                        fullWidth
                        type="password"
                        name="Confirmpassword"
                        label="Confirm Password"
                        onBlur={handleBlur}
                        value={values.Confirmpassword}
                        onChange={handleChange}
                        as={TextField}
                        helperText={touched.Confirmpassword && errors.Confirmpassword}
                        error={Boolean(errors.Confirmpassword && touched.Confirmpassword)}
                      />
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                      <LoadingButton
                        variant="contained"
                        type="submit"
                        loading={loading}
                        className={classes.btn2}
                      >
                        Change Password
                      </LoadingButton>
                    </Grid>
                    
                    {/* <Grid item xs={12} md={12} lg={12}>
                <Upload {...props} onChange={handleImageChange}>
                  <Buttonimage icon={<FolderOpenOutlined />}>Upload Image</Buttonimage>
                </Upload>
              </Grid> */}
                  </Grid>
                </form>
              )}
            </Formik>
          </AccordionDetails>
        </Accordion>
      </div>
    </Container>
  );
};

export default Adminprofile;
