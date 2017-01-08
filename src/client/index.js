import React from 'react';
import {render} from 'react-dom';
import ChatContainer from '../common/containers/ChatContainer';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducers from '../common/reducers/reducers'

const rootElement = document.getElementById('react');

const store = createStore(reducers);

render(
    <Provider store={store}>
        <ChatContainer/>
    </Provider>,
    rootElement
);
