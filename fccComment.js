const axios = require('axios');
const { parseString } = require('xml2js');
const keys = require('./config/key.js');

const getStateAndCity = zip => new Promise(async (resolve, reject) => {
  axios.get('https://secure.shippingapis.com/ShippingAPI.dll?', {
    params: {
      API: 'CityStateLookup',
      xml: `<CityStateLookupRequest USERID="661DEMAN2298"><ZipCode ID="0"><Zip5>${zip}</Zip5></ZipCode></CityStateLookupRequest>`,
    },
  })
    .then((response) => {
      const xml = response.data;

      parseString(xml, (err, result) => {
        const { State, City } = result.CityStateLookupResponse.ZipCode[0];
        resolve({
          state: State[0],
          city: City[0],
        });
      });
    })
    .catch((error) => {
      reject(error);
    });
});

const postFccComment = reqBody => new Promise(
  async (resolve, reject) => {
    const {
      first_name, 
      last_name, 
      email, 
      address1, 
      zip, 
      fcc_comment,
    } = reqBody;

    const cityStateObj = await getStateAndCity(zip);
    const { state, city } = cityStateObj;

    axios({
      method: 'post',
      url: `https://publicapi.fcc.gov/ecfs/filings?api_key=${keys.fccKey}`,
      data: {
        proceedings: [
          {
            // bureau_code: 'WTB',
            // bureau_name: 'Wireless Telecommunications Bureau',
            // name: '18-197',
          },
        ],
        filers: [
          {
            name: `${first_name} ${last_name}`,
          },
        ],
        contact_email: email,
        addressentity: {
          address_line_1: address1,
          city,
          state,
          zip_code: zip,
        },
        text_data: fcc_comment,
        express_comment: 1,
      },
    });
  },
);

module.exports = postFccComment;
