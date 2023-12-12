// import React from 'react'
// import { Form } from 'react-bootstrap';

// export const Addproduct = () => {
//   return (
//     <div>
// <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">
//   Open Modal
// </button>

// <div class="modal" id="myModal">
//   <div class="modal-dialog">
//     <div class="modal-content">
//       <div class="modal-header">
//         <h4 class="modal-title">Your Table in a Modal</h4>
//         <button type="button" class="close" data-dismiss="modal">&times;</button>
//       </div>

//       <div class="modal-body">
//         <table class="table">
//           <thead>
//             <tr>
//             <th>Product Type</th>
//                                   <th>Run Dates</th>
//                                   <th>Run Time</th>
//                                   <th className="th-perwk">Per Weeks</th>
//                                   <th>Rate</th>
                              
//                                   <th>Cost</th>
                                
//                                   <th></th>
//             </tr>
//           </thead>
//           <tbody>
//           <tr key={index}>
//                                 {/* {console.log(index,'ddsdgv')} */}
//                                 <td>
//                                   <div className="form-area" style={{ width: '' }}>
//                                     <select
//                                       value={field.product_type}
//                                       defaultValue="spots"
//                                       name="product_type"
//                                       id="product_type"
//                                       className="dropdown"
//                                       onChange={(event) => handleChange(index, event)}
//                                     >
//                                       <option value="">Select product type</option>
//                                       <option selected value="Spots">
//                                         Spots
//                                       </option>
//                                       <option value="Mentions">Mentions</option>
//                                       <option value="1/2 Hr Sponsorship">1/2 Hr Sponsorship</option>
//                                       <option value="Outside Broadcast">Outside Broadcast</option>
//                                       <option value="Carnival Package">Carnival Package</option>
//                                       <option value="New Year Package">New Year Package</option>
//                                       <option value="Digital Signage">Digital Signage</option>
//                                       <option value="Vibz FM Promotions">Vibz FM Promotions</option>
//                                       <option value="Song Release">Song Release</option>
//                                     </select>
//                                     {!errorMessage1 ? (
//                                       <>
//                                         <div className="requirederor" style={{ color: 'red' }}>
//                                           Product type is required !
//                                         </div>
//                                       </>
//                                     ) : (
//                                       <></>
//                                     )}
//                                   </div>
//                                 </td>

//                                 <td colspan="1" className="form-area">
//                                   <div
//                                     // style={{ width: "130px" }}
//                                     className="form-area"
//                                   >
//                                     <div style={{ border: 'none' }} className="date-range">
//                                       <RangePicker
//                                         name="runDates"
//                                         // onChange={(event) => handleChange(index, event,)}
//                                         onChange={(values, event) => {
//                                           // console.log(event)
//                                           if (event.length === 0) {
//                                             // console.log('requires');
//                                           } else {
//                                             // console.log('not');
//                                           }

//                                           if (values !== null) {
//                                             handle123(index, values[0].$d, values[1].$d);
//                                             setDates(
//                                               values.map((item) => {
//                                                 return item;
//                                               }),
//                                             );
//                                             setstartdate(event[0].$d);
//                                             setenddate(event[1].$d);

//                                             const valuess = [...fields];
//                                             valuess[index]['runDates'] = {
//                                               startdate: values[0].$d,
//                                               enddate: values[1].$d,
//                                             };

//                                             setFields(valuess);

//                                             setstartdate(values[0].$d);
//                                             setenddate(values[1].$d);
//                                           } else {
//                                             // myfunction()

//                                             handle123(index, '', '');
//                                             setstartdate('');
//                                             setenddate('');
//                                             const valuess = [...fields];
//                                             valuess[index]['runDates'] = {
//                                               startdate: '',
//                                               enddate: '',
//                                             };
//                                           }
//                                         }}
//                                       />

//                                       {dateerror ? (
//                                         <>
//                                           <span className="requirederor" style={{ color: 'red' }}>
//                                             Please select date range
//                                           </span>
//                                         </>
//                                       ) : null}
//                                     </div>
//                                   </div>
//                                 </td>

//                                 <td colspan="1">
//                                   <div className="form-area">
//                                     <div
//                                       //  style={{width:"120px"}}
//                                       className="date-range"
//                                     >
//                                       <TimePicker.RangePicker
//                                         name="runTimes"
//                                         onChange={(values, event) => {
//                                           if (event.length === 0) {
//                                             // console.log('requires');
//                                           } else {
//                                             // console.log('not');
//                                           }

//                                           if (values !== null) {
//                                             setTimeRange(
//                                               values.map((item) => {
//                                                 return item;
//                                               }),
//                                             );

//                                             setstarttime(event[0].$d);
//                                             setendtime(event[1].$d);

//                                             const valuess = [...fields];
//                                             valuess[index]['runTimes'] = {
//                                               starttime: values[0].$d,
//                                               endtime: values[1].$d,
//                                             };
//                                             setFields(valuess);

