import React, {useEffect, useState} from "react";
import {Tooltip} from "antd";

import {LikeOutlined, DislikeOutlined, LikeFilled, DislikeFilled} from "@ant-design/icons";
import axios from "axios";

function LikeDislikes(props) {

    const [Likes, setLikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)
    const [Dislikes, setDislikes] = useState(0)
    const [DislikeAction, setDislikeAction] = useState(null)

    let variable = {}

    if (props.video) {
        variable = {
            videoId: props.videoId,
            userId: props.userId
        }
    } else {
        variable = {
            commentId: props.commentId,
            userId: props.userId
        }
    }

    useEffect(() => {
        axios.post('/api/like/getLikes', variable)
            .then(response => {
                if (response.data.success) {
                    // 얼마나 많은 좋아요를 받았는지
                    setLikes(response.data.likes.length)

                    // 내가 이미 그 좋아요를 눌렀는지
                    response.data.likes.map(like => {
                        if (like.userId === props.userId) {
                            setLikeAction('liked')
                        }
                    })

                    console.log(response.data)
                } else {
                    alert('좋아요 정보를 가져오지 못했습니다.')
                }
            })

        axios.post('/api/like/getDislikes', variable)
            .then(response => {
                if (response.data.success) {
                    // 얼마나 많은 싫어요를 받았는지
                    setDislikes(response.data.dislikes.length)

                    // 내가 이미 그 싫어요를 눌렀는지
                    response.data.dislikes.map(dislike => {
                        if (dislike.userId === props.userId) {
                            setDislikeAction('disliked')
                        }
                    })

                    console.log(response.data)
                } else {
                    alert('싫어요 정보를 가져오지 못했습니다.')
                }
            })
    }, [])

    const onLike = () => {
        if (LikeAction === null) {
            axios.post('/api/like/upLike', variable)
                .then(response => {
                    if (response.data.success) {
                        setLikes(Likes + 1)
                        setLikeAction('liked')

                        if (DislikeAction !== null) {
                            setDislikeAction(null)
                            setDislikes(Dislikes - 1)
                        }
                    } else {
                        alert('좋아요를 올리지 못했습니다.')
                    }
                })
        } else {
            axios.post('/api/like/unLike', variable)
                .then(response => {
                    if (response.data.success) {
                        setLikes(Likes - 1)
                        setLikeAction(null)
                    } else {
                        alert('좋아요를 내리지 못했습니다.')
                    }
                })
        }
    }

    const onDislike = () => {
        if (DislikeAction === null) {
            axios.post('/api/like/upDislike', variable)
                .then(response => {
                    if (response.data.success) {
                        setDislikes(Dislikes + 1)
                        setDislikeAction('disliked')

                        if (LikeAction !== null) {
                            setLikeAction(null)
                            setLikes(Likes - 1)
                        }
                    } else {
                        alert('싫어요를 올리지 못했습니다.')
                    }
                })
        } else {
            axios.post('/api/like/unDislike', variable)
                .then(response => {
                    if (response.data.success) {
                        setDislikes(Dislikes - 1)
                        setDislikeAction(null)
                    } else {
                        alert('싫어요를 내리지 못했습니다.')
                    }
                })
        }
    }

    return (
        <div>
            <span key={'comment-basic-like'}>
                <Tooltip title={'like'}>
                    {
                        LikeAction === 'liked' ?
                            <LikeFilled onClick={onLike}/> : <LikeOutlined onClick={onLike}/>
                    }
                </Tooltip>
                <span style={{paddingLeft: '8px', cursor: 'auto'}}>{Likes}</span>
            </span>
&nbsp;&nbsp;
            <span key={'comment-basic-dislike'}>
                <Tooltip title={'like'}>
                    {
                        DislikeAction === 'disliked' ?
                            <DislikeFilled onClick={onDislike}/> : <DislikeOutlined onClick={onDislike}/>
                    }
                </Tooltip>
                <span style={{paddingLeft: '8px', cursor: 'auto'}}>{Dislikes}</span>
            </span>
            &nbsp;
        </div>
    );
}

export default LikeDislikes;