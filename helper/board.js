/**
 * Checks numRows - The number of services to return in the resulting station board.
 * @param {number} numRows - an integer between 0 and 150 exclusive
 * @returns {boolean}
 */
function checkNumRows(numRows) {
    return numRows >= 0 && numRows <= 150;
}

/**
 * Checks numRows - The number of services to return in the resulting station board.
 * @param {number} numRows - an integer between 0 and 10 exclusive
 * @returns {boolean}
 */
function checkNumRowsWithDetails(numRows) {
    return numRows >= 0 && numRows <= 10;
}

/**
 * Checks crs - The station code of the location for which the request is being made.
 * @param {string} crs - a 3 character alphabetic string
 * @returns {boolean}
 */
function checkCrs(crs) {
    return !!crs.match(/^[A-Z][A-Z][A-Z]$/);
}

/**
 * Checks a list of crs codes
 * @param filterList
 * @param limit
 * @returns {boolean}
 */
function checkFilterList(filterList, limit) {
    if (filterList.length > 0 && filterList.length <= limit) {
        return filterList.every(checkCrs);
    } else {
        return false;
    }
}

/**
 * Checks the type of filter to apply. Filters services to include only those originating
 * or terminating at the filterCrs location.
 * @param {string} filterType - to OR from
 * @returns {boolean}
 */
function checkFilterType(filterType) {
    filterType = filterType.toLowerCase();
    return filterType === "to" || filterType === "from";
}

/**
 * Checks offset - An offset in minutes against the current time to provide the station board for.
 * @param {number} timeOffset - integer between -120 and 120 exclusive
 * @returns {boolean}
 */
function checkTimeOffset(timeOffset) {
    return timeOffset >= -120 && timeOffset <= 120;
}

/**
 * Checks time window - How far into the future in minutes, relative to timeOffset, to return services for
 * @param {number} timeWindow - integer between 0 and 120 exclusive
 * @returns {boolean}
 */
function checkTimeWindow(timeWindow) {
    return timeWindow >= 0 && timeWindow <= 120;
}


/**
 * A parameter checker for GetDepartureBoard, GetArrivalBoard, GetArrivalDepartureBoard
 * @param numRows
 * @param crs
 * @param filterCrs
 * @param filterType
 * @param timeOffset
 * @param timeWindow
 * @returns {Array}
 */
function parameterChecker(numRows, crs, filterCrs, filterType, timeOffset, timeWindow) {
    let errs = [];

    //Conduct checks for all parameters
    if (!checkNumRows(numRows) || numRows == null) {
        errs.push("numRows MUST be an integer between 0 to 150 exclusive.");
    }
    if (!checkCrs(crs) || crs == null) {
        errs.push("crs MUST be a 3 character Uppercase alphabetical string.");
    }
    if (filterCrs != null && !checkCrs(filterCrs)) {
        errs.push("crs MUST be a 3 character Uppercase alphabetical string.");
    }
    if (filterType != null && !checkFilterType(filterType)) {
        errs.push("filterType MUST be the string \"to\" or \"from\".");
    }
    if (timeOffset != null && !checkTimeOffset(timeOffset)) {
        errs.push("timeOffset MUST be an integer between -120 and 120 exclusive");
    }
    if (timeWindow != null && !checkTimeWindow(timeWindow)) {
        errs.push("timeWindow MUST be an integer between 0 and 120 exclusive");
    }
    return errs;
}

/**
 * A parameter checker for GetDepBoardWithDetails, GetArrBoardWithDetails & GetArrDepBoardWithDetails
 * @param numRows
 * @param crs
 * @param filterCrs
 * @param filterType
 * @param timeOffset
 * @param timeWindow
 * @returns {Array}
 */
