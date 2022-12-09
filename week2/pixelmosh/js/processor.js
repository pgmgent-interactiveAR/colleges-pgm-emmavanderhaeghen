const processor = {
  init() {
    this.cacheElements();
    this.timerCallback();
    this.counter = 0;
  },

  cacheElements() {
    this.video = document.getElementById('video');
  
    this.c1 = document.getElementById('canvas-start');
    this.ctx1 = this.c1.getContext('2d');
  
    this.c2 = document.getElementById('canvas-effect');
    this.ctx2 = this.c2.getContext('2d');
    
    this.width = video.videoWidth;
    this.height = video.videoHeight;
    this.c2.width = this.width;
    this.c2.height = this.height;
    
    video.addEventListener('play', () => {
      this.width = video.videoWidth;
      this.height = video.videoHeight;
      this.c1.width = this.c2.width = this.width;
      this.c1.height = this.c2.height = this.height;
      this.timerCallback();
    }, false);
  },

  timerCallback() {
    if (this.video.paused || this.video.ended) {
      return;
    }
    this.computeFrame();
    window.requestAnimationFrame(this.timerCallback.bind(this));
  },

  computeFrame() {
    this.ctx1.drawImage(this.video, 0, 0, this.width, this.height);
    const frame = this.ctx1.getImageData(0, 0, this.width, this.height);
    const data = frame.data;
    const frame2 = this.ctx1.getImageData(0, 0, this.width, this.height);
    const data2 = frame.data;

    for (let i = 0; i < data.length; i += 4) {
      let red = data[i + 0];
      let green = data[i + 1];
      let blue = data[i + 2];
      // if(green > 100 && red > 100 && blue < 234) {
      //   data[i + 3] = 0;
      // }
      data2[i + 3] = 255;
      data2[i + 2] = data[i + 2 + Math.random()*this.counter];
      this.counter >= 255 ? this.counter == 0 : this.counter++;
    }
    
    this.ctx2.putImageData(frame2, 0, 0);
  }
}

export default processor;