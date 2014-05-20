module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            files: ['Gruntfile.js', 'assets/javascripts/**/*.js', 'assets/scss/**/*.scss'],
            tasks: ['sass']
        },

        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'assets/stylesheets/app.css': 'assets/scss/app.scss'
                }
            }
        },

        svg2css: {
            icons: {
                spriteCellWidth: 40,
                spriteCellHeight: 40,
                dataUris: true,
                svgPath: 'assets/images/icons/svg/',
                outputPath: 'assets/images/icons/svg-sprites/',
                cssPath: 'assets/scss/vendor/',
                cssFileName: 'icons.scss',
                colorFile: 'colors.json' // relative to svgPath
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-svg2css');

    // Default task(s).
    grunt.registerTask('default', ['sass']);
};