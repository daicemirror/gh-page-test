var audio;
(function (audio) {
    var test;
    (function (test) {
        var MediaRecorder2 = /** @class */ (function () {
            function MediaRecorder2(stream) {
                this.AudioContext = window.AudioContext || window.webkitAudioContext;
                this.prototype = {
                    /**
                     * The MIME type that is being used for recording.
                     * @type {string}
                     */
                    mimeType: 'audio/wav',
                    /**
                     * Begins recording media.
                     *
                     * @param {number} [timeslice] The milliseconds to record into each `Blob`.
                     *                             If this parameter isn’t included, single `Blob`
                     *                             will be recorded.
                     *
                     * @return {undefined}
                     *
                     * @example
                     * recordButton.addEventListener('click', function () {
                     *   recorder.start()
                     * })
                     */
                    start: function start(timeslice) {
                        if (this.state === 'inactive') {
                            this.state = 'recording';
                            this.context = new AudioContext();
                            var input = this.context.createMediaStreamSource(this.stream);
                            var processor = this.context.createScriptProcessor(2048, 1, 1);
                            var recorder = this;
                            processor.onaudioprocess = function (e) {
                                if (recorder.state === 'recording') {
                                    recorder.encoder.postMessage([
                                        'encode', e.inputBuffer.getChannelData(0)
                                    ]);
                                }
                            };
                            input.connect(processor);
                            processor.connect(this.context.destination);
                            this.em.dispatchEvent(new Event('start'));
                            if (timeslice) {
                                this.slicing = setInterval(function () {
                                    if (recorder.state === 'recording')
                                        recorder.requestData();
                                }, timeslice);
                            }
                        }
                    },
                    /**
                     * Stop media capture and raise `dataavailable` event with recorded data.
                     *
                     * @return {undefined}
                     *
                     * @example
                     * finishButton.addEventListener('click', function () {
                     *   recorder.stop()
                     * })
                     */
                    stop: function stop() {
                        if (this.state !== 'inactive') {
                            this.requestData();
                            this.state = 'inactive';
                            clearInterval(this.slicing);
                        }
                    },
                    /**
                     * Pauses recording of media streams.
                     *
                     * @return {undefined}
                     *
                     * @example
                     * pauseButton.addEventListener('click', function () {
                     *   recorder.pause()
                     * })
                     */
                    pause: function pause() {
                        if (this.state === 'recording') {
                            this.state = 'paused';
                            this.em.dispatchEvent(new Event('pause'));
                        }
                    },
                    /**
                     * Resumes media recording when it has been previously paused.
                     *
                     * @return {undefined}
                     *
                     * @example
                     * resumeButton.addEventListener('click', function () {
                     *   recorder.resume()
                     * })
                     */
                    resume: function resume() {
                        if (this.state === 'paused') {
                            this.state = 'recording';
                            this.em.dispatchEvent(new Event('resume'));
                        }
                    },
                    /**
                     * Raise a `dataavailable` event containing the captured media.
                     *
                     * @return {undefined}
                     *
                     * @example
                     * this.on('nextData', function () {
                     *   recorder.requestData()
                     * })
                     */
                    requestData: function requestData() {
                        if (this.state !== 'inactive') {
                            this.encoder.postMessage(['dump', this.context.sampleRate]);
                        }
                    },
                    /**
                     * Add listener for specified event type.
                     *
                     * @param {"start"|"stop"|"pause"|"resume"|"dataavailable"} type Event type.
                     * @param {function} listener The listener function.
                     *
                     * @return {undefined}
                     *
                     * @example
                     * recorder.addEventListener('dataavailable', function (e) {
                     *   audio.src = URL.createObjectURL(e.data)
                     * })
                     */
                    addEventListener: function addEventListener() {
                        this.em.addEventListener.apply(this.em, arguments);
                    },
                    /**
                     * Remove event listener.
                     *
                     * @param {"start"|"stop"|"pause"|"resume"|"dataavailable"} type Event type.
                     * @param {function} listener The same function used in `addEventListener`.
                     *
                     * @return {undefined}
                     */
                    removeEventListener: function removeEventListener() {
                        this.em.removeEventListener.apply(this.em, arguments);
                    },
                    /**
                     * Calls each of the listeners registered for a given event.
                     *
                     * @param {Event} event The event object.
                     *
                     * @return {boolean} Is event was no canceled by any listener.
                     */
                    dispatchEvent: function dispatchEvent() {
                        this.em.dispatchEvent.apply(this.em, arguments);
                    }
                };
                this.isTypeSupported = function isTypeSupported(mimeType) {
                    return /audio\/wave?/.test(mimeType);
                };
                this.notSupported = !navigator.mediaDevices || !AudioContext;
                this.encoder = 'function () {' +
                    'var BYTES_PER_SAMPLE = 2' +
                    'var recorded = []' +
                    'function encode (buffer) {' +
                    'var length = buffer.length' +
                    'var data = new Uint8Array(length * BYTES_PER_SAMPLE)' +
                    'for (var i = 0; i < length; i++) {' +
                    'var index = i * BYTES_PER_SAMPLE' +
                    'var sample = buffer[i]' +
                    'if (sample > 1) {' +
                    'sample = 1' +
                    '} else if (sample < -1) {' +
                    'sample = -1' +
                    '}' +
                    'sample = sample * 32768' +
                    'data[index] = sample' +
                    'data[index + 1] = sample >> 8' +
                    '}' +
                    'recorded.push(data)' +
                    '}' +
                    'function dump (sampleRate) {' +
                    'var bufferLength = recorded.length ? recorded[0].length : 0' +
                    'var length = recorded.length * bufferLength' +
                    'var wav = new Uint8Array(44 + length)' +
                    'var view = new DataView(wav.buffer)' +
                    // RIFF identifier 'RIFF'
                    'view.setUint32(0, 1380533830, false)' +
                    // file length minus RIFF identifier length and file description length
                    'view.setUint32(4, 36 + length, true)' +
                    // RIFF type 'WAVE'
                    'view.setUint32(8, 1463899717, false)' +
                    // format chunk identifier 'fmt '
                    'view.setUint32(12, 1718449184, false)' +
                    // format chunk length
                    'view.setUint32(16, 16, true)' +
                    // sample format (raw)
                    'view.setUint16(20, 1, true)' +
                    // channel count
                    'view.setUint16(22, 1, true)' +
                    // sample rate
                    'view.setUint32(24, sampleRate, true)' +
                    // byte rate (sample rate * block align)
                    'view.setUint32(28, sampleRate * BYTES_PER_SAMPLE, true)' +
                    // block align (channel count * bytes per sample)
                    'view.setUint16(32, BYTES_PER_SAMPLE, true)' +
                    // bits per sample
                    'view.setUint16(34, 8 * BYTES_PER_SAMPLE, true)' +
                    // data chunk identifier 'data'
                    'view.setUint32(36, 1684108385, false)' +
                    // data chunk length
                    'view.setUint32(40, length, true)' +
                    'for (var i = 0; i < recorded.length; i++) {' +
                    'wav.set(recorded[i], i * bufferLength + 44)' +
                    '}' +
                    'recorded = []' +
                    'postMessage(wav.buffer)' +
                    '}' +
                    'onmessage = function (e) {' +
                    "if (e.data[0] === 'encode') {" +
                    'encode(e.data[1])' +
                    '} else {' +
                    'dump(e.data[1])' +
                    '}' +
                    '}' +
                    '}';
                /**
                 * The `MediaStream` passed into the constructor.
                 * @type {MediaStream}
                 */
                this.stream = stream;
                /**
                 * The current state of recording process.
                 * @type {"inactive"|"recording"|"paused"}
                 */
                this.state = 'inactive';
                this.em = document.createDocumentFragment();
                this.encoder = createWorker(MediaRecorder2.encoder);
                var recorder = this;
                this.encoder.addEventListener('message', function (e) {
                    var event = new Event('dataavailable');
                    event.data = new Blob([e.data], { type: recorder.mimeType });
                    recorder.em.dispatchEvent(event);
                    if (recorder.state === 'inactive') {
                        recorder.em.dispatchEvent(new Event('stop'));
                    }
                });
            }
            MediaRecorder2.prototype.createWorker = function (fn) {
                var js = fn
                    .toString()
                    .replace(/^function\s*\(\)\s*{/, '')
                    .replace(/}$/, '');
                var blob = new Blob([js]);
                return new Worker(URL.createObjectURL(blob));
            };
            return MediaRecorder2;
        }());
        test.MediaRecorder2 = MediaRecorder2;
        var Test02 = /** @class */ (function () {
            function Test02() {
                var _this = this;
                this._audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                this._test01 = new test.Test01(true);
                this._test01.createAnalyser.apply(this);
                this._connectAnalyser = this._test01.connectAnalyser.bind(this);
                if (navigator.mediaDevices) {
                    navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {
                        alert('success!');
                        console.log(stream.getTracks());
                        // _this.visualize(stream);
                        _this.initRecorder(stream);
                    }, function (e) {
                        alert('failure! ' + e.name);
                    });
                }
                else {
                    alert('not supported');
                }
            }
            Test02.prototype.visualize = function (stream) {
                var audioSourceNode = this._audioCtx.createMediaStreamSource(stream);
                this._connectAnalyser(audioSourceNode, false);
            };
            // var audioCtx = new AudioContext();
            //         var source = audioCtx.createMediaStreamSource(stream);
            //         // Create a biquadfilter
            //         var biquadFilter = audioCtx.createBiquadFilter();
            //         biquadFilter.type = "lowshelf";
            //         biquadFilter.frequency.value = 1000;
            //         biquadFilter.gain.value = range.value;
            Test02.prototype.initRecorder = function (stream) {
                var _this = this;
                var record = document.createElement('button');
                record.textContent = 'record';
                document.body.appendChild(record);
                var stop = document.createElement('button');
                stop.textContent = 'stop';
                document.body.appendChild(stop);
                console.log('MediaSource.isTypeSupported:', MediaSource.isTypeSupported('audio/wav'));
                console.log('MediaSource.isTypeSupported:', MediaSource.isTypeSupported('audio/mpeg'));
                console.log('MediaRecorder.isTypeSupported:', MediaRecorder.isTypeSupported('audio/wav'));
                console.log('MediaRecorder.isTypeSupported:', MediaRecorder.isTypeSupported('audio/mpeg'));
                var options = {
                    audioBitsPerSecond: 96000,
                };
                var mediaRecorder = new MediaRecorder2(stream, options);
                console.log('mediaRecorder.audioBitsPerSecond:', mediaRecorder.audioBitsPerSecond);
                console.log('mediaRecorder.mimeType:', mediaRecorder.mimeType);
                record.onclick = function () {
                    mediaRecorder.start();
                    console.log(mediaRecorder.state);
                    console.log("recorder started");
                };
                stop.onclick = function () {
                    mediaRecorder.stop();
                    console.log(mediaRecorder.state);
                    console.log("recorder stopped");
                };
                mediaRecorder.onstop = function (e) {
                    console.log(mediaRecorder.state);
                    console.log("data available after MediaRecorder.stop() called.");
                };
                mediaRecorder.ondataavailable = function (e) {
                    var blob = e.data;
                    console.log("blob.type:", blob.type);
                    var fileReader = new FileReader();
                    fileReader.onload = function () {
                        _this.convertArrayBufferToAudioBuffer(this.result);
                    };
                    fileReader.readAsArrayBuffer(blob);
                };
            };
            Test02.prototype.convertArrayBufferToAudioBuffer = function (arrayBuffer) {
                var _this = this;
                this._audioCtx.decodeAudioData(arrayBuffer).then(function (audioBuffer) {
                    _this.playAudioBuffer(audioBuffer);
                }).catch(function (e) {
                    console.log("Error with decoding audio data: " + e.message);
                });
            };
            Test02.prototype.playAudioBuffer = function (audioBuffer) {
                var absNode = this._audioCtx.createBufferSource();
                absNode.onended = function (e) {
                    console.log('onended', e);
                    absNode.stop();
                    absNode.disconnect();
                    absNode.buffer = null;
                    absNode.onended = null;
                    absNode = null;
                };
                absNode.buffer = audioBuffer;
                this._connectAnalyser(absNode);
                absNode.start();
            };
            return Test02;
        }());
        test.Test02 = Test02;
    })(test = audio.test || (audio.test = {}));
})(audio || (audio = {}));
(function (audio) {
    var test;
    (function (test) {
        var Test01 = /** @class */ (function () {
            function Test01(borrowed) {
                this._urlList = [];
                this._audioBuffers = {};
                if (borrowed != true) {
                    // Laya.SoundManager.playSound('res/audio/btn.mp3');
                    // Laya.SoundManager.playMusic('res/audio/bgm.mp3');
                    var _this = this;
                    this._urlList.push('res/audio/btn.mp3');
                    this._urlList.push('res/audio/bgm.mp3');
                    this._urlList.push('res/audio/viper.mp3');
                    this._urlList.push('res/audio/viper.ogg');
                    this._audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                    _this._audioCtx.addEventListener('statechange', function (e) {
                        console.log('statechange', e);
                    });
                    this.loadUrlList();
                    // this.createAnalyser();
                    this.createAnalyser2();
                }
            }
            Test01.prototype.createAnalyser = function () {
                var d = document.createElement('div');
                d.id = 'd';
                document.body.appendChild(d);
                for (var i = 0; i < 128; i++) {
                    d.innerHTML += '<div></div>';
                }
                var dd = document.querySelectorAll('#d div');
                for (var k = 0; k < 128; k++) {
                    dd[k].style.display = 'inline-block';
                    dd[k].style.width = '2px';
                    dd[k].style.margin = '0 0 0 1px';
                    dd[k].style.verticalAlign = 'bottom';
                }
                var df = document.createElement('div');
                df.style.content = '';
                df.style.display = 'inline-block';
                df.style.height = '255px';
                df.style.width = 'px';
                // d.appendChild(df);
                d.insertBefore(df, d.childNodes[0]);
                var analyser = this._analyser = this._audioCtx.createScriptProcessor();
                var num = analyser.bufferSize / 128;
                console.log('bufferSize:', analyser.bufferSize);
                analyser.connect(this._audioCtx.destination);
                analyser.onaudioprocess = function (e) {
                    var input = e.inputBuffer.getChannelData(0);
                    var output = e.outputBuffer.getChannelData(0);
                    for (var i = 0; i < input.length; i++) {
                        output[i] = input[i];
                    }
                    for (var j = 0; j < 128; j++) {
                        dd[j].style.height = output[j * num] * 150 + 'px';
                        dd[j].style.background = 'rgba(' + (255 - j) + ',' + j * 2 + ',0,1)';
                    }
                };
            };
            Test01.prototype.createAnalyser2 = function () {
                var d = document.createElement('div');
                d.id = 'd';
                document.body.appendChild(d);
                for (var i = 0; i < 128; i++) {
                    d.innerHTML += '<div></div>';
                }
                var dd = document.querySelectorAll('#d div');
                for (var k = 0; k < 128; k++) {
                    dd[k].style.display = 'inline-block';
                    dd[k].style.width = '2px';
                    dd[k].style.margin = '0 0 0 1px';
                    dd[k].style.verticalAlign = 'bottom';
                }
                var df = document.createElement('div');
                df.style.content = '';
                df.style.display = 'inline-block';
                df.style.height = '255px';
                df.style.width = 'px';
                // d.appendChild(df);
                d.insertBefore(df, d.childNodes[0]);
                var analyser = this._analyser = this._audioCtx.createAnalyser();
                analyser.fftSize = 2048;
                var num = analyser.fftSize / 128;
                Laya.stage.frameLoop(1, this, function () {
                    var dataArray = new Uint8Array(analyser.fftSize);
                    analyser.getByteFrequencyData(dataArray);
                    for (var j = 0; j < 128; j++) {
                        dd[j].style.height = dataArray[j * num] + 'px';
                        dd[j].style.background = 'rgba(' + (255 - j) + ',' + j * 2 + ',0,1)';
                    }
                });
            };
            Test01.prototype.getAbsNode = function (audioBuffer) {
                var _this = this;
                var absNode = this._audioCtx.createBufferSource();
                absNode.onended = function (e) {
                    console.log('onended', e);
                    _this.clearCurrAbsNode();
                };
                absNode.buffer = audioBuffer;
                // absNode.connect(this._audioCtx.destination);
                this.connectAnalyser(absNode);
                return absNode;
            };
            Test01.prototype.loadUrlList = function () {
                var _this = this;
                this._numCheck = this._urlList.length;
                this._urlList.forEach(function (item, index, array) {
                    _this.loadOneSource(item);
                });
            };
            Test01.prototype.loadOneSource = function (url) {
                var _this = this;
                var xhr = new XMLHttpRequest();
                xhr.responseType = 'arraybuffer';
                xhr.onload = function () {
                    _this._audioCtx.decodeAudioData(xhr.response).then(function (audioBuffer) {
                        _this._audioBuffers[url] = audioBuffer;
                        _this._numCheck--;
                        if (_this._numCheck == 0)
                            _this.onLoadComplete();
                    }).catch(function (e) {
                        console.log("Error with decoding audio data: " + e.message);
                    });
                };
                xhr.open("GET", url);
                xhr.send();
            };
            Test01.prototype.clearCurrAbsNode = function () {
                if (this._currAbsNode) {
                    this._currAbsNode.stop();
                    this._currAbsNode.disconnect();
                    this._currAbsNode.buffer = null;
                    this._currAbsNode.onended = null;
                    this._currAbsNode = null;
                }
            };
            Test01.prototype.onLoadComplete = function () {
                alert('AudioBuffers are Ready!');
                var _this = this;
                document.addEventListener('keyup', function (e) {
                    // Laya.SoundManager.playSound('res/audio/btn.mp3');
                    // Laya.SoundManager.playMusic('res/audio/bgm.mp3');
                    // return;
                    var id = e.keyCode - 49;
                    if (!_this._currAbsNode) {
                        _this._currAbsNode = _this.getAbsNode(_this._audioBuffers[_this._urlList[id]]);
                        console.log("_currAbsNode's url : " + _this._urlList[id]);
                        _this._currAbsNode.loop = true;
                        // _this._currAbsNode.loopStart = 0;
                        // _this._currAbsNode.loopEnd = 1;
                        // _this._currAbsNode.loopStart = 8;
                        // _this._currAbsNode.loopEnd = 10;
                    }
                    else {
                        // console.log("btn's id : " + (id+1));
                        switch (e.keyCode) {
                            case 49://1
                                if (_this._currAbsNode.started) {
                                    console.log("_currAbsNode started");
                                    return;
                                }
                                console.log('start _currAbsNode');
                                _this._currAbsNode.start();
                                _this._currAbsNode.started = true;
                                break;
                            case 50://2
                                if (!_this._currAbsNode.started) {
                                    console.log("_currAbsNode is not playing");
                                    return;
                                }
                                console.log("stop _currAbsNode");
                                _this.clearCurrAbsNode();
                                break;
                            case 51://3
                                // some code here...
                                break;
                            case 52://4
                                var oscillator1 = _this._audioCtx.createOscillator();
                                oscillator1.type = "square";
                                oscillator1.frequency.value = 440;
                                oscillator1.detune.value = -400;
                                oscillator1.connect(_this._audioCtx.destination);
                                oscillator1.start();
                                oscillator1.stop(_this._audioCtx.currentTime + .2);
                                oscillator1.onended = function () { alert('stop'); };
                                break;
                            case 53://5
                                var gainNode = _this._audioCtx.createGain(); // 創建 gainNode
                                gainNode.gain.value = 0.3; // 設定音量
                                _this._currAbsNode.disconnect();
                                _this._currAbsNode.connect(gainNode); // 將聲音連到 gainNode
                                gainNode.connect(_this._audioCtx.destination); // 播放 gainNode
                                break;
                        }
                    }
                });
            };
            Test01.prototype.connectAnalyser = function (node, destination) {
                if (destination === void 0) { destination = true; }
                var _this = this;
                this._analyser.disconnect();
                node.connect(this._analyser);
                if (destination)
                    this._analyser.connect(this._audioCtx.destination);
            };
            return Test01;
        }());
        test.Test01 = Test01;
    })(test = audio.test || (audio.test = {}));
})(audio || (audio = {}));
document.body.innerText = 'ver 0002';
//初始化引擎
Config.preserveDrawingBuffer = true;
Config.isAlpha = true;
Laya.init(800, 800, Laya.WebGL);
Laya.stage.bgColor = 'none';
// Laya.init(500,500);
// Laya.stage.bgColor = null;
Laya.stage.scrollRect = new Laya.Rectangle(0, 0, Laya.stage.width, Laya.stage.height);
// new audio.test.Test01();
new audio.test.Test02();
//# sourceMappingURL=HelloAudio.js.map