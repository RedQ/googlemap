<?php


class AsyncHandler
{
  /**
     * Action hook used by the AJAX class.
     *
     * @var string
     */
    const ACTION = 'load_google_map_ajax';

    /**
     * Action argument used by the nonce validating the AJAX request.
     *
     * @var string
     */
    const NONCE = 'load_google_map_nonce';

  /**
   * Register the AJAX handler class with all the appropriate WordPress hooks.
   */
  public function __construct() {
    add_action('wp_ajax_'. self::ACTION, array($this, 'handle_ajax'));
    add_action('wp_ajax_nopriv_' . self::ACTION, array($this, 'handle_ajax'));
  }

	public function handle_ajax() {
    check_ajax_referer(self::NONCE, 'nonce');
		$ajax_data = $_POST;
		unset($ajax_data['nonce']);
		unset($ajax_data['action']);
		switch ($ajax_data['action_type']) {
      case 'save_google_map_settings':
        $this->save_google_map_settings($ajax_data);
      break;
    }
    wp_die();
	}

  public function save_google_map_settings($data){
    update_option('_google_map_settings', $data['mapSettings']);
  }
}

new AsyncHandler();
