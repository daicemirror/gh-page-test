var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var F2;
    (function (F2) {
        var AAAAVUI = /** @class */ (function (_super) {
            __extends(AAAAVUI, _super);
            function AAAAVUI() {
                return _super.call(this) || this;
            }
            AAAAVUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.F2.AAAAVUI.uiView);
            };
            AAAAVUI.uiView = { "type": "View", "props": { "width": 300, "height": 300 }, "child": [{ "type": "Circle", "props": { "y": 253, "x": 49, "radius": 30, "lineWidth": 1, "fillColor": "#ff0000" }, "compId": 3 }, { "type": "Animation", "props": { "y": 124, "x": 196, "source": "AAAAN.ani" } }], "animations": [{ "nodes": [{ "target": 3, "keyframes": { "y": [{ "value": 253, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "y", "index": 0 }, { "value": 53, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "y", "index": 20 }], "x": [{ "value": 49, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "x", "index": 0 }, { "value": 231, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "x", "index": 20 }] } }], "name": "ani1", "id": 1, "frameRate": 24, "action": 0 }] };
            return AAAAVUI;
        }(View));
        F2.AAAAVUI = AAAAVUI;
    })(F2 = ui.F2 || (ui.F2 = {}));
})(ui || (ui = {}));
(function (ui) {
    var F2;
    (function (F2) {
        var V2UI = /** @class */ (function (_super) {
            __extends(V2UI, _super);
            function V2UI() {
                return _super.call(this) || this;
            }
            V2UI.prototype.createChildren = function () {
                View.regComponent("Text", laya.display.Text);
                _super.prototype.createChildren.call(this);
                this.createView(ui.F2.V2UI.uiView);
            };
            V2UI.uiView = { "type": "View", "props": { "width": 300, "height": 300 }, "child": [{ "type": "Text", "props": { "y": 201, "x": 39, "width": 128, "var": "v2Text", "text": "qwerty", "height": 112, "fontSize": 60, "font": "desyrel" } }] };
            return V2UI;
        }(View));
        F2.V2UI = V2UI;
    })(F2 = ui.F2 || (ui.F2 = {}));
})(ui || (ui = {}));
(function (ui) {
    var V1UI = /** @class */ (function (_super) {
        __extends(V1UI, _super);
        function V1UI() {
            return _super.call(this) || this;
        }
        V1UI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.V1UI.uiView);
        };
        V1UI.uiView = { "type": "View", "props": { "width": 600, "height": 400 }, "child": [{ "type": "Label", "props": { "y": 93, "x": 148, "width": 236, "text": "sdgg", "height": 191, "fontSize": 60, "font": "ssf4abuket", "bold": false } }] };
        return V1UI;
    }(View));
    ui.V1UI = V1UI;
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map