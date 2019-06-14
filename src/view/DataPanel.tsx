import * as React from 'react';
import Brewery from '../logic/Brewery';
import Api from '../logic/Api';
require('./DataPanel.scss');
require('@fortawesome/fontawesome-free/css/all.css');

class State {
    loading: boolean
    breweries: Array<Brewery>
    constructor(loading: boolean = false, breweries: Array<Brewery> = []) {
        this.loading = loading;
        this.breweries = breweries;
    }
}

interface Props {}

export default class DataPanel extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = new State();
    }

    componentDidMount() {
        this.setState({loading: true});
        Api.listAll().then(breweries => this.setState({breweries: breweries})).finally(() => this.setState({loading: false}));
    }

    render() {
        let rows = this.state.breweries.map(brewery => 
            (
                <div className="col-xs-12 brewery-card" key={brewery.id}>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xs-12">
                                <h2><a href={brewery.website_url} target="_blank" rel="noopener noreferrer">{brewery.name}</a></h2>
                                <p>{brewery.brewery_type.charAt(0).toUpperCase() + brewery.brewery_type.substr(1)} Brewery</p>
                            </div>
                        </div>
                        <div className="row info-row">
                            <div className="col-xs-3">
                                <i className="fa fa-map-marker left-icon"></i>
                                {brewery.street}, {brewery.city}<br/>
                                {brewery.state}, {brewery.country} {brewery.postal_code}
                            </div>
                            <div className="col-xs-3">
                            {brewery.phone !== null && brewery.phone !== '' &&
                                <span>
                                    <i className="fa fa-phone left-icon"></i>
                                    {brewery.phone}
                                </span>
                            }
                            </div>
                            <div className="col-xs-6">
                                <div className="pull-right">
                                    <button type="button" className="btn btn-primary">
                                        <i className="fa fa-beer beer-info-icon"></i>
                                        More Info
                                    </button>
                                </div>
                                <span className="clearfix"></span>
                            </div>
                        </div>
                    </div>
                </div>
            )
        )
        return (
            <div className="panel panel-default vh100 scrollable">
                <div className="panel-heading"><h1>Check Out Some Brewskis</h1></div>
                <div className="panel-body">
                    <div className="container-fluid">
                        <div className="row">{ rows }</div>
                    </div>
                </div>
            </div>
        )
    }
}