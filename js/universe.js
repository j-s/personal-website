
            if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

            if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                // some code..

            
                setMobile();


            }else{

            var container;
            var camera, scene, renderer, particles, geometry, materials = [], parameters, i, h, color, size;
            var mouseX = 0, mouseY = 0;

            var windowHalfX = window.innerWidth / 2;
            var windowHalfY = window.innerHeight / 2;

            init();
            animate();
            }

            function setMobile(){

                var header = document.getElementById( 'header' );
                header.style.color = "white";

                var title = document.getElementById( 'home-name' );
                title.style.color = "white";

                var list = document.getElementsByClassName('mobile-list')

                for (i = 0; i < list.length; i++) {
                   list[i].style.color = "white";
                }

            }

            function init() {

                container = document.createElement( 'div' );
                container.className = "background-image-holder";

                document.body.appendChild( container );

                camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 3000 );
                camera.position.z = 1000;

                scene = new THREE.Scene();
                scene.fog = new THREE.FogExp2( 0xfff0, 0.00005 );



                geometry = new THREE.Geometry();

                for ( i = 0; i < 10000; i ++ ) {

                    var vertex = new THREE.Vector3();
                    vertex.x = Math.random() * 1000 - 600;
                    vertex.y = Math.random() * 1300 - 200;
                    vertex.z = Math.random() * 1300 - 200;

                    geometry.vertices.push( vertex );

                }

                parameters = [
                    [ [1, 1, 1, 1], 2.0 ],
                    [ [1, 1, 1, 1], 1.75 ],
                    [ [1, 1, 1, 1], 1.5 ],
                    [ [1, 1, 1, 1], 1.0 ],
                    [ [1, 1, 1, 1], 1 ]
                ];

                for ( i = 0; i < parameters.length; i ++ ) {

                    color = parameters[i][0];
                    size  = parameters[i][1];

                    materials[i] = new THREE.PointCloudMaterial( { size: size } );

                    particles = new THREE.PointCloud( geometry, materials[i] );

                    particles.rotation.x = Math.random() * 2;
                    particles.rotation.y = Math.random() * 2;
                    particles.rotation.z = Math.random() * 2;

                    scene.add( particles );

                }

                renderer = new THREE.WebGLRenderer( { alpha: true } );
                renderer.setPixelRatio( window.devicePixelRatio );
                renderer.setSize( window.innerWidth, window.innerHeight );
                renderer.setClearColor( 0x000000, 0);
                container.appendChild( renderer.domElement );

                document.addEventListener( 'mousemove', onDocumentMouseMove, false );
                document.addEventListener( 'touchstart', onDocumentTouchStart, false );
                document.addEventListener( 'touchmove', onDocumentTouchMove, false );

                //

                window.addEventListener( 'resize', onWindowResize, false );

            }

            function onWindowResize() {

                windowHalfX = window.innerWidth / 2;
                windowHalfY = window.innerHeight / 2;

                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();

                renderer.setSize( window.innerWidth, window.innerHeight );

            }

            function onDocumentMouseMove( event ) {

                mouseX = event.clientX - windowHalfX;
                mouseY = event.clientY - windowHalfY;

            }

            function onDocumentTouchStart( event ) {

                if ( event.touches.length === 1 ) {

                    event.preventDefault();

                    mouseX = event.touches[ 0 ].pageX - windowHalfX;
                    mouseY = event.touches[ 0 ].pageY - windowHalfY;

                }

            }

            function onDocumentTouchMove( event ) {

                if ( event.touches.length === 1 ) {

                    event.preventDefault();

                    mouseX = event.touches[ 0 ].pageX - windowHalfX;
                    mouseY = event.touches[ 0 ].pageY - windowHalfY;

                }

            }

            //

            function animate() {

                requestAnimationFrame( animate );

                render();

            }

            function render() {

                var time = Date.now() * 0.00003;

                camera.position.x += ( mouseX - camera.position.x ) * 0.05;
                camera.position.y += ( - mouseY - camera.position.y ) * 0.05;

                camera.lookAt( scene.position );

                for ( i = 0; i < scene.children.length; i ++ ) {

                    var object = scene.children[ i ];

                    if ( object instanceof THREE.PointCloud ) {

                        object.rotation.y = time * ( i < 4 ? i + 1 : - ( i + 1 ) );

                    }

                }

                for ( i = 0; i < materials.length; i ++ ) {

                    color = parameters[i][0];

                    h = ( 360 * ( color[0] + time ) % 360 ) / 360;
                    materials[i].color.setHSL( h, color[1], color[2] );

                }

                renderer.render( scene, camera );

            }