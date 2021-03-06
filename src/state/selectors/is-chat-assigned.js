/** @format */

/**
 * External dependencies
 */
import { get } from 'lodash';

/**
 * Internal dependencies
 */
import { HAPPYCHAT_CHAT_STATUS_ASSIGNED } from 'src/state/constants';

export default state => get( state, 'chat.status' ) === HAPPYCHAT_CHAT_STATUS_ASSIGNED;
