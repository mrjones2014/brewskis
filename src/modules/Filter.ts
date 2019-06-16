export default class Filter {
    breweryName: string 
    type: string
    state: string
    country: string
    sortField: string
    sortOrder: string
    constructor(adapter = {
        breweryName: '',
        type: '', 
        state: '', 
        country: 'United States', 
        sortField: 'name', 
        sortOrder: '+'
    }) {
        this.breweryName = adapter.breweryName;
        this.type = adapter.type;
        this.state = adapter.state;
        this.country = adapter.country;
        this.sortField = adapter.sortField;
        this.sortOrder = adapter.sortOrder;
    }

    toUrlParams(): string {
        let params = '';
        if (this.breweryName) params = `by_name=${this.breweryName}`;
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