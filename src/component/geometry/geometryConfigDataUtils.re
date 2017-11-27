open GeometryType;

open GeometryStateUtils;

let getConfigData = (geometry: geometry, state: StateDataType.state) =>
  JsObjUtils.(getGeometryData(state).configDataMap |> WonderCommonlib.SparseMapSystem.get(geometry));