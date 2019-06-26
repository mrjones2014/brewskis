import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import Brewery from '../modules/Brewery';
import Api from '../modules/Api';
import LoadingSpinner from './LoadingSpinner';
import GoogleMapReact from 'google-map-react';
import { Link } from 'react-router-dom';
import './DetailView.scss';

const MapPin = ({lat, lng}) => (
    <div style={{
      color: 'red', 
      padding: '15px 10px',
      display: 'inline-flex',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '100%',
      transform: 'translate(-50%, -50%)',
      fontSize: '500%'
    }}>
      <i className="fa fa-map-pin"></i>
    </div>
)

interface UrlParams {
    id: string;
}

interface Props extends RouteComponentProps<UrlParams> {}

class State {
    brewery: Brewery
    loading: boolean
    mapCenter: object
    width: number
    constructor(brewery: Brewery = null, loading: boolean = true, width: number = window.innerWidth) {
        this.brewery = brewery
        this.loading = loading;
        if (brewery) this.mapCenter = {lat: Number(brewery.latitude), lng: Number(brewery.longitude)};
        else this.mapCenter = null;
        this.width = width;
    }
}

export default class DetailView extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = new State();
        this.handleWindowSizeChange = this.handleWindowSizeChange.bind(this);
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.setState({loading: true});
        Api.retrieve(id).then(brewery => this.setState({brewery: brewery, mapCenter: {lat: Number(brewery.latitude), lng: Number(brewery.longitude)}})).finally(() => this.setState({loading: false}));
    }

    componentWillMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);
    }

    componentWillUnmount() {
        window.addEventListener('resize', this.handleWindowSizeChange);
    }

    handleWindowSizeChange() {
        this.setState({width: window.innerWidth});
    }

    render () {
        if (this.state.loading) return (<LoadingSpinner/>);

        const brewery = this.state.brewery;
        const width = this.state.width;
        const isMobile = width <= 500;

        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <div className="pull-right">
                        <Link className="btn btn-primary" to="/">
                            <i className="fa fa-arrow-left"></i>
                            {isMobile || <span>&nbsp;&nbsp;Back to List</span>}
                        </Link>
                    </div>
                    <div className="pull-left">
                        <h1>{brewery.name}</h1>
                        <p>{brewery.brewery_type.charAt(0).toUpperCase() + brewery.brewery_type.substr(1)} Brewery</p>
                    </div>
                    <span className="clearfix"></span>
                </div>
                <div className="panel-body">
                    <div className="container-fluid">
                        <div className="row">
                            <div className={isMobile ? 'col-xs-12' : 'col-xs-3'}>
                                <i className="fa fa-map-marker left-icon"></i>
                                {brewery.street}, {brewery.city}<br/>
                                {brewery.state}, {brewery.country} {brewery.postal_code}
                            </div>
                            <div className={isMobile ? 'col-xs-12' : 'col-xs-3'}>
                            {brewery.phone !== null && brewery.phone !== '' &&
                                <span>
                                    <i className="fa fa-phone left-icon"></i>
                                    {brewery.phone}
                                </span>
                            }
                            </div>
                        </div>
                        <div className="row">
                            <div className={isMobile ? 'col-xs-12' : 'col-xs-3'}>
                                <i className="fa fa-map-pin left-icon"></i>
                                Long: {brewery.longitude}<br/>
                                Lat:&nbsp;&nbsp;&nbsp; {brewery.latitude}
                            </div>
                            {brewery.website_url &&
                                <div className={isMobile ? 'col-xs-12' : 'col-xs-3'}>
                                    <i className="fa fa-globe left-icon"></i>
                                    <a href={brewery.website_url} target="_blank" rel="noopener noreferrer">{brewery.website_url.replace('http://', '').replace('https://', '')}</a>
                                </div>
                            }
                        </div>
                        <div className="row">
                            <div className="col-xs-12">
                                <div className={isMobile ? 'map-container map-mobile' : 'map-container'}>
                                    <GoogleMapReact
                                        bootstrapURLKeys={{key: process.env.REACT_APP_MAPS_API_KEY}}
                                        defaultCenter={this.state.mapCenter}
                                        defaultZoom={11}
                                    >
                                        <MapPin lat={brewery.latitude} lng={brewery.longitude}/>
                                    </GoogleMapReact>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}