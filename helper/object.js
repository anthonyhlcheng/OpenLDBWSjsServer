/**
 * Produces the JSON required for the ServiceLocation object.
 * @param {json} locations
 * @returns {Array}
 */
function parseServiceLocation(locations) {
    let locationArray = [];
    locations = locations.location;
    locations.forEach(location => {
        let locationName = location.locationName !== undefined ? location.locationName[0] : null;
        let crs = location.crs !== undefined ? location.crs[0] : null;
        let via = location.via !== undefined ? location.via[0] : null;
        let futureChangeTo = location.futureChangeTo !== undefined ? location.futureChangeTo[0] : null;
        let assoclsCancelled = location.assoclsCancelled !== undefined ? location.assoclsCancelled[0] : null;
        locationArray.push({
            locationName: locationName,
            crs: crs,
            via: via,
            futureChangeTo: futureChangeTo,
            assoclsCancelled: assoclsCancelled
        });
    });

    return locationArray;
}

/**
 * Produces the JSON required for the ServiceItem object.
 * @param {json} service
 * @returns {{rsid: null, origin: *, destination: *, currentOrigins: *, currentDestinations: *, sta: null, eta: null, std: null, etd: null, platform: null, operator: null, operatorCode: null, isCircularRoute: null, isCancelled: null, filterLocationCancelled: null, serviceType: null, length: null, detachFront: null, isReverseFormation: null, cancelReason: null, delayReason: null, serviceID: null, adhocAlerts: null, formation: null}}
 */
function parseServiceItem(service) {
    let rsid = service['rsid'] !== undefined ? service.rsid[0] : null;
    let origin = service['origin'] !== undefined ? parseServiceLocation(service.origin[0]) : null;
    let destination = service['destination'] !== undefined ? parseServiceLocation(service.destination[0]) : null;
    let currentOrigins = service['currentOrigins'] !== undefined ? parseServiceLocation(service.currentOrigins[0]) : null;
    let currentDestinations = service['currentDestinations'] !== undefined ? parseServiceLocation(service.currentDestinations[0]) : null;
    let sta = service['sta'] !== undefined ? service.sta[0] : null;
    let eta = service['eta'] !== undefined ? service.eta[0] : null;
    let std = service['std'] !== undefined ? service.std[0] : null;
    let etd = service['etd'] !== undefined ? service.etd[0] : null;
    let platform = service['platform'] !== undefined ? service.platform[0] : null;
    let operator = service['operator'] !== undefined ? service.operator[0] : null;
    let operatorCode = service['operatorCode'] !== undefined ? service.operatorCode[0] : null;
    let isCircularRoute = service['isCircularRoute'] !== undefined ? service.isCircularRoute[0] : null;
    let isCancelled = service['isCancelled'] !== undefined ? service.isCancelled[0] : null;
    let filterLocationCancelled = service['filterLocationCancelled'] !== undefined ? service.filterLocationCancelled[0] : null;
    let serviceType = service['serviceType'] !== undefined ? service.serviceType[0] : null;
    let length = service['length'] !== undefined ? service.length[0] : null;
    let detachFront = service['detachFront'] !== undefined ? service.detachFront[0] : null;
    let isReverseFormation = service['isReverseFormation'] !== undefined ? service.isReverseFormation[0] : null;
    let cancelReason = service['cancelReason'] !== undefined ? service.cancelReason[0] : null;
    let delayReason = service['delayReason'] !== undefined ? service.delayReason[0] : null;
    let serviceID = service['serviceID'] !== undefined ? service.serviceID[0] : null;
    let adhocAlerts = service['adhocAlerts'] !== undefined ? service.adhocAlerts[0] : null;
    let formation = service['formation'] !== undefined ? service.formation[0] : null;
    return {
        rsid: rsid,
        origin: origin,
        destination: destination,
        currentOrigins: currentOrigins,
        currentDestinations: currentDestinations,
        sta: sta,
        eta: eta,
        std: std,
        etd: etd,
        platform: platform,
        operator: operator,
        operatorCode: operatorCode,
        isCircularRoute: isCircularRoute,
        isCancelled: isCancelled,
        filterLocationCancelled: filterLocationCancelled,
        serviceType: serviceType,
        length: length,
        detachFront: detachFront,
        isReverseFormation: isReverseFormation,
        cancelReason: cancelReason,
        delayReason: delayReason,
        serviceID: serviceID,
        adhocAlerts: adhocAlerts,
        formation: formation

    };
}

