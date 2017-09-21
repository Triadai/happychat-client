/**
 * External dependencies
 */
import request from 'wpcom-xhr-request';

/**
 * Internal dependencies
 */
import config from 'src/config';

const wpcomOAuth = require( 'wpcom-oauth-cors' )( config( 'oauth_client_id' ) );
const debug = require( 'debug' )( 'happychat-embedded:wpcom' );

export const getUser = () =>
	new Promise( ( resolve, reject ) => {
		const token = wpcomOAuth.token();
		if ( ! token ) {
			return reject( 'There is no token' );
		}

		debug( 'Fire request getUser' );
		request(
			{
				method: 'GET',
				apiNamespace: 'rest/v1',
				path: '/me',
				authToken: token.access_token
			},
			( error, body, headers ) => {
				if ( error ) {
					debug( 'Request failed: ', error );
					return reject( error );
				}

				debug( 'Response: ', body, ' headers ', headers );
				return resolve( body );
			}
		);
	} );

export const startSession = () =>
	new Promise( ( resolve, reject ) => {
		const token = wpcomOAuth.token();
		if ( ! token ) {
			return reject( 'There is no token' );
		}

		debug( 'Fire request startSession' );
		request(
			{
				method: 'POST',
				apiNamespace: 'rest/v1',
				path: '/happychat/session',
				authToken: token.access_token
			},
			( error, body, headers ) => {
				if ( error ) {
					debug( 'Request failed: ', error );
					return reject( error );
				}

				debug( 'Response: ', body, ' headers ', headers );
				return resolve( body );
			}
		);
	} );

export const sign = payload =>
	new Promise( ( resolve, reject ) => {
		const token = wpcomOAuth.token();
		if ( ! token ) {
			return reject( 'There is no token' );
		}

		debug( 'Fire request sign' );
		request(
			{
				method: 'POST',
				apiNamespace: 'rest/v1',
				path: '/jwt/sign',
				authToken: token.access_token,
				body: { payload: JSON.stringify( payload ) }
			},
			( error, body, headers ) => {
				if ( error ) {
					debug( 'Request failed: ', error );
					return reject( error );
				}

				debug( 'Response: ', body, ' headers ', headers );
				return resolve( body );
			}
		);
	} );