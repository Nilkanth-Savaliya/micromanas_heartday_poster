import React, { useState, useEffect, useRef, useMemo } from "react";
import "./selectDoctor.css";
import { Formik, Field, Form } from "formik";
import ImageFormField from "../../components/ImageFormField/ImageFormField";
import { frameData } from "../../frameData";
import { Stage, Layer, Image, Text } from "react-konva";
import { Flex, FormControl, FormLabel, HStack, Spacer } from "@chakra-ui/react";
import { Spinner } from "../../components/spinner/Spinner";
import SelectFormField from "../../components/selectFormField/SelectFormField";
import { get } from "lodash";
import { HiDownload } from "react-icons/hi";
import * as Yup from "yup";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
const SelectDoctor = () => {
  const [bgImage, setBgImage] = useState();
  const [userImg, setUserImg] = useState();
  const [userImage, setUserImage] = useState();
  const [doctorData, setDoctorData] = useState();
  const [imageOverview, setImageOverview] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const stageRef = useRef();
  const thirdFrameRef = useRef();
  const fourthFrameRef = useRef();
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState();
  const [fontSize, setFontSize] = useState();
  const [frame3, setFrame3] = useState();
  const [frame4, setFrame4] = useState();
  const [frame3Overview, setFrame3Overview] = useState();
  const [frame4Overview, setFrame4Overview] = useState();
  const [customMessage, setCustomMessage] = useState();

  useEffect(() => {
    const userbg = new window.Image();
    userbg.src = userImage;
    userbg.onload = () => {
      setUserImg(userbg);
    };

    const bg = new window.Image();
    bg.src = frameData.firstFrame.frameImage;
    bg.crossOrigin = "Anonymous";
    bg.onload = () => {
      setBgImage(bg);
    };

    // const bg2 = new window.Image();
    // bg2.src = frameData.dp.frameImage;
    // bg2.crossOrigin = "Anonymous";
    // bg2.onload = () => {
    //   setFrame2(bg2);
    // };

    const bg3 = new window.Image();
    bg3.src = frameData.thirdFrame.frameImage;
    bg3.crossOrigin = "Anonymous";
    bg3.onload = () => {
      setFrame3(bg3);
    };

    const bg4 = new window.Image();
    bg4.src = frameData.fourthFrame.frameImage;
    bg4.crossOrigin = "Anonymous";
    bg4.onload = () => {
      setFrame4(bg4);
    };

    // const bg5 = new window.Image();
    // bg5.src = frameData.fifthFrame.frameImage;
    // bg5.crossOrigin = "Anonymous";
    // bg5.onload = () => {
    //   setFrame5(bg5);
    // };
  }, [userImage]);

  const messageOption = useMemo(() => {
    return [
      { value: "May your heart stay healthy and happy every world heart day.", label: "May your heart stay healthy and happy every world heart day." },
      { value: "Eat right, sleep tight and prevent any heart diseases. Happy World heart day.", label: "Eat right, sleep tight and prevent any heart diseases. Happy World heart day." },
      { value: "May you have a healthy and long life with a healthy and happy heart. Wishing you a happy World Heart day.", label: "May you have a healthy and long life with a healthy and happy heart. Wishing you a happy World Heart day." },
      { value: "Skip the party, Quit the smoking, start skipping and hitting the track. Take your first step towards your healthy heart. happy world heart day.", label: "Skip the party, Quit the smoking, start skipping and hitting the track. Take your first step towards your healthy heart. happy world heart day." },
      { value: "Do your part by caring for the heart.", label: "Do your part by caring for the heart." },
      { value: "Burn those calories, Curb those cravings for the heart's healthy living.", label: "Burn those calories, Curb those cravings for the heart's healthy living." },
      { value: "Be smart and protect your heart.", label: "Be smart and protect your heart." },
      { value: "Start skipping to make sure the heart is beating.", label: "Start skipping to make sure the heart is beating." },
      { value: "custom", label: "custom Message" },
    ];
  }, []);

  const handleSubmit = async (values) => {
    setIsLoading(true);
    setDoctorData(values);
    if (values.image) {
      fileToBase(values.image);
    } else {
      imageToBase();
    }
    let tempData = {
      doctor_name: values.doctorName,
      user_image: values.image,
      message: values.doctorMessage,
    };

    console.log(values, values);
    //   const formData = new FormData();
    //   for (let key in tempData) {
    //       formData.append(key, tempData[key]);
    //   }
    //   axios({
    //       url: "http://65.0.77.129:4013/adduserdata",
    //       method: "POST",
    //       data: formData,
    //       headers: {
    //           "Content-Type": "multipart/form-data",
    //           "Access-Control-Allow-Origin": "*",
    //           "Access-Control-Allow-Headers": "*",
    //       },

    //   })
    //       .then((data) => {
    //           console.log(data);
    //       })
    //       .catch((err) => {
    //           console.log(err);
    //       });
  };

  const imageToBase = () => {
    const defaultUrl = frameData.firstFrame.imageField[0].default;
    // console.log(defaultUrl);
    fetch(defaultUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setUserImage(reader.result);
          setTimeout(() => {
            handleExport();
            // console.log('default image')
          }, 500);
        };
        reader.readAsDataURL(blob);
      });
  };

  const fileToBase = (image) => {
    let files = image;
    const reader = new FileReader();
    reader.onload = () => {
      setUserImage(reader.result);
      setTimeout(() => {
        handleExport();
      }, 500);
    };
    reader.readAsDataURL(files);
  };

  const download = (uri, name) => {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExport = () => {
    const uri = stageRef.current.toDataURL();
    const uri3 = thirdFrameRef.current.toDataURL();
    const uri4 = fourthFrameRef.current.toDataURL();
    setImageOverview(uri);
    setFrame3Overview(uri3);
    setFrame4Overview(uri4);
    setShowResults(true);
    setIsLoading(false);
  };
  const validationSchema = Yup.object().shape({
    doctorName: Yup.string().required("Required"),
    doctorMessage: Yup.string().required("Required"),
  });
  useEffect(() => {
    const searchId = {
      first: searchParams.get("first"),
      second: searchParams.get("second"),
      third: searchParams.get("third"),
      fourth: searchParams.get("fourth"),
    };
    setData(searchId);
  }, []);

  useEffect(() => {
    if (doctorData?.customMessage !== "custom") {
      let textLength = doctorData?.customMessage?.length;
      console.log(textLength);

      switch (true) {
        case textLength >= 1 && textLength < 30:
          setFontSize(250);
          break;
        case textLength >= 30 && textLength < 50:
          setFontSize(200);
          break;
        case textLength >= 50 && textLength < 70:
          setFontSize(175);
          break;
        case textLength >= 70 && textLength < 90:
          setFontSize(150);
          break;
        case textLength >= 90 && textLength < 120:
          setFontSize(125);
          break;
        case textLength >= 120 && textLength < 170:
          setFontSize(110);
          break;
        case textLength >= 170 && textLength < 200:
          setFontSize(100);
          break;
        case textLength >= 200 && textLength < 250:
          setFontSize(90);
          break;
        case textLength >= 250 && textLength < 350:
          setFontSize(77);
          break;
        default:
          setFontSize(70);
          break;
      }
    } else {
      let textLength = doctorData?.doctorMessage?.length;
      console.log(textLength);

      switch (true) {
        case textLength >= 1 && textLength < 30:
          setFontSize(250);
          break;
        case textLength >= 30 && textLength < 50:
          setFontSize(200);
          break;
        case textLength >= 50 && textLength < 70:
          setFontSize(175);
          break;
        case textLength >= 70 && textLength < 90:
          setFontSize(150);
          break;
        case textLength >= 90 && textLength < 120:
          setFontSize(125);
          break;
        case textLength >= 120 && textLength < 170:
          setFontSize(110);
          break;
        case textLength >= 170 && textLength < 200:
          setFontSize(100);
          break;
        case textLength >= 200 && textLength < 250:
          setFontSize(90);
          break;
        case textLength >= 250 && textLength < 350:
          setFontSize(77);
          break;
        default:
          setFontSize(70);
          break;
      }
    }
  }, [doctorData]);

  console.log(customMessage);
  return (
    <>
      {!showResults && (
        <div>
          <div className="mainLogo">
            <img src="/headerlogo.png" alt="logo" />
          </div>
          <div className="formData">
            <Formik
              initialValues={{
                doctorName: "",
                doctorMessage: "",
                image: "",
              }}
              // validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ setFieldValue, values, errors, touched }) => (
                <Form>
                  <div className="formRow">
                    <label htmlFor="doctorName">Name of Doctor</label>
                    <Field
                      name="doctorName"
                      type="text"
                      placeholder="Enter Doctor Name"
                    />
                  </div>
                  {errors.doctorName && touched.doctorName ? (
                    <div style={{ color: "red" }}>{errors.doctorName}</div>
                  ) : null}

                  <FormControl isRequired my={3} style={{ zIndex: "11" }}>
                    <Flex width="100%">
                      <HStack>
                        <label htmlFor="customMessage">Select a Message</label>
                        <Spacer></Spacer>
                      </HStack>
                    </Flex>
                    <SelectFormField
                      options={messageOption}
                      value={get(values, "customMessage")}
                      required={false}
                      name={"customMessage"}
                      fieldName={"customMessage"}
                      placeholder={"Select a custom Message :"}
                      error={undefined}
                      onChange={(data) => setCustomMessage(data)}
                    />
                  </FormControl>
                  {errors.language && touched.language ? (
                    <div style={{ color: "red" }}>{errors.language}</div>
                  ) : null}
                  <div
                    className="formRow"
                    style={{
                      visibility:
                        customMessage === "custom" ? "visible" : "hidden",
                    }}
                  >
                    <label htmlFor="doctorMessage">
                      Enter a Custom Message
                    </label>
                    <Field
                      name="doctorMessage"
                      type="text"
                      as="textarea"
                      placeholder="Enter a Message"
                    />
                  </div>
                  {errors.doctorMessage && touched.doctorMessage ? (
                    <div style={{ color: "red" }}>{errors.doctorMessage}</div>
                  ) : null}
                  <div className="formRow">
                    <label htmlFor="image" className="customLabel">
                      <ImageFormField
                        disabled={false}
                        image={"image"}
                        onSuccess={({ file: file }) => {
                          if (file) setFieldValue("image", file);
                        }}
                      />
                    </label>
                  </div>
                  <div className="formRow">
                    <button type="submit" className="btnSubmit">
                      {isLoading === true ? <Spinner /> : ""} Submit
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
      <div>
        {showResults && (
          <>
            <div className="mainLogo">
              <img src="/headerlogo.png" alt="logo" />
              <div className="backBtn" onClick={() => setShowResults(false)}>
                <IoIosArrowBack size={32} color="#000" />
              </div>
            </div>
            <div className="imageOverview">
              <div className="imageBox">
                <img
                  src={imageOverview}
                  alt="output"
                  style={{ margin: "0 auto" }}
                />
                <button
                  onClick={() =>
                    download(
                      imageOverview,
                      `${doctorData.doctorName}${Date.now()}.png`
                    )
                  }
                  className="downloadBtn"
                >
                  <HiDownload size={30} />
                </button>
              </div>
              
              <div className="imageBox">
                <img
                  src={frame3Overview}
                  alt="output"
                  style={{ margin: "0 auto" }}
                />
                <button
                  onClick={() =>
                    download(
                      frame3Overview,
                      `${doctorData.doctorName}${Date.now()}.png`
                    )
                  }
                  className="downloadBtn"
                >
                  <HiDownload size={30} />
                </button>
              </div>
              <div className="imageBox">
                <img
                  src={frame4Overview}
                  alt="output"
                  style={{ margin: "0 auto" }}
                />
                <button
                  onClick={() =>
                    download(
                      frame4Overview,
                      `${doctorData.doctorName}${Date.now()}.png`
                    )
                  }
                  className="downloadBtn"
                >
                  <HiDownload size={30} />
                </button>
              </div>
              
            </div>
          </>
        )}
        <div className="canvas">
          {frameData && doctorData && frameData.firstFrame && (
            <Stage
              width={frameData.firstFrame.width}
              height={frameData.firstFrame.height}
              style={{ zoom: "0.1" }}
            >
              <Layer ref={stageRef}>
                <Image
                  image={userImg}
                  x={frameData.firstFrame.imageField[0].left}
                  y={frameData.firstFrame.imageField[0].top}
                  width={frameData.firstFrame.imageField[0].width}
                  height={frameData.firstFrame.imageField[0].height}
                />
                <Image
                  image={bgImage}
                  width={frameData.firstFrame.width}
                  height={frameData.firstFrame.height}
                />
                {frameData.firstFrame.textField.map((value, i) => {
                  return (
                    <Text
                      text={
                        doctorData[value.field] == "custom"
                          ? doctorData.doctorMessage
                          : doctorData[value.field]
                      }
                      fontSize={fontSize}
                      x={value.left}
                      y={value.top}
                      width={value.width}
                      align={value.align}
                      key={i}
                      lineHeight={value.lineHeight}
                      fontFamily={value.fontFamily}
                    />
                  );
                })}
              </Layer>
            </Stage>
          )}
          
          {frameData && doctorData && frameData.thirdFrame && (
            <Stage
              width={frameData.thirdFrame.width}
              height={frameData.thirdFrame.height}
              style={{ zoom: "0.1" }}
            >
              <Layer ref={thirdFrameRef}>
                <Image
                  image={userImg}
                  x={frameData.thirdFrame.imageField[0].left}
                  y={frameData.thirdFrame.imageField[0].top}
                  width={frameData.thirdFrame.imageField[0].width}
                  height={frameData.thirdFrame.imageField[0].height}
                />
                <Image
                  image={frame3}
                  width={frameData.thirdFrame.width}
                  height={frameData.thirdFrame.height}
                />
                {frameData.thirdFrame.textField.map((value, i) => {
                  return (
                    <Text
                      text={
                        doctorData[value.field] || value.default
                      }
                      fontSize={value.fontSize}
                      x={value.left}
                      y={value.top}
                      width={value.width}
                      align={value.align}
                      key={i}
                      lineHeight={value.lineHeight}
                      fontFamily={value.fontFamily}
                      fill={"white"}
                    />
                  );
                })}
              </Layer>
            </Stage>
          )}
          {frameData && doctorData && frameData.fourthFrame && (
            <Stage
              width={frameData.fourthFrame.width}
              height={frameData.fourthFrame.height}
              style={{ zoom: "0.1" }}
            >
              <Layer ref={fourthFrameRef}>
                <Image
                  image={userImg}
                  x={frameData.fourthFrame.imageField[0].left}
                  y={frameData.fourthFrame.imageField[0].top}
                  width={frameData.fourthFrame.imageField[0].width}
                  height={frameData.fourthFrame.imageField[0].height}
                />
                <Image
                  image={frame4}
                  width={frameData.fourthFrame.width}
                  height={frameData.fourthFrame.height}
                />
              </Layer>
            </Stage>
          )}
          
        </div>
      </div>
    </>
  );
};

export default SelectDoctor;
