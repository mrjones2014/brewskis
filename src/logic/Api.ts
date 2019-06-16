import Brewery from './Brewery';
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
    listAll(): Promise<Array<Brewery>> {
        return getMultiple('breweries');
    },
    retrieve(id: string): Promise<Brewery> {
        return get(`breweries/${id}`)
    }
}