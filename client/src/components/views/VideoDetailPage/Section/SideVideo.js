import React, {useEffect, useState} from "react";
import axios from "axios";

function SideVideo() {

    const [sideVideos, setSideVideos] = useState([]);

    useEffect(() => {
        axios.get('/api/video/getVideos')
            .then(response => {
                if (response.data.success) {
                    setSideVideos(response.data.videos)
                } else {
                    alert('비디오 정보를 가져오길 실패했습니다.')
                }
            })
    }, []);

    const renderSideVideo = sideVideos.map((video, index) => {

        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor(video.duration - minutes * 60);

        return <div key={index} style={{display: 'flex', marginBottom: '1rem', padding: '0 2rem'}}>
            <div style={{width: '40%', marginBottom: '1rem'}}>
                <a href={`/video/${video._id}`}>
                    <img style={{width: '100%'}} src={`http://localhost:5001/${video.thumbnail}`} alt="thumbnail"/>
                </a>
            </div>

            <div style={{width: '50%'}}>
                <a href={`/video/${video._id}`}>
                    <span style={{fontStyle: '1rem', color: 'black'}}>videoTitle</span>
                    <span>{video.writer.name}</span>
                    <span>{video.views} views</span>
                    <span>{minutes}: {seconds}</span>
                </a>
            </div>
        </div>
    });

    return (
        <React.Fragment>
            {renderSideVideo}
        </React.Fragment>

    );
}

export default SideVideo;