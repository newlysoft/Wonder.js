/// <reference path="../../filePath.d.ts"/>
module wd {
    export class CustomEventHandler extends EventHandler{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        }

        public on(eventName:string, handler:Function, priority:number):void;
        public on(target:GameObject, eventName:string, handler:Function, priority:number):void;

        public on(...args) {
            if(args.length === 3){
                let eventName = args[0],
                    handler = args[1],
                    originHandler = handler,
                    priority = args[2];

                EventRegister.getInstance().register(
                    null,
                    <any>eventName,
                    handler,
                    originHandler,
                    null,
                    priority
                );
            }
            else if(args.length === 4){
                let target = args[0],
                    eventName = args[1],
                    handler = args[2],
                    originHandler = handler,
                    priority = args[3];

                EventRegister.getInstance().register(
                    target,
                    <any>eventName,
                    handler,
                    originHandler,
                    null,
                    priority
                );
            }
        }

        public off(eventName:string):void;
        public off(uid:number, eventName:string):void;
        public off(eventName:string, handler:Function):void;
        public off(target:GameObject, eventName:string, handler:Function):void;

        public off(...args) {
            var eventRegister = EventRegister.getInstance();

            eventRegister.remove.apply(eventRegister, args);
        }

        public trigger(event:Event):boolean;
        public trigger(event:Event, userData:any):boolean;
        public trigger(target:GameObject, event:Event, notSetTarget:boolean):boolean;
        public trigger(target:GameObject, event:Event, userData:any, notSetTarget:boolean):boolean;

        public trigger(...args):boolean {
            var event:Event = null;

            if(args.length === 1 || args.length === 2){
                let userData = null;

                if(args.length === 1){
                    event = args[0];
                }
                else{
                    event = args[0];
                    userData = args[1];
                }

                return this._triggerEventHandler(event, userData);
            }
            else if(args.length === 3 || args.length === 4){
                let target = null,
                    userData = null,
                    notSetTarget = null;

                if(args.length === 3){
                    target = args[0];
                    event = args[1];
                    notSetTarget = args[2];
                }
                else{
                    target = args[0];
                    event = args[1];
                    userData = args[2];
                    notSetTarget = args[3];
                }

                return this._triggerTargetAndEventHandler(target, event, userData, notSetTarget);
            }

        }

        private _triggerEventHandler(event, userData){
            var listenerDataList:wdCb.Collection<EventRegisterData> = null,
                self = this;

            listenerDataList = EventRegister.getInstance().getEventRegisterDataList(event.name);

            if (listenerDataList === null || listenerDataList.getCount()=== 0) {
                return false;
            }

            listenerDataList.forEach((listenerData:EventRegisterData) => {
                var eventCopy = event.copy();

                eventCopy.currentTarget = listenerData.target;
                eventCopy.target = listenerData.target;

                self._setUserData(eventCopy, userData);

                listenerData.handler(eventCopy);
            });

            return true;
        }

        private _triggerTargetAndEventHandler(target, event, userData, notSetTarget){
            var listenerDataList:wdCb.Collection<EventRegisterData> = null,
                isStopPropagation = false,
                self = this;

            if(!notSetTarget){
                event.target = target;
            }

            listenerDataList = EventRegister.getInstance().getEventRegisterDataList(target, event.name);

            if (listenerDataList === null || listenerDataList.getCount()=== 0) {
                return false;
            }

            listenerDataList.forEach((listenerData:EventRegisterData) => {
                var eventCopy = event.copy();

                eventCopy.currentTarget = listenerData.target;

                self._setUserData(eventCopy, userData);

                listenerData.handler(eventCopy);

                if(eventCopy.isStopPropagation){
                    isStopPropagation = true;
                }
            });

            return isStopPropagation;
        }

        private _setUserData(event:CustomEvent, userData){
            if(userData){
                event.userData = userData;
            }
        }
    }
}
