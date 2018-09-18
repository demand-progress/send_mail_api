const axios = require('axios');
const { parseString } = require('xml2js');
const stateAbbreviations = require('states-abbreviations');

const getState = zip => new Promise(async (resolve, reject) => {
  axios.get('https://secure.shippingapis.com/ShippingAPI.dll?', {
    params: {
      API: 'CityStateLookup',
      xml: `<CityStateLookupRequest USERID="661DEMAN2298"><ZipCode ID="0"><Zip5>${zip}</Zip5></ZipCode></CityStateLookupRequest>`
    }
  })
    .then((response) => {
      const xml = response.data;
      parseString(xml, (err, result) => {
        const zipStateCityObj = result.CityStateLookupResponse.ZipCode[0];
        const state = zipStateCityObj.State[0];
        const stateFullName = stateAbbreviations[state];
        resolve({ stateFullName });
      });
    })
    .catch((error) => {
      reject(error);
    });
});

const postComment = reqBody => new Promise(
  async (resolve, reject) => {
    const {
      first_name, last_name, email, zip, ftc_comment,
    } = reqBody;

    const cityStateObj = await getState(zip);
    const { stateFullName } = cityStateObj;

  }

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
          city: 'oakland',
          state: 'ca',
          zip_code: zip,
        },
        text_data: action_fcc_comment,
        express_comment: 1,
      }
    })
);

module.exports = postFccComment;
