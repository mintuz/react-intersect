let mockEvents = {};

jest.mock('@mintuz/horizon', () => {
    return jest.fn().mockImplementation((config) => {
        mockEvents.onEntry = config.onEntry;
        mockEvents.onExit = config.onExit;
    });
});

import React from 'react';
import ReactIntersect from './';
import { mount } from 'enzyme';
import Horizon from '@mintuz/horizon';

describe('ReactIntersect', () => {
    beforeEach(() => {
        mockEvents = {};
    });

    test('onEntry callback is triggered when element in view', () => {
        const renderProp = () => {
            return <div />;
        };

        const onEntry = jest.fn();

        mount(<ReactIntersect onEntry={onEntry} render={renderProp} />);

        mockEvents.onEntry();

        expect(onEntry.mock.calls.length).toEqual(1);
        expect(onExit.mock.calls.length).toEqual(0);
    });

    test('onExit callback is triggered when element is out of view', () => {
        const renderProp = () => {
            return <div />;
        };

        const onExit = jest.fn();

        mount(<ReactIntersect onExit={onExit} render={renderProp} />);

        mockEvents.onExit();

        expect(onExit.mock.calls.length).toEqual(1);
        expect(onEntry.mock.calls.length).toEqual(0);
    });

    test('inView passed as true to renderProp when element in view', () => {
        const renderProp = jest.fn().mockImplementation(() => {
            return <div />;
        });

        mount(<ReactIntersect render={renderProp} />);

        mockEvents.onEntry();

        expect(renderProp.mock.calls[0][0]).toEqual(true);
    });

    test('inView passed as false to renderProp when element is not in view', () => {
        const renderProp = jest.fn().mockImplementation(() => {
            return <div />;
        });

        mount(<ReactIntersect render={renderProp} />);

        mockEvents.onExit();

        expect(renderProp.mock.calls[0][0]).toEqual(false);
    });

    test('triggeredOnce passed to horizon when defined', () => {
        const renderProp = () => {
            return <div />;
        };

        mount(<ReactIntersect triggerOnce={true} render={renderProp} />);

        expect(Horizon.mock.calls[0][0].triggerOnce).toEqual(true);
    });

    test('intersectionObserver config passed to horizon when defined', () => {
        const fakeConfig = {
            root: '.container'
        };

        const renderProp = () => {
            return <div />;
        };

        mount(
            <ReactIntersect
                intersectionObserverConfig={fakeConfig}
                render={renderProp}
            />
        );

        expect(Horizon.mock.calls[0][0].intersectionObserverConfig).toEqual(
            fakeConfig
        );
    });
});
