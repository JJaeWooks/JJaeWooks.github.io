// src/components/MainPage.tsx
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Quiz from "./Quiz";
import logo from "../../../untitled/public/back.png"
// Styled Components 정의
const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
    background-image: url('/back.png');
    /* 1. 이미지의 비율을 유지하면서 컨테이너를 완전히 채우되 이미지의 일부가 잘릴 수 있음 */
    background-size: cover;

    /* 2. 이미지의 전체가 보이도록 크기를 조정하되 컨테이너를 완전히 채우지 않을 수 있음 */
    /* background-size: contain; */

    /* 3. 이미지의 원래 크기를 유지 */
    //background-size: auto;

    /* 4. 이미지 크기를 픽셀로 지정 */
    //background-size: 500px 500px;

    /* 5. 이미지 크기를 백분율로 지정 */
    background-size: 100% 100%;

    background-position: center; /* 배경 이미지 위치 설정 */
    background-repeat: no-repeat; /* 배경 이미지 반복 방지 */
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

const RootButton = styled.button`
    padding: 0.75rem 1.5rem;
    font-size: 1.25rem;
    color: #fff;
    background-color: gray;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    position: absolute;
    top: 10px; /* 상단에서 10px 아래 */
    right: 10px; /* 오른쪽에서 10px 왼쪽 */

    &:hover {
        background-color: darkgray;
    }
`;

const MainPage = () => {
    // 로컬 스토리지에 초기 데이터를 저장하는 함수
    const initializeLocalStorage = () => {
        const initialData = [
            {name: '스킨답서스', quantity: 10},
            {name: '우주목', quantity: 10},
            {name: '스투키', quantity: 10},
            {name: '행운목', quantity: 10},
            {name: '산호수', quantity: 10},
            {name: '크루시아', quantity: 10}
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
    const rootMode = () => {
        const password = window.prompt("비밀번호를 입력하세요:");
        if (password === "ssf17") {
            const plantKeys = [
                '스킨답서스',
                '우주목',
                '스투키',
                '행운목',
                '산호수',
                '크루시아'
            ];

            let storageContents = '';

            // plantKeys에 포함된 키에 대해서만 값을 가져와서 storageContents에 추가
            plantKeys.forEach(key => {
                const value = localStorage.getItem(key);
                if (value !== null) { // 값이 존재하는 경우에만
                    storageContents += `${key}: ${value}\n`;
                }
            });

            // 필터링된 key와 value를 alert로 출력
            alert(storageContents);
        }
    };

    return (
        <>
            {quizStart && <Quiz/>}
            {!quizStart && (

                <Container>
                    <Title>나랑 찰떡궁합인 식물은?</Title>
                    <StartButton onClick={startTest}>Start</StartButton>
                    <RootButton onClick={rootMode}>관리자 모드</RootButton>
                </Container>

            )}
        </>
    );
};

export default MainPage;
