let express = require('express');
let router = express.Router();
let xml2js = require('xml2js');
let request = require('request');
let object = require('../helper/object.js');
let check = require('../helper/board.js');
request.debug = true;


function sendPostRequest(crs, filterList, timeOffset, timeWindow, result) {
    let url = process.env.OPENLDBWSURL;
    let token = process.env.OPENLDBWSTOKEN;
    let typ = process.env.OPENLDBWSTYP;
    let ldb = process.env.OPENLDBWSLDB;

    let crsList = "";
    filterList.forEach(crs => {
        crsList = crsList + "<ldb:crs>" + crs + "</ldb:crs>\n";
    });

    let body = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
        "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:typ=\"" + typ + "\" xmlns:ldb=\"" + ldb +"\">\n" +
        "   <soapenv:Header>\n" +
        "      <typ:AccessToken>\n" +
        "         <typ:TokenValue>" + token + "</typ:TokenValue>\n" +
        "      </typ:AccessToken>\n" +
        "   </soapenv:Header>\n" +
        "   <soapenv:Body>\n" +
        "      <ldb:GetFastestDeparturesWithDetailsRequest>\n" +
        "         <ldb:crs>" + crs + "</ldb:crs>\n" +
        "         <ldb:filterList>" + crsList + "</ldb:filterList>\n" +
        "         <!--Optional:-->\n" +
        "         <ldb:timeOffset>" + timeOffset + "</ldb:timeOffset>\n" +
        "         <!--Optional:-->\n" +
        "         <ldb:timeWindow>" + timeWindow + "</ldb:timeWindow>\n" +
        "      </ldb:GetFastestDeparturesWithDetailsRequest>\n" +
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
                    result.send(object.parseDeparturesBoardWithDetails(res, 'GetFastestDeparturesWithDetailsResponse'));
                }
            });

        }
    });

}

function getFastestDeparturesWithDetails(crs, filterList, timeOffset = 0, timeWindow = 120, res) {
    //Check the parameters
    let errs = check.parameterCheckerDeparturesWithDetails(crs, filterList, timeOffset, timeWindow);
    if(errs.length === 0){
        //Send a SOAP request over to OpenLDBWS
        sendPostRequest(crs, filterList, timeOffset, timeWindow, res);
    }else{
        res.send({status: false, error: errs});
    }
}

router.get('/:crs/:filterList', function (req, res, next) {
    let crs = req.params.crs;
    let filterList = req.params.filterList.split(',');
    let timeOffset = req.query.timeOffset;
    let timeWindow = req.query.timeWindow;
    getFastestDeparturesWithDetails(crs, filterList, timeOffset, timeWindow, res);

});

module.exports = router;