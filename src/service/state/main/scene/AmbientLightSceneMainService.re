open StateDataMainType;

let getAmbientLightColor = ({sceneRecord}) => sceneRecord.ambientLight.color;

let setAmbientLightColor = (color, {sceneRecord} as state) => {
  ...state,
  sceneRecord: {
    ...sceneRecord,
    ambientLight: {
      color: color,
    },
  },
};