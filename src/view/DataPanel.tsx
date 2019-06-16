import * as React from 'react';
import Brewery from '../modules/Brewery';
import Api from '../modules/Api';
import BreweryCard from './BreweryCard';
import Filter from '../modules/Filter';
import Options from '../modules/Options';
import LoadingSpinner from './LoadingSpinner';
import { Collapse } from 'react-bootstrap';
require('./DataPanel.scss');
require('@fortawesome/fontawesome-free/css/all.css');

class State {
    loading: boolean
    breweries: Array<Brewery>
    filter: Filter
    showFilters: boolean
    
    constructor(loading: boolean = true, breweries: Array<Brewery> = [], filter: Filter = new Filter(), showFilters: boolean = window.innerWidth > 500) {
        this.loading = loading;
        this.breweries = breweries;
        this.filter = filter;
        this.showFilters = showFilters;
    }
}

interface Props {}

export default class DataPanel extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = new State();
        this.doSearch = this.doSearch.bind(this);
        this.resetSearch = this.resetSearch.bind(this);
    }

    componentDidMount() {
        this.doSearch();
    }

    doSearch() {
        this.setState({loading: true});
        Api.listAll(this.state.filter).then(breweries => this.setState({breweries: breweries})).finally(() => this.setState({loading: false}));
    }

    resetSearch() {
        this.setState({filter: new Filter()}, () => this.doSearch());
    }

    render() {
        if (this.state.loading) return (<LoadingSpinner/>);
        let rows = this.state.breweries.map(brewery => (<BreweryCard brewery={brewery} key={brewery.id}/>));
        if (rows.length === 0) rows = [(
            <div className="no-results-row bg-info text-info" key="no-results-found">
                <i className="fa fa-beer"></i>&nbsp;&nbsp;
                No Brewskis Found!
                &nbsp;&nbsp;<i className="fa fa-beer"></i>
            </div>
        )]

        return (
            <div className="panel panel-default vh100 main-panel">
                <div className="panel-heading">
                    <h1 className="pull-left">Brewskis!</h1>
                    <button className="pull-right btn btn-primary" type="button" aria-controls="filters-row" aria-expanded={this.state.showFilters} onClick={() => this.setState({showFilters: !this.state.showFilters})}>{this.state.showFilters ? 'Hide' : 'Show'} Filters</button>
                    <span className="clearfix"></span>
                </div>
                <div className="panel-body mh-vh-100 scrollable">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xs-12">
                                <Collapse in={this.state.showFilters}>
                                    <div id="filters-row">
                                        <div className="form form-inline">
                                            <div className="form-group">
                                                <label className="input-label">Type</label>
                                                <select className="form-control" value={this.state.filter.type} onChange={e => this.setState({filter: Object.assign({}, this.state.filter, {type: e.currentTarget.value})})}>
                                                    <option value=""></option>
                                                    {Options.Type.map(option => (
                                                        <option value={option.value} key={option.value}>{option.label}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label className="input-label">State</label>
                                                <select className="form-control" value={this.state.filter.state} onChange={e => this.setState({filter: Object.assign({}, this.state.filter, {state: e.currentTarget.value})})}>
                                                    <option value=""></option>
                                                    {Options.States.map(option => (
                                                        <option value={option.value} key={option.value}>{option.label}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label className="input-label">Sort Field</label>
                                                <select className="form-control" value={this.state.filter.sortField} onChange={e => this.setState({filter: Object.assign({}, this.state.filter, {sortField: e.currentTarget.value})})}>
                                                    <option value=""></option>
                                                    {Options.SortField.map(option => (
                                                        <option value={option.value} key={option.value}>{option.label}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label className="input-label">Sort Order</label>
                                                <select className="form-control" value={this.state.filter.sortOrder} onChange={e => this.setState({filter: Object.assign({}, this.state.filter, {sortOrder: e.currentTarget.value})})}>
                                                    <option value=""></option>
                                                    {Options.SortOrder.map(option => (
                                                        <option value={option.value} key={option.value}>{option.label}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label className="input-label">&nbsp;</label>
                                                <button type="button" className="btn btn-primary" onClick={this.doSearch}>
                                                        <i className="fa fa-beer"></i>&nbsp;&nbsp;
                                                        Search for Beer!
                                                </button>
                                            </div>
                                            <div className="form-group">
                                                <label className="input-label">&nbsp;</label>
                                                <button type="button" className="btn btn-default" onClick={this.resetSearch}>
                                                    <i className="fa fa-times"></i>&nbsp;&nbsp;
                                                    Reset
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Collapse>
                            </div>
                        </div>
                        <div className="row">{ rows }</div>
                    </div>
                </div>
            </div>
        )
    }
}