import * as React from 'react';
import Brewery from '../modules/Brewery';
import { Link } from 'react-router-dom';
require('./DataPanel.scss');
require('@fortawesome/fontawesome-free/css/all.css');

class State {
    width: number
    constructor(width: number = window.innerWidth) {
        this.width = width;
    }
}
interface Props {
    brewery: Brewery
}

export default class BreweryCard extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = new State();
        this.handleWindowSizeChange = this.handleWindowSizeChange.bind(this);
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

    render() {
        const brewery = this.props.brewery;
        const width = this.state.width;
        const isMobile = width <= 500;
        return (
            <div className="col-xs-12 brewery-card" key={brewery.id}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xs-12">
                            <h2><Link to={`/${brewery.id}`}>{brewery.name}</Link></h2>
                            <p>{brewery.brewery_type.charAt(0).toUpperCase() + brewery.brewery_type.substr(1)} Brewery</p>
                        </div>
                    </div>
                    <div className="row info-row">
                        <div className={isMobile ? 'col-xs-12' : 'col-xs-3'}>
                            <i className="fa fa-map-marker left-icon"></i>
                            {brewery.street}, {brewery.city}<br/>
                            {brewery.state}, {brewery.country} {brewery.postal_code}
                        </div>
                        <div className={isMobile ? 'col-xs-12' : 'col-xs-3'}>
                        {brewery.phone !== null && brewery.phone !== '' &&
                            <div>
                                <i className="fa fa-phone left-icon"></i>
                                {brewery.phone}
                            </div>
                        }
                        {brewery.website_url &&
                            <div>
                                <i className="fa fa-globe left-icon"></i>
                                <a href={brewery.website_url} target="_blank" rel="noopener noreferrer">{brewery.website_url.replace('http://', '').replace('https://', '')}</a>
                            </div>
                        }
                        </div>
                        <div className={isMobile ? 'col-xs-12' : 'col-xs-6'}>
                            <div className={isMobile ? 'pt-15' : 'pull-right'}>
                                <Link className="btn btn-primary" to={`/${brewery.id}`}>
                                    <i className="fa fa-beer beer-info-icon"></i>
                                    More Info
                                </Link>
                            </div>
                            <span className="clearfix"></span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}