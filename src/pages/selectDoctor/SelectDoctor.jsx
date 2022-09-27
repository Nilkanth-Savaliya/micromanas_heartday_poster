import React, { useState, useMemo, useEffect, useRef } from "react";
import "./selectDoctor.css";
import { Formik, Field, Form } from "formik";
import ImageFormField from "../../components/ImageFormField/ImageFormField";
import { Flex, FormControl, FormLabel, HStack, Spacer } from "@chakra-ui/react";
import SelectFormField from "../../components/selectFormField/SelectFormField";
import { get } from "lodash";
import { frameData } from "../../frameData";
import { Stage, Layer, Image, Text } from "react-konva";
import { Spinner } from "../../components/spinner/Spinner";
import { HiDownload } from "react-icons/hi";
import * as Yup from "yup";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
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
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState();
  const [fontSize, setFontSize] = useState();

  useEffect(() => {
    const userbg = new window.Image();
    userbg.src = userImage;
    userbg.onload = () => {
      setUserImg(userbg);
      // console.log('default userImage');
      // console.log(userbg);
    };
  }, [userImage]);

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
      language: values.language,
      address: values.doctorAddress,
      division: "Microlab",
      rbm_name: searchParams.get("first"),
      abm_name: searchParams.get("second"),
      bo_name: searchParams.get("third"),
      hq_name: searchParams.get("fourth"),
    };

    console.log(values, values);
    const formData = new FormData();
    // for (let key in tempData) {
    //     formData.append(key, tempData[key]);
    // }
    // axios({
    //     url: "http://65.0.77.129:4000/adduserdata",
    //     method: "POST",
    //     data: formData,
    //     headers: {
    //         "Content-Type": "multipart/form-data",
    //         "Access-Control-Allow-Origin": "*",
    //         "Access-Control-Allow-Headers": "*",
    //     },

    // })
    //     .then((data) => {
    //         console.log(data);
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
  };

  const imageToBase = () => {
    const defaultUrl = frameData.imageField[0].default;
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

  const languageOption = useMemo(() => {
    return [
      { value: "English", label: "English" },
      { value: "Gujarati", label: "Gujarati" },
      { value: "Hindi", label: "Hindi" },
      { value: "Kannada", label: "Kannada" },
      { value: "Malayalam", label: "Malayalam" },
      { value: "Marathi", label: "Marathi" },
      { value: "Panjabi", label: "Panjabi" },
      { value: "Oriya", label: "Oriya" },
      { value: "Tamil", label: "Tamil" },
      { value: "Telugu", label: "Telugu" },
    ];
  }, []);

  const changeBg = async (e) => {
    const tempImage = await frameData.frameImage.find(
      (data) => data.language == e
    );
    const bg = new window.Image();
    bg.src = tempImage.image;
    bg.crossOrigin = "Anonymous";
    bg.onload = () => {
      setBgImage(bg);
    };
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
    // console.log(uri);
    setImageOverview(uri);
    setShowResults(true);
    setIsLoading(false);
    // fetch(uri)
    // .then(res => res.blob())
    // .then(blob => {
    //     const file = new File([blob], name,{ type: "image/png" });
    //     console.log(file);
    // })
    //download(uri,`${name}.png`);
  };
  const validationSchema = Yup.object().shape({
    doctorName: Yup.string().required("Required"),
    doctorAddress: Yup.string().required("Required"),
    language: Yup.string().required("Required"),
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
  // if(doctorData?.doctorAddress?.length){
  //     setDynamicFont(200)
  // }
  useEffect(() => {
    let textLength = doctorData?.doctorAddress?.length; 
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
  }, [doctorData]);
  return (  
    <>
      {!showResults && (
        <div>
          <div className="mainLogo">
            <img src="/headerlogo.png" alt="logo" />
            <Link to="/" state={{ data: data }} className="backBtn">
              <IoIosArrowBack size={32} color="#000" />
            </Link>
          </div>
          <div className="formData">
            <Formik
              initialValues={{
                doctorName: "",
                doctorAddress: "",
                image: "",
                language: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ setFieldValue, values, errors, touched }) => (
                <Form>
                  <FormControl isRequired my={3} style={{zIndex: '11'}} >
                    <Flex width="100%">
                      <HStack>
                        {/* <FormLabel mb={1}>Select Language : </FormLabel> */}
                        <label htmlFor="language">Select Language</label>
                        <Spacer></Spacer>
                        {/* <p style={{ color: "red" }}>{errors.speciality}</p> */}
                      </HStack>
                    </Flex>
                    <SelectFormField 
                      options={languageOption}
                      value={get(values, "language")}
                      required={false}
                      name={"language"}
                      fieldName={"language"}
                      placeholder={"Select a Language :"}
                      error={undefined}
                      onChange={(data) => changeBg(data)}
                    />
                  </FormControl>
                  {errors.language && touched.language ? (
                    <div style={{ color: "red" }}>{errors.language}</div>
                  ) : null}

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
                  <div className="formRow">
                    <label htmlFor="doctorAddress">Address of Doctor</label>
                    <Field
                      name="doctorAddress"
                      type="text"
                      // as='textarea'
                      placeholder="Enter Doctor Address"
                    />
                  </div>
                  {errors.doctorAddress && touched.doctorAddress ? (
                    <div style={{ color: "red" }}>{errors.doctorAddress}</div>
                  ) : null}
                  <div className="formRow">
                    <label htmlFor="image" className="customLabel">
                      <ImageFormField
                        disabled={false}
                        image={"image"}
                        onSuccess={({ file: file }) => {
                          if (file) setFieldValue("image", file);
                        }}
                        // error={errors.image}
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
              <div
                style={{
                  width: "100%",
                  position: "relative",
                }}
              >
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
            </div>
          </>
        )}
        <div className="canvas">
          {frameData && doctorData && (
            <Stage
              width={frameData.width}
              height={frameData.height}
              style={{ zoom: "0.1" }}
            >
              <Layer ref={stageRef}>
                <Image
                  image={userImg}
                  x={frameData.imageField[0].left}
                  y={frameData.imageField[0].top}
                  width={frameData.imageField[0].width}
                  height={frameData.imageField[0].height}
                />
                <Image
                  image={bgImage}
                  width={frameData.width}
                  height={frameData.height}
                />
                {frameData.textField.map((value, i) => {
                  return (
                    <Text
                      text={doctorData[value.field] || value.default}
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
          {/* <button onClick={() =>handleExport(`${doctorData.doctorName}`)} className='downloadBtn' > <HiDownload size={30}/></button> */}
        </div>
      </div>
    </>
  );
};

export default SelectDoctor;