/**
 * Parses the list of ServiceItems
 * @param serviceJSON
 * @returns {Array}
 */
function parseServiceItemList(serviceJSON) {
    let serviceArray = [];
    let services = serviceJSON['service'];
    services.forEach(service => {
        serviceArray.push(parseServiceItem(service));
    });

    return serviceArray;
}

/**
 * Produces the JSON required for the DepartureItem object.
 * @param {json} serviceJSON
 * @returns {Array}
 */
function parseDepartureItem(serviceJSON) {
    let serviceArray = [];
    let destinations = serviceJSON.destination;
    destinations.forEach(destination => {
        let crs = destination['$']['crs'] !== undefined ? destination['$']['crs'] : null;
        let service = destination['service'][0] !== undefined ? parseServiceItem(destination.service[0]) : null;
        let serviceJSON = {
            crs: crs,
            service: service,
        };
        serviceArray.push(serviceJSON);

    });
    return serviceArray;
}

/**
 * Returns the JSON for the CallingPoint object
 * @param callingPointJSON
 * @returns {{locationName: null, crs: null, st: null, et: null, at: null, isCancelled: null, length: null, detachFront: null, adhocAlerts: null}}
 */
function parseCallingPoint(callingPointJSON) {
    let locationName = callingPointJSON.locationName !== undefined ? callingPointJSON.locationName[0] : null;
    let crs = callingPointJSON.crs !== undefined ? callingPointJSON.crs[0] : null;
    let st = callingPointJSON.st !== undefined ? callingPointJSON.st[0] : null;
    let et = callingPointJSON.et !== undefined ? callingPointJSON.et[0] : null;
    let at = callingPointJSON.at !== undefined ? callingPointJSON.at[0] : null;
    let isCancelled = callingPointJSON.isCancelled !== undefined ? callingPointJSON.isCancelled[0] : null;
    let length = callingPointJSON['length'] !== undefined ? callingPointJSON.length[0] : null;
    let detachFront = callingPointJSON.detachFront !== undefined ? callingPointJSON.detachFront[0] : null;
    let adhocAlerts = callingPointJSON.adhocAlerts !== undefined ? callingPointJSON.adhocAlerts[0] : null;

    return {
        locationName: locationName,
        crs: crs,
        st: st,
        et: et,
        at: at,
        isCancelled: isCancelled,
        length: length,
        detachFront: detachFront,
        adhocAlerts: adhocAlerts
    };
}

/**
 * Returns the JSON for the CallingPointList object
 * @param callingPointListJSON
 * @returns {Array}
 */
function parseCallingPointList(callingPointListJSON) {
    let callingPoints = callingPointListJSON.callingPointList[0].callingPoint;
    let callingPointsArray = [];
    callingPoints.forEach(callingPoint => {
        callingPointsArray.push(parseCallingPoint(callingPoint));
    });

    return callingPointsArray;
}

/**
 * Returns the JSON for the ServiceItemWithCallingPointsList object
 * @param serviceJSON
 * @returns {Array}
 */
function parseServiceItemWithCallingPointsList(serviceJSON) {
    let serviceArray = [];
    let services = serviceJSON['service'];
    services.forEach(service => {
        serviceArray.push(parseServiceItemWithCallingPoints(service));
    });
    return serviceArray;
}

/**
 * Produces the JSON required for the ServiceItemWithCallingPoints object.
 * @param {json} service
 * @returns {{origin: *, destination: *, currentOrigins: *, currentDestinations: *, sta: null, eta: null, std: null, etd: null, platform: null, operator: null, operatorCode: null, isCircularRoute: null, isCancelled: null, filterLocationCancelled: null, serviceType: null, length: null, detachFront: null, isReverseFormation: null, cancelReason: null, delayReason: null, serviceID: null, adhocAlerts: null, previousCallingPoints: *, subsequentCallingPoints: *, formation: null}}
 */
