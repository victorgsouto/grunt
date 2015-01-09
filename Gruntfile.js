module.exports = function(grunt) {
   grunt.initConfig({
        copy: {
              public: {
                   cwd: 'html', 
                   src: '**', 
                   dest: 'dist', 
                   expand: true
              }
         }, 
         clean: {
              dist: {
                  src: 'dist'
              }
         },

         useminPrepare: {
         	html: 'dist/**/*.html'
         },
         //altera o html para os js e css comentado build
         usemin: {
         	html: 'dist/**/*.html'
         },
         rev: {
         	options: {
         		encoding: 'utf8',
         		algorithm: 'md5',
         		length: 8
         	},
         	imagens: {
         		src: ['dist/img/**/*.{png,jpg,gif}']
         	},
         	minificados: {
         		src: ['dist/js/**/*.min.js', 'dist/css/**/*.css']
         	}

         },
         coffee: {
		   compilar: { 
		      expand: true,
		      cwd: 'html/coffee', 
		      src: ['**/*.coffee'],
		      dest: 'html/js', 
		      ext: '.js'
		   }
		},

		less: {
		   compilar: {
		      expand: true,
		      cwd: 'html/less',
		      src: ['**/*.less'],
		      dest: 'html/css', 
		      ext: '.css'
		   }
		},
     browser_sync: {
         bsFiles: {
            src : ['html/**/*']
        },
        options: {
            // Definimos um IP manualmente.
            host : "192.168.33.10",
            watchTask: true,
            server: {
                baseDir: 'html'
            }
        },
    },

		watch:{
			coffee: {
				options: {
					event: ['added', 'changed']
				},
				files: 'html/coffee/**/*.coffee',
				tasks: 'coffee:compilar'
			},
			less: {
				options: {
					event: ['added', 'changed']
				},
				files: 'html/less/**/*.less',
				tasks: 'less:compilar'
			},
			js:{
				options:{
					event: ['changed']
				},
				files: 'html/js/**/*.js',
				tasks: 'jshint:js'
			}
		},
		jshint: {
			js:{
				src: ['html/js/**/*.js']
			}
		},
		
  });
  //para ativarmos a tarefa onde ela sincroniza os browser com a watch
  grunt.registerTask('server', ['browser_sync', 'watch']);
  //regista tarefa onde ela faz na ordem a tarefa clean e copy 
  grunt.registerTask('dist', ['clean','copy']); 

  grunt.registerTask('minifica', ['useminPrepare', 'concat', 'uglify', 'cssmin','rev', 'usemin']);

  grunt.registerTask('default', ['dist', 'minifica']);
  //duplica as pastas / arquivo etc...
  grunt.loadNpmTasks('grunt-contrib-copy');
  //apaga as pastas
  grunt.loadNpmTasks('grunt-contrib-clean');
  //concatenacao
  grunt.loadNpmTasks('grunt-contrib-concat');
  //mimificacao
  grunt.loadNpmTasks('grunt-contrib-uglify');
  //mimificar css
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  //<!-- build:css css/index.min.css --> <!-- build:js js/index.min.js -->
  grunt.loadNpmTasks('grunt-usemin');
  //tirando o cacheamento de imagens js css
  grunt.loadNpmTasks('grunt-rev');
  //compilador less
  grunt.loadNpmTasks('grunt-contrib-less');
  //compilador coffee script js
  grunt.loadNpmTasks('grunt-contrib-coffee');
  //monitora arquivos alterados e compila eles
  grunt.loadNpmTasks('grunt-contrib-watch');
  //verifica se tem algum erro de digitação
  grunt.loadNpmTasks('grunt-contrib-jshint');
  //sincroniza ações em varios dispositivos
  grunt.loadNpmTasks('grunt-browser-sync');

};