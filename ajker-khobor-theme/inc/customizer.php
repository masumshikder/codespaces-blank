<?php
/**
 * Customizer Settings for Ajker Khobor theme
 *
 * @package Ajker_Khobor
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

function ajker_khobor_customize_register( $wp_customize ) {
    // Remove default sections
    $wp_customize->remove_section( 'static_front_page' );

    // Theme Settings Panel
    $wp_customize->add_panel( 'ajker_khobor_settings', array(
        'priority'       => 10,
        'capability'     => 'edit_theme_options',
        'title'          => esc_html__( 'Ajker Khobor Settings', 'ajker-khobor' ),
        'description'    => esc_html__( 'Customize Ajker Khobor theme', 'ajker-khobor' ),
    ) );

    /**
     * Social Media Section
     */
    $wp_customize->add_section( 'ajker_khobor_social', array(
        'title'       => esc_html__( 'Social Media Links', 'ajker-khobor' ),
        'priority'    => 20,
        'panel'       => 'ajker_khobor_settings',
    ) );

    $social_networks = array(
        'facebook'  => esc_html__( 'Facebook URL', 'ajker-khobor' ),
        'twitter'   => esc_html__( 'Twitter URL', 'ajker-khobor' ),
        'youtube'   => esc_html__( 'YouTube URL', 'ajker-khobor' ),
        'instagram' => esc_html__( 'Instagram URL', 'ajker-khobor' ),
    );

    foreach ( $social_networks as $network => $label ) {
        $wp_customize->add_setting( 'ajker_khobor_' . $network, array(
            'default'           => '',
            'sanitize_callback' => 'esc_url_raw',
        ) );

        $wp_customize->add_control( 'ajker_khobor_' . $network, array(
            'label'       => $label,
            'section'     => 'ajker_khobor_social',
            'type'        => 'url',
        ) );
    }

    /**
     * Breaking News Section
     */
    $wp_customize->add_section( 'ajker_khobor_breaking_news', array(
        'title'       => esc_html__( 'Breaking News Settings', 'ajker-khobor' ),
        'priority'    => 25,
        'panel'       => 'ajker_khobor_settings',
    ) );

    $wp_customize->add_setting( 'ajker_khobor_breaking_news_label', array(
        'default'           => esc_html__( 'Breaking News', 'ajker-khobor' ),
        'sanitize_callback' => 'sanitize_text_field',
    ) );

    $wp_customize->add_control( 'ajker_khobor_breaking_news_label', array(
        'label'       => esc_html__( 'Breaking News Label', 'ajker-khobor' ),
        'section'     => 'ajker_khobor_breaking_news',
        'type'        => 'text',
    ) );

    /**
     * Color Settings
     */
    $wp_customize->add_section( 'ajker_khobor_colors', array(
        'title'       => esc_html__( 'Colors', 'ajker-khobor' ),
        'priority'    => 30,
        'panel'       => 'ajker_khobor_settings',
    ) );

    $wp_customize->add_setting( 'ajker_khobor_primary_color', array(
        'default'           => '#c41e3a',
        'sanitize_callback' => 'sanitize_hex_color',
    ) );

    $wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'ajker_khobor_primary_color', array(
        'label'       => esc_html__( 'Primary Color', 'ajker-khobor' ),
        'section'     => 'ajker_khobor_colors',
    ) ) );

    /**
     * Footer Settings
     */
    $wp_customize->add_section( 'ajker_khobor_footer', array(
        'title'       => esc_html__( 'Footer Settings', 'ajker-khobor' ),
        'priority'    => 40,
        'panel'       => 'ajker_khobor_settings',
    ) );

    $wp_customize->add_setting( 'ajker_khobor_copyright_text', array(
        'default'           => '',
        'sanitize_callback' => 'sanitize_text_field',
    ) );

    $wp_customize->add_control( 'ajker_khobor_copyright_text', array(
        'label'       => esc_html__( 'Copyright Text', 'ajker-khobor' ),
        'section'     => 'ajker_khobor_footer',
        'type'        => 'textarea',
    ) );
}
add_action( 'customize_register', 'ajker_khobor_customize_register' );

/**
 * Output customizer CSS
 */
function ajker_khobor_customize_css() {
    $primary_color = get_theme_mod( 'ajker_khobor_primary_color', '#c41e3a' );
    ?>
    <style type="text/css">
        :root {
            --primary-color: <?php echo esc_attr( $primary_color ); ?>;
        }
    </style>
    <?php
}
add_action( 'wp_head', 'ajker_khobor_customize_css' );
