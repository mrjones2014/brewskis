class OptionModel {
    label: string
    value: string 
    constructor(label: string, value: string) {
        this.label = label;
        this.value = value;
    }
}

const SortFieldOptions = [
    new OptionModel('Name', 'name'),
    new OptionModel('Brewery Type', 'brewery_type'),
    new OptionModel('State', 'state')
]

const SortOrderOptions = [
    new OptionModel('Asc', '+'),
    new OptionModel('Desc', '-')
]

export default class Options {
    static get SortField() { return SortFieldOptions; }
    static get SortOrder() { return SortOrderOptions; }
}