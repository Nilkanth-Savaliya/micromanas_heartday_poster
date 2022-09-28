// export const frameData = {
//   frameImage: "/background.png",
//   width: 3509 / 2,
//   height: 4962 / 2,
//   textField: [
//     // {
//     //   field: "doctorName",
//     //   left: 1400 / 2,
//     //   top: 1890 / 2,
//     //   width: 2000 / 2,
//     //   align: "left",
//     //   fontSize: 102 / 2,
//     //   fontFamily: 'Poppins',
//     //   default: "",
//     // },
//     {
//       field: "doctorMessage",
//       align: "left",
//       fontSize: 400 / 2,
//       left: 100 / 2,
//       top: 2500 / 2,
//       width: 3460 / 2,
//       lineHeight: 1.2,
//       default: "",
//     },
//   ],
//   imageField: [
//     {
//       field: "userImageUrl",
//       left: 0,
//       top: 0,
//       width: 3509 / 2,
//       height: 2040 / 2,
//       default: "/doctor.jpg",
//     },
//   ] ,
// };


export const frameData = {
  firstFrame: {
    frameImage: "/background.png",
    width: 3509 / 2,
    height: 4962 / 2,
    textField: [
       {
        field: "customMessage",
        align: "left",
        fontSize: 400 / 2,
        left: 100 / 2,
        top: 2100 / 2,
        width: 3440 / 2,
        lineHeight: 1.2,
        fontFamily: 'Roboto Slab',
        default: "",
      }
    ],
    imageField: [
      {
        field: "userImageUrl",
        left: 1410 /2,
        top: 0,
        width: 2120 / 2,
        height: 2000 / 2,
        default: "/doctor.jpg",
      },
    ],
  },
  dp: {
    frameImage: "/dp.png",
    width: 3509 / 2,
    height: 4962 / 2,
    textField: [],
    imageField: [
      {
        field: "image",
        left: 1500 /2,
        top: 0,
        width: 2015 / 2,
        height: 2150 / 2,
        default:''
      },
    ],
  },
  thirdFrame: {
    frameImage: "/dp2.png",
    width: 3509 / 2,
    height: 4962 / 2,
    textField: [
      {
      field: "doctorName",
      left: 1500 / 2,
      top: 2315 / 2,
      width: 2150 / 2,
      align: "center",
      fontSize: 50,
      fontFamily: 'Roboto Slab',
      default: "",
    }
    ],
    imageField: [
      {
        field: "image",
        left: 1500 /2,
        top: 0,
        width: 2015 / 2,
        height: 2150 / 2,
        default:''
      },
    ],
  },
  fourthFrame: {
    frameImage: "/fourthFrame.png",
    width: 1080,
    height: 1080,
    textField: [],
    imageField: [
      {
        field: "image",
        left: 160,
        top: 170,
        width: 1500 / 2,
        height: 1500 / 2,
        default:''
      },
    ],
  },
  fifthFrame: {
    frameImage: "/fifthFrame.png",
    width: 1080,
    height: 1080,
    textField: [],
    imageField: [
      {
        field: "image",
        left: 160,
        top: 170,
        width: 1500 / 2,
        height: 1500 / 2,
        default:''
      },
    ],
  }
};
