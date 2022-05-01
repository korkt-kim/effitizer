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
];
