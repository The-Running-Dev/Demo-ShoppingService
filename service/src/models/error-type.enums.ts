export enum ErrorType {
    InvalidZipCode = 0,
    InvalidCoordinates = 1,
    InvalidLatitude = 2,
    InvalidLongitude = 3,
    CouldNotGetWeather = 4,
    Unknown = -1
}

export enum ErrorTypeMessage {
    InvalidZipCode = 'Invalid Zip Code',
    InvalidCoordinates = 'Invalid Coordinates',
    InvalidLatitude = 'Invalid Latitude ',
    InvalidLongitude = 'Invalid Longitude',
    CouldNotGetWeather = 'Could Not Get the Weather',
    Unknown = 'Unknown'
}