import React from 'react';
import styled from 'styled-components';
import {observer} from 'mobx-react-lite';
import {useNavigate} from 'react-router-dom';
import resultStore from "../Store/ResultStore";

const ResultPage = observer(() => {
    const navigate = useNavigate();

// 로컬 스토리지에서 값을 가져와 숫자로 변환하는 함수
    const getQuantity = (key: string): number => {
        const quantityString = localStorage.getItem(key);
        return quantityString ? parseInt(quantityString, 10) : 0;
    };

// 로컬 스토리지에 값을 저장하는 함수
    const setQuantity = (key: string, quantity: number) => {
        localStorage.setItem(key, quantity.toString());
    };


    // 퀴즈 결과를 기반으로 간단한 메시지를 표시
    const result = resultStore.answers
    const flower: string[] = ["스투키", "스킨답서스", "선인장", "크루시아", "행운목", "산호수"]
    let resultContent = ""
    // 결과에 따라 로컬 스토리지 값을 업데이트
    if (result[0]) {
        if (!result[1] && result[3] && getQuantity('stookie') > 0) {
            resultContent = flower[0];
            setQuantity('stookie', getQuantity('stookie') - 1);
        } else if (!result[3] && getQuantity('goldenPothos') > 0) {
            resultContent = flower[1];
            setQuantity('goldenPothos', getQuantity('goldenPothos') - 1);
        } else if (result[1] && getQuantity('cactus') > 0) {
            resultContent = flower[2];
            setQuantity('cactus', getQuantity('cactus') - 1);
        } else {
            resultContent = "양지식물";
        }
    } else if (!result[0]) {
        if (!result[1] && result[3] && getQuantity('crusia') > 0) {
            resultContent = flower[3];
            setQuantity('crusia', getQuantity('crusia') - 1);
        } else if (result[3] && getQuantity('luckTree') > 0) {
            resultContent = flower[4];
            setQuantity('luckTree', getQuantity('luckTree') - 1);
        } else if (result[1] && getQuantity('tinyArdisia') > 0) {
            resultContent = flower[5];
            setQuantity('tinyArdisia', getQuantity('tinyArdisia') - 1);
        } else {
            resultContent = "음지식물";
        }
    }


    // 다시 퀴즈를 시작할 수 있는 함수
    const restartQuiz = () => {
        resultStore.resetAnswers();
        navigate('/'); // 메인 페이지로 이동
    };

    return (
        <Container>
            <Title>당신의 식물은?</Title>
            <ResultText>
                {`당신의 식물은 ${resultContent} 입니다`}
            </ResultText>
            <RestartButton onClick={restartQuiz}>다시 하기</RestartButton>
        </Container>
    );
});

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
    background-color: #f0f4f8;
`;

const Title = styled.h1`
    font-size: 2.5rem;
    margin-bottom: 2rem;
`;

const ResultText = styled.p`
    
    font-size: 1.5rem;
    margin-bottom: 2rem;
`;

const RestartButton = styled.button`
    padding: 0.75rem 1.5rem;
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

export default ResultPage;
