<?php
/**
 * Plugin Name: Testimonials Slider Block
 * Plugin URI: https://github.com/laccadive-io/testimonials-slider-block/
 * Description: Testimonials Slider Block allows you to add a testimonials slider block to your WordPress content.
 * Author: Muhammad Muhsin
 * Author URI: https://laccadive.io/
 * Version: 1.0.0
 * License: GPL-3.0+
 * License URI: http://www.gnu.org/licenses/gpl-3.0.txt
 *
 * @package GTS
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
