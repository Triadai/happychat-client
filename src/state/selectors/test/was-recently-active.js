/** @format */

/**
 * Internal dependencies
 */
import wasRecentlyActive from '../was-recently-active';

const TIME_SECOND = 1000;
const TIME_MINUTE = TIME_SECOND * 60;
const TIME_HOUR = TIME_MINUTE * 60;

// Simulate the time Feb 27, 2017 05:25 UTC
const NOW = 1488173100125;

describe( '#wasRecentlyActive()', () => {
	Date.now = jest.fn();
	Date.now.mockReturnValue( NOW );

	test( 'should return false if no activity', () => {
		const result = wasRecentlyActive( {
			chat: { lastActivityTimestamp: null },
		} );

		expect( result ).toBeFalsy();
	} );

	test( 'should return false if last activity was 3 hours ago', () => {
		const result = wasRecentlyActive( {
			chat: { lastActivityTimestamp: NOW - TIME_HOUR * 3 },
		} );

		expect( result ).toBeFalsy();
	} );

	test( 'should return true if last activity was 5 minutes ago', () => {
		const result = wasRecentlyActive( {
			chat: { lastActivityTimestamp: NOW - TIME_MINUTE * 5 },
		} );

		expect( result ).toBeTruthy();
	} );
} );
