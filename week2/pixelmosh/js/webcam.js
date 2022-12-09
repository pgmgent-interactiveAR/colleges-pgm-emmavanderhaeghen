const webcam = {
  init() {
    this.cacheElements();
    this.addEventListeners();
    this.getCameraSelection();

  },
  cacheElements() {
    this.controls = document.querySelector('.controls');
    this.cameraOptions = document.querySelector('.video-options>select');
    this.video = document.querySelector('video');
    this.canvas = document.querySelector('canvas');
    this.screenshotImage = document.querySelector('img');
    this.buttons = [...this.controls.querySelectorAll('button')];
    this.streamStarted = false;
    this.play = document.querySelector('.button-play');
    this.pause = document.querySelector('.button-pause');
    this.screenshot = document.querySelector('.button-screenshot');

    this.constraints = {
      video: {
        width: {
          min: 720,
          ideal: 720,
          max: 2560
        },
        height: {
          min: 480,
          ideal: 480,
          max: 1440
        }
      },
    };
  },

  addEventListeners() {
    this.pause.addEventListener('click', this.pauseStream.bind(this));
    this.screenshot.addEventListener('click', this.doScreenshot.bind(this));
    this.play.addEventListener('click', () => {
      if (this.streamStarted) {
        this.video.play();
        this.play.classList.add('hidden');
        this.pause.classList.remove('hidden');
        return;
      }
      if ('mediaDevices' in navigator && navigator.mediaDevices.getUserMedia) {
        const updatedConstraints = {
          ...this.constraints,
          deviceId: {
            exact: this.cameraOptions.value,
          },
        };
        this.startStream(updatedConstraints);
      }
    }),
      this.cameraOptions.addEventListener('change', () => {
        const updatedConstraints = {
          ...this.constraints,
          deviceId: {
            exact: cameraOptions.value,
          },
        };
        this.startStream(updatedConstraints);
      });
  },

  async getCameraSelection() {
    const devices = await navigator.mediaDevices.enumerateDevices();
    console.warn(devices);
    const videoDevices = devices.filter(
      (device) => device.kind === 'videoinput'
      );
    const options = videoDevices.map((videoDevice) => {
      return `<option value='${videoDevice.deviceId}'>${videoDevice.deviceId}</option>`;
    });
    this.cameraOptions.innerHTML = options.join('');
  },

  async startStream(constraints) {
    const stream = await navigator.mediaDevices.getUserMedia(this.constraints);
    this.handleStream(stream);
  },

  handleStream(stream) {
    this.video.srcObject = stream;
    this.play.classList.add('hidden');
    this.pause.classList.remove('hidden');
    this.screenshot.classList.remove('hidden');
    this.streamStarted = true;
  },

  pauseStream() {
    this.video.pause();
    this.play.classList.remove('hidden');
    this.pause.classList.add('hidden');
  },

  doScreenshot() {

  },
}

export default webcam;