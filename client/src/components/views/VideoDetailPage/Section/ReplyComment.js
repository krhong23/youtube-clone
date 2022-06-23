import React, {useEffect, useState} from 'react';
import SingleComment from "./SingleComment";

function ReplyComment(props) {

    const [OpenReplyComments, setOpenReplyComments] = useState(false)
    const [ChildCommentNumber, setChildCommentNumber] = useState(0)

    useEffect(() => {
        let commentNumber = 0;
        props.commentLists.map((comment) => {
            if (comment.responseTo === props.parentCommentId) {
                commentNumber++
            }
        })
        setChildCommentNumber(commentNumber)
    }, [props.commentLists])

    let renderReplyComment = (parentCommentId) => (
        props.commentLists.map((comment, index) => (
            <React.Fragment key={index}>
                {
                    comment.responseTo === parentCommentId &&
                    <div style={{width: '80%', marginLeft: '40px'}}>
                        <SingleComment
                            videoId={props.videoId}
                            comment={comment}
                            refreshFunction={props.refreshFunction}
                        />
                        <ReplyComment
                            videoId={props.videoId}
                            parentCommentId={comment._id}
                            commentLists={props.commentLists}
                            refreshFunction={props.refreshFunction}
                        />
                    </div>
                }
            </React.Fragment>
        ))
    )

    const onHandleClick = () => {
        setOpenReplyComments(!OpenReplyComments)
    }

    return (
        <div>
            {
                ChildCommentNumber > 0 &&
                <p style={{fontSize: '14px', margin: 0, color: 'gray'}} onClick={onHandleClick}>
                    View {ChildCommentNumber} more comment(s)
                </p>
            }
            {
                OpenReplyComments &&
                renderReplyComment(props.parentCommentId)
            }
        </div>
    );

}

export default ReplyComment;