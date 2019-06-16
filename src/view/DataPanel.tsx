import * as React from 'react';
import Brewery from '../modules/Brewery';
import Api from '../modules/Api';
import BreweryCard from './BreweryCard';
require('./DataPanel.scss');
require('@fortawesome/fontawesome-free/css/all.css');

class State {
    loading: boolean
    breweries: Array<Brewery>
    sortField: string
    sortOrder: string
    constructor(loading: boolean = false, breweries: Array<Brewery> = [], sortField: string = 'name', sortOrder: string = '+') {
        this.loading = loading;
        this.breweries = breweries;
        this.sortField = sortField;
        this.sortOrder = sortOrder;
    }
}

interface Props {}

export default class DataPanel extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = new State();
    }

    sortParam() {
        return `${this.state.sortOrder}${this.state.sortField}`;
    }

    componentDidMount() {
        this.setState({loading: true});
        Api.listAll().then(breweries => this.setState({breweries: breweries})).finally(() => this.setState({loading: false}));
    }

    render() {
        let rows = this.state.breweries.map(brewery => (<BreweryCard brewery={brewery} key={brewery.id}/>))
        return (
            <div className="panel panel-default vh100">
                <div className="panel-heading"><h1>Check Out Some Brewskis</h1></div>
                <div className="panel-body mh-vh-100 scrollable">
                    <div className="container-fluid">
                        <div className="row">{ rows }</div>
                    </div>
                </div>
            </div>
        )
    }
}