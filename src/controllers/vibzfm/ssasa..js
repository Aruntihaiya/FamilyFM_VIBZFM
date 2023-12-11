
export const createvibzfmUser = async (req, res) => {
  try {
    const token = req.headers["x-token"];
    const decoded = jwt.verify(token, "the-super-strong-secrect");
    console.log(req.body, "dfdsf");

    const existingUser = await Vidzfm.findOne({
      where: {
        [Op.or]: [
          { email: req.body.email },
          { phone: req.body.phone },
        ],
      },
    });

    console.log(existingUser, "1235");

    if (req.body.user_type == "addNew") {
      if (existingUser) {
        return successResponse2(req, res, existingUser);
      }

      const myresult = await customer_table.create({
        name: req.body.name,
        mobile: req.body.phone,
        email: req.body.email,
      });

      const result = await Vidzfm.create({
        // ... (your existing code)

        return successResponse1(req, res, result, myresult);
      }

      var userId = myresult.id;

      const invoicedetails = await Vidzfm.findOne({ where: { id: userId } });
      const productTypes = invoicedetails.fields[0].map(
        (item) => item.product_type
      );

      const uniqueProductTypesSet = new Set(productTypes);
      const uniqueProductTypes = [...uniqueProductTypesSet];

      console.log(uniqueProductTypes, "sdsd");

      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://api.clickup.com/api/v2/list/${process.env.list_id}/field`,
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': '50650538_58004adf71661b70cf25f63a0ef724e3a0e4c90d251b657840456cafbfcd2dcc'
        }
      };
      
      axios.request(config)
        .then((response) => {
          const fields = response.data.fields;
          const productPackageField = fields.find(field => field.name === "Product(s)/Package(s)");
  
          const options = productPackageField.type_config.options;
  
          console.log(options, 'fsdfdsfdsfwe');
  
          var labelIds = [];
  
          options.forEach((option) => {
            if (uniqueProductTypes.includes(option.label)) {
              labelIds.push(option.id.toString());
            }
          });
  
          var splitLabelIds = labelIds.join(",").split(",");
  
          console.log(splitLabelIds, "labelIDs");
  
          if (invoicedetails) {
            // ... (your existing code)
  
            let datapayload = JSON.stringify({
              // ... (your existing code)
            });
  
            const myuserId = decoded.userss.id;
  
            user.findByPk(myuserId).then((user) => {
              var myaccess_token = user.access_token;
              console.log(myaccess_token, "access_TOKE");
  
              let config = {
                method: "post",
                maxBodyLength: Infinity,
                url: `https://api.clickup.com/api/v2/list/${process.env.list_id}/task?custom_task_ids=true&team_id=${process.env.team_id}`,
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `${myaccess_token}`,
                },
                data: datapayload,
              };
  
              console.log(datapayload, "5152");
  
              axios
                .request(config)
                .then((response) => {
                  // ... (your existing code)
  
                  return successResponse1(req, res, { myresult });
                })
                .catch((error) => {
                  if (error.response.status == 401) {
                    return successResponse(req, res, {}, false, 401);
                  }
                });
            });
          }
        })
        .catch((error) => {
          console.error("Error fetching ClickUp data:", error);
        });
    } else {
      const myresult = await Vidzfm.create({
        // ... (your existing code)
      });

      console.log(myresult, "78952");

      if (myresult.id) {
        var productitem = req.body.fields[0];
        console.log(productitem, "productitem");

        for (let i = 0; i < productitem.length; i++) {
          console.log(existingUser, "hhhh");
          console.log(myresult, "resultid");
          console.log(productitem.length, "loopingvvfnbnvnvnh");

          await Invoice.create({
            // ... (your existing code)
          });
        }
      }

      var userId = myresult.id;

      const invoicedetails = await Vidzfm.findOne({ where: { id: userId } });
      const productTypes = invoicedetails.fields[0].map(
        (item) => item.product_type
      );

      const uniqueProductTypesSet = new Set(productTypes);
      const uniqueProductTypes = [...uniqueProductTypesSet];

      console.log(uniqueProductTypes, "sdsd");

      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://api.clickup.com/api/v2/list/${process.env.list_id}/field`,
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': '50650538_58004adf71661b70cf25f63a0ef724e3a0e4c90d251b657840456cafbfcd2dcc'
        }
      };

      axios.request(config)
        .then((response) => {
          const fields = response.data.fields;
          const productPackageField = fields.find(field => field.name === "Product(s)/Package(s)");
  
          const options = productPackageField.type_config.options;
  
          console.log(options, 'fsdfdsfdsfwe');
  
          var labelIds = [];
  
          options.forEach((option) => {
            if (uniqueProductTypes.includes(option.label)) {
              labelIds.push(option.id.toString());
            }
          });
  
          var splitLabelIds = labelIds.join(",").split(",");
  
          console.log(splitLabelIds, "labelIDs");
  
          if (invoicedetails) {
            // ... (your existing code)
  
            let datapayload = JSON.stringify({
              // ... (your existing code)
            });
  
            const myuserId = decoded.userss.id;
  
            user.findByPk(myuserId).then((user) => {
              var myaccess_token = user.access_token;
              console.log(myaccess_token, "access_TOKE");
  
              let config = {
                method: "post",
                maxBodyLength: Infinity,
                url: `https://api.clickup.com/api/v2/list/${process.env.list_id}/task?custom_task_ids=true&team_id=${process.env.team_id}`,
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `${myaccess_token}`,
                },
                data: datapayload,
              };
  
              console.log(datapayload, "5152");
  
              axios
                .request(config)
                .then((response) => {
                  // ... (your existing code)
  
                  return successResponse1(req, res, { myresult });
                })














                  // let config = {
      //   method: 'get',
      //   maxBodyLength: Infinity,
      //   url: `https://api.clickup.com/api/v2/list/${process.env.list_id}/field`,
      //   headers: { 
      //     'Content-Type': 'application/json', 
      //     'Authorization': '50650538_58004adf71661b70cf25f63a0ef724e3a0e4c90d251b657840456cafbfcd2dcc'
      //   }
      // };
      
      // axios.request(config)
      // .then((response) => {
      
      //   const fields = response.data.fields;

      //   // Find the "Product(s)/Package(s)" field
      //   const productPackageField = fields.find(field => field.name === "Product(s)/Package(s)");
    
      
      //     // Extract the options from the "Product(s)/Package(s)" field
      //     var options = productPackageField.type_config.options;
    
             
      // console.log(options,'fsdfdsfdsfwe');
         
      // })