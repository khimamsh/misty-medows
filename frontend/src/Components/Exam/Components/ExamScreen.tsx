import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Modal,
  Radio,
  RadioGroup,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import axios from "axios";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import md5 from "md5";
import ScoreCard from "./ScoreCard";
const RoundedButton = styled(Button)({
  borderRadius: "50px",
  margin: 2,
});
const ExamScreen = () => {
    const navigate= useNavigate();
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const { topic = "" } = useParams<{ topic: string }>();
  const[showWarning,setShowWarning]=useState(false);
  const [responses, setResponses] = useState<number[]>([]);
  const decodedParamValue = decodeURIComponent(topic);
  const [score,setScore]= useState(0);
  const[showScore, setShowScore]=useState(false);
  const [questions, setQuestions] = useState<
    {
      question_id: string;
      question_text: string;
      options: string;
      correct_option: string;
      level: string;
      topic: string;
    }[]
  >([]);
  useEffect(() => {
    const getQuestions = async () => {
      const response = await axios.get(
        `http://localhost/vaave/backend/api.php?type=exam&topic=${decodedParamValue}`
      );
      if (!isEmpty(response.data)) {
        setQuestions(response.data);
        setLoading(false);
      }
    };
    getQuestions();
  }, [decodedParamValue]);
  useEffect(()=>{
  console.log(responses);
  },[responses]);

const onAnswerHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const optionIndex = parseInt(event.target.value);
    const updatedResponses = [...responses];
    updatedResponses[currentQuestion] = optionIndex;
    setResponses(updatedResponses);
    console.log(responses);
  };

  const handleNextQuestion = () => {
    setCurrentQuestion(currentQuestion+1);
    if (responses[currentQuestion] === undefined) {
      const updatedResponses = [...responses];
      updatedResponses[currentQuestion] = -1;
      setResponses(updatedResponses);
    }
  };

  const submitAnswers=()=>{
    let count=0;
    const allQuestionsAnswered = responses.every((response) => response !== -1);

    if(allQuestionsAnswered && responses.length===questions.length)
    {
        console.log('hit');
        responses.map((response,index)=>md5(response.toString())===questions[index].correct_option&&(count++))
        console.log(count);
        setScore(count);
        setShowScore(true);
      
    }else{
        setShowWarning(true);
        console.log('miss');
    }

  }

  return (
    <Box>
      {!loading ? (
        <Grid container direction={"column"}>
          <Grid
            marginTop={4}
            justifyContent={"flex-end"}
            container
            item
            direction={"row"}
          >
            <Grid item container xs={7.8}>
                <Box padding={1} minWidth={'60vw'}  minHeight={'40vh'} sx={{ border: "0.5px solid grey" }}>
              <Typography fontWeight={'bold'}>
               Question Level : {questions[currentQuestion].level.toLocaleUpperCase()}
              </Typography>
              <Grid marginTop={5} item container>
                <Stack>
                <Typography fontWeight={'bold'}>
                  Q{currentQuestion+1}: {questions[currentQuestion].question_text}
                </Typography>

                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="option"
                    value={responses[currentQuestion] || ""}
                     onChange={onAnswerHandler}
                  >
                  {
                    questions[currentQuestion].options.split(',').map((option,index)=>(
                        <FormControlLabel
                        key={index}
                        value={(index+1).toString()}
                        control={<Radio/>}
                        label={option}
                      />
                    ))
                  }
                   
                    
                  </RadioGroup>
                </FormControl>
                </Stack>

                <Grid marginTop={5} xs={12} item  >
                <Stack justifyContent={'space-between'} direction={'row'} rowGap={2} >
        
                <Button onClick={()=>setCurrentQuestion(currentQuestion-1)
               }  disabled={currentQuestion===0} variant="contained">Previous</Button>
                <Button onClick={()=>handleNextQuestion()
               } disabled={currentQuestion===questions.length-1} variant="contained"> Next</Button>
        
                 </Stack>
                </Grid>
                
              </Grid>
              </Box>
            </Grid>
            
            <Grid container alignItems={'center'} xs={3} item>
            <Box padding={1}  minHeight={'40vh'} sx={{ border: "0.5px solid grey" }}>
              {questions.map((question, index) => (
                <RoundedButton variant={responses[index]?(responses[index]!==-1?"contained":"outlined"):"outlined"
                    } key={question.question_id}>
                  {index + 1}
                </RoundedButton>
              ))}
              <Stack marginTop={4} alignItems={'flex-end'}>
              <Button size="large" onClick={()=>submitAnswers()} variant="outlined">Finish</Button>
              </Stack>
              {showWarning&&(
                <Typography fontStyle={{color:"red"}}>Please Answers All Questions</Typography>
              )

              }
              
              </Box>
            </Grid>
            
          </Grid>
        </Grid>

        
      ) : (
        <Box>
         <Typography>No Questions Found</Typography>
        </Box>
      )}

      <Modal
        open={showScore}
        onClose={()=>{
            navigate('/');
        setShowScore(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ScoreCard score={score}/>
      </Modal>
    </Box>
  );
};
export default ExamScreen;
