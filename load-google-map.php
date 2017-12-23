<?php
/*
 * Plugin Name: Load Google Map
 * Plugin URI: https://github.com/RedQ/googlemap
 * Description: A Simple plugin for loading google map scripts
 * Version: 1.0.0
 * Author: redqteam
 * Author URI: http://redq.io
 * Requires at least: 4.7
 * Tested up to: 4.7
 *
 * Text Domain: load-google-map
 * Domain Path: /languages/
 *
 * Copyright: © 2017 redqteam.
 * License: GNU General Public License v3.0
 * License URI: http://www.gnu.org/licenses/gpl-3.0.html
 *
 */

class Load_Google_Map {
	/**
	 * @var null
	 */
	protected static $_instance = null;
	/**
	 * @create instance on self
	 */
	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}

	public function __construct(){
		$this->load_google_map_bootstrap();
		$this->load_google_map_autoload();
    add_action('admin_enqueue_scripts', array( $this , 'load_google_map_enqueue_admin_script' ));
    add_action('wp_enqueue_scripts', array( $this , 'load_google_map_enqueue_script' ));
		// add_filter('script_loader_tag', array($this, 'load_google_map_add_custom_attribute' ), 10, 2);
	}

	public function load_google_map_bootstrap() {
		define( 'LGM_DIR', untrailingslashit(plugin_dir_path( __FILE__ ) ) );
		define( 'LGM_URL', untrailingslashit( plugins_url(basename( plugin_dir_path( __FILE__ ) ),	basename( __FILE__ ) ) ) );
		define( 'LGM_FILE', dirname(__FILE__));
		define( 'LGM_CSS', LGM_URL.'/assets/dist/css/' );
		define( 'LGM_JS',  LGM_URL.'/assets/dist/js/' );
		define( 'LGM_JS_VENDOR',  LGM_URL.'/assets/dist/vendor/' );
		define( 'LGM_IMG',  LGM_URL.'/assets/dist/vendor/img/');
		define( 'LGM_INCLUDE' , LGM_DIR.'/includes/' );
		define( 'LGM_TEMPLATE_PATH', plugin_dir_path( __FILE__ ) . 'templates/' );
	}

	public function load_google_map_enqueue_admin_script(){
		wp_register_style('google-map-settings-form', LGM_JS_VENDOR.'google-map-settings-form.css', array(), $ver = false, $media = 'all');
		wp_enqueue_style('google-map-settings-form');
		$this->load_google_map_scripts();
	}

	public function load_google_map_enqueue_script(){
		$this->load_google_map_scripts();
	}

	public function load_google_map_scripts(){
    $googlemap_settings = get_option('googlemap_settings', true);
		if (isset($googlemap_settings)) {
			$map_api_key = isset($googlemap_settings['googlemap_api_key']) ? $googlemap_settings['googlemap_api_key'] : '';
			if(isset($googlemap_settings['googlemap_enable']) && $googlemap_settings['googlemap_enable'] ==='enable' && isset($googlemap_settings['googlemap_api_key']) && $googlemap_settings['googlemap_api_key'] !== ''){
        wp_register_script('google-map-api', '//maps.googleapis.com/maps/api/js?key='.$googlemap_settings['googlemap_api_key'].'&libraries=places,geometry&language=en-US' , true , false );
        wp_enqueue_script('google-map-api');
				if(isset($googlemap_settings['richmarker_enable']) && $googlemap_settings['richmarker_enable'] ==='enable'){
					wp_register_script( 'lgm-rich-marker', LGM_JS_VENDOR.'rich-marker.js', array('jquery', 'underscore'), $ver = true, true);
          wp_enqueue_script( 'lgm-rich-marker' );
				}
				if(isset($googlemap_settings['markercluster_enable']) && $googlemap_settings['markercluster_enable'] ==='enable'){
					wp_register_script( 'lgm-map-marker-cluster', LGM_JS_VENDOR.'markerclusterer.js', array('jquery', 'underscore'), $ver = true, true);
          wp_enqueue_script( 'lgm-map-marker-cluster' );
				}
				if(isset($googlemap_settings['infobubble_enable']) && $googlemap_settings['infobubble_enable'] ==='enable'){
					wp_register_script( 'lgm-js-info-bubble', LGM_JS_VENDOR.'infobubble.js', array('jquery', 'underscore'), $ver = true, true);
          wp_enqueue_script( 'lgm-js-info-bubble' );
				}
			}
		}
	}

	public function load_google_map_add_custom_attribute($tag, $handle) {
		$custom_scripts = [
			'google-map-api',
			'lgm-rich-marker',
			'lgm-map-marker-cluster',
			'lgm-js-info-bubble',
		];
    foreach($custom_scripts as $script) {
       if ($script === $handle) {
          return str_replace(' src', ' defer async src', $tag);
       }
    }
    return $tag;
  }

	public function load_google_map_autoload() {
		require_once(LGM_INCLUDE.'lgm-admin-menu.php');
	}


	/**
	 * Get the plugin path.
	 * @return string
	 */
	public function plugin_path() {
		return untrailingslashit( plugin_dir_path( __FILE__ ) );
	}
}

function load_google_map() {
	return Load_Google_Map::instance();
}
$GLOBALS['load-google-map'] = load_google_map();

register_activation_hook( __FILE__, 'load_google_map_activate' );
function load_google_map_activate() {

}