//                                             setstarttime(values[0].$d);
//                                             setendtime(values[1].$d);

//                                             // console.log(values, 'ghm');
//                                           }
//                                         }}
//                                         format="H:mm A"
//                                         use12Hours
//                                         placeholder={['Start Time', 'End Time']}
//                                       />

//                                       {timeRange && timeRange.length < 2 ? (
//                                         <span
//                                           style={{ textAlign: 'center' }}
//                                           className="error-message"
//                                         >
//                                           Please select time range
//                                         </span>
//                                       ) : null}
//                                     </div>
//                                   </div>
//                                 </td>

//                                 <td>
//                                   <div
//                                     className="form-area"
//                                     // style={{ width: "10px"  }}
//                                   >
//                                     <Form.Control
//                                       onClick={() => handleShow(index)}
//                                       className="popup-btn"
//                                       type="total"
//                                       // name={`total${index}`}
//                                       value={field.total}
//                                       placeholder="Select Days"
//                                       style={{ width: '100%' }}
//                                     />
//                                     <Modal
//                                       className="pop-btn"
//                                       style={{ marginTop: '50px' }}
//                                       show={modalVisibility[index]}
//                                       key={`modal-${index}`}
//                                       onHide={() => handleClose(index)}
//                                     >
//                                       {/* {console.log(`modal-${index}`,'modal index')} */}
//                                       <Modal.Header closeButton>
//                                         <Modal.Title>select Days</Modal.Title>
//                                       </Modal.Header>
//                                       <Modal.Body>
//                                         <Form className="popup-container" validated={false}>
//                                           <Form.Group
//                                             className="popup-grp mb-3 px-3"
//                                             id="mon"
//                                             controlId="exampleForm.ControlInput1"
//                                           >
//                                             <div className="label-con1">1</div>
//                                             <Form.Label name="monday" className="label-con1">
//                                               Monday
//                                             </Form.Label>
//                                             <Form.Control
//                                               style={{ height: '40px' }}
//                                               className="popup-control"
//                                               type="number"
//                                               min={0}
//                                               value={field.monday}
//                                               onChange={(event) => handleChange(index, event)}
//                                               name="monday"
//                                               placeholder="monday"
//                                               autoFocus
//                                             />
//                                           </Form.Group>
//                                           <Form.Group
//                                             className="popup-grp mb-3 px-3"
//                                             id="tues"
//                                             controlId="exampleForm.ControlInput1"
//                                           >
//                                             <div className="label-con1">2</div>
//                                             <Form.Label className="label-con1">Tuesday</Form.Label>
//                                             <Form.Control
//                                               style={{ height: '40px' }}
//                                               className="popup-control"
//                                               type="number"
//                                               min={0}
//                                               value={field.tuesday}
//                                               onChange={(event) => handleChange(index, event)}
//                                               name="tuesday"
//                                               placeholder="tuesday"
//                                             />
//                                           </Form.Group>
//                                           <Form.Group
//                                             className="popup-grp mb-3 px-3"
//                                             id="wed"
//                                             controlId="exampleForm.ControlInput1"
//                                           >
//                                             <div className="label-con1">3</div>
//                                             <Form.Label className="label-con1">
//                                               Wednesday
//                                             </Form.Label>
//                                             <Form.Control
//                                               style={{ height: '40px' }}
//                                               className="popup-control"
//                                               type="number"
//                                               min={0}
//                                               value={field.wednesday}
//                                               onChange={(event) => handleChange(index, event)}
//                                               name="wednesday"
//                                               placeholder="Wednesday"
//                                             />
//                                           </Form.Group>
//                                           <Form.Group
//                                             className="popup-grp mb-3 px-3"
//                                             id="thurs"
//                                             controlId="exampleForm.ControlInput1"
//                                           >
//                                             <div className="label-con1">4</div>
//                                             <Form.Label className="label-con1">Thursday</Form.Label>
//                                             <Form.Control
//                                               style={{ height: '40px' }}
//                                               type="number"
//                                               min={0}
//                                               className="popup-control"
//                                               value={field.thursday}
//                                               onChange={(event) => handleChange(index, event)}
//                                               name="thursday"
//                                               placeholder="thursday"
//                                             />
//                                           </Form.Group>
//                                           <Form.Group
//                                             className="popup-grp mb-3 px-3 "
//                                             id="fri"
//                                             controlId="exampleForm.ControlInput1"
//                                           >
//                                             <div className="label-con1">5</div>
//                                             <Form.Label className="label-con1">Friday</Form.Label>
//                                             <Form.Control
//                                               style={{ height: '40px' }}
//                                               className="popup-control"
//                                               type="number"
//                                               min={0}
//                                               value={field.friday}
//                                               onChange={(event) => handleChange(index, event)}
//                                               name="friday"
//                                               placeholder="friday"
//                                             />
//                                           </Form.Group>
//                                           <Form.Group
//                                             className="popup-grp mb-3 px-3"
//                                             id="sat"
//                                             controlId="exampleForm.ControlInput1"
//                                           >
//                                             <div className="label-con1">6</div>
//                                             <Form.Label className="label-con1">Saturday</Form.Label>
//                                             <Form.Control
//                                               style={{ height: '40px' }}
//                                               className="popup-control"
//                                               type="number"
//                                               min={0}
//                                               value={field.saturday}
//                                               onChange={(event) => handleChange(index, event)}
//                                               name="saturday"
//                                               placeholder="saturday"
//                                             />
//                                           </Form.Group>
//                                           <Form.Group
//                                             className="popup-grp mb-3 px-3"
//                                             controlId="exampleForm.ControlInput1"
//                                           >
//                                             <div className="label-con1">7</div>
//                                             <Form.Label className="label-con1">Sunday</Form.Label>
//                                             <Form.Control
//                                               style={{ height: '40px' }}
//                                               className="popup-control"
//                                               type="number"
//                                               min={0}
//                                               value={field.sunday}
//                                               onChange={(event) => handleChange(index, event)}
//                                               name="sunday"
//                                               placeholder="sunday"
//                                             />
//                                           </Form.Group>
//                                           <Form.Group
//                                             className="popup-grp mb-3 px-3"
//                                             controlId="exampleForm.ControlInput1"
//                                           >
//                                             <div className="label-con1">8</div>
//                                             <Form.Label className="label-con1">Total</Form.Label>
//                                             <Form.Control
//                                               style={{ height: '40px' }}
//                                               className="popup-control"
//                                               type="total"
//                                               name="total"
//                                               min={1}
//                                               value={field.total}
//                                               onChange={(event) => handleChange(index, event)}
//                                               placeholder="total"
//                                             />
//                                           </Form.Group>
//                                         </Form>
//                                       </Modal.Body>
//                                       <Modal.Footer>
//                                         <Button
//                                           variant="secondary"
//                                           onClick={() => handleClose(index)}
//                                         >
//                                           Close
//                                         </Button>
//                                         {/* <Button variant="primary"  onClick={() => handleClose()}>
//                                           ok
//                                         </Button> */}
//                                       </Modal.Footer>
//                                     </Modal>
//                                   </div>
//                                 </td>

