let _f
export default {
  loop(fn, t) {
    let c = new Date().getTime();
    if (!_f) {
      fn();
      _f = c + t;
    } else if (c > _f) {
      fn();
      _f = c + t;
    } else {

    }
  },
  initMedia(element) {
    window.navigator.getUserMedia({
        video: true,
        audio: false
      }, function (stream) {
        try {
          element.srcObject = stream;
          element.onloadedmetadata = function (e) {
            element.play();
          };
        } catch (err) {
          element.src = stream;
        }
      }, function () {
        throw Error('Cannot capture user camera.');
      }
    );
  },
  destroyMedia(video) {
    let stream = video.srcObject;
    stream && stream.getVideoTracks().forEach((track) => {
      track.stop();
    });
    video.srcObject = null
  }
}
