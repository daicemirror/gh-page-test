var xhr;
(function (xhr) {
    var test;
    (function (test) {
        var Test06 = /** @class */ (function () {
            function Test06() {
                var _this = this;
                var _btn = document.createElement('button');
                _btn.textContent = 'Show confirm';
                _btn.style.position = 'absolute';
                _btn.style.zIndex = '9999';
                _btn.onclick = function () {
                    if (confirm('In confirm')) {
                        console.log('user clicked ok');
                        _this.input();
                    }
                    else {
                        console.log('user clicked cancel');
                    }
                };
                document.body.appendChild(_btn);
            }
            Test06.prototype.input = function () {
                var _input = document.createElement('input');
                _input.style.position = 'absolute';
                _input.style.zIndex = '9999';
                _input.type = 'file';
                // _input.multiple = true;
                _input.onchange = previewFiles;
                // document.body.appendChild(_input);
                _input.click();
                function previewFiles() {
                    var files = _input.files;
                    function readAndPreview(file) {
                        // Make sure `file.name` matches our extensions criteria
                        if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
                            var reader = new FileReader();
                            reader.addEventListener("load", function () {
                                var image = new Image();
                                image.height = 100;
                                image.title = file.name;
                                image.src = this.result;
                                document.body.appendChild(image);
                            }, false);
                            reader.readAsDataURL(file);
                        }
                    }
                    //有時沒選檔案也會進來, files.lenght可能為0
                    if (files) {
                        [].forEach.call(files, readAndPreview);
                    }
                }
            };
            return Test06;
        }());
        test.Test06 = Test06;
        var Test05 = /** @class */ (function () {
            function Test05(token) {
                this._token = token;
                var _this = this;
                var url = 'https://www.penghu-nsa.gov.tw/FileDownload/Album/Big/20161012162551758864338.jpg';
                if (url) {
                    this.xmlhttp = new XMLHttpRequest();
                    this.xmlhttp.responseType = 'blob';
                    this.xmlhttp.onreadystatechange = function (e) {
                        _this.state_Change(e);
                    };
                    this.xmlhttp.open("GET", url);
                    this.xmlhttp.send();
                }
                var file = Laya.Browser.document.createElement("input");
                file.type = "file";
                file.style.position = "absolute";
                file.style.zIndex = 999;
                Laya.Browser.document.body.appendChild(file); //添加到舞台
                file.onchange = function (e) {
                    if (file.files.length) {
                        var ii = new Laya.Image(URL.createObjectURL(file.files[0]));
                        // window.URL.revokeObjectURL(file.files[0]); // 清除释放
                    }
                };
                // Laya.timer.once(10000, this,function():void{
                //     var canvas:HTMLCanvasElement = document.getElementById('layaCanvas') as HTMLCanvasElement;
                //     // canvas.toBlob(function(blob) {
                //     //     var ii:Laya.Image = new Laya.Image(URL.createObjectURL(blob));
                //     //     window.URL.revokeObjectURL(blob); // 清除释放
                //     //     ii.x = ii.y = 50;
                //     //     Laya.stage.addChild(ii);
                //     // });
                //     var imageData:string = canvas.toDataURL('image/png', 1);
                //     var ii:Laya.Image = new Laya.Image(imageData);
                //     ii.x = ii.y = 50;
                //     Laya.stage.addChild(ii);
                //     alert('!!!!!!!!!!!!!!!!');
                //     var zoomImg = new Laya.Sprite();
                //     zoomImg.autoSize = true;
                //     zoomImg.pos(25, 0);
                //     var htmlC: Laya.HTMLCanvas = Laya.stage.drawToCanvas(200, 200,-50,0);
                //     htmlC.size(100,100);
                //     alert(htmlC.width + "_" +  htmlC.height + '!!!!!!!!!!!!!!!!');
                //     var _texture: Laya.Texture = new Laya.Texture(htmlC);
                //     zoomImg.graphics.drawTexture(_texture,);
                //     Laya.stage.addChild(zoomImg);
                //     alert(zoomImg.width + "_" +  zoomImg.height + '!!!!!!!!!!!!!!!!');
                //     (htmlC.getCanvas() as HTMLCanvasElement).toBlob(function(blob) {
                //         alert(blob);
                //     });
            }
            ;
            Test05.prototype.state_Change = function (e) {
                try {
                    if (this.xmlhttp.readyState == 4) {
                        if (this.xmlhttp.status == 200) {
                            var s = URL.createObjectURL(this.xmlhttp.response);
                            var ii = new Laya.Image(s);
                            // window.URL.revokeObjectURL(s); // 清除释放
                            // Laya.stage.addChild(ii);
                            ii.once(Laya.Event.LOADED, this, function () {
                                this.clipImage(ii);
                            });
                        }
                        else {
                            alert("Problem retrieving data");
                        }
                    }
                }
                catch (e) {
                    //In the event of a communication error (such as the server going down), an exception will be thrown in the onreadystatechange method when accessing the response status. To mitigate this problem, you could wrap your if...then statement in a try...catch:
                    alert('Caught Exception: ' + e.description);
                }
            };
            Test05.prototype.clipImage = function (ii) {
                var _this = this;
                Laya.stage.frameOnce(1, this, function () {
                    var hc = ii.drawToCanvas(200, 200, -100, -100);
                    hc.getCanvas().toBlob(function (blob) {
                        var s = URL.createObjectURL(blob);
                        // var ii2:Laya.Image = new Laya.Image(s);
                        // Laya.stage.addChild(ii2);
                        _this.sendPic(blob);
                    });
                });
                // Laya.stage.frameOnce(10,this,function():void{
                //     var canvas:HTMLCanvasElement = document.getElementById('layaCanvas') as HTMLCanvasElement;
                //     canvas.toBlob(function(blob:Blob):void{
                //         var s = URL.createObjectURL(blob)
                //         var ii2:Laya.Image = new Laya.Image(s);
                //             // window.URL.revokeObjectURL(s); // 清除释放
                //             ii2.x = 20;
                //             ii2.y = 150;
                //             Laya.stage.addChild(ii2);
                //     });
                // });
                //兩種方式, 用原生拍Canvas, 需要delay到10影格, WHY?
            };
            Test05.prototype.sendPic = function (blob) {
                var url = 'http://stage.sytepoker.com/api/v2/slot/player/mobile/photo?token=' + this._token;
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.open("POST", url, true);
                var _this = this;
                xmlhttp.onreadystatechange = function () {
                    console.log(xmlhttp.status);
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        alert(xmlhttp.responseText);
                    }
                };
                // xmlhttp.upload.onerror = function(a):void{
                //     console.log('onerror:', a);
                // }
                xmlhttp.send(blob);
                var fromData = new FormData();
                fromData.append("file", blob);
                xmlhttp.open("post", url, true);
                xmlhttp.send(fromData);
            };
            return Test05;
        }());
        test.Test05 = Test05;
        var Test04 = /** @class */ (function () {
            function Test04() {
                var file = Laya.Browser.document.createElement("input");
                file.type = "file";
                file.style.position = "absolute";
                file.style.zIndex = 999;
                Laya.Browser.document.body.appendChild(file); //添加到舞台
                var fileReader = new Laya.Browser.window.FileReader();
                file.onchange = function (e) {
                    if (file.files.length) {
                        // var ii:Laya.Image = new Laya.Image(URL.createObjectURL(file.files[0]));
                        // window.URL.revokeObjectURL(file.files[0]); // 清除释放
                        // ii.x = ii.y = 50;
                        // Laya.stage.addChild(ii);
                        fileReader.readAsDataURL(file.files[0]);
                        // fileReader.readAsArrayBuffer(file.files[0]);
                    }
                };
                fileReader.onload = function (evt) {
                    if (Laya.Browser.window.FileReader.DONE == fileReader.readyState) {
                        var sp = new Laya.Sprite();
                        // sp.x = sp.y = 100;
                        sp.loadImage(fileReader.result, 0, 0, 300, 300);
                        // sp.loadImage(URL.createObjectURL(bb),0,0,300,300);
                        // window.URL.revokeObjectURL(bb); // 清除释放
                        Laya.stage.addChild(sp);
                    }
                };
                Laya.timer.once(10000, this, function () {
                    var canvas = document.getElementById('layaCanvas');
                    // canvas.toBlob(function(blob) {
                    //     var ii:Laya.Image = new Laya.Image(URL.createObjectURL(blob));
                    //     window.URL.revokeObjectURL(blob); // 清除释放
                    //     ii.x = ii.y = 50;
                    //     Laya.stage.addChild(ii);
                    // });
                    var imageData = canvas.toDataURL('image/png', 1);
                    var ii = new Laya.Image(imageData);
                    ii.x = ii.y = 50;
                    Laya.stage.addChild(ii);
                    alert('!!!!!!!!!!!!!!!!');
                    var zoomImg = new Laya.Sprite();
                    zoomImg.autoSize = true;
                    zoomImg.pos(25, 0);
                    var htmlC = Laya.stage.drawToCanvas(200, 200, -50, 0);
                    htmlC.size(100, 100);
                    alert(htmlC.width + "_" + htmlC.height + '!!!!!!!!!!!!!!!!');
                    var _texture = new Laya.Texture(htmlC);
                    zoomImg.graphics.drawTexture(_texture);
                    Laya.stage.addChild(zoomImg);
                    alert(zoomImg.width + "_" + zoomImg.height + '!!!!!!!!!!!!!!!!');
                    htmlC.getCanvas().toBlob(function (blob) {
                        alert(blob);
                    });
                    //canvas
                    // var ca = document.createElement('canvas');
                    // console.log(ca.style.zIndex = 99999);
                    // console.log(ca.style.position = 'absolute');
                    // console.log(ca.style);
                    // var ct = ca.getContext('2d');
                    // ct.rotate(10 * Math.PI / 180);
                    // var mm = new Image();
                    // mm.src = 'https://cdn.free.com.tw/blog/wp-content/uploads/2014/08/Placekitten480-g.jpg';
                    // mm.addEventListener('load', function():void{
                    //     ct.drawImage(mm, 0, 0);
                    //     document.body.appendChild(ca);
                    // });
                });
            }
            return Test04;
        }());
        test.Test04 = Test04;
        var Test03 = /** @class */ (function () {
            function Test03() {
                var url = 'https://d2jcw5q7j4vmo4.cloudfront.net/gYfSu-9HO7KbPR2nN1Pi51agZr_YIhDuOpWsI_EtBVZpLQTEmmyrVFf0qCWf9lRFkPQj=w300';
                this.xmlhttp = new XMLHttpRequest();
                // this.xmlhttp.responseType = 'arraybuffer';
                this.xmlhttp.responseType = 'blob';
                this.xmlhttp.onreadystatechange = this.state_Change;
                this.xmlhttp.open("GET", url);
                this.xmlhttp.send();
            }
            Test03.prototype.state_Change = function (e) {
                // alert(e);
                // alert(this);
                var self = e.target;
                try {
                    if (self.readyState == 4) {
                        if (self.status == 200) {
                            var res = self.response;
                            console.log('xhr.status is: ' + self.status);
                            console.log('returned content-type is: ' + self.getResponseHeader('Content-Type'));
                            console.log('returned content-length is: ' + self.getResponseHeader('Content-Length'));
                            // var returnedBlob = new Blob([self.response], {type: 'image/png'});
                            // var ii:Laya.Image = new Laya.Image(URL.createObjectURL(returnedBlob));
                            var ii = new Laya.Image(URL.createObjectURL(self.response));
                            window.URL.revokeObjectURL(self.response); // 清除释放
                            // ii.x = ii.y = 50;
                            Laya.stage.addChild(ii);
                        }
                        else {
                            alert("Problem retrieving data");
                        }
                    }
                }
                catch (e) {
                    //In the event of a communication error (such as the server going down), an exception will be thrown in the onreadystatechange method when accessing the response status. To mitigate this problem, you could wrap your if...then statement in a try...catch:
                    alert('Caught Exception: ' + e.description);
                }
            };
            return Test03;
        }());
        test.Test03 = Test03;
        var Test02 = /** @class */ (function () {
            function Test02() {
                var url = 'http://stage.sytepoker.com/api/v2/slot/player/trial';
                // var token:string = 'eyJpdiI6IjZ5dFB0elNGRVpSRE1JVHFOVmJGOUE9PSIsInZhbHVlIjoiVTJGWWRwM0VYSEh2R1BJRGxQSER4ZDVIc0NEd01XT2FMV0RtUDV0RzFJNnkwTU5xT0Y4Unlvam1uK0pHRHR1WWRQRXFveXZnRTlDV3NWdjBrSVcweE5keG5ibStWVjhOdld4U1RVNFRabnVRTEZra2xWVnRiZVZYSTFUem1mdndSMXNFU0JsVTBXcG1iUFhSRGdqd0QxZ1lFUVU4S3lHSTdaUVdTYU1kVHpRPSIsIm1hYyI6IjViNDc2NzRjODI0OWU3ZmJlYjQzN2Y5NzQwZjFkZTlmMDIyYjdjYzQ3Y2FhZGRhYTliODlhZjAwODAzOGQ4NDQifQ==';
                // var url:string = 'http://stage.sytepoker.com/api/v2/slot/player/mobile/info?token=' + token;
                // var url:string = 'http://stage.sytepoker.com/api/v2/slot/player/mobile/login?token=' + token;
                this.xmlhttp = new XMLHttpRequest();
                this.xmlhttp.onreadystatechange = this.state_Change;
                this.xmlhttp.open("GET", url);
                this.xmlhttp.send();
            }
            Test02.prototype.state_Change = function (e) {
                // alert(e);
                // alert(this);
                var self = e.target;
                try {
                    if (self.readyState == 4) {
                        if (self.status == 200) {
                            var res = self.response;
                            if (typeof '' == 'string' && res != '') {
                                var $object = JSON.parse(res);
                                console.log($object.token);
                                new Test05($object.token);
                                // console.log($object.data.account);
                            }
                            else {
                                alert('Could not parse JSON');
                            }
                        }
                        else {
                            alert("Problem retrieving JSON data");
                        }
                    }
                }
                catch (e) {
                    //In the event of a communication error (such as the server going down), an exception will be thrown in the onreadystatechange method when accessing the response status. To mitigate this problem, you could wrap your if...then statement in a try...catch:
                    alert('Caught Exception: ' + e.description);
                }
            };
            return Test02;
        }());
        test.Test02 = Test02;
        var Test01 = /** @class */ (function () {
            function Test01() {
                var url = "https://pha168-apps-stage.sytepoker.com/apps/test-keno/version";
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.addEventListener("loadend", loadEnd);
                xmlhttp.addEventListener("progress", updateProgress);
                xmlhttp.addEventListener("load", transferComplete);
                xmlhttp.addEventListener("error", transferFailed);
                xmlhttp.addEventListener("abort", transferCanceled);
                xmlhttp.onreadystatechange = state_Change;
                // xmlhttp.responseType = 'arraybuffer';
                // xmlhttp.responseType = 'json';
                xmlhttp.open("GET", url, true);
                xmlhttp.send();
                function state_Change() {
                    try {
                        alert("readyState: " + xmlhttp.readyState + " \n "
                            + "status: " + xmlhttp.status + " \n "
                            + "statusText: " + xmlhttp.statusText + " \n "
                            // + "responseText: " + xmlhttp.responseText + " \n "
                            + "response: " + xmlhttp.response + " \n "
                            // + "response ver: " + (xmlhttp.response && xmlhttp.response.iOS.mobile.ver) + " \n "
                            + "getResponseHeader('cache-control'): " + xmlhttp.getResponseHeader('cache-control') + " \n "
                            + "getResponseHeader('content-type'): " + xmlhttp.getResponseHeader('content-type') + " \n "
                            + "getAllResponseHeaders(): " + xmlhttp.getAllResponseHeaders());
                        if (xmlhttp.readyState == 4) {
                            if (xmlhttp.status == 200) {
                                // ...our code here...
                                // alert(xmlhttp.readyState + " & " + xmlhttp.status + " & " + xmlhttp.statusText + " & " + xmlhttp.responseText);
                                var oo = JSON.parse(xmlhttp.responseText);
                                alert("ver: " + oo.iOS.mobile.ver);
                            }
                            else {
                                alert("Problem retrieving XML data");
                            }
                        }
                    }
                    catch (e) {
                        //In the event of a communication error (such as the server going down), an exception will be thrown in the onreadystatechange method when accessing the response status. To mitigate this problem, you could wrap your if...then statement in a try...catch:
                        alert('Caught Exception: ' + e.description);
                    }
                }
                function updateProgress(oEvent) {
                    if (oEvent.lengthComputable) {
                        var percentComplete = oEvent.loaded / oEvent.total;
                        // ...
                    }
                    else {
                        // Unable to compute progress information since the total size is unknown
                        console.log("Unable to compute progress information since the total size is unknown.");
                    }
                }
                function transferComplete(evt) {
                    console.log("The transfer is complete.");
                }
                function transferFailed(evt) {
                    console.log("An error occurred while transferring the file.");
                }
                function transferCanceled(evt) {
                    console.log("The transfer has been canceled by the user.");
                }
                function loadEnd(e) {
                    console.log("The transfer finished (although we don't know if it succeeded or not).");
                }
            }
            return Test01;
        }());
        test.Test01 = Test01;
    })(test = xhr.test || (xhr.test = {}));
})(xhr || (xhr = {}));
//初始化引擎
Config.preserveDrawingBuffer = true;
Config.isAlpha = true;
Laya.init(800, 800, Laya.WebGL);
Laya.stage.bgColor = 'none';
// Laya.init(500,500);
// Laya.stage.bgColor = null;
Laya.stage.scrollRect = new Laya.Rectangle(0, 0, Laya.stage.width, Laya.stage.height);
new xhr.test.Test06();
//# sourceMappingURL=HelloXhr.js.map