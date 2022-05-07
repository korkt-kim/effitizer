import { rest } from 'msw';

export const handlers = [
  rest.get(process.env.API_HOST + '/category', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { id: 0, name: '경제' },
        { id: 1, name: '영어' },
        { id: 2, name: '고전' },
        { id: 3, name: 'IT' },
        { id: 4, name: '문화 예술' },
        { id: 5, name: '역사' },
        { id: 6, name: '인문학' },
        { id: 7, name: '주식' },
        { id: 8, name: '메타버스' },
        { id: 9, name: '여행' },
      ])
    );
  }),

  rest.get(process.env.API_HOST + '/content', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        next: 'abc',
        contents: [
          {
            id: 0,
            title: '위드 코로나 시대,\n세계 경제는 앞으로 어떻게 될까?',
            items: [
              {
                id: 1,
                title: '최악은 스태그플레이션이다',
                book: {
                  title: '바이든 시대 4년 경제 시나리오',
                  author: '최윤식',
                  publisher: '김영사',
                },
              },
              {
                id: 2,
                title: '원자재, 슈퍼 사이클인가? 스몰 사이클인가?',
                book: {
                  title: '위드 코로나 2022년 경제 전망',
                  author: '김광석',
                  publisher: '지식노마드',
                },
              },
              {
                id: 3,
                title: '긴축의 시대, 테이퍼링과 예고된 기준 금리 인상',
                book: {
                  title: '위드 코로나 2022년 경제 전망',
                  author: '김광석',
                  publisher: '지식노마드',
                },
              },
              {
                id: 4,
                title: '글로벌 공급망의 변화: 중국의 운명은?',
                book: {
                  title: '위드 코로나 2022년 경제 전망',
                  author: '김광석',
                  publisher: '지식노마드',
                },
              },
            ],
          },
          {
            id: 1,
            title: '블록체인,\n그 끝은 어디까지인가?',
            items: [
              {
                id: 5,
                title: '메타버스와 NFT의 연결',
                book: {
                  title: '메타버스, 이미 시작된 미래',
                  author: '이임복',
                  publisher: '천그루숲',
                },
              },
              {
                id: 6,
                title: 'NFT, 분할 가능한 저작권의 등장',
                book: {
                  title: '블록체인 트렌드, 2022-2023',
                  author: '커넥팅랩',
                  publisher: '비즈니스북스',
                },
              },
              {
                id: 7,
                title: '블록체인 투표',
                book: {
                  title: '블록체인 혁명',
                  author: '돈 탭스콧 외 1명',
                  publisher: '을유문화사',
                },
              },
              {
                id: 8,
                title: '블록체인, 디지털에 가치를 더하다',
                book: {
                  title: '블록체인, 디지털에 가치를 더하다',
                  author: '심준식',
                  publisher: '한국금융연수원',
                },
              },
            ],
          },
          {
            id: 2,
            title: '인문학으로 보는 세상',
            items: [
              {
                id: 9,
                title: '철학은 어떻게 투자의 무기가 되는가',
                book: {
                  title: '부의 인문학',
                  author: '우석',
                  publisher: '오픈마인드',
                },
              },
              {
                id: 10,
                title: '포스트 코로나 시대의 변화',
                book: {
                  title: 'AI는 인문학을 먹고 산다',
                  author: '한지우',
                  publisher: '미디어숲',
                },
              },
              {
                id: 111,
                title: '5000년 역사를 만든 동서양 천재들의 사색공부법',
                book: {
                  title: '생각하는 인문학',
                  author: '이지성',
                  publisher: '차이',
                },
              },
              {
                id: 112,
                title: '‘나는 누구인가’라는 질문에 정확한 답이 가능할까?',
                book: {
                  title: '하루 10분 인문학',
                  author: '이준형, 지일주',
                  publisher: '나무의철학',
                },
              },
            ],
          },
          {
            id: 3,
            title: '융복합 예술의\n오늘과 내일',
            items: [
              {
                id: 113,
                title: '창의력은 왜 필요한가?',
                book: {
                  title: '문화예술교육은 왜 중요한가',
                  author: '존 소렐, 폴 로버츠, 대런 헨리',
                  publisher: '열린책들',
                },
              },
              {
                id: 114,
                title: '메타픽션 소설 쓰기의 치유적 기능',
                book: {
                  title: '인문예술, 세계를 담다',
                  author: '대전인문예술포럼',
                  publisher: '이담북스',
                },
              },
              {
                id: 115,
                title: '쓸모 있는 ‘예술의 순간’은 어디든 존재한다',
                book: {
                  title: '널 위한 문화예술',
                  author: '오대우, 이지현, 이정우',
                  publisher: '웨일북스',
                },
              },
              {
                id: 116,
                title: '치고 달리며, 쓰고 지우며_경험으로서의 예술',
                book: {
                  title: '예술에 대한 여덟 가지 답변의 역사',
                  author: '김진엽',
                  publisher: '우리학교',
                },
              },
            ],
          },
        ],
      })
    );
  }),
];
