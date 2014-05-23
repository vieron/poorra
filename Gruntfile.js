module.exports = function(grunt) {

    var _ = require('underscore');

    // Front-end javascript dependencies
    var jsDeps = {
        zepto: 'assets/javascripts/vendor/zepto/zepto.js',
        fastclick: 'assets/javascripts/vendor/fastclick/lib/fastclick.js',
        app: 'assets/javascripts/app.js'
    };


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            files: ['Gruntfile.js', 'assets/javascripts/**/*.js', 'assets/scss/**/*.scss'],
            tasks: ['sass', 'concat']
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

        concat: {
            options: {
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                        '<%= grunt.template.today("yyyy-mm-dd") %> */\n\n'
            },
            dist: {
                src: _.values(jsDeps),
                dest: 'assets/javascripts/built.js',
            }
        },

        uglify: {
            dist: {
                'assets/javascripts/built.min.js': ['assets/javascripts/built.js']
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
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-svg2css');

    // Default task(s).
    grunt.registerTask('default', ['svg2css', 'sass', 'concat', 'uglify']);
};