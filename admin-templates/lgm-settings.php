<div id="google_map_settings"></div>

<?php
/**
 * Localize the updated data from database
 */

  $google_map_settings = stripslashes_deep(get_option( '_google_map_settings', true ));
  wp_localize_script( 'lgm_googleMapSettings', 'GOOGLE_MAP_ADMIN',
    apply_filters('reactive_generator_localize_args', array(
      'GOOGLE_MAP_SETTINGS' => $google_map_settings,
  )));
?>

<input type="hidden" id="_google_map_settings" name="_google_map_settings" value="<?php echo esc_attr(isset($google_map_settings) ? $google_map_settings : null) ?>">
