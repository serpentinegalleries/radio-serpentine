<?php


function theme_enqueue_styles() {

    $parent_style = 'parent-style';

    wp_enqueue_script( 'jquery' );
    wp_enqueue_style( 'bootstrap-css', get_stylesheet_directory_uri().'/vendor/bootstrap-3.3.7-dist/css/bootstrap.min.css' );
    wp_enqueue_script( 'soundcloud', get_stylesheet_directory_uri().'/vendor/soundcloud/sdk-3.1.2.js' );
    wp_enqueue_style( 'fontawesome-css', 'https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css' );

    if ( is_front_page() ) { 
        wp_enqueue_script( 'angular', get_stylesheet_directory_uri().'/vendor/angular/angular-1.5.8/angular.min.js' );
        wp_enqueue_script( 'angular-ui-router', get_stylesheet_directory_uri().'/vendor/angular/angular-ui-router.min.js' );
        wp_enqueue_script( 'ui-bootstrap-tpls-2', get_stylesheet_directory_uri().'/vendor/angular/ui-bootstrap-tpls-2.1.3.min.js' );
        wp_enqueue_script( 'app', get_stylesheet_directory_uri().'/scripts/app/app.js' );
        wp_enqueue_script( 'player', get_stylesheet_directory_uri().'/scripts/player.js' );
    };

    wp_enqueue_style( $parent_style, get_template_directory_uri() . '/style.css' );
    wp_enqueue_style( 'child-style',
        get_stylesheet_directory_uri() . '/style.css'
    );
    
    wp_enqueue_style('theme-extra',
    	get_stylesheet_directory_uri().'/styles/custom.less',
    	array( $parent_style )
    );
}

add_action( 'wp_enqueue_scripts', 'theme_enqueue_styles', 'theme_enqueue_scripts' );

/* Removes jQuery Migrate dependency console log */
add_action( 'wp_default_scripts', function( $scripts ) {
    if ( ! empty( $scripts->registered['jquery'] ) ) {
        $jquery_dependencies = $scripts->registered['jquery']->deps;
        $scripts->registered['jquery']->deps = array_diff( $jquery_dependencies, array( 'jquery-migrate' ) );
    }
} );

add_filter('single_template', create_function('$t', 'foreach( (array) get_the_category() as $cat ) { if ( file_exists(get_stylesheet_directory_uri() . "/single-{$cat->term_id}.php") ) return get_stylesheet_directory_uri() . "/single-{$cat->term_id}.php"; } return $t;' ));

