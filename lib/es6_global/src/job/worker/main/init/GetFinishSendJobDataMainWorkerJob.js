// Generated by BUCKLESCRIPT VERSION 2.1.0, PLEASE EDIT WITH CARE
'use strict';

import * as GetWorkerDataUtils$Wonderjs    from "../../utils/GetWorkerDataUtils.js";
import * as StateDataMainService$Wonderjs  from "../../../../service/state/main/state/StateDataMainService.js";
import * as WorkerInstanceService$Wonderjs from "../../../../service/record/workerInstance/WorkerInstanceService.js";

function execJob(flags, stateData) {
  return GetWorkerDataUtils$Wonderjs.createGetOtherWorkerDataStream(flags, WorkerInstanceService$Wonderjs.unsafeGetRenderWorker(StateDataMainService$Wonderjs.getState(stateData)[/* workerInstanceRecord */33]));
}

export {
  execJob ,
  
}
/* GetWorkerDataUtils-Wonderjs Not a pure module */