function parseServiceItemWithCallingPoints(service) {
    let origin = service['origin'] !== undefined ? parseServiceLocation(service.origin[0]) : null;
    let destination = service['destination'] !== undefined ? parseServiceLocation(service.destination[0]) : null;
    let currentOrigins = service['currentOrigins'] !== undefined ? parseServiceLocation(service.currentOrigins[0]) : null;
    let currentDestinations = service['currentDestinations'] !== undefined ? parseServiceLocation(service.currentDestinations[0]) : null;
    let sta = service['sta'] !== undefined ? service.sta[0] : null;
    let eta = service['eta'] !== undefined ? service.eta[0] : null;
    let std = service['std'] !== undefined ? service.std[0] : null;
    let etd = service['etd'] !== undefined ? service.etd[0] : null;
    let platform = service['platform'] !== undefined ? service.platform[0] : null;
    let operator = service['operator'] !== undefined ? service.operator[0] : null;
    let operatorCode = service['operatorCode'] !== undefined ? service.operatorCode[0] : null;
    let isCircularRoute = service['isCircularRoute'] !== undefined ? service.isCircularRoute[0] : null;
    let isCancelled = service['isCancelled'] !== undefined ? service.isCancelled[0] : null;
    let filterLocationCancelled = service['filterLocationCancelled'] !== undefined ? service.filterLocationCancelled[0] : null;
    let serviceType = service['serviceType'] !== undefined ? service.serviceType[0] : null;
    let length = service['length'] !== undefined ? service.length[0] : null;
    let detachFront = service['detachFront'] !== undefined ? service.detachFront[0] : null;
    let isReverseFormation = service['isReverseFormation'] !== undefined ? service.isReverseFormation[0] : null;
    let cancelReason = service['cancelReason'] !== undefined ? service.cancelReason[0] : null;
    let delayReason = service['delayReason'] !== undefined ? service.delayReason[0] : null;
    let serviceID = service['serviceID'] !== undefined ? service.serviceID[0] : null;
    let adhocAlerts = service['adhocAlerts'] !== undefined ? service.adhocAlerts[0] : null;
    let previousCallingPoints = service['previousCallingPoints'] !== undefined ? parseCallingPointList(service.previousCallingPoints[0]) : null;
    let subsequentCallingPoints = service['subsequentCallingPoints'] !== undefined ? parseCallingPointList(service.subsequentCallingPoints[0]) : null;
    let formation = service['formation'] !== undefined ? service.formation[0] : null;
    return {
        origin: origin,
        destination: destination,
        currentOrigins: currentOrigins,
        currentDestinations: currentDestinations,
        sta: sta,
        eta: eta,
        std: std,
        etd: etd,
        platform: platform,
        operator: operator,
        operatorCode: operatorCode,
        isCircularRoute: isCircularRoute,
        isCancelled: isCancelled,
        filterLocationCancelled: filterLocationCancelled,
        serviceType: serviceType,
        length: length,
        detachFront: detachFront,
        isReverseFormation: isReverseFormation,
        cancelReason: cancelReason,
        delayReason: delayReason,
        serviceID: serviceID,
        adhocAlerts: adhocAlerts,
        previousCallingPoints: previousCallingPoints,
        subsequentCallingPoints: subsequentCallingPoints,
        formation: formation

    };


}

/**
 * Returns the JSON required for the DepartureItemWithCallingPoints object
 * @param serviceJSON
 * @returns {Array}
 */
function parseDepartureItemWithCallingPoints(serviceJSON) {
    //return serviceJSON;
    let serviceArray = [];
    let destinations = serviceJSON.destination;
    //return destinations;
    destinations.forEach(destination => {
        let crs = destination['$']['crs'] !== undefined ? destination['$']['crs'] : null;
        let service = destination['service'][0] !== undefined ? parseServiceItemWithCallingPoints(destination.service[0]) : null;
        let serviceJSON = {
            crs: crs,
            service: service,
        };
        serviceArray.push(serviceJSON);

    });
    return serviceArray;
}

/**
 * Produces the JSON required for the StationBoard object.
 * @param json
 * @param boardTypeResponse
 * @returns {{generatedAt: *, locationName: *, crs: *, filterLocationName: null, filterCrs: null, filterType: null, nrccMessages: null, platformAvailable: null, areServicesAvailable: null, trainServices: *, busServices: *, ferryServices: *}}
 */
