# OpenDBWSjsServer

This project acts as an bridge between the XML output of OpenDBWS SOAP requests and developers who wishes to work with JSON output only. So no need to fiddle with XML.

This version should be run on a Node Server with Express installed, with developers fetching information via HTTP GET requests to the server.

A client version or module may be added at a later date.

## Table of Contents
(Background Information & General Questions)[#background-information--general-questions]
* (What is OpenDBWS?)[#what-is-opendbws]
* (What is SOAP?)[#what-is-soap]
* (Why was this made?)[#why-was-this-made]
* (What is your relationship with OpenDBWS?)[#what-is-your-relationship-with-opendbws]
* (Why was X written in such a way...)[#why-is-x-written-in-such-a-way--ys-coding-format-is-not-to-my-liking-etc]
(Getting Started)[#getting-started]

## Background Information & General Questions

### What is OpenDBWS?

OpenDBWS is a request response web service to access real time train information in England, Scotland and Wales. It is the same service that powers the Live Departure Boards. All information is provided in XML format.

For more information, go to <http://lite.realtime.nationalrail.co.uk/openldbws/>  

### What is SOAP?

SOAP is a way of communicating information between applications using XML.

For more information, go to <https://www.w3schools.com/xml/xml_soap.asp>

### Why was this made?

It's to provide developers, who don't want the hassle of manipulating XML or learning how to structure XML requests to send over to OpenDBWS, a way of accessing real live train information.

### What is your relationship with OpenDBWS?

The author of this code is an independent individual, not employed by National Rail Enquiries or the Rail Delivery Group. The data provided is sourced from OpenDBWS. Any queries specifically related to the data produced should be directed to the authors of OpenDBWS.

### Why is X written in such a way | Y's coding format is not to my liking etc...

It's a design decision - is what I'm inclined to say. There are times when writing it in a simpler format may not be possible due to issues with the data outputted from OpenLDBWS. If you think you can do better, feel free to edit it on your own environment.

## Getting Started

This section will get your server up and running.

### Prerequisites

You must register for an OpenDBWS account. [Click here](http://realtime.nationalrail.co.uk/OpenLDBWSRegistration/) if you haven't got an account.

Ensure you have node and npm installed. Initialise the directory and update your library to include the dependencies required.

The main dependencies are express, dotenv, request and xml2js.

### Setup

In the root directory of the server, you'll find a .env file. This lists out all the environment variables that the server will require. You may find that, if you're hosting it in a production environment, that storing the values elsewhere is much safer. Just ensure that you copy all the variables over. 

```
OPENLDBWSTOKEN=undefined
OPENLDBWSURL=https://lite.realtime.nationalrail.co.uk/OpenLDBWS/ldb11.asmx
OPENLDBWSTYP=http://thalesgroup.com/RTTI/2013-11-28/Token/types
OPENLDBWSLDB=http://thalesgroup.com/RTTI/2017-10-01/ldb/
```

Using the token that was supplied by OpenDBWS during registration, replace the undefined value of OPENLDBWSTOKEN with your private token.

The other variables are what forms the XML query. Should OpenDBWS be updated to a newer version, then you will need to replace the values above.

More specifically:

OPENLDBWSURL tells the server where to POST the XML request to.

OPENLDBWSTYP provides the definition of the typ namespace.

OPENLDBWSLDB provides the definition of the ldb namespace.

Now you should be ready to go.
```
npm start
```

## Queries

This section deals with forming the correct URL to retrieve the correct information.

For a general structure, if the parameter is compulsory, it will be included as a URL parameter. If it is optional, then it should be written in as a query parameter.

### GetDepartureBoard

**Description**:

Returns all public departures for the supplied CRS code within a defined time window.

**Parameters**:

numRows (integer, between 0 and 150 exclusive): The number of services to return in the resulting station board.

crs (string, 3 uppercase characters, alphabetic): The CRS code (see above) of the location for which the request is being made.

filterCrs (string, 3 uppercase characters, alphabetic): The CRS code of either an origin or destination location to filter in. Optional.

filterType (string, either "from" or "to"): The type of filter to apply. Filters services to include only those originating or terminating at the filterCrs location. Defaults to "to". Optional.

timeOffset (integer, between -120 and 120 exclusive): An offset in minutes against the current time to provide the station board for. Defaults to 0. Optional.

timeWindow (integer, between 0 and 120 exclusive): How far into the future in minutes, relative to timeOffset, to return services for. Defaults to 120. Optional.

Basic Form:
```
    http://localhost:3000/GetDepartureBoard/numRows/crs
    
    Example:
    
    http://localhost:3000/GetDepartureBoard/10/WAT
```

Advanced Form:

```
    http://localhost:3000/GetDepartureBoard/numRows/crs?filterCrs=XXX&filterType=XXX
    
    Example:
    
    http://localhost:3000/GetDepartureBoard/10/WAT?filterCrs=RMD&filterType=to
```

**Response**:

A StationBoard JSON object

### GetDepBoardWithDetails

**Description**:

Returns all public departures for the supplied CRS code within a defined time window, including service details.

**Parameters**:

numRows (integer, between 0 and 10 exclusive): The number of services to return in the resulting station board.

crs (string, 3 uppercase characters, alphabetic): The CRS code (see above) of the location for which the request is being made.

filterCrs (string, 3 uppercase characters, alphabetic): The CRS code of either an origin or destination location to filter in. Optional.

filterType (string, either "from" or "to"): The type of filter to apply. Filters services to include only those originating or terminating at the filterCrs location. Defaults to "to". Optional.

timeOffset (integer, between -120 and 120 exclusive): An offset in minutes against the current time to provide the station board for. Defaults to 0. Optional.

timeWindow (integer, between 0 and 120 exclusive): How far into the future in minutes, relative to timeOffset, to return services for. Defaults to 120. Optional.

Basic Form:
```
    http://localhost:3000/GetDepBoardWithDetails/numRows/crs
    
    Example:
    
    http://localhost:3000/GetDepBoardWithDetails/5/WAT
```

Advanced Form:

```
    http://localhost:3000/GetDepBoardWithDetails/numRows/crs?filterCrs=XXX&filterType=XXX
    
    Example:
    
    http://localhost:3000/GetDepBoardWithDetails/5/WAT?filterCrs=RDG&timeWindow=60
```

**Response**:

A StationBoardWithDetails JSON object

### GetArrivalBoard

**Description**:

Returns all public arrivals and departures for the supplied CRS code within a defined time window.

**Parameters**:

numRows (integer, between 0 and 150 exclusive): The number of services to return in the resulting station board.

crs (string, 3 uppercase characters, alphabetic): The CRS code (see above) of the location for which the request is being made.

filterCrs (string, 3 uppercase characters, alphabetic): The CRS code of either an origin or destination location to filter in. Optional.

filterType (string, either "from" or "to"): The type of filter to apply. Filters services to include only those originating or terminating at the filterCrs location. Defaults to "to". Optional.

timeOffset (integer, between -120 and 120 exclusive): An offset in minutes against the current time to provide the station board for. Defaults to 0. Optional.

timeWindow (integer, between 0 and 120 exclusive): How far into the future in minutes, relative to timeOffset, to return services for. Defaults to 120. Optional.

Basic Form:
```
    http://localhost:3000/GetArrivalBoard/numRows/crs
    
    Example:
    
    http://localhost:3000/GetArrivalBoard/10/SSD
```

Advanced Form:

```
    http://localhost:3000/GetArrivalBoard/numRows/crs?filterCrs=XXX&filterType=XXX
    
    Example:
    
    http://localhost:3000/GetArrivalBoard/10/GTW?filterCrs=RMD&filterType=to
```

**Response**:

A StationBoard JSON object

### GetArrBoardWithDetails

**Description**:

Returns all public arrivals and departures for the supplied CRS code within a defined time window, including service details.

**Parameters**:

numRows (integer, between 0 and 10 exclusive): The number of services to return in the resulting station board.

crs (string, 3 uppercase characters, alphabetic): The CRS code (see above) of the location for which the request is being made.

filterCrs (string, 3 uppercase characters, alphabetic): The CRS code of either an origin or destination location to filter in. Optional.

filterType (string, either "from" or "to"): The type of filter to apply. Filters services to include only those originating or terminating at the filterCrs location. Defaults to "to". Optional.

timeOffset (integer, between -120 and 120 exclusive): An offset in minutes against the current time to provide the station board for. Defaults to 0. Optional.

timeWindow (integer, between 0 and 120 exclusive): How far into the future in minutes, relative to timeOffset, to return services for. Defaults to 120. Optional.

Basic Form:
```
    http://localhost:3000/GetArrBoardWithDetails/numRows/crs
    
    Example:
    
    http://localhost:3000/GetArrBoardWithDetails/5/MCV
```

Advanced Form:

```
    http://localhost:3000/GetArrBoardWithDetails/numRows/crs?filterCrs=XXX&filterType=XXX
    
    Example:
    
    http://localhost:3000/GetArrBoardWithDetails/5/MAN?filterCrs=RDG&timeWindow=60
```

**Response**:

A StationBoardWithDetails JSON object

### GetArrivalDepartureBoard

**Description**:

Returns all public arrivals and departures for the supplied CRS code within a defined time window.

**Parameters**:

numRows (integer, between 0 and 150 exclusive): The number of services to return in the resulting station board.

crs (string, 3 uppercase characters, alphabetic): The CRS code (see above) of the location for which the request is being made.

filterCrs (string, 3 uppercase characters, alphabetic): The CRS code of either an origin or destination location to filter in. Optional.

filterType (string, either "from" or "to"): The type of filter to apply. Filters services to include only those originating or terminating at the filterCrs location. Defaults to "to". Optional.

timeOffset (integer, between -120 and 120 exclusive): An offset in minutes against the current time to provide the station board for. Defaults to 0. Optional.

timeWindow (integer, between 0 and 120 exclusive): How far into the future in minutes, relative to timeOffset, to return services for. Defaults to 120. Optional.

Basic Form:
```
    http://localhost:3000/GetArrivalDepartureBoard/numRows/crs
    
    Example:
    
    http://localhost:3000/GetArrivalDepartureBoard/10/SSD
```

Advanced Form:

```
    http://localhost:3000/GetArrivalDepartureBoard/numRows/crs?filterCrs=XXX&filterType=XXX
    
    Example:
    
    http://localhost:3000/GetArrivalDepartureBoard/10/GTW?filterCrs=RMD&filterType=to
```

**Response**:

A StationBoard JSON object

### GetArrDepBoardWithDetails

**Description**:

Returns all public arrivals and departures for the supplied CRS code within a defined time window, including service details.

**Parameters**:

numRows (integer, between 0 and 10 exclusive): The number of services to return in the resulting station board.

crs (string, 3 uppercase characters, alphabetic): The CRS code (see above) of the location for which the request is being made.

filterCrs (string, 3 uppercase characters, alphabetic): The CRS code of either an origin or destination location to filter in. Optional.

filterType (string, either "from" or "to"): The type of filter to apply. Filters services to include only those originating or terminating at the filterCrs location. Defaults to "to". Optional.

timeOffset (integer, between -120 and 120 exclusive): An offset in minutes against the current time to provide the station board for. Defaults to 0. Optional.

timeWindow (integer, between 0 and 120 exclusive): How far into the future in minutes, relative to timeOffset, to return services for. Defaults to 120. Optional.

Basic Form:
```
    http://localhost:3000/GetArrDepBoardWithDetails/numRows/crs
    
    Example:
    
    http://localhost:3000/GetArrDepBoardWithDetails/5/MCV
```

Advanced Form:

```
    http://localhost:3000/GetArrDepBoardWithDetails/numRows/crs?filterCrs=XXX&filterType=XXX
    
    Example:
    
    http://localhost:3000/GetArrDepBoardWithDetails/5/MAN?filterCrs=RDG&timeWindow=60
```

**Response**:

A StationBoardWithDetails JSON object

### GetNextDepartures

**Description**:

Returns the next public departure for the supplied CRS code within a defined time window to the locations specified in the filter.

**Parameters**:

crs (string, 3 characters, alphabetic): The CRS code (see above) of the location for which the request is being made.

filterList (a list): A list of CRS codes of the destinations location to filter, at least 1 but not greater than 25 must be supplied.

timeOffset (integer, between -120 and 120 exclusive): An offset in minutes against the current time to provide the station board for. Defaults to 0. Optional.

timeWindow (integer, between 0 and 120 exclusive): How far into the future in minutes, relative to timeOffset, to return services for. Defaults to 120. Optional.

Basic Form:
```
    http://localhost:3000/GetNextDepartures/crs/crs,crs...
    
    Example:
    
    http://localhost:3000/GetNextDepartures/EUS/MKC,MAN
```

Advanced Form:

```
    http://localhost:3000/GetNextDepartures/crs/crs,crs,crs?timeOffset=XXX&timeWindow=XXX
    
    Example:
    
    http://localhost:3000/GetNextDepartures/WAT/HOU,RMD,RDG&timeOffset=10&timeWindow=60
```

**Response**:

A DeparturesBoard JSON object

### GetNextDeparturesWithDetails

**Description**:

Returns the next public departure for the supplied CRS code within a defined time window to the locations specified in the filter, including service details.

**Parameters**:

crs (string, 3 characters, alphabetic): The CRS code (see above) of the location for which the request is being made.

filterList (a list): A list of CRS codes of the destinations location to filter, at least 1 but not greater than 10 must be supplied.

timeOffset (integer, between -120 and 120 exclusive): An offset in minutes against the current time to provide the station board for. Defaults to 0. Optional.

timeWindow (integer, between 0 and 120 exclusive): How far into the future in minutes, relative to timeOffset, to return services for. Defaults to 120. Optional.

Basic Form:
```
    http://localhost:3000/GetNextDeparturesWithDetails/crs/crs,crs...
    
    Example:
    
    http://localhost:3000/GetNextDeparturesWithDetails/EUS/MKC,MAN
```

Advanced Form:

```
    http://localhost:3000/GetNextDeparturesWithDetails/crs/crs,crs,crs?timeOffset=XXX&timeWindow=XXX
    
    Example:
    
    http://localhost:3000/GetNextDeparturesWithDetails/WAT/HOU,RMD,RDG&timeOffset=10&timeWindow=60
```

**Response**:

A DeparturesBoardWithDetails JSON object

### GetFastestDepartures

**Description**:

Returns the public departure for the supplied CRS code within a defined time window to the locations specified in the filter with the earliest arrival time at the filtered location.

**Parameters**:

crs (string, 3 characters, alphabetic): The CRS code (see above) of the location for which the request is being made.

filterList (a list): A list of CRS codes of the destinations location to filter, at least 1 but not greater than 15 must be supplied.

timeOffset (integer, between -120 and 120 exclusive): An offset in minutes against the current time to provide the station board for. Defaults to 0. Optional.

timeWindow (integer, between 0 and 120 exclusive): How far into the future in minutes, relative to timeOffset, to return services for. Defaults to 120. Optional.

Basic Form:
```
    http://localhost:3000/GetFastestDepartures/crs/crs,crs...
    
    Example:
    
    http://localhost:3000/GetFastestDepartures/EUS/MKC,MAN
```

Advanced Form:

```
    http://localhost:3000/GetFastestDepartures/crs/crs,crs,crs?timeOffset=XXX&timeWindow=XXX
    
    Example:
    
    http://localhost:3000/GetFastestDepartures/WAT/HOU,RMD,RDG&timeOffset=10&timeWindow=60
```

**Response**:

A DeparturesBoard JSON object

### GetFastestDeparturesWithDetails

**Description**:

Returns the public departure for the supplied CRS code within a defined time window to the locations specified in the filter with the earliest arrival time at the filtered location, including service details.

**Parameters**:

crs (string, 3 characters, alphabetic): The CRS code (see above) of the location for which the request is being made.

filterList (a list): A list of CRS codes of the destinations location to filter, at least 1 but not greater than 10 must be supplied.

timeOffset (integer, between -120 and 120 exclusive): An offset in minutes against the current time to provide the station board for. Defaults to 0. Optional.

timeWindow (integer, between 0 and 120 exclusive): How far into the future in minutes, relative to timeOffset, to return services for. Defaults to 120. Optional.

Basic Form:
```
    http://localhost:3000/GetFastestDeparturesWithDetails/crs/crs,crs...
    
    Example:
    
    http://localhost:3000/GetFastestDeparturesWithDetails/EUS/MKC,MAN
```

Advanced Form:

```
    http://localhost:3000/GetFastestDeparturesWithDetails/crs/crs,crs,crs?timeOffset=XXX&timeWindow=XXX
    
    Example:
    
    http://localhost:3000/GetFastestDeparturesWithDetails/WAT/HOU,RMD,RDG&timeOffset=10&timeWindow=60
```

**Response**:

A DeparturesBoardWithDetails JSON object

### GetServiceDetails

**Description**:

Returns service details for a specific service identified by a station board. These details are supplied relative to the station board from which the serviceID field value was generated. Service details are only available while the service appears on the station board from which it was obtained. This is normally for two minutes after it is expected to have departed, or after a terminal arrival. If a request is made for a service that is no longer available then a null value is returned.

**Parameters**:

serviceID (string): The LDBWS service ID of the service to request the details of. The service ID is obtained from a service listed in a StationBoard object returned from any other request. 

Basic Form:

```
    http://localhost:3000/GetServiceDetails/serviceID
    
    Example:
    
    http://localhost:3000/GetServiceDetails/nGDls329LKkejQ==
```

**Response**:

A ServiceDetails JSON object

## JSON Data Type Format

This section provides an idea as to how to interpret the JSON data received.

All members within the JSON object will be present for retrieval. Those without a value will simply be assigned to null.

If the status member of a JSON object is true, then it will continue to output the items below.

However, should it be false, then an error member is outputted instead. Go to Error section below for more details.

### StationBoard

status - Was the request successful? 

generatedAt - The time at which the station board was generated.

locationName - The name of the location that the station board is for.

crs - The CRS code of the location that the station board is for.

filterLocationName - If a filter was requested, the location name of the filter location.

filtercrs - If a filter was requested, the CRS code of the filter location.

filterType - If a filter was requested, the type of filter.

nrccMessages - An optional list of textual messages that should be displayed with the station board. The message may include embedded and xml encoded HTML-like hyperlinks and paragraphs. The messages are typically used to display important disruption information that applies to the location that the station board was for. Any embedded <p> tags are used to force a new-line in the output. Embedded <a> tags allow links to external web pages that may provide more information. Output channels that do not support HTML should strip out the <a> tags and just leave the enclosed text.

platformAvailable - An optional value that indicates if platform information is available. If this value is present with the value "true" then platform information will be returned in the service lists. If this value is not present, or has the value "false", then the platform "heading" should be suppressed in the user interface for this station board.

areServicesAvailable - An optional value that indicates if services are currently available for this station board. If this value is present with the value "false" then no services will be returned in the service lists. This value may be set, for example, if access to a station has been closed to the public at short notice, even though the scheduled services are still running. It would be usual in such cases for one of the nrccMessages to describe why the list of services has been suppressed.

trainServices - Each of these lists contains a ServiceItem object for each service of the relevant type that is to appear on the station board. Each or all of these lists may contain zero items, or may not be present at all.

busServices - Each of these lists contains a ServiceItem object for each service of the relevant type that is to appear on the station board. Each or all of these lists may contain zero items, or may not be present at all.

ferryServices - Each of these lists contains a ServiceItem object for each service of the relevant type that is to appear on the station board. Each or all of these lists may contain zero items, or may not be present at all. 

### StationBoardWithDetails

status - Was the request successful? 

generatedAt - The time at which the station board was generated.

locationName - The name of the location that the station board is for.

crs - The CRS code of the location that the station board is for.

filterLocationName - If a filter was requested, the location name of the filter location.

filtercrs -	If a filter was requested, the CRS code of the filter location.

filterType - If a filter was requested, the type of filter.

nrccMessages - An optional list of textual messages that should be displayed with the station board. The message may include embedded and xml encoded HTML-like hyperlinks and paragraphs. The messages are typically used to display important disruption information that applies to the location that the station board was for. Any embedded <p> tags are used to force a new-line in the output. Embedded <a> tags allow links to external web pages that may provide more information. Output channels that do not support HTML should strip out the <a> tags and just leave the enclosed text.

platformAvailable -	An optional value that indicates if platform information is available. If this value is present with the value "true" then platform information will be returned in the service lists. If this value is not present, or has the value "false", then the platform "heading" should be suppressed in the user interface for this station board.

areServicesAvailable -	An optional value that indicates if services are currently available for this station board. If this value is present with the value "false" then no services will be returned in the service lists. This value may be set, for example, if access to a station has been closed to the public at short notice, even though the scheduled services are still running. It would be usual in such cases for one of the nrccMessages to describe why the list of services has been suppressed.

trainServices - Each of these lists contains a ServiceItemWithCallingPoints object for each service of the relevant type that is to appear on the station board. Each or all of these lists may contain zero items, or may not be present at all.

busServices - Each of these lists contains a ServiceItemWithCallingPoints object for each service of the relevant type that is to appear on the station board. Each or all of these lists may contain zero items, or may not be present at all.

ferryServices - Each of these lists contains a ServiceItemWithCallingPoints object for each service of the relevant type that is to appear on the station board. Each or all of these lists may contain zero items, or may not be present at all. 

### DeparturesBoard

status - Was the request successful? 

generatedAt - The time at which the station board was generated.

locationName - The name of the location that the station board is for.

crs - The CRS code of the location that the station board is for.

filterLocationName - If a filter was requested, the location name of the filter location.

filtercrs - If a filter was requested, the CRS code of the filter location.

filterType - If a filter was requested, the type of filter.

nrccMessages - An optional list of textual messages that should be displayed with the station board. The message may include embedded and xml encoded HTML-like hyperlinks and paragraphs. The messages are typically used to display important disruption information that applies to the location that the station board was for. Any embedded <p> tags are used to force a new-line in the output. Embedded <a> tags allow links to external web pages that may provide more information. Output channels that do not support HTML should strip out the <a> tags and just leave the enclosed text.

platformAvailable - An optional value that indicates if platform information is available. If this value is present with the value "true" then platform information will be returned in the service lists. If this value is not present, or has the value "false", then the platform "heading" should be suppressed in the user interface for this station board.

areServicesAvailable - An optional value that indicates if services are currently available for this station board. If this value is present with the value "false" then no services will be returned in the service lists. This value may be set, for example, if access to a station has been closed to the public at short notice, even though the scheduled services are still running. It would be usual in such cases for one of the nrccMessages to describe why the list of services has been suppressed.

departures - The DepartureItem object for each service that is to appear on the station board. A DepartureItem will exist for each CRS code requested in the filter but if no information is available the ServiceItem part will be empty. 

### DeparturesBoardWithDetails

status - Was the request successful? 

generatedAt - The time at which the station board was generated.

locationName - The name of the location that the station board is for.

crs - The CRS code of the location that the station board is for.

filterLocationName - If a filter was requested, the location name of the filter location.

filtercrs - If a filter was requested, the CRS code of the filter location.

filterType - If a filter was requested, the type of filter.

nrccMessages - An list of textual messages that should be displayed with the station board. The message may include embedded and xml encoded HTML-like hyperlinks and paragraphs. The messages are typically used to display important disruption information that applies to the location that the station board was for. Any embedded <p> tags are used to force a new-line in the output. Embedded <a> tags allow links to external web pages that may provide more information. Output channels that do not support HTML should strip out the <a> tags and just leave the enclosed text.

platformAvailable - A value that indicates if platform information is available. If this value is present with the value "true" then platform information will be returned in the service lists. If this value is not present, or has the value "false", then the platform "heading" should be suppressed in the user interface for this station board.

areServicesAvailable - A value that indicates if services are currently available for this station board. If this value is present with the value "false" then no services will be returned in the service lists. This value may be set, for example, if access to a station has been closed to the public at short notice, even though the scheduled services are still running. It would be usual in such cases for one of the nrccMessages to describe why the list of services has been suppressed.

departures - The DepartureItemWithCallingPoints object for each service that is to appear on the station board. A DepartureItemWithCallingPoints will exist for each CRS code requested in the filter but if no information is available the ServiceItemWithCallingPoints part will be empty. 

### ServiceItem

rsid - The Retail Service ID of the service, if known.

origin - A list of ServiceLocation objects giving original origins of this service. Note that a service may have more than one original origin, if the service comprises of multiple trains that join at a previous location in the schedule. Original Origins will only be available for Arrival and Arrival & Departure station boards.

destination - A list of ServiceLocation objects giving original destinations of this service. Note that a service may have more than one original destination, if the service comprises of multiple trains that divide at a subsequent location in the schedule. Original Destinations will only be available for Departure and Arrival & Departure station boards.

currentOrigins - An optional list of ServiceLocation objects giving live/current origins of this service which is not starting at original cancelled origins. Note that a service may have more than one live origin. if the service comprises of multiple trains that join at a previous location in the schedule. Live Origins will only be available for Arrival and Arrival & Departure station boards.

currentDestinations - An optional list of ServiceLocation objects giving live/current destinations of this service which is not ending at original cancelled destinations. Note that a service may have more than one live destination, if the service comprises of multiple trains that divide at a subsequent location in the schedule. Live Destinations will only be available for Departure and Arrival & Departure station boards.

sta - An optional Scheduled Time of Arrival of the service at the station board location. Arrival times will only be available for Arrival and Arrival & Departure station boards but may also not be present at locations that are not scheduled to arrive at the location (e.g. the origin).

eta - An optional Estimated Time of Arrival of the service at the station board location. Arrival times will only be available for Arrival and Arrival & Departure station boards and only where an sta time is present.

std - An optional Scheduled Time of Departure of the service at the station board location. Departure times will only be available for Departure and Arrival & Departure station boards but may also not be present at locations that are not scheduled to depart at the location (e.g. the destination).

etd - An optional Estimated Time of Departure of the service at the station board location. Departure times will only be available for Departure and Arrival & Departure station boards and only where an std time is present.

platform - An optional platform number for the service at this location. This will only be present where available and where the station board platformAvailable value is "true".

operator - The name of the Train Operating Company that operates the service.

operatorCode - The code of the Train Operating Company that operates the service.

isCircularRoute - If this value is present and has the value "true" then the service is operating on a circular route through the network and will call again at this location later on its journey. The user interface should indicate this fact to the user, to help them choose the correct service from a set of similar alternatives.

isCancelled - A flag to indicate that this service is cancelled at this location.

filterLocationCancelled - A flag to indicate that this service is no longer stopping at the requested from/to filter location.

serviceType - The type of service (train, bus, ferry) that this item represents. Note that real-time information (e.g. eta, etd, ata, atd, etc.) is only available and present for train services.

length - The train length (number of units) at this location. If not supplied, or zero, the length is unknown.

detachFront - True if the service detaches units from the front at this location.

isReverseFormation - True if the service is operating in the reverse of its normal formation.

cancelReason - A cancellation reason for this service.

delayReason - A delay reason for this service.

serviceID - The unique service identifier of this service relative to the station board on which it is displayed. This value can be passed to GetServiceDetails to obtain the full details of the individual service.

adhocAlerts - A list of Adhoc Alerts (RAW) related to this location for this service. This list contains an object called AdhocAlertTextType which contains a string to show the Adhoc Alert Text for the location.

formation - FormationData (RAW) for this ServiceItem, if any.

### ServiceItemWithCallingPoints

origin - A list of ServiceLocation objects giving original origins of this service. Note that a service may have more than one original origin, if the service comprises of multiple trains that join at a previous location in the schedule. Original Origins will only be available for Arrival and Arrival & Departure station boards.

destination - A list of ServiceLocation objects giving original destinations of this service. Note that a service may have more than one original destination, if the service comprises of multiple trains that divide at a subsequent location in the schedule. Original Destinations will only be available for Departure and Arrival & Departure station boards.

currentOrigins - An optional list of ServiceLocation objects giving live/current origins of this service which is not starting at original cancelled origins. Note that a service may have more than one live origin. if the service comprises of multiple trains that join at a previous location in the schedule. Live Origins will only be available for Arrival and Arrival & Departure station boards.

currentDestinations - An optional list of ServiceLocation objects giving live/current destinations of this service which is not ending at original cancelled destinations. Note that a service may have more than one live destination, if the service comprises of multiple trains that divide at a subsequent location in the schedule. Live Destinations will only be available for Departure and Arrival & Departure station boards.

sta - An optional Scheduled Time of Arrival of the service at the station board location. Arrival times will only be available for Arrival and Arrival & Departure station boards but may also not be present at locations that are not scheduled to arrive at the location (e.g. the origin).

eta - An optional Estimated Time of Arrival of the service at the station board location. Arrival times will only be available for Arrival and Arrival & Departure station boards and only where an sta time is present.

std - An optional Scheduled Time of Departure of the service at the station board location. Departure times will only be available for Departure and Arrival & Departure station boards but may also not be present at locations that are not scheduled to depart at the location (e.g. the destination).

etd - An optional Estimated Time of Departure of the service at the station board location. Departure times will only be available for Departure and Arrival & Departure station boards and only where an std time is present.

platform - An optional platform number for the service at this location. This will only be present where available and where the station board platformAvailable value is "true".

operator - The name of the Train Operating Company that operates the service.

operatorCode - The code of the Train Operating Company that operates the service.

isCircularRoute - If this value is present and has the value "true" then the service is operating on a circular route through the network and will call again at this location later on its journey. The user interface should indicate this fact to the user, to help them choose the correct service from a set of similar alternatives.

isCancelled - A flag to indicate that this service is cancelled at this location.

filterLocationCancelled - A flag to indicate that this service is no longer stopping at the requested from/to filter location.

serviceType - The type of service (train, bus, ferry) that this item represents. Note that real-time information (e.g. eta, etd, ata, atd, etc.) is only available and present for train services.

length - The train length (number of units) at this location. If not supplied, or zero, the length is unknown.

detachFront - True if the service detaches units from the front at this location.

isReverseFormation - True if the service is operating in the reverse of its normal formation.

cancelReason - A cancellation reason for this service.

delayReason - A delay reason for this service.

serviceID - The unique service identifier of this service relative to the station board on which it is displayed. This value can be passed to GetServiceDetails to obtain the full details of the individual service.

adhocAlerts - A list of Adhoc Alerts related to this location for this service. This list contains an object called AdhocAlertTextType which contains a string to show the Adhoc Alert Text for the location.

previousCallingPoints - A list of CallingPoint objects relative to this location for this service.

subsequentCallingPoints - A list of CallingPoint objects relative to this location for this service.

formation - FormationData (RAW) for this ServiceItemWithCallingPoints, if any.

###DepartureItem

crs - The CRS code of the location that the Departure Item represents.  
                        
service - A list of ServiceItem objects for the CRS code.

###DepartureItemWithCallingPoints

crs - The CRS code of the location that the Departure Item represents. 
                         
service - A list of ServiceItemWithCallingPoints objects for the CRS code.

###ServiceLocation

locationName - The name of the location.

crs - The CRS code of this location. A CRS code of ??? indicates an error situation where no crs code is known for this location.

via - An optional via text that should be displayed after the location, to indicate further information about an ambiguous route. Note that vias are only present for ServiceLocation objects that appear in destination lists.

futureChangeTo - A text string containing service type (Bus/Ferry/Train) to which will be changed in the future.

assocIsCancelled - This origin or destination can no longer be reached because the association has been cancelled. 

###Service Details

generatedAt - The time at which the service details were generated.

rsid - The Retail Service ID of the service, if known.

serviceType - The type of service (train, bus, ferry) that these details represent. Note that real-time information (e.g. eta, etd, ata, atd, isCancelled, etc.) is only available and present for train services.

locationName - The display name of the departure board location that these service details were accessed from.

crs - The CRS code of the departure board location that these service details were accessed from.

operator - The display name of the Train Operating Company that operates this service.

operatorCode - The code of the Train Operating Company that operates this service.

isCancelled - Indicates that the service is cancelled at this location.

cancelReason - A cancellation reason for this service.

delayReason - A delay reason for this service.

overdueMessage - If an expected movement report has been missed, this will contain a message describing the missed movement.

length - The train length (number of units) at this location. If not supplied, or zero, the length is unknown.

detachFront - True if the service detaches units from the front at this location.

isReverseFormation - True if the service is operating in the reverse of its normal formation.

platform - The platform number that the service is expected to use at this location, if known and available.

sta - The scheduled time of arrival of this service at this location. If no sta is present then this is the origin of this service or it does not set down passengers at this location.

eta - The estimated time of arrival. Will only be present if sta is also present and ata is not present.

ata - The actual time of arrival. Will only be present if sta is also present and eta is not present.

std - The scheduled time of departure of this service at this location. If no std is present then this is the destination of this service or it does not pick up passengers at this location.

etd - The estimated time of departure. Will only be present if std is also present and atd is not present.

atd - The actual time of departure. Will only be present if std is also present and etd is not present.

adhocAlerts - A list of active Adhoc Alert texts for to this location. This list contains an object called AdhocAlertTextType which contains a string to show the Adhoc Alert Text for the location.

previousCallingPoints - A list of lists of CallingPoint objects representing the previous calling points in the journey. A separate calling point list will be present for each origin of the service, relative to the current location.

subsequentCallingPoints - A list of lists of CallingPoint objects representing the subsequent calling points in the journey. A separate calling point list will be present for each destination of the service, relative to the current location. 

###CallingPoint

locationName - The display name of this location.

crs - The CRS code of this location. A CRS code of ??? indicates an error situation where no crs code is known for this location.

st - The scheduled time of the service at this location. The time will be either an arrival or departure time, depending on whether it is in the subsequent or previous calling point list.

et - The estimated time of the service at this location. The time will be either an arrival or departure time, depending on whether it is in the subsequent or previous calling point list. Will only be present if an actual time (at) is not present.

at - The actual time of the service at this location. The time will be either an arrival or departure time, depending on whether it is in the subsequent or previous calling point list. Will only be present if an estimated time (et) is not present.

isCancelled - A flag to indicate that this service is cancelled at this location.

length - The train length (number of units) at this location. If not supplied, or zero, the length is unknown.

detachFront - True if the service detaches units from the front at this location.

adhocAlerts - A list of active Adhoc Alert texts for to this location. This list contains an object called AdhocAlertTextType which contains a string to show the Adhoc Alert Text for the locaiton. 

###Error

status - Should be false in this case

error - A list of strings containing the errors that is causing a request to fail. There are times when OpenDBWS throws an error, so the XML is coughed out.

## Contributing

This may be added at a later time

## Authors

* **Anthony Cheng** - *Initial work* - <https://github.com/anthonyhlcheng>

## License

This project is licensed under the MIT Licence - see the [LICENSE.md](LICENSE.md) file for details

However, your usage of OpenDBWS data is subject to NRE OGL Licences - see <http://www.nationalrail.co.uk/100296.aspx> for specific details.


