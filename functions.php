<?php

function theme_enqueue_styles() {

    $parent_style = 'parent-style';

    wp_enqueue_style( $parent_style, get_template_directory_uri() . '/style.css' );
    wp_enqueue_style( 'child-style',
        get_stylesheet_directory_uri() . '/style.css'
    );

    wp_enqueue_style('theme-extra',
    	get_stylesheet_directory_uri().'/styles/custom.less',
    	array( $parent_style )
    );

    wp_enqueue_script( 'jquery' );
    wp_enqueue_style( 'bootstrap-css', get_stylesheet_directory_uri().'/bootstrap/css/bootstrap.css' );
    wp_enqueue_script( 'bootstrap-js', get_stylesheet_directory_uri().'/bootstrap/js/bootstrap.js' );
    wp_enqueue_script( 'backbone' );
}

add_action( 'wp_enqueue_scripts', 'theme_enqueue_styles', 'theme_enqueue_scripts' );

add_action( 'wp_default_scripts', function( $scripts ) {
    if ( ! empty( $scripts->registered['jquery'] ) ) {
        $jquery_dependencies = $scripts->registered['jquery']->deps;
        $scripts->registered['jquery']->deps = array_diff( $jquery_dependencies, array( 'jquery-migrate' ) );
    }
} );


?>