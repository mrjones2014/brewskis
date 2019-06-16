import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import Brewery from '../logic/Brewery';
import Api from '../logic/Api';
import LoadingSpinner from './LoadingSpinner';
import GoogleMapReact from 'google-map-react';
require('./DetailView.scss');

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
    constructor(brewery: Brewery = null, loading: boolean = true) {
        this.brewery = brewery
        this.loading = loading;
        if (brewery) this.mapCenter = {lat: Number(brewery.latitude), lng: Number(brewery.longitude)};
        else this.mapCenter = null;
    }
}

export default class DetailView extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = new State();
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.setState({loading: true});
        Api.retrieve(id).then(brewery => this.setState({brewery: brewery, mapCenter: {lat: Number(brewery.latitude), lng: Number(brewery.longitude)}})).finally(() => this.setState({loading: false}));
    }

    render () {
        const brewery = this.state.brewery;
        if (this.state.loading) return (<LoadingSpinner/>);
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h1><a href={brewery.website_url} target="_blank" rel="noopener noreferrer">{brewery.name}</a></h1>
                    <p>{brewery.brewery_type.charAt(0).toUpperCase() + brewery.brewery_type.substr(1)} Brewery</p>
                </div>
                <div className="panel-body">
                    <div className="container-fluid">
                        <div className="row">
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
                        </div>
                        <div className="row">
                            <div className="col-xs-12">
                                <i className="fa fa-map-pin left-icon"></i>
                                Long: {brewery.longitude}<br/>
                                Lat:&nbsp;&nbsp;&nbsp; {brewery.latitude}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="map-container">
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