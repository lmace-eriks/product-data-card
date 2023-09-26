export interface ProductDataCardProps {
  blockClass: string;
}

export interface DataPoints {
  // allStyle?: PointObject;
  baseTech?: PointObject;
  baseType?: PointObject;
  bestUse?: PointObject;
  material?: PointObject;
  wheelSize?: PointObject;
  cassetteGears?: PointObject;
  chainrings?: PointObject;
  handlebar?: PointObject;
  core?: PointObject;
  flex?: PointObject;
  mounting?: PointObject;
  profile?: PointObject;
  riderLevel?: PointObject;
  stance?: PointObject;
  shape?: PointObject;
  gender?: PointObject;
  bindings?: PointObject;
  geo?: PointObject;
  tailType?: PointObject;
  turnRadius?: PointObject;
  waistWidth?: PointObject;
}

export interface PointObject {
  spec?: string;
  label: string;
  info?: MoreInfoObject;
  value?: any; // Loaded dynamically from VTEX.
}

export interface MoreInfoObject {
  text?: string;
  image?: string;
}

export const snowboardDataPoints: DataPoints = {
  // allStyle: {
  //   spec: "Test_ProductData_AllStyle_SB",
  //   label: "All Style",
  //   info: {
  //     text: "All Style is the ipsum lorum dolor sit amet.",
  //     image:
  //       "/arquivos/ids/365382-500-auto?v=638296259506800000&width=500&height=auto&aspect=true",
  //   },
  // },
  baseTech: {
    spec: "Test_ProductData_WinBaseTech_SB",
    label: "Base Tech",
    info: {
      text: "Base Tech is the ipsum lorum dolor sit amet.",
      image:
        "/arquivos/ids/365382-500-auto?v=638296259506800000&width=500&height=auto&aspect=true",
    },
  },
  baseType: {
    spec: "ProductData_WinBaseType_SB",
    label: "Base Type",
    info: {
      text: "Base Type is the ipsum lorum dolor sit amet.",
      image:
        "/arquivos/ids/365382-500-auto?v=638296259506800000&width=500&height=auto&aspect=true",
    },
  },
  core: {
    spec: "Test_ProductData_WinCore_SB",
    label: "Core",
    info: {
      text: "Core is the ipsum lorum dolor sit amet.",
      image:
        "/arquivos/ids/365382-500-auto?v=638296259506800000&width=500&height=auto&aspect=true",
    },
  },
  flex: {
    spec: "ProductData_WinFlex_SB",
    label: "Flex",
    info: {
      text: "Flex is the ipsum lorum dolor sit amet.",
      image:
        "/arquivos/ids/365382-500-auto?v=638296259506800000&width=500&height=auto&aspect=true",
    },
  },
  mounting: {
    spec: "ProductData_WinMounting_SB",
    label: "Mounting",
    info: {
      text: "Mounting is the ipsum lorum dolor sit amet.",
      image:
        "/arquivos/ids/365382-500-auto?v=638296259506800000&width=500&height=auto&aspect=true",
    },
  },
  profile: {
    spec: "ProductData_WinProfile_SB",
    label: "Profile",
    info: {
      text: "Profile is the ipsum lorum dolor sit amet.",
      image:
        "/arquivos/ids/365382-500-auto?v=638296259506800000&width=500&height=auto&aspect=true",
    },
  },
  riderLevel: {
    spec: "ProductData_WinRiderLvl_SB",
    label: "Rider Level",
    info: {
      text: "Rider Level is the ipsum lorum dolor sit amet.",
      image:
        "/arquivos/ids/365382-500-auto?v=638296259506800000&width=500&height=auto&aspect=true",
    },
  },
  stance: {
    spec: "ProductData_WinStance_SB",
    label: "Stance",
    info: {
      text: "Stance is the ipsum lorum dolor sit amet.",
      image:
        "/arquivos/ids/365382-500-auto?v=638296259506800000&width=500&height=auto&aspect=true",
    },
  },
  shape: {
    spec: "ProductData_WinShape_SB",
    label: "Shape",
    info: {
      text: "Shape is the ipsum lorum dolor sit amet.",
      image:
        "/arquivos/ids/365382-500-auto?v=638296259506800000&width=500&height=auto&aspect=true",
    },
  },
  gender: {
    spec: "ProductData_Gender_SB",
    label: "Gender",
    info: {
      text: "Gender is a social construct.",
      image:
        "/arquivos/ids/365382-500-auto?v=638296259506800000&width=500&height=auto&aspect=true",
    },
  },
};

// export const skiDataPoints: DataPoints = {
//   allStyle: {
//     spec: "ProductData_AllStyle_SK",
//     label: "All Style",
//     info: {
//       text: "This is the info for a ski All Style",
//     },
//   },
//   bindings: {
//     spec: "ProductData_WinBindings_SK",
//     label: "Bindings",
//     info: {
//       text: "This is the info for a ski All Style",
//     },
//   },
//   core: "ProductData_WinCore_SK",
//   flex: "ProductData_WinFlex_SK",
//   geo: "ProductData_WinGeo_SK",
//   profile: "ProductData_WinProfile_SK",
//   riderLevel: "ProductData_WinRiderLvl_SK",
//   tailType: "ProductData_WinTailType_SK",
//   turnRadius: "ProductData_WinTurnRadius_SK",
//   waistWidth: "ProductData_WinWaistWidth_SK",
//   gender: "ProductData_Gender_SK",
// };

// export const bikeDataPoints: DataPoints = {
//   bestUse: "ProductData_BikeBestUse",
//   material: "ProductData_BikeMaterial",
//   wheelSize: "ProductData_BikeWhlSize",
//   cassetteGears: "ProductData_BikeCasGears",
//   chainrings: "ProductData_BikeChainrings",
//   handlebar: "ProductData_BikeHandlebar",
// };

export const categories: any = {
  snowboards: snowboardDataPoints,
  // skis: skiDataPoints,
  // bicycles: bikeDataPoints,
};