//                                 <td style={{}}>
//                                   <div className="form-area">
//                                     <input
                                     
//                                       value={field.rate}
//                                       onChange={(event) => handleChange(index, event)}
//                                       step="any"
//                                       name="rate"
//                                       type="number"
//                                       min={0}
//                                       className="form-control"
//                                       // required
//                                     />
//                                   </div>
//                                 </td>

//                                 {/* <td style={{}}>
//                                   <div className="form-area">
//                                     <input
//                                       style={{ marginLeft: '-22px' }}
//                                       value={field.discount}
//                                       onChange={(event) => handleChange(index, event)}
//                                       step="any"
//                                       name="discount"
//                                       type="number"
//                                       min={0}
//                                       className="form-control as"
//                                     />
//                                   </div>
//                                   {''}
//                                 </td> */}

//                                 <td style={{}}>
//                                   <div className="form-area">
//                                     <input
                                     
//                                       step="0.01"
//                                       value={field.cost}
//                                       onChange={(event) => handleChange(index, event)}
//                                       name="cost"
//                                       min={0}
//                                       type="number"
//                                       className="form-control"
//                                     />
//                                   </div>
//                                 </td>

//                                 {/* <td style={{}}>
//                                   <div className="form-area">
//                                     <input
//                                       //  style={{marginLeft:"-22px"}}
//                                       step="0.01"
//                                       value={field.discounted_cost}
//                                       onChange={(event) => handleChange(index, event)}
//                                       name="discounted_cost"
//                                       min={0}
//                                       type="number"
//                                       className="form-control as"
//                                     />
//                                   </div>
//                                 </td> */}
//                                 {/* 
//                                 <td style={{}}>
//                                   <div className="form-area">
//                                     <input
//                                       style={{ marginLeft: '-22px' }}
//                                       step="0.01"
//                                       value={field.cost_tax}
//                                       onChange={(event) => handleChange(index, event)}
//                                       name="cost_tax"
//                                       min={0}
//                                       type="number"
//                                       className="form-control as"
//                                     />
//                                   </div>
//                                 </td> */}

//                                 <td>
//                                   {index !== 0 && (
//                                     <button
//                                       type="button"
//                                       className="btn btn-outline-danger"
//                                       onClick={() => handleDelete(index)}
//                                     >
//                                       X
//                                     </button>
//                                   )}
//                                 </td>
//                               </tr>
//           </tbody>
//         </table>
//       </div>

//       <div class="modal-footer">
//         <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
//       </div>
//     </div>
//   </div>
// </div>

//     </div>
//   )
// }

import React from 'react'

const Addproduct = () => {
  return (
    <div>Addproduct</div>
  )
}

export default Addproduct