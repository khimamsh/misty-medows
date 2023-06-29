import { Exam } from "../Components/Exam";
import ExamScreen from "../Components/Exam/Components/ExamScreen";
import Home from "../Components/Home/Home";

export const ProtectedRoutes=[
    {
        path: '/*',
        element: (
       
            <Home />
      
        ),
    },
    {
        path: '/exam',
        element: (
            <Exam />
        ),
    },
    {
        path: '/exam/screen/:topic',
        element: (
            <ExamScreen />
        ),
    },

];