function parseDeparturesBoard(json, boardTypeResponse) {
    try {
        let departuresBoard = json['soap:Envelope']['soap:Body'][0][boardTypeResponse][0]['DeparturesBoard'][0];
        departuresBoard = JSON.parse(JSON.stringify(departuresBoard).replace(/lt[0-9]:|lt:/g, ""));
        let generatedAt = departuresBoard['generatedAt'][0];
        let locationName = departuresBoard['locationName'][0];
        let crs = departuresBoard['crs'][0];
        let filterLocationName = departuresBoard['filterLocationName'] !== undefined ? departuresBoard.filterLocationName[0] : null;
        let filtercrs = departuresBoard['filtercrs'] !== undefined ? departuresBoard.filtercrs[0] : null;
        let filterType = departuresBoard['filterType'] !== undefined ? departuresBoard.filterType[0] : null;
        let nrccMessages = departuresBoard['nrccMessages'] !== undefined ? departuresBoard.nrccMessages[0].message : null;
        let platformAvailable = departuresBoard['platformAvailable'] !== undefined ? departuresBoard.platformAvailable[0] : null;
        let areServicesAvailable = departuresBoard['areServicesAvailable'] !== undefined ? departuresBoard.areServicesAvailable[0] : null;
        let departures = departuresBoard['departures'] !== undefined ? parseDepartureItem(departuresBoard.departures[0]) : null;

        return {
            status: true,
            generatedAt: generatedAt,
            locationName: locationName,
            crs: crs,
            filterLocationName: filterLocationName,
            filterCrs: filtercrs,
            filterType: filterType,
            nrccMessages: nrccMessages,
            platformAvailable: platformAvailable,
            areServicesAvailable: areServicesAvailable,
            departures: departures,
        };
    } catch (err) {
        console.log(err);
        return ({status: false, error: ["Please check your input as this could cause this error.", json]});
    }
}

/**
 * Produces the JSON required for the DeparturesBoardWithDetails object.
 * @param json
 * @param boardTypeResponse
 * @returns {{generatedAt: *, locationName: *, crs: *, filterLocationName: null, filterCrs: null, filterType: null, nrccMessages: null, platformAvailable: null, areServicesAvailable: null, departures: *}}
 */
function parseDeparturesBoardWithDetails(json, boardTypeResponse) {
    try {
        let departuresBoard = json['soap:Envelope']['soap:Body'][0][boardTypeResponse][0]['DeparturesBoard'][0];
        departuresBoard = JSON.parse(JSON.stringify(departuresBoard).replace(/lt[0-9]:|lt:/g, ""));
        let generatedAt = departuresBoard['generatedAt'][0];
        let locationName = departuresBoard['locationName'][0];
        let crs = departuresBoard['crs'][0];
        let filterLocationName = departuresBoard['filterLocationName'] !== undefined ? departuresBoard.filterLocationName[0] : null;
        let filtercrs = departuresBoard['filtercrs'] !== undefined ? departuresBoard.filtercrs[0] : null;
        let filterType = departuresBoard['filterType'] !== undefined ? departuresBoard.filterType[0] : null;
        let nrccMessages = departuresBoard['nrccMessages'] !== undefined ? departuresBoard.nrccMessages[0].message : null;
        let platformAvailable = departuresBoard['platformAvailable'] !== undefined ? departuresBoard.platformAvailable[0] : null;
        let areServicesAvailable = departuresBoard['areServicesAvailable'] !== undefined ? departuresBoard.areServicesAvailable[0] : null;
        let departures = departuresBoard['departures'] !== undefined ? parseDepartureItemWithCallingPoints(departuresBoard.departures[0]) : null;

        return {
            status: true,
            generatedAt: generatedAt,
            locationName: locationName,
            crs: crs,
            filterLocationName: filterLocationName,
            filterCrs: filtercrs,
            filterType: filterType,
            nrccMessages: nrccMessages,
            platformAvailable: platformAvailable,
            areServicesAvailable: areServicesAvailable,
            departures: departures,
        };
    } catch (err) {
        console.log(err);
        return ({status: false, error: ["Please check your input as this could cause this error.", json]});
    }
}

/**
 * Produces the JSON required for the StationBoard object.
 * @param json
 * @param boardTypeResponse
 * @returns {{generatedAt: *, locationName: *, crs: *, filterLocationName: null, filterCrs: null, filterType: null, nrccMessages: null, platformAvailable: null, areServicesAvailable: null, trainServices: *, busServices: *, ferryServices: *}}
 */
