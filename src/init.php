<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package GTS
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * @since 1.0.0
 */
function gts_block_assets() {
	// Styles.
	wp_enqueue_style( 'gts-style-css', plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ) );

	wp_enqueue_style('font-awesome', plugins_url( 'lib/css/fontawesome.min.css', dirname( __FILE__ ) ) );
	wp_enqueue_style('bootstrap-style', plugins_url( 'lib/css/bootstrap.min.css', dirname( __FILE__ ) ) );

	wp_enqueue_script('bootstrap-script',  plugins_url( 'lib/js/bootstrap.min.js', dirname( __FILE__ ) ), array('jquery'));
} 

// Hook: Frontend assets.
add_action( 'enqueue_block_assets', 'gts_block_assets' );

/**
 * Enqueue Gutenberg block assets for backend editor.
 *
 * `wp-blocks`: includes block type registration and related functions.
 * `wp-element`: includes the WordPress Element abstraction for describing the structure of your blocks.
 * `wp-i18n`: To internationalize the block's text.
 *
 * @since 1.0.0
 */
function gts_editor_assets() {
	// Scripts.
	wp_enqueue_script(
		'gts-block-js', // Handle.
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ), // Block.build.js: We register the block here. Built with Webpack.
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ), // Dependencies, defined above.
		// filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ), // Version: filemtime — Gets file modification time.
		true // Enqueue the script in the footer.
	);

	// Styles.
	wp_enqueue_style(
		'gts-block-editor-css', // Handle.
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ), // Block editor CSS.
		array( 'wp-edit-blocks' ) // Dependency to include the CSS after it.
		// filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' ) // Version: filemtime — Gets file modification time.
	);
}

// Hook: Editor assets.
add_action( 'enqueue_block_editor_assets', 'gts_editor_assets' );
