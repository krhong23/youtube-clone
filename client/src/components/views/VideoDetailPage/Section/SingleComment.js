import React, {useState} from 'react';
import {Avatar, Comment} from "antd";
import axios from "axios";
import {useSelector} from "react-redux";

function SingleComment(props) {

    const user = useSelector(state => state.user);
    const [OpenReply, setOpenReply] = useState(false)
    const [CommentValue, setCommentValue] = useState("")

    const onSubmit = (event) => {
        // Refresh 되지 않도록
        event.preventDefault();

        const variables = {
            content: CommentValue,
            writer: user.user._id,
            videoId: props.videoId,
            responseTo: props.comment._id
        }

        axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.result)
                    props.refreshFunction(response.data.result)
                    setCommentValue("")
                    setOpenReply(false)
                } else {
                    alert('Comment를 저장하지 못했습니다.')
                }
            })

    }
    const onHandleChange = (event) => {
        setCommentValue(event.currentTarget.value)
    }
    const onClickReplyOpen = () => {
        setOpenReply(!OpenReply)
    }

    const actions = [
        <span onClick={onClickReplyOpen} key={'comment-basic-reply-to'}>Reply to</span>
    ]

    return (
        <div>
            <Comment
                actions={actions}
                author={props.comment.writer.name}
                avatar={<Avatar src={props.comment.writer.image} alt/>}
                content={<p>{props.comment.content}</p>}
            />
            {
                OpenReply &&
                <form style={{display: 'flex'}} onSubmit={onSubmit}>
                <textarea
                    style={{width: '100%', borderRadius: '5px'}}
                    onChange={onHandleChange}
                    value={CommentValue}
                    placeholder={'코멘트를 작성해 주세요'}
                />
                    <br/>
                    <button style={{width: '20%', height: '52px'}} onClick={onSubmit}>Submit</button>
                </form>
            }

        </div>
    );

}

export default SingleComment;