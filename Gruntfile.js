module.exports = function (grunt) {
	grunt.initConfig({
        pkg : grunt.file.readJSON("package.json"),
        transport : {
        	options: {
      			alias: '<%= pkg.spm.alias %>',
      			debug: false
        	},
        	app:{
        		files:[{
        			cwd: 'js/',
        			src: '**/*',
        			dest: '.build'
        		}]
        	}
	    },
	    concat : {
            options : {
                include : 'relative'
            },
            app: {
            	files: [
            		{
            			expand: true,
            			cwd: '.build/',
            			src: ['pixelegos.js'],
            			dest: 'dist/',
            			ext: '.js'
            		}
            	]
            }
        },
         uglify : {
            app : {
                files: [
                    {
                        expand: true,
                        cwd: 'dist/',
                        src: ['**/*.js', '!**/*-debug.js'],
                        dest: 'dist/',
                        ext: '.js'
                    }
                ]
            }
        },
        clean:{
        	app:['.build', 'dist']
        }
    })

     grunt.loadNpmTasks('grunt-cmd-transport')
     grunt.loadNpmTasks('grunt-cmd-concat')
     grunt.loadNpmTasks('grunt-contrib-uglify')
     grunt.loadNpmTasks('grunt-contrib-clean')

     grunt.registerTask('build', ['clean', 'transport:app', 'concat:app'])
     grunt.registerTask('default', ['build'])
}