<?php
/**
 *
 */

class Lgm_Admin_Menu {

	public function __construct() {
		add_action('admin_menu', array($this, 'reuse_builder_register_menu'), 9);
	}

	public function reuse_builder_register_menu() {
		add_menu_page(
			$page_title 	= esc_html__( 'Google Map', 'load-google-map' ),
			$menu_title 	= esc_html__( 'Google Map', 'load-google-map' ),
			$capability 	= 'manage_options',
			$menu_slug 		= 'load_google_map',
			$function 		=  array( $this , 'lmg_menu_render'),
			$icon_url 		= 'dashicons-screenoptions'
		);
	}

	public function lmg_menu_render() {
		if ( !current_user_can( 'manage_options' ) )  {
      wp_die( __( 'You do not have sufficient permissions to access this page.', 'load-google-map' ) );
    }
		include_once( LGM_DIR. '/admin-templates/lgm-settings.php');
	}
}

new Lgm_Admin_Menu();
