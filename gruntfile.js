module.exports = function(grunt) {

    // Project config
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bower_concat: {
            all: {
                dest: 'build/app/assets/js/_bower.js',
                cssDest: 'build/app/assets/css/_bower.css',
                bowerOptions: {
                    relative: false
                }
            }
        },
        clean: [
            'build/**/*.*'
        ],
        concat:{
            js: {
                src: [
                    'app/public/static/app.js',
                    'app/public/**/*.js'
                ],
                dest: 'build/app/assets/js/built.js'
            },
            css: {
                src: [
                    'app/public/assets/css/style.css',
                    'app/public/assets/css/bootstrap.css',
                ],
                dest: 'build/app/assets/css/built.css'
            }
        },
        copy: {
            views: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['app/public/components/**/*.html'],
                        dest: 'build/app/views/'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: ['app/public/components/**/**/*.html'],
                        dest: 'build/app/views/'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: ['app/public/static/app.html'],
                        dest: 'build/app/views/'
                    }
                ]
            },
            assets: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['app/public/static/favicon.ico'],
                        dest: 'build/app/'
                    },
                    {
                        flatten: true,
                        expand: true,
                        src: ['app/public/assets/img/*'],
                        dest: 'build/app/assets/img/'
                    }
                ]
            },
            api: {
                files: [
                    {
                        src: ['api/**/*'],
                        dest: 'build/'
                    }
                ]
            },
            node: {
                files: [
                    {
                        flatten: true,
                        src: ['app/routes/**/*'],
                        dest: 'build/'
                    },
                    {
                        src: ['server.js'],
                        dest: 'build/'
                    },
                    {
                        src: ['config.js'],
                        dest: 'build/'
                    }
                ]
            },
            certs: {
            }
        },
        cssmin: {
            target: {
                files: [
                    {
                        expand: true,
                        cwd: 'build/app/assets/css',
                        src: ['*.css', '!*.min.css'],
                        dest: 'build/app/assets/css',
                        ext: '.min.css'
                    }
                ]
            }
        },
        env: {
            local: {
                NODE_ENV : 'local'
            }
        },
        jshint: {
            files: ['gruntfile.js', 'api/**/*.js'],
            options: {
                node: true,
                globals: {
                    'angular': true,
                    'console': false
                }
            }
        },
        replace: {
            local: {
                options: {
                    patterns: [
                        {
                            match: "javascriptSrc",
                            replace: "assets/js/built.js"
                        },
                        {
                            match: "bowerJavascriptSrc",
                            replace: "assets/js/_bower.js"
                        },
                        {
                            match: "cssSrc",
                            replace: "assets/css/built.css"
                        },
                        {
                            match: "bowerCssSrc",
                            replace: "assets/css/_bower.css"
                        }
                    ]
                },
                files: [{
                    flatten: true,
                    expand: true,
                    src: ['app/public/static/index.html'],
                    dest: 'build/app/views/'
                }]
            },
            notLocal: {
                options: {
                    patterns: [
                        {
                            match: "javascriptSrc",
                            replace: "assets/js/built.min.js"
                        },
                        {
                            match: "bowerJavascriptSrc",
                            replace: "assets/js/_bower.min.js"
                        },
                        {
                            match: "cssSrc",
                            replace: "assets/css/built.min.css"
                        },
                        {
                            match: "bowerCssSrc",
                            replace: "assets/css/_bower.min.css"
                        }
                    ]
                },
                files: [{
                    flatten: true,
                    expand: true,
                    src: ['app/public/static/index.html'],
                    dest: 'build/app/views/'
                }]
            }
        },
        watch:{
            scripts: {
                files:['*.js', 'app/**/*.*', 'api/**/*.*', '!**/built.*'],
                tasks: ['clean', 'concat', 'bower_concat', 'replace:local', 'copy'],
                options: {
                    interupt: true,
                    livereload: true
                }
            }
        }
    });

    // Load the plugin that provides the specified config tasks
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-bower-concat');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-env');

    //Concat js and css files
    grunt.registerTask('build', [
        'clean',
        'env:local',
        'concat',
        'bower_concat',
        'replace:local',
        'copy:views',
        'copy:assets',
        'copy:api',
        'copy:node',
        'watch'
    ]);

};