function parseStationBoard(json, boardTypeResponse) {
    try {
        let stationBoard = json['soap:Envelope']['soap:Body'][0][boardTypeResponse][0]['GetStationBoardResult'][0];
        stationBoard = JSON.parse(JSON.stringify(stationBoard).replace(/lt[0-9]:|lt:/g, ""));
        let generatedAt = stationBoard['generatedAt'][0];
        let locationName = stationBoard['locationName'][0];
        let crs = stationBoard['crs'][0];
        let filterLocationName = stationBoard['filterLocationName'] !== undefined ? stationBoard.filterLocationName[0] : null;
        let filtercrs = stationBoard['filtercrs'] !== undefined ? stationBoard.filtercrs[0] : null;
        let filterType = stationBoard['filterType'] !== undefined ? stationBoard.filterType[0] : null;
        let nrccMessages = stationBoard['nrccMessages'] !== undefined ? stationBoard.nrccMessages[0].message : null;
        let platformAvailable = stationBoard['platformAvailable'] !== undefined ? stationBoard.platformAvailable[0] : null;
        let areServicesAvailable = stationBoard['areServicesAvailable'] !== undefined ? stationBoard.areServicesAvailable[0] : null;
        let trainServices = stationBoard['trainServices'] !== undefined ? parseServiceItemList(stationBoard.trainServices[0]) : null;
        let busServices = stationBoard['busServices'] !== undefined ? parseServiceItemList(stationBoard.busServices[0]) : null;
        let ferryServices = stationBoard['ferryServices'] !== undefined ? parseServiceItemList(stationBoard.ferryServices[0]) : null;

        return {
            status: true,
            generatedAt: generatedAt,
            locationName: locationName,
            crs: crs,
            filterLocationName: filterLocationName,
            filterCrs: filtercrs,
            filterType: filterType,
            nrccMessages: nrccMessages,
            platformAvailable: platformAvailable,
            areServicesAvailable: areServicesAvailable,
            trainServices: trainServices,
            busServices: busServices,
            ferryServices: ferryServices
        };
    } catch (err) {
        console.log(err);
        return ({status: false, error: ["Please check your input as this could cause this error.", json]});
    }
}

/**
 * Produces the JSON required for the StationBoardWithDetails object.
 * @param json
 * @param boardTypeResponse
 * @returns {{status: boolean, generatedAt: *, locationName: *, crs: *, filterLocationName: null, filterCrs: null, filterType: null, nrccMessages: null, platformAvailable: null, areServicesAvailable: null, trainServices: *, busServices: *, ferryServices: *}}
 */
function parseStationBoardWithDetails(json, boardTypeResponse) {
    try {
        let stationBoard = json['soap:Envelope']['soap:Body'][0][boardTypeResponse][0]['GetStationBoardResult'][0];
        stationBoard = JSON.parse(JSON.stringify(stationBoard).replace(/lt[0-9]:|lt:/g, ""));
        let generatedAt = stationBoard['generatedAt'][0];
        let locationName = stationBoard['locationName'][0];
        let crs = stationBoard['crs'][0];
        let filterLocationName = stationBoard['filterLocationName'] !== undefined ? stationBoard.filterLocationName[0] : null;
        let filtercrs = stationBoard['filtercrs'] !== undefined ? stationBoard.filtercrs[0] : null;
        let filterType = stationBoard['filterType'] !== undefined ? stationBoard.filterType[0] : null;
        let nrccMessages = stationBoard['nrccMessages'] !== undefined ? stationBoard.nrccMessages[0].message : null;
        let platformAvailable = stationBoard['platformAvailable'] !== undefined ? stationBoard.platformAvailable[0] : null;
        let areServicesAvailable = stationBoard['areServicesAvailable'] !== undefined ? stationBoard.areServicesAvailable[0] : null;
        let trainServices = stationBoard['trainServices'] !== undefined ? parseServiceItemWithCallingPointsList(stationBoard.trainServices[0]) : null;
        let busServices = stationBoard['busServices'] !== undefined ? parseServiceItemWithCallingPointsList(stationBoard.busServices[0]) : null;
        let ferryServices = stationBoard['ferryServices'] !== undefined ? parseServiceItemWithCallingPointsList(stationBoard.ferryServices[0]) : null;

        return {
            status: true,
            generatedAt: generatedAt,
            locationName: locationName,
            crs: crs,
            filterLocationName: filterLocationName,
            filterCrs: filtercrs,
            filterType: filterType,
            nrccMessages: nrccMessages,
            platformAvailable: platformAvailable,
            areServicesAvailable: areServicesAvailable,
            trainServices: trainServices,
            busServices: busServices,
            ferryServices: ferryServices
        };
    } catch (err) {
        console.log(err);
        return ({status: false, error: ["Please check your input as this could cause this error.", json]});
    }
}

