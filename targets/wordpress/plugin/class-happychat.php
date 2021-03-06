<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Happychat {
	private static $_instance = null;
	const VERSION = '0.0.1-dev';

	/**
	* Create instance of class
	* @return Happychat_Client
	*/
	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}

	public function __construct() {
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
		add_shortcode( 'happychat', array( $this, 'shortcode_to_happychat_form' ) );
	}

	private function get_token() {
		$current_user = wp_get_current_user();
		return get_user_meta($current_user->ID, 'wp_woocommerce_wpcom_signin_access_token', true);
	}

	public function shortcode_to_happychat_form( $atts ) {
		$happychat_node_id = 'happychat-form';
		return '<span id="'.$happychat_node_id.'">
					<button class="wccom-component-button"
							onclick="Happychat.open( \''.$happychat_node_id.'\', [ \'woo\' ], '.self::get_token().' )"
					>
					Chat with us
					</button>
				</span>';
	}

	public function enqueue_scripts() {
		global $wp;

		error_log('register script');
		wp_register_script(
			'happychat-form-js',
			plugins_url( 'assets/happychat.js', __FILE__ ),
			array(),
			self::VERSION,
			true
		);

		error_log('register style');
		wp_register_style(
			'happychat-form-css',
			plugins_url( 'assets/happychat.css', __FILE__ ),
			array(),
			self::VERSION
		);

		error_log('enqueue script and style');
		error_log('token is '.self::get_token());
		wp_enqueue_style( 'happychat-form-css' );
		wp_enqueue_script( 'happychat-form-js' );
	}
}
