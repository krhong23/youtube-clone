import React, {useState} from "react";
import axios from "axios";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment";

function Comment(props) {

    // redux 데이터 가져오기
    const user = useSelector(state => state.user);
    const [CommentValue, setCommentValue] = useState("")
    const videoId = useParams().videoId;
    const handleClick = (event) => {
        setCommentValue(event.currentTarget.value)
    }

    const onSubmit = (event) => {
        // Refresh 되지 않도록
        event.preventDefault();

        const variables = {
            content: CommentValue,
            writer: user.user._id,
            videoId: videoId
        }

        axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data)
                    props.refreshFunction(response.data.result)
                    setCommentValue("")
                } else {
                    alert('Comment를 저장하지 못했습니다.')
                }
            })
    }

    return (
        <div>
            <br/>
            <p>Replies</p>
            <hr/>

            {/* Comment Lists */}
            {props.commentLists && props.commentLists.map((comment, index) => (
                    (!comment.responseTo &&
                        <React.Fragment key={index}>
                            <SingleComment
                                videoId={videoId}
                                comment={comment}
                                refreshFunction={props.refreshFunction}
                            />
                            <ReplyComment
                                videoId={videoId}
                                parentCommentId={comment._id}
                                commentLists={props.commentLists}
                                refreshFunction={props.refreshFunction}
                            />
                        </React.Fragment>
                    )
                )
            )}

            {/* Root Comment Form */}
            <form style={{display: 'flex'}} onSubmit={onSubmit}>
                <textarea
                    style={{width: '100%', borderRadius: '5px'}}
                    onChange={handleClick}
                    value={CommentValue}
                    placeholder={'코멘트를 작성해 주세요'}
                />
                <br/>
                <button style={{width: '20%', height: '52px'}} onClick={onSubmit}>Submit</button>
            </form>
        </div>
    );
}

export default Comment;