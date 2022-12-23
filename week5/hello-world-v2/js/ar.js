const app = () => {
  init = () => {
    console.log('init');
    document.querySelector('#startAR').addEventListener('click', activateXR);
  }

  activateXR = async () => {

    console.log('activateXR');

    // create a canvas element and initialize a WebGL context
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    const gl = canvas.getContext('webgl', { xrCompatible: true });

    // create a scene to draw object on
    const scene = new THREE.Scene();

    // materials for cube
    const materials = [
      new THREE.MeshBasicMaterial({color: 'red'}),
      new THREE.MeshBasicMaterial({color: 'blue'}),
      new THREE.MeshBasicMaterial({color: 'green'}),
      new THREE.MeshBasicMaterial({color: 'orange'}),
      new THREE.MeshBasicMaterial({color: 'purple'}),
      new THREE.MeshBasicMaterial({color: 'yellow'}),

    ];

    const cube = new THREE.Mesh(new THREE.BoxGeometry(.2, .2, .2), materials);
    cube.position.set(0, 0, -1);
    scene.add(cube);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      preserveDrawingBuffer: true,
      canvas: canvas,
      context: gl
    });

    renderer.autoClear = false;

    const camera = new THREE.PerspectiveCamera();
    camera.matrixAutoUpdate = false;

    const session = await navigator.xr.requestSession('immersive-ar');
    session.updateRenderState({
      baseLayer: new XRWebGLLayer(session, gl)
    });

    const referenceSpace = await session.requestReferenceSpace('local');

    const onXRFrame = (time, frame) => {
      session.requestAnimationFrame(onXRFrame);

      gl.bindFramebuffer(gl.FRAMEBUFFER, session.renderState.baseLayer.framebuffer);

      const pose = frame.getViewerPose(referenceSpace);

      if (pose) {

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.02;

        const view = pose.views[0];
        
        const viewport = session.renderState.baseLayer.getViewport(view);
        renderer.setSize(viewport.width, viewport.height);
        
        camera.matrix.fromArray(view.transform.matrix);
        camera.projectionMatrix.fromArray(view.projectionMatrix);
        camera.updateMatrixWorld(true);

        renderer.render(scene, camera);
      };
    };

    session.requestAnimationFrame(onXRFrame);
  };

  init();
}

app();
