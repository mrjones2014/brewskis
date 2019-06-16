import * as React from 'react';
import Brewery from '../modules/Brewery';
import Api from '../modules/Api';
import BreweryCard from './BreweryCard';
import Filter from '../modules/Filter';
import Options from '../modules/Options';
import LoadingSpinner from './LoadingSpinner';
require('./DataPanel.scss');
require('@fortawesome/fontawesome-free/css/all.css');

class State {
    loading: boolean
    breweries: Array<Brewery>
    filter: Filter
    
    constructor(loading: boolean = true, breweries: Array<Brewery> = [], filter: Filter = new Filter()) {
        this.loading = loading;
        this.breweries = breweries;
        this.filter = filter
    }
}

interface Props {}

export default class DataPanel extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = new State();
        this.doSearch = this.doSearch.bind(this);
    }

    componentDidMount() {
        this.doSearch();
    }

    doSearch() {
        this.setState({loading: true});
        Api.listAll(this.state.filter).then(breweries => this.setState({breweries: breweries})).finally(() => this.setState({loading: false}));
    }

    render() {
        if (this.state.loading) return (<LoadingSpinner/>);
        let rows = this.state.breweries.map(brewery => (<BreweryCard brewery={brewery} key={brewery.id}/>))
        return (
            <div className="panel panel-default vh100">
                <div className="panel-heading">
                    <h1 className="pull-left">Brewskis!</h1>
                    <div className="pull-right">
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
                        </div>
                    </div>
                    <span className="clearfix"></span>
                </div>
                <div className="panel-body mh-vh-100 scrollable">
                    <div className="container-fluid">
                        <div className="row">{ rows }</div>
                    </div>
                </div>
            </div>
        )
    }
}