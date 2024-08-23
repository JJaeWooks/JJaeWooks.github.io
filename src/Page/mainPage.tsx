// src/components/MainPage.tsx
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Quiz from "./Quiz";

// Styled Components 정의
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
    margin-bottom: 1rem;
`;

const Description = styled.p`
    font-size: 1.25rem;
    margin-bottom: 2rem;
    max-width: 600px;
`;

const StartButton = styled.button`
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

const MainPage = () => {
    // 로컬 스토리지에 초기 데이터를 저장하는 함수
    const initializeLocalStorage = () => {
        const initialData = [
            {name: 'goldenPothos', quantity: 10},
            {name: 'cactus', quantity: 10},
            {name: 'stookie', quantity: 10},
            {name: 'luckTree', quantity: 10},
            {name: 'tinyArdisia', quantity: 10},
            {name: 'crusia', quantity: 10}
        ];

        initialData.forEach(item => {
            if (!localStorage.getItem(item.name)) {
                localStorage.setItem(item.name, item.quantity.toString());
            }
        });
    };

    // 퀴즈 시작 상태를 컴포넌트 내부 상태로 관리
    const [quizStart, setStart] = useState(false);

    // 컴포넌트가 처음 마운트될 때 로컬 스토리지 초기화
    useEffect(() => {
        initializeLocalStorage();
    }, []);

    // 퀴즈 시작 함수
    const startTest = () => {
        setStart(true);  // 상태만 변경, 로컬 스토리지에는 저장하지 않음
    };

    return (
        <>
            {quizStart && <Quiz/>}
            {!quizStart && (
                <Container>
                    <Title>나랑 찰떡궁합인 식물은?</Title>
                    <StartButton onClick={startTest}>Start</StartButton>
                </Container>
            )}
        </>
    );
};

export default MainPage;
