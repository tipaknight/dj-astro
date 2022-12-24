'use strict';

let _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

let _createClass = function () { function defineProperties(target, props) { for (let i = 0; i < props.length; i++) { let descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

let FILES = ['War for life', 'Escape', 'Somehow', 'Forever', 'Runaway', 'Believe'];

window.addEventListener('DOMContentLoaded', initHandlers);

function initHandlers() {
  let player = new Player(FILES);
  player.init();

  getByQuery('.player .controls .play_pause').addEventListener('click', player.play.bind(player));
  getByQuery('.player .controls .navigation_prev').addEventListener('click', player.playPrev.bind(player));
  getByQuery('.player .controls .navigation_next').addEventListener('click', player.playNext.bind(player));
  getByQuery('.player .controls .progress_bar_stripe').addEventListener('click', player.pickNewProgress.bind(player));
}

/**
 * Player class
 */

let Player = function () {
  class Player {
    constructor(files) {
      _classCallCheck(this, Player);

      this.current = null;
      this.status = 'pause';
      this.progress = 0;
      this.progressTimeout = null;
      this.files = FILES.map(function (name) {
        return {
          name: name
        };
      });
    }
  }

  _createClass(Player, [{
    key: 'init',
    value: function init() {
      let _this = this;

      let playlist = getByQuery('.playlist');

      this.files.forEach(function (f, i) {
        let playlistFileContainer = createElem({
          type: 'div',
          appendTo: playlist,
          textContent: f.name,
          class: 'fileEntity',
          handlers: {
            click: _this.play.bind(_this, null, i)
          }
        });
        createElem({
          type: 'div',
          appendTo: playlistFileContainer,
          textContent: '--:--',
          class: 'fileEntity_duration'
        });
      });
    }
  }, {
    key: 'loadFile',
    value: function loadFile(i) {
      let f = this.files[i];

      f.file = new Audio(prepareFilePath(f.name));

      f.file.addEventListener('loadedmetadata', function () {
        getByQuery('.playlist').children[i].children[0].textContent = prettifyTime(f.file.duration);
      });

      f.file.addEventListener('ended', this.playNext.bind(this, null, i));
    }
  }, {
    key: 'play',
    value: function play(e) {
      let i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.current || 0;

      if (!this.files[i].file) {
        this.loadFile(i);
      }

      let action = 'play';

      if (this.current == i) {
        action = this.status === 'pause' ? 'play' : 'pause';
        this.toggleStyles(action, i);
      } else if (_typeof(this.current) !== 'object') {
        this.files[this.current].file.pause();
        this.files[this.current].file.currentTime = 0;
        this.toggleStyles(action, this.current, i);
      } else {
        this.toggleStyles(action, i);
      }

      this.current = i;
      this.status = action;
      this.files[i].file[action]();

      if (action == 'play') {
        this.setTitle(this.files[i].name);
        this.stopProgress();
        this.runProgress();
      } else {
        this.stopProgress();
      }
    }
  }, {
    key: 'playNext',
    value: function playNext(e, currentIndex) {
      let nextIndex = (currentIndex ? currentIndex : this.current) + 1;

      if (!this.files[nextIndex]) {
        nextIndex = 0;
      }

      this.play(null, nextIndex);
    }
  }, {
    key: 'playPrev',
    value: function playPrev(e, currentIndex) {
      let prevIndex = (currentIndex ? currentIndex : this.current) - 1;

      if (!this.files[prevIndex]) {
        prevIndex = this.files.length - 1;
      }

      this.play(null, prevIndex);
    }
  }, {
    key: 'setTitle',
    value: function setTitle(title) {
      getByQuery('.progress_bar_title').textContent = title;
    }
  }, {
    key: 'setProgress',
    value: function setProgress() {
      let percent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      let cb = arguments[1];

      getByQuery('.progress_bar_container_percentage').style.width = percent + '%';
      cb && cb();
    }
  }, {
    key: 'countProgress',
    value: function countProgress() {
      let file = this.files[this.current].file;

      return file.currentTime * 100 / file.duration || 0;
    }
  }, {
    key: 'runProgress',
    value: function runProgress() {
      let _this2 = this;

      let percent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      let percentage = percent || this.countProgress();
      let cb = percent ? function () {
        _this2.files[_this2.current].file.currentTime = percentage * _this2.files[_this2.current].file.duration / 100;
      } : null;

      this.setProgress(percentage, cb);
      this.progressTimeout = setTimeout(this.runProgress.bind(this), 1000);
    }
  }, {
    key: 'stopProgress',
    value: function stopProgress() {
      clearTimeout(this.progressTimeout);
      this.progressTimeout = null;
    }
  }, {
    key: 'pickNewProgress',
    value: function pickNewProgress(e) {
      if (this.status != 'play') {
        this.play();
      }

      let coords = e.target.getBoundingClientRect().left;
      let progressBar = getByQuery('.progress_bar_stripe');
      // let newPercent = (e.clientX - coords) / progressBar.offsetWidth * 100;

      this.stopProgress();
      this.runProgress(newPercent);
    }
  }, {
    key: 'toggleStyles',
    value: function toggleStyles(action, prev, next) {
      let prevNode = getByQuery('.playlist').children[prev];
      let nextNode = getByQuery('.playlist').children[next];
      let playPause = getByQuery('.play_pause .play_pause_icon');

      if (!next && next !== 0) {
        if (!prevNode.classList.contains('fileEntity-active')) {
          prevNode.classList.add('fileEntity-active');
        }
        playPause.classList.toggle('play_pause-play');
        playPause.classList.toggle('play_pause-pause');
      } else {
        prevNode.classList.toggle('fileEntity-active');
        nextNode.classList.toggle('fileEntity-active');
      }

      if (playPause.classList.contains('play_pause-play') && action == 'play' && prev != next) {
        playPause.classList.toggle('play_pause-play');
        playPause.classList.toggle('play_pause-pause');
      }
    }
  }]);

  return Player;
}();

/**
 * Utils
 */

function prepareFilePath(name) {
  return './media/' + name + '.mp3';
}

function getByQuery(elem) {
  return typeof elem === 'string' ? document.querySelector(elem) : elem;
}

function prettifyTime(time) {
  let minutes = ~~(time % 3600 / 60);
  let seconds = ~~(time % 60);

  return '' + parseInt(minutes / 10) + minutes % 10 + ':' + parseInt(seconds / 10) + seconds % 10;
}

function createElem(config) {
  let element = document.createElement(config.type);

  config.class && (element.className = config.class);
  config.id && (element.id = config.id);
  config.textContent && (element.textContent = config.textContent);
  config.handlers && Object.keys(config.handlers).length && Object.keys(config.handlers).forEach(function (key) {
    element.addEventListener(key, config.handlers[key]);
  });
  config.appendTo && config.appendTo.appendChild(element);

  return element;
}