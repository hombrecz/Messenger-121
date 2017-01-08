import React, {Component, PropTypes} from 'react';
import Threads from './threads/Threads';
import UserPanel from './user/UserPanel';
import Messages from './messages/Messages';
import {Jumbotron, Grid, Row, Col, PageHeader} from 'react-bootstrap';

export default class Chat extends Component {

    static propTypes = {
        threads: PropTypes.array.isRequired,
        activeThread: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
        user: PropTypes.string.isRequired
    };

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {threads, activeThread, actions, user} = this.props;
        return (
            <div>
                <PageHeader>
                    Messenger 121
                </PageHeader>
                <Jumbotron>
                    <Grid>
                        <Row className="show-grid">
                            <Col xs={4} md={2}>
                                <UserPanel user={user} actions={actions.logUser}/>
                            </Col>
                            <Col xs={12} md={6}>
                                <Messages activeThread={activeThread} user={user} actions={actions.sendMessage}/>
                            </Col>
                            <Col xs={4} md={2}>
                                <Threads activeThread={activeThread} threads={threads}
                                         changeThread={actions.changeThread}
                                         addThread={actions.addThread}/>
                            </Col>
                        </Row>
                    </Grid>
                </Jumbotron>
            </div>
        );
    }
}