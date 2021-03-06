/** @format */

/**
 * Internal dependencies
 */
import getChatTimeline from '../get-chat-timeline';

describe( '#getChatTimeline', () => {
	// Simulate the time Feb 27, 2017 05:25 UTC
	const NOW = 1488173100125;
	const ONE_MINUTE = 1000 * 60;
	const FIVE_MINUTES = ONE_MINUTE * 5;
	const timelineAtTime1 = [
		{ timestamp: ( NOW - FIVE_MINUTES ) / 1000, id: '1-1' },
		{ timestamp: ( NOW - ONE_MINUTE ) / 1000, id: '1-2' },
		{ timestamp: NOW / 1000, id: '1-3' },
	];
	const timelineAtTime2 = [
		{ timestamp: ( NOW - FIVE_MINUTES ) / 1000, id: '2-1' },
		{ timestamp: ( NOW - ONE_MINUTE ) / 1000, id: '2-2' },
		{ timestamp: NOW / 1000, id: '2-3' },
	];
	const timelineWithoutIds1 = [
		{ timestamp: ( NOW - FIVE_MINUTES ) / 1000 },
		{ timestamp: NOW / 1000 },
	];
	const timelineWithoutIds2 = [
		{ timestamp: ( NOW - ONE_MINUTE ) / 1000 },
		{ timestamp: NOW / 1000 },
	];

	test( 'returns the cached timeline if message do not have ids', () => {
		const state = {
			chat: {
				timeline: timelineWithoutIds1,
			},
		};
		const timelineCached = getChatTimeline( state );
		// force a new reference, but with the same data
		state.chat.timeline = [ ...timelineWithoutIds2 ];
		expect( getChatTimeline( state ) ).toBe( timelineCached );
	} );

	test( 'returns the cached timeline if messages ids are the same', () => {
		const state = {
			chat: {
				timeline: timelineAtTime1,
			},
		};
		const timelineCached = getChatTimeline( state );
		// force a new reference, but with the same data
		state.chat.timeline = [ ...timelineAtTime1 ];
		expect( getChatTimeline( state ) ).toBe( timelineCached );
	} );

	test( 'returns the new timeline if some message id is different', () => {
		const state = {
			chat: {
				timeline: timelineAtTime1,
			},
		};
		const timelineCached = getChatTimeline( state );
		// force a new reference, but with the same data
		state.chat.timeline = [ ...timelineAtTime2 ];
		expect( getChatTimeline( state ) ).not.toBe( timelineCached );
	} );
} );
