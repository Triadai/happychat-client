/** @format */

/**
 * External dependencies
 */
import { expect } from 'chai';
import deepFreeze from 'deep-freeze';

/**
 * Internal dependencies
 */
import {
	HAPPYCHAT_CONNECTION_STATUS_UNINITIALIZED,
	HAPPYCHAT_CONNECTION_STATUS_CONNECTED,
	HAPPYCHAT_CONNECTION_STATUS_DISCONNECTED,
	HAPPYCHAT_CONNECTION_STATUS_CONNECTING,
	HAPPYCHAT_CONNECTION_STATUS_RECONNECTING,
} from 'state/happychat/constants';
import getConnectionStatus from '../get-connection-status';

describe( '#getConnectionStatus', () => {
	describe( 'should return proper connection status for', () => {
		it( 'UNINITIALIZED', () => {
			const stateUninitialized = deepFreeze( {
				connection: {
					status: HAPPYCHAT_CONNECTION_STATUS_UNINITIALIZED,
				},
			} );
			expect( getConnectionStatus( stateUninitialized ) ).to.equal(
				HAPPYCHAT_CONNECTION_STATUS_UNINITIALIZED
			);
		} );

		it( 'CONNECTED', () => {
			const stateConnected = deepFreeze( {
				connection: {
					status: HAPPYCHAT_CONNECTION_STATUS_CONNECTED,
				},
			} );
			expect( getConnectionStatus( stateConnected ) ).to.be.equals(
				HAPPYCHAT_CONNECTION_STATUS_CONNECTED
			);
		} );

		it( 'DISCONNECTED', () => {
			const stateDisconnected = deepFreeze( {
				connection: {
					status: HAPPYCHAT_CONNECTION_STATUS_DISCONNECTED,
				},
			} );
			expect( getConnectionStatus( stateDisconnected ) ).to.be.equals(
				HAPPYCHAT_CONNECTION_STATUS_DISCONNECTED
			);
		} );

		it( 'CONNECTING', () => {
			const stateConnecting = deepFreeze( {
				connection: {
					status: HAPPYCHAT_CONNECTION_STATUS_CONNECTING,
				},
			} );
			expect( getConnectionStatus( stateConnecting ) ).to.be.equals(
				HAPPYCHAT_CONNECTION_STATUS_CONNECTING
			);
		} );

		it( 'RECONNECTING', () => {
			const stateReconnecting = deepFreeze( {
				connection: {
					status: HAPPYCHAT_CONNECTION_STATUS_RECONNECTING,
				},
			} );
			expect( getConnectionStatus( stateReconnecting ) ).to.be.equals(
				HAPPYCHAT_CONNECTION_STATUS_RECONNECTING
			);
		} );
	} );
} );
