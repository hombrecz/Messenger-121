import React, {Component, PropTypes} from 'react';
import ThreadItem from './ThreadItem';
import ThreadPanel from './ThreadPanel';
import {Panel} from 'react-bootstrap';

export default class Threads extends Component {

    static propTypes = {
        activeThread: PropTypes.object.isRequired,
        threads: PropTypes.array.isRequired,
        changeThread: PropTypes.func.isRequired,
        addThread: PropTypes.func.isRequired
    };

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                <Panel
                    header="Threads"
                    collapsible
                    defaultExpanded
                >
                    {this.props.threads.map((thread, i) =>
                        <ThreadItem threadName={thread.name} changeThread={this.props.changeThread}
                                    activeThread={this.props.activeThread} key={i}/>
                    )}
                </Panel>
                <Panel
                    header="New Thread"
                    collapsible
                    defaultExpanded
                >
                    <ThreadPanel addThread={this.props.addThread}/>
                </Panel>
            </div>
        );
    }
}
