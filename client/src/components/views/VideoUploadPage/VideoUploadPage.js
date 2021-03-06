import React, {useState} from "react";
import {Button, Form, Input, message, Typography} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import Dropzone from "react-dropzone";
import axios from "axios";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import Auth from "../../../hoc/auth";

const {Title} = Typography;

const PrivateOptions = [
    {value: 0, label: "Private"},
    {value: 1, label: "Public"},
]

const CategoryOptions = [
    {value: 0, label: "Film & Animation"},
    {value: 1, label: "Autos & Vehicles"},
    {value: 2, label: "Music"},
    {value: 3, label: "Pets & Animals"},
]

function VideoUploadPage() {

    const navigate = useNavigate();

    const user = useSelector(state => state.user);
    const [VideoTitle, setVideoTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Private, setPrivate] = useState(0)
    const [Category, setCategory] = useState("Film & Animation")
    const [FilePath, setFilePath] = useState("")
    const [Duration, setDuration] = useState("")
    const [ThumbnailPath, setThumbnailPath] = useState("")

    const handleChangeTitle = (e) => {
        setVideoTitle(e.currentTarget.value)
    }

    const handleChangeDescription = (e) => {
        setDescription(e.currentTarget.value)
    }

    const handleChangePrivate = (e) => {
        setPrivate(e.currentTarget.value)
    }
    const handleChangeCategory = (e) => {
        setCategory(e.currentTarget.value)
    }

    const onDrop = (files) => {
        let formData = new FormData();

        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }

        formData.append("file", files[0])

        axios.post('/api/video/uploadfiles', formData, config)
            .then(response => {
                if (response.data.success) {
                    let variable = {
                        fileName: response.data.fileName,
                        filePath: response.data.filePath,
                    }

                    setFilePath(response.data.filePath)

                    axios.post('/api/video/thumbnail', variable)
                        .then(response => {
                            if (response.data.success) {
                                setDuration(response.data.fileDuration)
                                setThumbnailPath(response.data.thumbFilePath)
                            } else {
                                alert('????????? ????????? ??????????????????.')
                            }
                        })
                } else {
                    alert('????????? ???????????? ??????????????????.')
                }
            })
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            writer: user.user._id,
            title: VideoTitle,
            description: Description,
            privacy: Private,
            filePath: FilePath,
            category: Category,
            duration: Duration,
            thumbnail: ThumbnailPath,
        }

        axios.post('/api/video/uploadVideo', variables)
            .then(response => {
                if (response.data.success) {
                    message.success('??????????????? ????????????????????????.')
                    setTimeout(() => {
                        navigate('/');
                    }, 3000)
                } else {
                    alert('????????? ???????????? ?????? ????????????.')
                }
            })
    }

    return (
        <div style={{maxWidth: '700px', margin: '2rem auto'}}>
            <div style={{textAlign: 'center', marginBottom: '2rem'}}>
                <Title level={2}> Upload Video</Title>
            </div>

            <Form onSubmit={onSubmit}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Dropzone
                        onDrop={onDrop}
                        multiple={false}
                        maxSize={800000000}>
                        {({getRootProps, getInputProps}) => (
                            <div style={{
                                width: '300px',
                                height: '240px',
                                border: '1px solid lightgray',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                                 {...getRootProps()}
                            >
                                <input {...getInputProps()} />
                                <PlusOutlined type="plus" style={{fontSize: '3rem'}}/>

                            </div>
                        )}
                    </Dropzone>

                    {
                        ThumbnailPath !== "" &&
                        <div>
                            <img src={`http://localhost:5001/${ThumbnailPath}`} alt="thumbnail"/>
                        </div>
                    }
                </div>

                <br/><br/>
                <label>Title</label>
                <Input
                    onChange={handleChangeTitle}
                    value={VideoTitle}
                />
                <br/><br/>
                <label>Description</label>
                <TextArea
                    onChange={handleChangeDescription}
                    value={Description}
                />
                <br/><br/>

                <select onChange={handleChangePrivate}>
                    {PrivateOptions.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                </select>
                <br/><br/>

                <select onChange={handleChangeCategory}>
                    {CategoryOptions.map((item, index) => (
                        <option key={index} value={item.label}>{item.label}</option>
                    ))}
                </select>
                <br/><br/>

                <Button type="primary" size="large" onClick={onSubmit}>
                    Submit
                </Button>

            </Form>
        </div>
    )
}

export default Auth(VideoUploadPage, true);