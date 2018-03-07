var audio;
(function (audio) {
    var test;
    (function (test) {
        var Test02 = /** @class */ (function () {
            function Test02() {
                // console.log('MediaSource.isTypeSupported:', MediaSource.isTypeSupported('audio/wav'));
                // console.log('MediaSource.isTypeSupported:', MediaSource.isTypeSupported('audio/mpeg'));
                // console.log('MediaRecorder.isTypeSupported:', MediaRecorder.isTypeSupported('audio/wav'));
                // console.log('MediaRecorder.isTypeSupported:', MediaRecorder.isTypeSupported('audio/mpeg'));
                var _this = this;
                this._audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                this._test01 = new test.Test01(true);
                this._test01.createAnalyser.apply(this);
                this._connectAnalyser = this._test01.connectAnalyser.bind(this);
                console.log('sampleRate:', this._audioCtx.sampleRate);
                if (navigator.mediaDevices) {
                    navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {
                        alert('success!');
                        console.log(stream.getTracks());
                        // _this.visualize(stream);
                        // _this.initRecorder(stream);
                        _this.recordMic(stream);
                    }, function (e) {
                        alert(e.name + ' ' + e.message + ' ' + e.code);
                        _this.recordMusic();
                    });
                }
                else {
                    alert('not supported');
                }
            }
            Test02.prototype.recordMic = function (stream) {
                var audioSourceNode = this._audioCtx.createMediaStreamSource(stream);
                var analyser = this._audioCtx.createScriptProcessor();
                var channels = [[], []];
                analyser.onaudioprocess = function (e) {
                    channels[0].push(e.inputBuffer.getChannelData(0).slice());
                };
                audioSourceNode.connect(analyser);
                analyser.connect(this._audioCtx.destination);
                setTimeout(recordend, 5000);
                function recordend() {
                    window.onSendPublicVoiceCont2(channels[0]);
                    analyser.disconnect();
                    audioSourceNode.disconnect();
                    stream.getAudioTracks().forEach(function (track) {
                        track.stop();
                    });
                }
            };
            Test02.prototype.recordMusic = function () {
                var _this = this;
                var myMusic = document.createElement('audio');
                document.body.appendChild(myMusic);
                // myMusic.muted = true;
                myMusic.controls = true;
                myMusic.src = 'res/audio/btn.mp3';
                myMusic.addEventListener('ended', function (e) {
                    console.log('end:', e);
                    // _this.playRecord(dataViews);
                    // _this.playRecord(finish());
                    // _this.playSaved(channels);
                    // _this.compressBa(_this.downsampleBuffer(new Uint8Array(ba.buffer), 8000));
                    window.onSendPublicVoiceCont2(channels[0]);
                    analyser.disconnect();
                });
                myMusic.addEventListener('play', function (e) {
                    console.log('play:', e);
                    node.connect(analyser);
                    analyser.connect(_this._audioCtx.destination);
                });
                var node = this._audioCtx.createMediaElementSource(myMusic);
                this._connectAnalyser(node, true);
                var ba = new Laya.Byte();
                var analyser = this._audioCtx.createScriptProcessor();
                var dataViews = [];
                var numSamples = 0;
                var numChannels = 0;
                var sampleRate = analyser.bufferSize;
                var channels = [[], []];
                numChannels = 1;
                var tt = 0;
                analyser.onaudioprocess = function (e) {
                    // var l = e.inputBuffer.numberOfChannels;
                    // for(var i = 0; i<numChannels; i++){
                    // channels[i] = e.inputBuffer.getChannelData(i);
                    // channels[0].push(e.inputBuffer.getChannelData(0).slice());
                    // }
                    // encode(channels);
                    if (tt > 0 && tt < 20) {
                        console.log("WWWWWWW");
                        channels[0].push(e.inputBuffer.getChannelData(0).slice());
                    }
                    tt++;
                    // if(tt>20 && tt<30){
                    //     console.log("WWWWWWW");
                    //     ba.writeArrayBuffer(e.inputBuffer.getChannelData(0).slice().buffer);
                    // }
                    // tt++;
                };
                function encode(buffer) {
                    var len = buffer[0].length, nCh = numChannels, view = new DataView(new ArrayBuffer(len * nCh * 2)), offset = 0;
                    for (var i = 0; i < len; ++i)
                        for (var ch = 0; ch < nCh; ++ch) {
                            var x = buffer[ch][i] * 0x7fff;
                            view.setInt16(offset, x < 0 ? Math.max(x, -0x8000) : Math.min(x, 0x7fff), true);
                            offset += 2;
                        }
                    dataViews.push(view);
                    numSamples += len;
                }
                ;
                function finish() {
                    var dataSize = numChannels * numSamples * 2, view = new DataView(new ArrayBuffer(44));
                    setString(view, 0, 'RIFF');
                    view.setUint32(4, 36 + dataSize, true);
                    setString(view, 8, 'WAVE');
                    setString(view, 12, 'fmt ');
                    view.setUint32(16, 16, true);
                    view.setUint16(20, 1, true);
                    view.setUint16(22, numChannels, true);
                    view.setUint32(24, sampleRate, true);
                    view.setUint32(28, sampleRate * 4, true);
                    view.setUint16(32, numChannels * 2, true);
                    view.setUint16(34, 16, true);
                    setString(view, 36, 'data');
                    view.setUint32(40, dataSize, true);
                    dataViews.unshift(view);
                    var blob = new Blob(dataViews, { type: 'audio/wav' });
                    // this.cleanup();
                    return blob;
                }
                ;
                function setString(view, offset, str) {
                    var len = str.length;
                    for (var i = 0; i < len; ++i)
                        view.setUint8(offset + i, str.charCodeAt(i));
                }
                ;
            };
            Test02.prototype.downsampleBuffer = function (buffer, rate) {
                // if (rate == sampleRate) {
                //     return buffer;
                // }
                // if (rate > sampleRate) {
                //     throw "downsampling rate show be smaller than original sample rate";
                // }
                var sampleRateRatio = 48000 / rate;
                var newLength = Math.round(buffer.length / sampleRateRatio);
                var result = new Float32Array(newLength);
                var offsetResult = 0;
                var offsetBuffer = 0;
                while (offsetResult < result.length) {
                    var nextOffsetBuffer = Math.round((offsetResult + 1) * sampleRateRatio);
                    var accum = 0, count = 0;
                    for (var i = offsetBuffer; i < nextOffsetBuffer && i < buffer.length; i++) {
                        accum += buffer[i];
                        count++;
                    }
                    result[offsetResult] = accum / count;
                    offsetResult++;
                    offsetBuffer = nextOffsetBuffer;
                }
                return result;
            };
            Test02.prototype.compressBa = function (ba) {
                console.log(new Uint8Array(ba).byteLength);
                // var deflate = new Zlib.Deflate(new Uint8Array(ba));
                // var compressed:Uint8Array = deflate.compress();
                //  console.log('compressed:', compressed.byteLength, compressed.buffer.byteLength, compressed);
                // window.onSendPublicVoiceCont(compressed);
                window.onSendPublicVoiceCont(new Uint8Array(ba));
            };
            // playRecord(views:any[]):void{
            //     var blob = new Blob(views, { type: 'audio/mpeg' });
            //     // var myMusic = document.createElement('audio');
            //     // document.body.appendChild(myMusic);
            //     // myMusic.muted = true;
            //     // myMusic.controls = true;
            //     // myMusic.src = URL.createObjectURL(blob);
            //     // myMusic.addEventListener('ended', function(e):void{
            //     //     console.log('end:', e);
            //     // })
            //     saveAs(blob, 'ttest'+".mp3");
            // }
            // playRecord(b:Blob):void{
            //     var blob = b;
            //     var myMusic = document.createElement('audio');
            //     document.body.appendChild(myMusic);
            //     myMusic.muted = true;
            //     myMusic.controls = true;
            //     myMusic.src = URL.createObjectURL(blob);
            //     myMusic.addEventListener('ended', function(e):void{
            //         console.log('end:', e);
            //     })
            //     saveAs(blob, 'ttest'+".wav");
            // }
            Test02.prototype.playSaved = function (channels) {
                // var numChannels = channels.length;
                var numChannels = 1;
                var num = channels[0].length;
                var numSamples = channels[0][0].length;
                var ind = 0;
                var analyser = this._audioCtx.createScriptProcessor();
                analyser.onaudioprocess = function (e) {
                    console.log(e.outputBuffer.getChannelData(0).length, e.outputBuffer.getChannelData(1).length, num, numSamples);
                    if (ind == num) {
                        analyser.disconnect();
                        return;
                    }
                    var input;
                    var output;
                    for (var i = 0; i < numChannels; i++) {
                        input = channels[i][ind];
                        output = e.outputBuffer.getChannelData(i);
                        for (var j = 0; j < numSamples; j++) {
                            output[j] = input[j];
                        }
                    }
                    ind++;
                };
                // analyser.connect(this._audioCtx.destination);
                this._connectAnalyser(analyser, true);
            };
            Test02.prototype.visualize = function (stream) {
                var audioSourceNode = this._audioCtx.createMediaStreamSource(stream);
                this._connectAnalyser(audioSourceNode, true); //createScriptProcessor  要打開才有數據
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
                var options = {
                    audioBitsPerSecond: 96000,
                };
                var mediaRecorder = new MediaRecorder(stream);
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
                        // _this.convertArrayBufferToAudioBuffer(this.result);
                        var ab = fileReader.result;
                        var u8 = new Uint8Array(ab);
                        playSaved(Array.prototype.slice.call(u8));
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
document.body.innerText = 'ver 0006';
//初始化引擎
Config.preserveDrawingBuffer = true;
Config.isAlpha = true;
Laya.init(800, 800, Laya.WebGL);
Laya.stage.bgColor = 'none';
// Laya.init(500,500);
// Laya.stage.bgColor = null;
Laya.stage.scrollRect = new Laya.Rectangle(0, 0, Laya.stage.width, Laya.stage.height);
// new audio.test.Test01();
var tt2 = new audio.test.Test02();
// ======================================================
/*
var CONFIG: any =
{
    host: "192.168.118.114",
    port: 18080,
    zone: "texas",
    useSSL: false,
    debug: false
};

var account:string = 'test5678';
var password:string = '123456';

var smartFox: SFS2X.SmartFox = new SFS2X.SmartFox(CONFIG);

smartFox.logger.level = SFS2X.LogLevel.DEBUG;
smartFox.logger.enableConsoleOutput = true;
smartFox.logger.enableEventDispatching = true;

smartFox.addEventListener(SFS2X.SFSEvent.CONNECTION, onConnect, this);
smartFox.addEventListener(SFS2X.SFSEvent.LOGIN, onLogin, this);
smartFox.addEventListener(SFS2X.SFSEvent.ROOM_GROUP_SUBSCRIBE, onRoomGroupSubscribe, this);
smartFox.addEventListener(SFS2X.SFSEvent.ROOM_JOIN, onRoomJoin, this);

smartFox.addEventListener(SFS2X.SFSEvent.PUBLIC_MESSAGE, onPublicMessage, this);

// smartFox.logger.addEventListener(SFS2X.LoggerEvent.DEBUG, function(e):void{
//     console.log('DEBUG', e);
// }, this);
// smartFox.logger.addEventListener(SFS2X.LoggerEvent.INFO, function(e):void{
//     console.log('INFO', e);
// }, this);
// smartFox.logger.addEventListener(SFS2X.LoggerEvent.WARNING, function(e):void{
//     console.log('WARNING', e);
// }, this);
// smartFox.logger.addEventListener(SFS2X.LoggerEvent.ERROR, function(e):void{
//     console.log('ERROR', e);
// }, this);
 
smartFox.addEventListener(SFS2X.SFSEvent.CONNECTION_LOST, function(e):void{
    console.log('CONNECTION_LOST', e);
}, this);
 
smartFox.connect();




function onConnect(params: any): void
{
    console.log('CONNECTION', params);
    if (params.success)
    {
        console.log("連線成功 (SFS2X API 版本: " + smartFox.version + "，連線: " + smartFox.config["host"] + ":" + smartFox.config["port"] + " (zone: " + smartFox.config["zone"] + ")");
        console.log('maxMessageSize: ', smartFox.maxMessageSize);

        var accountMD5:string = md5(account);
        var passwordMD5:string = md5(password);

        var sfsObj: SFS2X.SFSObject = new SFS2X.SFSObject();
        sfsObj.putUtfString("device", "LayaWeb");
        sfsObj.putUtfString("auth_type", "WEB");

        smartFox.send(new SFS2X.LoginRequest(accountMD5, passwordMD5, sfsObj, CONFIG.zone));
    }
}

function onLogin(params: any): void
{
    var user: SFS2X.SFSUser = params.user as SFS2X.SFSUser;
    console.log("登入成功 (玩家 ID: " + user.id + "，玩家暱稱: " + account + " (" + user.name + "))");

    smartFox.send(new SFS2X.SubscribeRoomGroupRequest("GAME01_CASH_TABLE"));
}

var targetRoom:SFS2X.SFSRoom;
function onRoomGroupSubscribe(params: any): void
{
    console.log('ROOM_GROUP_SUBSCRIBE', params);
    var rooms:SFS2X.SFSRoom[] = params.newRooms;
    rooms.forEach(element => {
        if(element.name == 'CASH_TABLE33') targetRoom = element;
    });

    smartFox.send(new SFS2X.JoinRoomRequest(targetRoom));

    setTimeout(function():void{
        smartFox.send(new SFS2X.JoinRoomRequest(targetRoom));
    },1000);
}

function onRoomJoin(params: any): void
{
    var room: SFS2X.SFSRoom = params.room;
    console.log("進入房間成功，房間名稱與編號: " + room.name);
}

function onSendPublicVoiceCont(ta:Uint8Array): void
{
    var sfsObj:SFS2X.SFSObject = new SFS2X.SFSObject();
    
    sfsObj.putByteArray("voice_cont", Array.prototype.slice.call(ta));
    sfsObj.putUtfString("type", "voice");

    smartFox.send(new SFS2X.PublicMessageRequest("public_voice_cont", sfsObj, targetRoom));
}



function onPublicMessage(params: any): void
{
    console.log('PUBLIC_MESSAGE', params);

    var sfsObj:SFS2X.SFSObject = params.data;
    if (sfsObj.getUtfString("type") == "voice")
    {
        var voice_cont = sfsObj.getByteArray("voice_cont");
        
        playSaved(voice_cont);
        return;
    }

}
*/
function onSendPublicVoiceCont2(taArr) {
    var bufferSize = taArr[0].length;
    var arr = [];
    while (taArr.length > 0) {
        var ta = taArr.shift();
        arr = arr.concat(Array.prototype.slice.call(ta));
    }
    var f32 = Float32Array.from(arr);
    console.log('before:', f32.byteLength);
    f32 = downSampleBuffer(f32, 48000, 8000);
    console.log('after:', f32.byteLength);
    var u8 = new Uint8Array(f32.buffer);
    arr = Array.prototype.slice.call(u8);
    // playSaved(arr, bufferSize);
    var sfsObj = new SFS2X.SFSObject();
    sfsObj.putByteArray("voice_cont", arr);
    sfsObj.putUtfString("type", "voice");
    var o = sfsObj.toBinary();
    console.log('sfsObj.toBinary:', o.byteLength, o);
    console.log('max 65536 is overload?', o.byteLength > 65536);
    // smartFox.send(new SFS2X.PublicMessageRequest("public_voice_cont", sfsObj, targetRoom));
    sendToGD(u8);
}
function sendToGD(u8) {
    var blob = new Blob([u8]);
    var url = 'https://script.google.com/macros/s/AKfycbxGwIdcplbGGMOM6rf10Jl0HFGZbHaDjxR8s9YKGqxTfLmG0Sg/exec';
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", url, true);
    var _this = this;
    xmlhttp.onreadystatechange = function () {
        console.log(xmlhttp.status);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            alert(xmlhttp.responseText);
        }
    };
    xmlhttp.upload.onerror = function (a) {
        console.log('onerror:', a);
    };
    xmlhttp.send(blob);
}
function playSaved(voice_cont, bufferSize) {
    var u8 = new Uint8Array(voice_cont);
    var f32 = new Float32Array(u8.buffer);
    var r = 48000 / 8000;
    var l = f32.length;
    var i = 0;
    var audioCtx = tt2._audioCtx;
    var analyser = audioCtx.createScriptProcessor();
    analyser.onaudioprocess = function (e) {
        var output = e.outputBuffer.getChannelData(0);
        for (var j = 0; j < bufferSize; j++) {
            var p = Math.round(i / r);
            if (p == l) {
                analyser.disconnect();
                break;
            }
            output[j] = f32[p];
            i++;
        }
    };
    // analyser.connect(this._audioCtx.destination);
    tt2._connectAnalyser(analyser, true);
}
function downSampleBuffer(f32, currRate, tarRate) {
    if (currRate == tarRate || currRate < tarRate) {
        return f32;
    }
    else {
        var r = currRate / tarRate;
        var l = f32.length;
        var n = Math.floor(l / r) + 1;
        var result = new Float32Array(n);
        for (var i = 0; i < n; i++) {
            result[i] = f32[Math.round(r * i)];
        }
        return result;
    }
}
// function downsampleBuffer(buffer, rate):Float32Array {
//     // if (rate == sampleRate) {
//     //     return buffer;
//     // }
//     // if (rate > sampleRate) {
//     //     throw "downsampling rate show be smaller than original sample rate";
//     // }
//     var sampleRateRatio = Math.round(48000 / rate); //计算压缩率，注意这里要取整数
//     var newLength = Math.round(buffer.length / sampleRateRatio);
//     var result = new Float32Array(newLength);
//     var offsetResult = 0;
//     var offsetBuffer = 0;
//     while (offsetResult < result.length) {
//         var nextOffsetBuffer = Math.round((offsetResult + 1) * sampleRateRatio);
//         var accum = 0,
//             count = 0;
//         for (var i = offsetBuffer; i < nextOffsetBuffer && i < buffer.length; i++) {
//             accum += buffer[i];
//             count++;
//         }
//         result[offsetResult] = accum / count;
//         offsetResult++;
//         offsetBuffer = nextOffsetBuffer;
//     }
//     return result;
// } 
//# sourceMappingURL=HelloAudio.js.map