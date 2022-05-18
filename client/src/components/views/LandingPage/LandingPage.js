import React, {useEffect, useState} from 'react';
import axios from 'axios';
// import {useNavigate} from "react-router-dom";
import Auth from "../../../hoc/auth";
import {Avatar, Card, Col, Row, Typography} from "antd";
import moment from 'moment';

const {Title} = Typography;
const {Meta} = Card;

function LandingPage() {

    const [Videos, setVideos] = useState([])

    // dom이 load되자마자 하는 일
    useEffect(() => {
        axios.get('/api/video/getVideos')
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.videos)
                    setVideos(response.data.videos)
                } else {
                    alert('비디오 가져오기를 실패했습니다.')
                }
            })
    }, [])

    const renderCards = Videos.map((video, index) => {

        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor(video.duration - minutes * 60);

        return <Col lg={6} md={8} xs={24}>
            <div style={{position: 'relative'}}>
                <img style={{width: '100%'}} src={`http://localhost:5001/${video.thumbnail}`} alt='thumbnail'/>
                <div className="duration">
                    <span>{minutes} : {seconds}</span>
                </div>
            </div>
            <br/>
            <Meta
                avatar={<Avatar src={video.writer.image}/>}
                title={video.title}
                description=""
            />
            <span>{video.writer.name}</span><br/>
            <span
                style={{marginLeft: '3rem'}}>{video.views} views</span> - <span>{moment(video.createdAt).format("MMM Do YY")}</span>
        </Col>
    })

    return (
        <div style={{width: '85%', margin: '3rem auto'}}>
            <Title level={2}>Recommended</Title>
            <hr/>
            <Row gutter={16}>
                {renderCards}
            </Row>
        </div>
    )

    // const navigate = useNavigate();
    //
    // const onClickHandler = () => {
    //     axios.get('/api/users/logout')
    //         .then(response => {
    //             if (response.data.success) {
    //                 navigate('/')
    //             } else {
    //                 alert('로그아웃하는데 실패하였습니다.')
    //             }
    //         })
    // }
    // return (
    //     <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'}}>
    //         <h2>시작 페이지</h2>
    //         <button onClick={onClickHandler}>로그아웃</button>
    //     </div>
    // );
}

export default Auth(LandingPage, null);