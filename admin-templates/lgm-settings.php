<?php
// if this fails, check_admin_referer() will automatically print a "failed" page and die.
if ( ! empty( $_POST ) && check_admin_referer( 'nonce_googlemap_settings', 'googlemap_settings' ) ) {
  $posted = $_POST;
  unset($posted['submit']);
  unset($posted['googlemap_settings']);
  unset($posted['_wp_http_referer']);
  update_option('googlemap_settings', $posted);
}

$googlemap_settings = get_option('googlemap_settings', true);
?>
<form method="post">
<div class="slwp-input-group">
	<h3 class="rq-rub-shortcode-title"><?php esc_html_e('Google Map Settings', 'load-google-map') ?></h3>
	<div class="slwp-input-wrapper">
		<span class="slwp-input-title"><?php esc_html_e('Google Map Enable', 'load-google-map') ?></span>
		<div class="slwp-input-field">
			<select class="googlemap-allowed" name="googlemap_enable">
				<option value="disable" <?php if(isset($googlemap_settings['googlemap_enable'])) echo ($googlemap_settings['googlemap_enable'] == 'disable' ? 'selected="selected"' : '') ?>>Disable</option>
					<option value="enable"  <?php if(isset($googlemap_settings['googlemap_enable'])) echo ($googlemap_settings['googlemap_enable'] == 'enable' ? 'selected="selected"' : '') ?>>Enable</option>
				</select>
			</div>
		</div>
	<div class="slwp-input-wrapper">
		<span class="slwp-input-title"><?php esc_html_e('RichMarker Enable', 'load-google-map') ?></span>
		<div class="slwp-input-field">
			<select class="richmarker-allowed" name="richmarker_enable">
				<option value="disable" <?php if(isset($googlemap_settings['richmarker_enable'])) echo ($googlemap_settings['richmarker_enable'] == 'disable' ? 'selected="selected"' : '') ?>>Disable</option>
					<option value="enable"  <?php if(isset($googlemap_settings['richmarker_enable'])) echo ($googlemap_settings['richmarker_enable'] == 'enable' ? 'selected="selected"' : '') ?>>Enable</option>
				</select>
			</div>
		</div>
	<div class="slwp-input-wrapper">
		<span class="slwp-input-title"><?php esc_html_e('Info Bubble Enable', 'load-google-map') ?></span>
		<div class="slwp-input-field">
			<select class="infobubble-allowed" name="infobubble_enable">
				<option value="disable" <?php if(isset($googlemap_settings['infobubble_enable'])) echo ($googlemap_settings['infobubble_enable'] == 'disable' ? 'selected="selected"' : '') ?>>Disable</option>
					<option value="enable"  <?php if(isset($googlemap_settings['infobubble_enable'])) echo ($googlemap_settings['infobubble_enable'] == 'enable' ? 'selected="selected"' : '') ?>>Enable</option>
				</select>
			</div>
		</div>
	<div class="slwp-input-wrapper">
		<span class="slwp-input-title"><?php esc_html_e('Marker Cluster Enable', 'load-google-map') ?></span>
		<div class="slwp-input-field">
			<select class="markercluster-allowed" name="markercluster_enable">
				<option value="disable" <?php if(isset($googlemap_settings['markercluster_enable'])) echo ($googlemap_settings['markercluster_enable'] == 'disable' ? 'selected="selected"' : '') ?>>Disable</option>
					<option value="enable"  <?php if(isset($googlemap_settings['markercluster_enable'])) echo ($googlemap_settings['markercluster_enable'] == 'enable' ? 'selected="selected"' : '') ?>>Enable</option>
				</select>
			</div>
		</div>

			<div class="slwp-input-wrapper">
				<span class="slwp-input-title"><?php esc_html_e('Google Map Api Key', 'load-google-map') ?></span>
				<div class="slwp-input-field">
					<input type="text" class="widefat rq-rub-input-field" name="googlemap_api_key" value="<?php echo ( isset( $googlemap_settings['googlemap_api_key'] ) && !empty( $googlemap_settings['googlemap_api_key'] ) ) ? $googlemap_settings['googlemap_api_key'] : ''; ?>">
				</div>
			</div>
		</div>
		<?php wp_nonce_field( 'nonce_googlemap_settings', 'googlemap_settings' ); ?>
    <p class="submit"><input type="submit" name="submit" id="submit" class="button button-primary" value="<?php esc_html_e("Save Changes", 'load-google-map') ?>"></p>
  </form>
