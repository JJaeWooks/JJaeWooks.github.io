import React, {useEffect, useState} from 'react';
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
    const flower: string[] = ["스투키", "스킨답서스", "우주목", "크루시아", "행운목", "산호수"]
    const [resultContent, setResultContent] = useState("")
    const [white, setWhite] = useState(false);
    const [dark, setDark] = useState(false);
    // 결과에 따라 로컬 스토리지 값을 업데이트

    useEffect(() => {

        if (result[0]) {
            if (!result[1] && result[3] && getQuantity('스투키') > 0) {
                setResultContent(flower[0])
                setQuantity('스투키', getQuantity('스투키') - 1);
            } else if (!result[3] && getQuantity('스킨답서스') > 0) {
                setResultContent(flower[1])
                setQuantity('스킨답서스', getQuantity('스킨답서스') - 1);
            } else if (result[1] && getQuantity('우주목') > 0) {
                setResultContent(flower[2])
                setQuantity('우주목', getQuantity('우주목') - 1);
            } else {
                // setResultContent = "양지식물";
                setWhite(true)
            }
        } else if (!result[0]) {
            if (!result[1] && result[3] && getQuantity('크루시아') > 0) {
                setResultContent(flower[3])
                setQuantity('크루시아', getQuantity('크루시아') - 1);
            } else if (result[3] && getQuantity('행운목') > 0) {
                setResultContent(flower[4])
                setQuantity('행운목', getQuantity('행운목') - 1);
            } else if (result[1] && getQuantity('산호수') > 0) {
                setResultContent(flower[5])
                setQuantity('산호수', getQuantity('산호수') - 1);
            } else {
                // resultContent = "음지식물";
                setDark(true)
            }
        }
    }, [result]); // `result`가 변경될 때만 `useEffect`가 실행됩니다.


    // 다시 퀴즈를 시작할 수 있는 함수
    const restartQuiz = () => {
        resultStore.resetAnswers();
        navigate('/'); // 메인 페이지로 이동
    };

    const handlePlantSelection = (key: string) => {
        const quantity = getQuantity(key);

        if (quantity > 0) {
            setQuantity(key, quantity - 1);
            setWhite(false)
            setDark(false)
            navigate('/'); // 페이지 이동
        }
    };

    return (
        <Container>
            {white && (
                <>
                    <Title>양지 식물 중 한 개를 선택해주세요</Title>
                    {getQuantity('스킨답서스') > 0 && (
                        <RestartButton onClick={() => handlePlantSelection('스킨답서스')}>스킨답서스</RestartButton>
                    )}
                    {getQuantity('우주목') > 0 && (
                        <RestartButton onClick={() => handlePlantSelection('우주목')}>우주목</RestartButton>
                    )}
                    {getQuantity('스투키') > 0 && (
                        <RestartButton onClick={() => handlePlantSelection('스투키')}>스투키</RestartButton>
                    )}
                    <RestartButton onClick={restartQuiz}>다시 하기</RestartButton>

                </>
            )}

            {dark && (
                <>
                    <Title>음지 식물 중 한 개를 선택해주세요</Title>
                    {getQuantity('행운목') > 0 && (
                        <RestartButton onClick={() => handlePlantSelection('행운목')}>행운목</RestartButton>
                    )}
                    {getQuantity('산호수') > 0 && (
                        <RestartButton onClick={() => handlePlantSelection('산호수')}>산호수</RestartButton>
                    )}
                    {getQuantity('크루시아') > 0 && (
                        <RestartButton onClick={() => handlePlantSelection('크루시아')}>크루시아</RestartButton>
                    )}
                    <RestartButton onClick={restartQuiz}>다시 하기</RestartButton>

                </>
            )}

            {!white && !dark && (
                <>
                    <Title>당신의 식물은?</Title>
                    <ResultText>
                        {`당신의 식물은 ${resultContent} 입니다`}
                    </ResultText>
                    <RestartButton onClick={restartQuiz}>다시 하기</RestartButton>
                </>
            )}
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
    margin-top: 10px;

    &:hover {
        background-color: #0056b3;
    }
`;

export default ResultPage;
