const request = require('request')

const nominatimUrl = 'http://nominatim.openstreetmap.org/search?format=json&q='
const openStreetMapUrl = 'http://polygons.openstreetmap.fr/get_geojson.py?id='

export class GeoBox {
    /**
     * Fetches relation IDs of places to query OCM with.
     * @param {Array} array Locations in string format
     * @param {String} state U.S. state in string format (only supports locations within the same state for now)
     * @return {Promise} An array of promises containing relation IDs
     * 
    */

    static fetchIds(array, state) {
        const requestArray = array.map(item => nominatimUrl + item.toLowerCase() + '&state=' + state)
        console.log('requestArray', requestArray)
        return Promise.all(requestArray.forEach(req => request(req, (err, res, body) => {
            console.log('body', JSON.parse(body))
            return JSON.parse(body)
        })))
    }
}