/**
 * Produces the required JSON for the ServiceDetails object
 * @param serviceDetailsJSON
 * @param boardTypeResponse
 * @returns {{status: boolean, generatedAt: null, rsid: null, serviceType: null, locationName: null, crs: null, operator: null, operatorCode: null, isCancelled: null, cancelReason: null, delayReason: null, overdueMessage: null, length: null, detachFront: null, isReverseFormation: null, platform: null, sta: null, eta: null, ata: null, std: null, etd: null, atd: null, adhocAlerts: null, previousCallingPoints: *, subsequentCallingPoints: *}}
 */
function parseServiceDetails(serviceDetailsJSON, boardTypeResponse) {
    try {
        let service = serviceDetailsJSON['soap:Envelope']['soap:Body'][0][boardTypeResponse][0]['GetServiceDetailsResult'][0];
        service = JSON.parse(JSON.stringify(service).replace(/lt[0-9]:|lt:/g, ""));
        let generatedAt = service['generatedAt'] !== undefined ? service.generatedAt[0] : null;
        let rsid = service['rsid'] !== undefined ? service.rsid[0] : null;
        let serviceType = service['serviceType'] !== undefined ? service.serviceType[0] : null;
        let locationName = service.locationName !== undefined ? service.locationName[0] : null;
        let crs = service.crs !== undefined ? service.crs[0] : null;
        let operator = service['operator'] !== undefined ? service.operator[0] : null;
        let operatorCode = service['operatorCode'] !== undefined ? service.operatorCode[0] : null;
        let isCancelled = service.isCancelled !== undefined ? service.isCancelled[0] : null;
        let cancelReason = service['cancelReason'] !== undefined ? service.cancelReason[0] : null;
        let delayReason = service['delayReason'] !== undefined ? service.delayReason[0] : null;
        let overdueMessage = service['overdueMessage'] !== undefined ? service.overdueMessage[0] : null;
        let length = service['length'] !== undefined ? service.length[0] : null;
        let detachFront = service.detachFront !== undefined ? service.detachFront[0] : null;
        let isReverseFormation = service['isReverseFormation'] !== undefined ? service.isReverseFormation[0] : null;
        let platform = service['platform'] !== undefined ? service.platform[0] : null;
        let sta = service.sta !== undefined ? service.sta[0] : null;
        let eta = service.eta !== undefined ? service.eta[0] : null;
        let ata = service.ata !== undefined ? service.ata[0] : null;
        let std = service.std !== undefined ? service.std[0] : null;
        let etd = service.etd !== undefined ? service.etd[0] : null;
        let atd = service.atd !== undefined ? service.atd[0] : null;
        let adhocAlerts = service.adhocAlerts !== undefined ? service.adhocAlerts[0] : null;
        let previousCallingPoints = service['previousCallingPoints'] !== undefined ? parseCallingPointList(service.previousCallingPoints[0]) : null;
        let subsequentCallingPoints = service['subsequentCallingPoints'] !== undefined ? parseCallingPointList(service.subsequentCallingPoints[0]) : null;
        return {
            status: true,
            generatedAt: generatedAt,
            rsid: rsid,
            serviceType: serviceType,
            locationName: locationName,
            crs: crs,
            operator: operator,
            operatorCode: operatorCode,
            isCancelled: isCancelled,
            cancelReason: cancelReason,
            delayReason: delayReason,
            overdueMessage: overdueMessage,
            length: length,
            detachFront: detachFront,
            isReverseFormation: isReverseFormation,
            platform: platform,
            sta: sta,
            eta: eta,
            ata: ata,
            std: std,
            etd: etd,
            atd: atd,
            adhocAlerts: adhocAlerts,
            previousCallingPoints: previousCallingPoints,
            subsequentCallingPoints: subsequentCallingPoints
        };
    } catch (err) {
        console.log(err);
        return ({
            status: false,
            error: ["Please check your input as this could cause this error.", serviceDetailsJSON]
        });
    }
}

module.exports = {
    parseStationBoard: parseStationBoard,
    parseStationBoardWithDetails: parseStationBoardWithDetails,
    parseDeparturesBoard: parseDeparturesBoard,
    parseDeparturesBoardWithDetails: parseDeparturesBoardWithDetails,
    parseServiceDetails: parseServiceDetails
};