function parameterCheckerWithDetails(numRows, crs, filterCrs, filterType, timeOffset, timeWindow) {
    let errs = [];

    //Conduct checks for all parameters
    if (!checkNumRowsWithDetails(numRows) || numRows == null) {
        errs.push("numRows MUST be an integer between 0 to 10 exclusive.");
    }
    if (!checkCrs(crs) || crs == null) {
        errs.push("crs MUST be a 3 Uppercase character alphabetical string.");
    }
    if (filterCrs != null && !checkCrs(filterCrs)) {
        errs.push("crs MUST be a 3 UpperCase character alphabetical string.");
    }
    if (filterType != null && !checkFilterType(filterType)) {
        errs.push("filterType MUST be the string \"to\" or \"from\".");
    }
    if (timeOffset != null && !checkTimeOffset(timeOffset)) {
        errs.push("timeOffset MUST be an integer between -120 and 120 exclusive");
    }
    if (timeWindow != null && !checkTimeWindow(timeWindow)) {
        errs.push("timeWindow MUST be an integer between 0 and 120 exclusive");
    }
    return errs;
}


/**
 * A parameter checker for getNextDepartures
 * @param crs
 * @param filterList
 * @param timeOffset
 * @param timeWindow
 * @returns {Array}
 */
function parameterCheckerDepartures(crs, filterList, timeOffset, timeWindow) {
    let errs = [];

    //Conduct checks for all parameters
    if (!checkCrs(crs) || crs == null) {
        errs.push("crs MUST be a 3 character Uppercase alphabetical string.");
    }
    if (filterList != null && !checkFilterList(filterList, 25)) {
        errs.push("filterList MUST contain a comma separated list, containing at least 1 but not greater than 25 crs codes. All crs codes MUST be a 3 character Uppercase alphabetical string.");
    }
    if (timeOffset != null && !checkTimeOffset(timeOffset)) {
        errs.push("timeOffset MUST be an integer between -120 and 120 exclusive");
    }
    if (timeWindow != null && !checkTimeWindow(timeWindow)) {
        errs.push("timeWindow MUST be an integer between 0 and 120 exclusive");
    }
    return errs;
}

/**
 * A parameter checker for getNextDepartures
 * @param crs
 * @param filterList
 * @param timeOffset
 * @param timeWindow
 * @returns {Array}
 */
function parameterCheckerDeparturesWithDetails(crs, filterList, timeOffset, timeWindow) {
    let errs = [];

    //Conduct checks for all parameters
    if (!checkCrs(crs) || crs == null) {
        errs.push("crs MUST be a 3 character Uppercase alphabetical string.");
    }
    if (filterList != null && !checkFilterList(filterList, 10)) {
        errs.push("filterList MUST contain a comma separated list, containing at least 1 but not greater than 10 crs codes. All crs codes MUST be a 3 character Uppercase alphabetical string.");
    }
    if (timeOffset != null && !checkTimeOffset(timeOffset)) {
        errs.push("timeOffset MUST be an integer between -120 and 120 exclusive");
    }
    if (timeWindow != null && !checkTimeWindow(timeWindow)) {
        errs.push("timeWindow MUST be an integer between 0 and 120 exclusive");
    }
    return errs;
}

/**
 * A parameter checker for getNextDepartures
 * @param crs
 * @param filterList
 * @param timeOffset
 * @param timeWindow
 * @returns {Array}
 */
function parameterCheckerFastestDepartures(crs, filterList, timeOffset, timeWindow) {
    let errs = [];

    //Conduct checks for all parameters
    if (!checkCrs(crs) || crs == null) {
        errs.push("crs MUST be a 3 character Uppercase alphabetical string.");
    }
    if (filterList != null && !checkFilterList(filterList, 15)) {
        errs.push("filterList MUST contain a comma separated list, containing at least 1 but not greater than 15 crs codes. All crs codes MUST be a 3 character Uppercase alphabetical string.");
    }
    if (timeOffset != null && !checkTimeOffset(timeOffset)) {
        errs.push("timeOffset MUST be an integer between -120 and 120 exclusive");
    }
    if (timeWindow != null && !checkTimeWindow(timeWindow)) {
        errs.push("timeWindow MUST be an integer between 0 and 120 exclusive");
    }
    return errs;
}

module.exports = {
    parameterChecker: parameterChecker,
    parameterCheckerWithDetails: parameterCheckerWithDetails,
    parameterCheckerDepartures: parameterCheckerDepartures,
    parameterCheckerDeparturesWithDetails: parameterCheckerDeparturesWithDetails,
    parameterCheckerFastestDepartures: parameterCheckerFastestDepartures
};