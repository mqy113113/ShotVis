/* jshint node: true */

module.exports = function(grunt) {
  'use strict';
  require('load-grunt-tasks')(grunt);
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    distRoot: 'build',
    docsRoot: 'docs',

    browserify: {
      build: {
        files: [{
         '<%= distRoot %>/js/my-app.js':'./js/my-app.js'
        }]
      }
    },

    uglify: {
      build: {
        options: {
          sourceMap: false
        },
        files: [{
          '<%= distRoot %>/js/my-app.min.js':'<%= distRoot %>/js/my-app.js'
        }]
      }
    },

    less: {
      options: {
        compile: true
      },
      build: {
        files: [{
          './<%= distRoot %>/css/my-app.css':'./less/my-app.less'
        }]
      }
    },
    copy: {
      img: {
        files: [
          { 
            cwd: './img/',
            expand: true, 
            src: ['**/*.*'],
            dest: '<%= distRoot %>/img' 
          }
        ]
      },
      data:{
        files:[
          {
            cwd:'./data',
            expand:true,
            src:['**/*.*'],
            dest:'<%= distRoot %>/data' 
          }
        ]
      },
      js:{  
        files: [
          { 
            cwd: './js/lib/',
            expand: true,
            src: ['**/*.js'], 
            dest: '<%= distRoot %>/js/lib' 
          }
        ]
      },
      css:{
        files:[
          {
            cwd:'./less/lib/',
            expand:true,
            src:['**/*.css'],
            dest: '<%= distRoot %>/css/lib' 
          }
        ]
      }
    },
    ejs: {
      demos: {
        cwd: './demos/',
        src: ['**/*.html'],
        dest: '<%= distRoot %>/demos',
        expand: true,
        ext: '.html',
      },
    },
    watch: {
      options: {
        livereload: 1345
      },
      css: {
        files: 'less/**/*.less',
        tasks: ['less']
      },
      js: {
        files: 'js/**/*.js',
        tasks: ['browserify']
      },
      copyjs: {
        files:'js/lib/**/*',
        tasks:['newer:copy:js']
      },
      copycss:{
        files:'less/lib/**/*',
        tasks:['newer:copy:css']
      },
      copydata:{
        files:'data/**/*',
        tasks:['newer:copy:data']
      },
      ejs: {
        files: 'demos/**/*.html',
        tasks: ['ejs']
      }
    },
    clean: {
      build: {
        src: ["./<%= distRoot %>/"]
      }
    }
  });



  grunt.registerTask('default', ['clean','browserify', 'uglify', 'copy', 'less','ejs']);
}
