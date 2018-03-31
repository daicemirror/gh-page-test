var com;
(function (com) {
    var ifalo;
    (function (ifalo) {
        var slot;
        (function (slot) {
            var warrior;
            (function (warrior) {
                var model;
                (function (model) {
                    var po;
                    (function (po) {
                        var SFRequests = lists.SFRequests;
                        var SFServerPO = /** @class */ (function () {
                            function SFServerPO() {
                                // ---- [Property] ----- + ---------- + ---------- + ----------
                                /** Smart Fox 連線參數設定 */
                                this.CONFIG = {
                                    host: "192.168.118.114",
                                    port: 8080,
                                    zone: "slot",
                                    useSSL: false,
                                    debug: false
                                };
                                /** Smart Fox Server 是否連線成功 */
                                this.isConnectSucs = false;
                                /** Smart Fox Server 對玩家的登入成功 */
                                this.isLoginSucs = false;
                            }
                            Object.defineProperty(SFServerPO, "instance", {
                                get: function () {
                                    return SFServerPO._instance || (SFServerPO._instance = new SFServerPO());
                                },
                                enumerable: true,
                                configurable: true
                            });
                            /** 物件清除與摧毀 */
                            SFServerPO.prototype.dispose = function () {
                                SFServerPO._instance = null;
                            };
                            // ---- [Public Method] ----- + ---------- + ---------- + ----------
                            SFServerPO.prototype.init = function () {
                                this.isConnectSucs = false;
                                this.isLoginSucs = false;
                                this.loginAccount = null;
                                this.loginPassword = null;
                                this.smartFox = null;
                                this.marqueeId = 0;
                                this.marqueeMsgs = null;
                                this.macInfos = null;
                            };
                            // ---- [Player Info] ----- + ---------- + ---------- + ----------
                            /** 記憶帳號密碼，空字串表示不記憶 */
                            SFServerPO.prototype.setPlayerInfo = function (account, password) {
                                Laya.LocalStorage.setItem("account", account);
                                Laya.LocalStorage.setItem("password", password);
                            };
                            /** 取得已記憶的帳號密碼，空字串表示未記憶 */
                            SFServerPO.prototype.getPlayerInfo = function () {
                                var account = Laya.LocalStorage.getItem("account");
                                var password = Laya.LocalStorage.getItem("password");
                                return { account: account ? account : "", password: password ? password : "" };
                            };
                            /** 清除已記憶的密碼 */
                            SFServerPO.prototype.clearPlayerInfo = function () {
                                Laya.LocalStorage.removeItem("password");
                            };
                            // ---- [Short Cut Method] ----- + ---------- + ---------- + ----------
                            /**
                             * [Short Cut] 判斷若啟用 SF Server，將資料傳送至 Server
                             * @param param	若為 null，預設自動生成: new SFSObject()
                             */
                            SFServerPO.send = function (requestCmd, param, isPL) {
                                if (param === void 0) { param = null; }
                                if (isPL === void 0) { isPL = true; }
                                if (this.instance.smartFox != null)
                                    this.instance.smartFox.send(SFRequests.toServer(requestCmd, param ? param : new SFS2X.SFSObject(), null, isPL));
                            };
                            /**
                             * [Short Cut] 判斷若啟用 SF Server，將資料傳送至 Server，並攜帶房間資訊
                             * @param param	若為 null，預設自動生成: new SFSObject()
                             * @param room	若為 null，預設使用最後加入的房間 (LastJoinedRoom)
                             */
                            SFServerPO.sendWithRoom = function (requestCmd, param, room, isPL) {
                                if (param === void 0) { param = null; }
                                if (room === void 0) { room = null; }
                                if (isPL === void 0) { isPL = true; }
                                if (this.instance.smartFox != null)
                                    this.instance.smartFox.send(SFRequests.toServer(requestCmd, param ? param : new SFS2X.SFSObject(), room ? room : this.instance.smartFox.lastJoinedRoom, isPL));
                            };
                            /** [Short Cut] 判斷若啟用 SF Server，將資料傳送至 Server */
                            SFServerPO.sendRequest = function (request) {
                                if (this.instance.smartFox != null)
                                    this.instance.smartFox.send(request);
                            };
                            Object.defineProperty(SFServerPO.prototype, "hasUsrVars", {
                                // ---- [Accessor] ----- + ---------- + ---------- + ----------
                                /** 是否已初始化玩家變數 */
                                get: function () { return this.smartFox.mySelf.getVariables().length > 0; },
                                enumerable: true,
                                configurable: true
                            });
                            Object.defineProperty(SFServerPO.prototype, "account", {
                                /** 玩家帳號 */
                                get: function () { return this.smartFox.mySelf.getVariable("account").value; },
                                enumerable: true,
                                configurable: true
                            });
                            Object.defineProperty(SFServerPO.prototype, "name", {
                                /** 玩家暱稱 */
                                get: function () { return this.smartFox.mySelf.getVariable("name").value; },
                                enumerable: true,
                                configurable: true
                            });
                            Object.defineProperty(SFServerPO.prototype, "id", {
                                /** 玩家 ID */
                                get: function () { return this.smartFox.mySelf.getVariable("id").value; },
                                enumerable: true,
                                configurable: true
                            });
                            Object.defineProperty(SFServerPO.prototype, "level", {
                                /** 玩家等級 */
                                get: function () { return this.smartFox.mySelf.getVariable("level").value; },
                                enumerable: true,
                                configurable: true
                            });
                            Object.defineProperty(SFServerPO.prototype, "cash", {
                                /** 儲值金幣 */
                                get: function () { return this.smartFox.mySelf.getVariable("chips").value; },
                                enumerable: true,
                                configurable: true
                            });
                            Object.defineProperty(SFServerPO.prototype, "jackpot", {
                                /** 玩家 Jackpot 累積金額 */
                                get: function () { return this.smartFox.mySelf.getVariable("jackpot").value; },
                                enumerable: true,
                                configurable: true
                            });
                            Object.defineProperty(SFServerPO.prototype, "currency", {
                                /** 玩家使用的貨幣類型 */
                                get: function () { return this.smartFox.mySelf.getVariable("currency").value; },
                                enumerable: true,
                                configurable: true
                            });
                            return SFServerPO;
                        }());
                        po.SFServerPO = SFServerPO;
                    })(po = model.po || (model.po = {}));
                })(model = warrior.model || (warrior.model = {}));
            })(warrior = slot.warrior || (slot.warrior = {}));
        })(slot = ifalo.slot || (ifalo.slot = {}));
    })(ifalo = com.ifalo || (com.ifalo = {}));
})(com || (com = {}));
//# sourceMappingURL=SFServerPO.js.map