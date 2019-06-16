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

const Type = [
    new OptionModel('Micro', 'micro'),
    new OptionModel('Macro', 'macro')
]

const States = [
    new OptionModel('Alabama', 'Alabama'),
    new OptionModel('Alaska', 'Alaska'),
    new OptionModel('Arizona', 'Arizona'),
    new OptionModel('Arkansas', 'Arkansas'),
    new OptionModel('California', 'California'),
    new OptionModel('Colorado', 'Colorado'),
    new OptionModel('Connecticut', 'Connecticut'),
    new OptionModel('Delaware', 'Delaware'),
    new OptionModel('Florida', 'Florida'),
    new OptionModel('Georgia', 'Georgia'),
    new OptionModel('Hawaii', 'Hawaii'),
    new OptionModel('Idaho', 'Idaho'),
    new OptionModel('Illinois', 'Illinois'),
    new OptionModel('Indiana', 'Indiana'),
    new OptionModel('Iowa', 'Iowa'),
    new OptionModel('Kansas', 'Kansas'),
    new OptionModel('Kentucky', 'Kentucky'),
    new OptionModel('Louisiana', 'Louisiana'),
    new OptionModel('Maine', 'Maine'),
    new OptionModel('Maryland', 'Maryland'),
    new OptionModel('Massachusetts', 'Massachusetts'),
    new OptionModel('Michigan', 'Michigan'),
    new OptionModel('Minnesota', 'Minnesota'),
    new OptionModel('Mississippi', 'Mississippi'),
    new OptionModel('Missouri', 'Missouri'),
    new OptionModel('Montana', 'Montana'),
    new OptionModel('Nebraska', 'Nebraska'),
    new OptionModel('Nevada', 'Nevada'),
    new OptionModel('New Hampshire', 'New Hampshire'),
    new OptionModel('New Jersey', 'New Jersey'),
    new OptionModel('New Mexico', 'New Mexico'),
    new OptionModel('New York', 'New York'),
    new OptionModel('North Carolina', 'North Carolina'),
    new OptionModel('North Dakota', 'North Dakota'),
    new OptionModel('Ohio', 'Ohio'),
    new OptionModel('Oklahoma', 'Oklahoma'),
    new OptionModel('Oregon', 'Oregon'),
    new OptionModel('Pennsylvania', 'Pennsylvania'),
    new OptionModel('Rhode Island', 'Rhode Island'),
    new OptionModel('South Carolina', 'South Carolina'),
    new OptionModel('South Dakota', 'South Dakota'),
    new OptionModel('Tennessee', 'Tennessee'),
    new OptionModel('Texas', 'Texas'),
    new OptionModel('Utah', 'Utah'),
    new OptionModel('Vermont', 'Vermont'),
    new OptionModel('Virginia', 'Virginia'),
    new OptionModel('Washington', 'Washington'),
    new OptionModel('West Virginia', 'West Virginia'),
    new OptionModel('Wisconsin', 'Wisconsin'),
    new OptionModel('Wyoming', 'Wyoming'),
    new OptionModel('District of Colombia', 'District of Colombia')
]

export default class Options {
    static get SortField() { return SortFieldOptions; }
    static get SortOrder() { return SortOrderOptions; }
    static get Type() { return Type; }
    static get States() { return States; }
}