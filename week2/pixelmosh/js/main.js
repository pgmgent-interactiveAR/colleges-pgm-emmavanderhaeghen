import webcam from './webcam.js';
import processor from './processor.js';

const appInit= () => {
  webcam.init();
  processor.init();
};

document.addEventListener('DOMContentLoaded', appInit);