let express = require('express');
let router = express.Router();
let xml2js = require('xml2js');
let request = require('request');
let object = require('../helper/object.js');
let check = require('../helper/board.js');
request.debug = true;


function sendPostRequest(numRows, crs, filterCrs, filterType, timeOffset, timeWindow, result) {
    let url = process.env.OPENLDBWSURL;
    let token = process.env.OPENLDBWSTOKEN;
    let typ = process.env.OPENLDBWSTYP;
    let ldb = process.env.OPENLDBWSLDB;
    filterCrs = filterCrs == null ? "<ldb:filterCrs></ldb:filterCrs>" : "<ldb:filterCrs>" + filterCrs + "</ldb:filterCrs>";

    let body = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
        "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:typ=\"" + typ + "\" xmlns:ldb=\"" + ldb +"\">\n" +
        "   <soapenv:Header>\n" +
        "      <typ:AccessToken>\n" +
        "         <typ:TokenValue>" + token + "</typ:TokenValue>\n" +
        "      </typ:AccessToken>\n" +
        "   </soapenv:Header>\n" +
        "   <soapenv:Body>\n" +
        "      <ldb:GetArrivalBoardRequest>\n" +
        "         <ldb:numRows>"+ numRows + "</ldb:numRows>\n" +
        "         <ldb:crs>" + crs + "</ldb:crs>\n" +
        "         <!--Optional:-->\n" +
        "         " + filterCrs +
        "         <!--Optional:-->\n" +
        "         <ldb:filterType>" + filterType + "</ldb:filterType>\n" +
        "         <!--Optional:-->\n" +
        "         <ldb:timeOffset>" + timeOffset + "</ldb:timeOffset>\n" +
        "         <!--Optional:-->\n" +
        "         <ldb:timeWindow>" + timeWindow + "</ldb:timeWindow>\n" +
        "      </ldb:GetArrivalBoardRequest>\n" +
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
                    result.send(object.parseStationBoard(res, 'GetArrivalBoardResponse'));
                }
            });

        }
    });

}

function getArrivalBoard(numRows, crs, filterCrs = null, filterType = "to", timeOffset = 0, timeWindow = 120, res) {

    //Check the parameters
    let errs = check.parameterChecker(numRows, crs,filterCrs, filterType, timeOffset, timeWindow);
    if(errs.length === 0){
        //Send a SOAP request over to OpenLDBWS
        sendPostRequest(numRows, crs, filterCrs, filterType, timeOffset, timeWindow, res);
    }else{
        res.send({status: false, error: errs});
    }
}

router.get('/:numRows/:crs', function (req, res, next) {
    let numRows = req.params.numRows;
    let crs = req.params.crs;
    let filterCrs = req.query.filterCrs;
    let filterType = req.query.filterType;
    let timeOffset = req.query.timeOffset;
    let timeWindow = req.query.timeWindow;
    getArrivalBoard(numRows, crs, filterCrs, filterType, timeOffset, timeWindow, res);

});

module.exports = router;