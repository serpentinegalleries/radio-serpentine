<?php

function theme_enqueue_styles() {

    $parent_style = 'parent-style';

    wp_enqueue_script( 'jquery' );
    wp_enqueue_style( 'bootstrap-css', get_stylesheet_directory_uri().'/vendor/bootstrap-3.3.7-dist/css/bootstrap.min.css' );
    wp_enqueue_script( 'soundcloud', get_stylesheet_directory_uri().'/vendor/soundcloud/sdk-3.1.2.js' );
    wp_enqueue_style( 'fontawesome-css', 'https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css' );

    if ( is_front_page() ) { 
        wp_enqueue_script( 'angular', get_stylesheet_directory_uri().'/vendor/angular/angular-1.5.8/angular.min.js' );
        wp_enqueue_script( 'angular-sanitize', get_stylesheet_directory_uri().'/vendor/angular/angular-sanitize.js' );
        wp_enqueue_script( 'd3', get_stylesheet_directory_uri().'/vendor/d3.v4.min.js' );

        wp_enqueue_script( 'angular-ui-router', get_stylesheet_directory_uri().'/vendor/angular/angular-ui-router.min.js' );
        wp_enqueue_script( 'ui-bootstrap-tpls-2', get_stylesheet_directory_uri().'/vendor/angular/ui-bootstrap-tpls-2.1.3.min.js' );
        wp_enqueue_script( 'player', get_stylesheet_directory_uri().'/scripts/icon.js' );
        wp_enqueue_script( 'app', get_stylesheet_directory_uri().'/scripts/app/app.js' );
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

/**
 * Extend WordPress search to include custom fields
 *
 * http://adambalee.com
 */

/**
 * Join posts and postmeta tables
 *
 * http://codex.wordpress.org/Plugin_API/Filter_Reference/posts_join
 */
function cf_search_join( $join ) {
    global $wpdb;

    if ( is_search() ) {    
        $join .=' LEFT JOIN '.$wpdb->postmeta. ' ON '. $wpdb->posts . '.ID = ' . $wpdb->postmeta . '.post_id ';
    }
    
    return $join;
}
add_filter('posts_join', 'cf_search_join' );

/**
 * Modify the search query with posts_where
 *
 * http://codex.wordpress.org/Plugin_API/Filter_Reference/posts_where
 */
function cf_search_where( $where ) {
    global $pagenow, $wpdb;
   
    if ( is_search() ) {
        $where = preg_replace(
            "/\(\s*".$wpdb->posts.".post_title\s+LIKE\s*(\'[^\']+\')\s*\)/",
            "(".$wpdb->posts.".post_title LIKE $1) OR (".$wpdb->postmeta.".meta_value LIKE $1)", $where );
    }

    return $where;
}
add_filter( 'posts_where', 'cf_search_where' );

/**
 * Prevent duplicates
 *
 * http://codex.wordpress.org/Plugin_API/Filter_Reference/posts_distinct
 */
function cf_search_distinct( $where ) {
    global $wpdb;

    if ( is_search() ) {
        return "DISTINCT";
    }

    return $where;
}
add_filter( 'posts_distinct', 'cf_search_distinct' );
