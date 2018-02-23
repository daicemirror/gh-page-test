var audio;
(function (audio) {
    var test;
    (function (test) {
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
                        _this.initRecorder(stream);
                    }, function (e) {
                        alert('failure! ' + e.name);
                    });
                }
                else {
                    alert('not supported');
                }
            }
            //         initRecorder(stream:MediaStream):void{
            //         }
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
                var mediaRecorder = new MediaRecorder(stream, options);
                console.log('MediaRecorder.audioBitsPerSecond:', MediaRecorder.audioBitsPerSecond);
                // visualize(stream);
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
                    var blob = mediaRecorder.requestData();
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
                // this._connectAnalyser(absNode);
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
                    this.createAnalyser();
                    // this.createAnalyser2();
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
            Test01.prototype.connectAnalyser = function (node) {
                var _this = this;
                this._analyser.disconnect();
                node.connect(this._analyser);
                this._analyser.connect(this._audioCtx.destination);
            };
            return Test01;
        }());
        test.Test01 = Test01;
    })(test = audio.test || (audio.test = {}));
})(audio || (audio = {}));
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