// Generated by BUCKLESCRIPT VERSION 2.1.0, PLEASE EDIT WITH CARE
'use strict';

import * as SparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

function setPointsWithArray(param, param$1, param$2) {
  var pointsMap = param$2[1];
  var typeArrayPoolRecord = param$2[0];
  var fillTypeArrayFunc = param$1[1];
  var record = param[2];
  var points = param[1];
  if (points) {
    fillTypeArrayFunc(points[0], record, 0);
    return /* tuple */[
            typeArrayPoolRecord,
            pointsMap
          ];
  } else {
    var match = param$1[0](record.length, typeArrayPoolRecord);
    var typeArr = match ? fillTypeArrayFunc(match[0], record, 0) : param$1[2](record);
    return /* tuple */[
            typeArrayPoolRecord,
            SparseMapService$WonderCommonlib.set(param[0], typeArr, pointsMap)
          ];
  }
}

export {
  setPointsWithArray ,
  
}
/* No side effect */