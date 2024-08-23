import React, {useState} from 'react';
import styled from 'styled-components';
import {observer} from 'mobx-react-lite';
import resultStore from "../Store/ResultStore";
import {useNavigate} from "react-router-dom";  // MobX를 React에서 사용하기 위한 observer

interface Question {
    question: string;
    options: string[];
}

const questions: Question[] = [
    {
        question: '1. 무더운 여름날! 외출했을 때 당신의 행동은?',
        options: ['햇빛 쬐주니 기분도 “쬐지”는 구만?', '제발.. 그늘.. 그늘 어딨어!'],
    },
    {
        question: '2. 오랜만에 맞이하는 휴일! 집이냐 밖이냐! 당신의 선택은?',
        options: ['오랜만에 쉬는데 당연히 나가서 돌아다녀야지!', '오늘은 하루종일 집에서 넷플릭스 볼거야!'],
    },
    {
        question: '3. 계절이 바뀌는 달, 당신의 행동은?',
        options: ['계절 바뀌기 전에 슬슬 준비해야지~ 옷정리도 하고 오히려 좋아!', '덥거나 추워지면 언젠가 알아서 꺼내입겠지~'],
    },
    {
        question: '4. 더운 여름날, 실내에서 당신의 행동은?',
        options: ['너무 더워서 문 다 닫고 에어컨 켜야겠어! 완전 시원해지고 럭키비키잖아?', '실내 공기가 너무 탁해. 아무리 여름이라도 환기는 해야지! 집안 공기도 정화되고 럭키비키잖아?'],
    },
    {
        question: '5. 평소 나의 모습은?',
        options: ['좋은 게 좋은거지~ 둥글둥글 행복한 평화주의자!', '실수는 용납할 수 없어! 날카로운 시선의 완벽주의자!'],
    },
];

const Quiz = () => {  // observer로 컴포넌트를 감싸줍니다.
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const navigate = useNavigate();

    const handleAnswer = (answer: boolean) => {
        resultStore.addAnswer(answer);  // 선택된 답변을 ResultStore에 저장합니다.

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            // 퀴즈가 끝나면 결과를 확인하거나, 다음 단계로 넘어갈 수 있도록 처리
            navigate('/result');
        }
    };

    return (
        <Container>
            <Question>{questions[currentQuestion].question}</Question>
            <Options>
                {questions[currentQuestion].options.map((option, index) => (
                    <OptionButton key={index} onClick={() => handleAnswer(index === 0)}>
                        {option}
                    </OptionButton>
                ))}
            </Options>
            <Progress>
                Question {currentQuestion + 1} of {questions.length}
            </Progress>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
    background-color: #f0f4f8;
`;

const Question = styled.h2`
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
`;

const Options = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const OptionButton = styled.button`
    padding: 0.5rem 1rem;
    font-size: 1.25rem;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

const Progress = styled.p`
    margin-top: 20px;
    font-size: 1rem;
`;

export default Quiz;
