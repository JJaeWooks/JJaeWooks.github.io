import {makeAutoObservable} from "mobx";

class ResultStore {
    answers: boolean[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    // 답변을 추가하는 함수
    addAnswer(answer: boolean) {
        this.answers.push(answer);
    }

    // 저장된 답변 초기화 함수 (퀴즈를 처음부터 다시 시작할 때)
    resetAnswers() {
        this.answers = [];
    }
}

const resultStore = new ResultStore();
export default resultStore;
