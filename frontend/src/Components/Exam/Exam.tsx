import {
    Box,
    Button,
    ButtonGroup,
    Grid,
    Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getSessionToken } from "../../utils/utils";
import ExamScreen from "./Components/ExamScreen";

const Exam = () => {
    const [topics, setTopics] = useState<
        { id: string; topic_label: string; topic_name: string }[]
    >([]);
    const [selectedTopicId, setSelectedTopicId] = useState<number>(-1);
    const [topic, setTopic] = useState<string>('');

    useEffect(() => {
        const getTopics = async () => {
            const response = await axios.get(
                "http://localhost/vaave/backend/api.php?type=topics"
            );
            if (response.data) {
                setTopics(response.data);
            }
        };
        getTopics();
    }, []);

    useEffect(() => {
        const setParams = async () => {
            if(selectedTopicId !==-1)
            {
                setTopic(topics[selectedTopicId-1].topic_name) 
            }
        };
        setParams();
    }, [selectedTopicId, topics]);

    const encodedParamValue = encodeURIComponent(topic);
    // const location = useLocation();
    const navigate= useNavigate();

    const handleClick = () => {
        // window.location.href = `/exam/${encodedParamValue}`;
        navigate(`/exam/screen/${encodedParamValue}`)
      };

    return (
        <Box>
            <Grid
                mt={10}
                alignItems={"center"}
                justifyContent={"center"}
                direction={"column"}
                container
            >
                <Grid item>
                    <Typography>{`Welcome ${getSessionToken()}!`}</Typography>
                    <Typography
                        marginTop={6}
                    >{`Select Your Topic to Continue`}</Typography>
                </Grid>
                <Grid
                    container
                    justifyContent={"center"}
                    alignItems={"center"}
                    margin={2}
                    item
                >
                    {topics.map((topic,index) => (
                        <ButtonGroup
                            sx={{
                                margin: 2,
                            }}
                            size="large"
                            aria-label="large button group"
                        >
                            <Button
                                key={topic.id}
                                variant={
                                    selectedTopicId.toString() === topic.id
                                        ? "contained"
                                        : "outlined"
                                }
                                onClick={() => setSelectedTopicId(index+1)}
                            >
                                {topic.topic_label}
                            </Button>
                        </ButtonGroup>
                    ))}
                </Grid>
                <Grid p={2} justifyContent={"flex-end"} margin={2} item>
                    <Button onClick={() => handleClick()} size="large" variant="text">
                        Continue
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};
export default Exam;
