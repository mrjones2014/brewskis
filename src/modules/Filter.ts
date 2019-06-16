export default class Filter {
    name: string 
    type: string
    state: string
    country: string
    sortField: string
    sortOrder: string
    constructor(name: string = null, type: string = null, state: string = null, country: string = 'United States', sortField: string = 'name', sortOrder: string = '+') {
        this.name = name;
        this.type = type;
        this.state = state;
        this.country = country;
        this.sortField = sortField;
        this.sortOrder = sortOrder;
    }

    toUrlParams(): string {
        let params = '';
        if (this,name) params = `by_name=${this.name}`;
        if (this.type) params = `${params}&by_type=${this.type}`;
        if (this.state) params = `${params}&by_state=${this.state}`;
        if (this.country) params = `${params}&by_country=${this.country}`;
        if (this.sortField) {
            params = `${params}&sort=`
            if (this.sortOrder) params = `${params}${this.sortOrder}`;
            params = `${params}${this.sortField}`;
        }
        if (params.startsWith('&')) params = params.substr(1);
        return params;
    }
}