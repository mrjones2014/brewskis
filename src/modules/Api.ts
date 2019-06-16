import Brewery from './Brewery';
import Filter from './Filter';
const axios = require('axios');
const url = function (endpoint: string): string {
    return `https://api.openbrewerydb.org/${endpoint}`;
};
const getMultiple = function(endpoint: string): Promise<Array<Brewery>> {
    return new Promise( (resolve: Function, reject: Function) => {
        let promise = axios.get(url(endpoint)).catch((e: Error) => console.error(e || `Uknown error getting ${url(endpoint)}`));
        promise.then(response => resolve(response.data)).catch(e => reject(e));
    })
};
const get = function(endpoint: string): Promise<Brewery> {
    return new Promise( (resolve: Function, reject: Function) => {
        let promise = axios.get(url(endpoint)).catch((e: Error) => console.error(e || `Uknown error getting ${url(endpoint)}`));
        promise.then(response => resolve(response.data)).catch(e => reject(e));
    })
};

export default {
    listAll(filter: Filter = null): Promise<Array<Brewery>> {
        let endpoint = 'breweries';
        if (filter) endpoint = `${endpoint}?${filter.toUrlParams()}`;
        return getMultiple(endpoint);
    },
    retrieve(id: string): Promise<Brewery> {
        return get(`breweries/${id}`)
    }
}