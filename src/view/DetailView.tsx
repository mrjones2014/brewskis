import * as React from 'react';
import Brewery from '../logic/Brewery';
const Modal = require('react-bootstrap/Modal');

interface Props {
    brewery: Brewery
    showModal: boolean
}

class State {
}

export default class DetailView extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = new State();
        this.onClose = this.onClose.bind(this);
    }

    onClose() {
        this.setState({show: false});
    }

    render () {
        const brewery = this.props.brewery;
        return (
            <Modal show={this.props.showModal} onHide={this.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <a href={brewery.website_url}>{brewery.name}</a>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body></Modal.Body>
            </Modal>
        )
    }
}