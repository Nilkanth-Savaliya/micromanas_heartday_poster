import React, { useEffect, useMemo, useState } from 'react'
import { Formik, Form } from "formik";
import SelectFormField from '../../components/selectFormField/SelectFormField';
import { Flex, FormControl, FormLabel, getStackStyles, HStack, Spacer, } from "@chakra-ui/react";
import { get } from "lodash";
import './RegisterMr.css';
import { createSearchParams, Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as Yup from 'yup';
import { IoIosArrowBack } from 'react-icons/io';

const RegisterMr = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [firstOption, setFirstOption] = useState([])
    const [secondOption, setSecondOption] = useState([])
    const [thirdOption, setThirdOption] = useState([])
    const [fourthOption, setFourthOption] = useState([])
    const [divisionData, setDivisionData] = useState({ division: 'Microlab' });

    const handleSubmit = (e) => {
        console.log(e)
        navigate({
            pathname: "/selectDoctor",
            search: `?${createSearchParams(e)}`,

        });
    }

    const getSecond = (e) => {
        setSecondOption('');
        setThirdOption('');
        setFourthOption('');
        setDivisionData({ ...divisionData, zsm: e })
        try {
            axios({
                url: "http://65.0.77.129:4000/getrm",
                method: "POST",
                data: { ...divisionData, zsm: e },
            })
                .then((data) => {
                    console.log(data.data.data);
                    let options = data.data.data.map((data) => {
                        return { value: data, label: data };
                    })
                    setSecondOption(options)
                    
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (error) {
            console.log(error);
        }
    }
    const getThird = (e) => {        
        setDivisionData({ ...divisionData, rm: e })
        try {
            axios({
                url: "http://65.0.77.129:4000/gettm",
                method: "POST",
                data: { ...divisionData, rm: e },
            })
                .then((data) => {
                    console.log(data.data.data);
                    let options = data.data.data.map((data) => {
                        return { value: data, label: data };
                    })
                    setThirdOption(options)
                    // setFourthOption('');
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (error) {
            console.log(error);
        }
    }
    const getFourth = (e) => {
        setDivisionData({ ...divisionData, tm: e })
        try {
            axios({
                url: "http://65.0.77.129:4000/gethq",
                method: "POST",
                data: { ...divisionData, tm: e },
            })
                .then((data) => {
                    console.log(data.data.data);
                    let options = data.data.data.map((data) => {
                        return { value: data, label: data };
                    })
                    setFourthOption(options)
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        try {
            axios({
                url: "http://65.0.77.129:4000/getzsm",
                method: "POST",
                data: divisionData,
            })
                .then((data) => {
                    console.log(data.data.data);
                    let options = data.data.data.map((data) => {
                        return { value: data, label: data };
                    })
                    setFirstOption(options);
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (error) {
            console.log(error);
        }
    }, [])
    const validationSchema = Yup.object().shape({

        first: Yup.string().required('Required'),
        second: Yup.string().required('Required'),
        third: Yup.string().required('Required'),
        fourth: Yup.string().required('Required'),

    });
   
    const data = location.state?.data;
    const initialValue = useMemo(() =>{
        // if(data?.first != null) {
        // return{
        //     first: data.first,
        //     second: data.second,
        //     third: data.third,
        //     fourth: data.fourth
        // }}
        // else{
        return{
            first: "",
            second: "",
            third: "",
            fourth: "",
        // }
    }
    },[data])
    
    return (
        <>
            <div className='mainLogo'>
                <img src="/headerlogo.png" alt="logo" />
                <Link to='/' className='backBtn'><IoIosArrowBack size={32} color='#000' /></Link>
            </div>
            <div className='mrDetails'>
                <h5>Register</h5>
                <Formik
                    initialValues= {initialValue}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >{({ setFieldValue, errors, values, touched }) => (
                    <Form>
                        <FormControl isRequired my={3}>
                            <Flex width="100%">
                                <HStack>
                                    <FormLabel mb={1}>Select Manager : </FormLabel>
                                    <Spacer></Spacer>
                                    <p style={{ color: "red" }}>{errors.speciality}</p>
                                </HStack>
                            </Flex>
                            <SelectFormField
                                options={firstOption}
                                value={get(values, 'first')}
                                required={false}
                                name={"first"}
                                fieldName={"first"}
                                placeholder={"Select Manager"}
                                error={undefined}
                                onChange={(data) => {getSecond(data)}}
                            />
                        </FormControl>

                        {errors.first && touched.first ? (
                            <div style={{ color: "red" }}>{errors.first}</div>
                        ) : null}
                        <FormControl isRequired my={3}>
                            <Flex width="100%">
                                <HStack>
                                    <FormLabel mb={1}>Select State : </FormLabel>
                                    <Spacer></Spacer>
                                    <p style={{ color: "red" }}>{errors.speciality}</p>
                                </HStack>
                            </Flex>
                            <SelectFormField
                                options={secondOption}
                                value={get(values, 'second')}
                                required={false}
                                name={"second"}
                                fieldName={"second"}
                                placeholder={"Select State"}
                                error={undefined}
                                onChange={(data) => getThird(data)}
                            />
                        </FormControl>
                        {errors.second && touched.second ? (
                            <div style={{ color: "red" }}>{errors.second}</div>
                        ) : null}
                        <FormControl isRequired my={3}>
                            <Flex width="100%">
                                <HStack>
                                    <FormLabel mb={1}>Select Territory : </FormLabel>
                                    <Spacer></Spacer>
                                    <p style={{ color: "red" }}>{errors.speciality}</p>
                                </HStack>
                            </Flex>
                            <SelectFormField
                                options={thirdOption}
                                value={get(values, 'third')}
                                required={false}
                                name={"third"}
                                fieldName={"third"}
                                placeholder={"Select Territory"}
                                error={undefined}
                                onChange={(data) => getFourth(data)}
                            />
                        </FormControl>
                        {errors.third && touched.third ? (
                            <div style={{ color: "red" }}>{errors.third}</div>
                        ) : null}
                        <FormControl isRequired my={3}>
                            <Flex width="100%">
                                <HStack>
                                    <FormLabel mb={1}>Select Employee : </FormLabel>
                                    <Spacer></Spacer>
                                    <p style={{ color: "red" }}>{errors.speciality}</p>
                                </HStack>
                            </Flex>
                            <SelectFormField
                                options={fourthOption}
                                value={get(values, 'fourth')}
                                required={false}
                                name={"fourth"}
                                fieldName={"fourth"}
                                placeholder={"Select Employee"}
                                error={undefined}
                                onChange={(data) => console.log(data)}
                            />
                        </FormControl>
                        {errors.fourth && touched.fourth ? (
                            <div style={{ color: "red" }}>{errors.fourth}</div>
                        ) : null}
                        <div className='formRow'>
                            <button type="submit" className='btnSubmit'>Submit</button>
                        </div>
                    </Form>
                )}
                </Formik>
            </div>
        </>
    )
}

export default RegisterMr