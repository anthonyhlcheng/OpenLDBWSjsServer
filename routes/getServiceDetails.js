let express = require('express');
let router = express.Router();
let xml2js = require('xml2js');
let request = require('request');
let object = require('../helper/object.js');
let check = require('../helper/board.js');
request.debug = true;


function sendPostRequest(serviceID, result) {
    let url = process.env.OPENLDBWSURL;
    let token = process.env.OPENLDBWSTOKEN;
    let typ = process.env.OPENLDBWSTYP;
    let ldb = process.env.OPENLDBWSLDB;

    let body = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
        "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:typ=\"" + typ + "\" xmlns:ldb=\"" + ldb +"\">\n" +
        "   <soapenv:Header>\n" +
        "      <typ:AccessToken>\n" +
        "         <typ:TokenValue>" + token + "</typ:TokenValue>\n" +
        "      </typ:AccessToken>\n" +
        "   </soapenv:Header>\n" +
        "   <soapenv:Body>\n" +
        "       <ldb:GetServiceDetailsRequest>\n" +
        "           <ldb:serviceID>" + serviceID + "</ldb:serviceID>\n" +
        "       </ldb:GetServiceDetailsRequest>\n" +
        "   </soapenv:Body>\n" +
        "</soapenv:Envelope>";
    request({
        url: url,
        method: "POST",
        headers: {
            "content-type": "text/xml",
        },
        body: body
    }, function (error, response, body){
        //console.log(response);
        if(error){
            result.send(error);
        }else {
            //result.send(response.body);

            xml2js.parseString(response.body, (err, res) => {
                if (err) {
                    result.send(err);
                } else {
                    result.send(object.parseServiceDetails(res, 'GetServiceDetailsResponse'));
                }
            });

        }
    });

}

function getServiceDetails(serviceID, res) {
        //Send a SOAP request over to OpenLDBWS
        sendPostRequest(serviceID, res);
}

router.get('/:serviceID', function (req, res, next) {
    let serviceID = req.params.serviceID;
    getServiceDetails(serviceID, res);

});

module.exports = router;