import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Enroll from '../components/Enroll';
import Enrolled from '../components/Enrolled';
import axios from "axios";

const Home = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [isPaid, setIsPaid] = useState(false);
    const [userData, setUserData] = useState({});
    const [ageAcceptable, setAgeAcceptable] = useState(false);

    useEffect(() => {
        const init = async () => {
            if (location.state === null || location.state.loggedIn === null || !location.state.loggedIn) {
                navigate("/");
            }
            else {
                const { data } = await axios.get(`${process.env.REACT_APP_MIDDLEWARE_URL}/user/getUser/${location.state.username}`);
                setUserData(data.result);
                if (data.result.is_enrolled === 0) {
                    if (data.result.age >= 18 && data.result.age <= 65) {
                        setAgeAcceptable(true);
                    }
                    else {
                        setAgeAcceptable(false);
                    }
                    setIsEnrolled(false)
                    setIsPaid(false)
                }
                else {
                    if (data.result.is_paid === 0) {
                        setIsEnrolled(true)
                        setIsPaid(false)
                    }
                    else {
                        setIsEnrolled(true)
                        setIsPaid(true)
                    }
                }
            }
        }
        init();
    }, [])

    if (!isEnrolled && ageAcceptable) {
        return (
            <Enroll userId={userData.id} username={location.state.username} />
        )
    }
    else if (!isEnrolled && !ageAcceptable) {
        return (
            <h3>Your age is not acceptable for this Yoga program</h3>
        )
    }
    else {
        return (
            <Enrolled isPaid={isPaid} userData={userData} />
        )
    }
}

export default Home