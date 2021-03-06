/** @format **/

/**
 * External dependencies
 */
import { get } from 'lodash';

/**
 * Internal dependencies
 */
import { HAPPYCHAT_CONNECTION_ERROR_PING_TIMEOUT } from 'src/state/constants';

/**
 * Returns true if Happychat server is reachable
 * @param {Object} state - global redux state
 * @return {Boolean} Whether Happychat server is reachable
 */
export default function( state ) {
	return get( state, 'connection.error' ) !== HAPPYCHAT_CONNECTION_ERROR_PING_TIMEOUT;
}
