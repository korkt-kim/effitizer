import { rest } from 'msw';
import { contents, contentItems, sampleMarkdown } from './data';

function pickRandomContents(count) {
  const results = [];
  const items = [...contentItems];

  for (let i = 0; i < count; i++) {
    const index = Math.floor(Math.random() * items.length);
    results.push(items[index]);
    items.splice(index, 1);
  }
  return results;
}

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
    return res(ctx.status(200), ctx.json({ next: 'abc', contents }));
  }),

  rest.get(process.env.API_HOST + '/content/:id', (req, res, ctx) => {
    const { id } = req.params;

    const content = contentItems.find((content) => content.id === Number(id));

    if (content == null) {
      return res(ctx.status(404));
    }

    return res(
      ctx.status(200),
      ctx.json({ ...content, content: sampleMarkdown })
    );
  }),

  rest.get(process.env.API_HOST + '/content/:id/related', (req, res, ctx) => {
    const { id } = req.params;

    const contentIndex = contentItems.findIndex(
      (content) => content.id === Number(id)
    );

    if (contentIndex < 0) {
      return res(ctx.status(404));
    }

    return res(
      ctx.status(200),
      ctx.json({
        previous: contentItems[contentIndex - 1] || null,
        next: contentItems[contentIndex + 1] || null,
        recommended: pickRandomContents(6),
      })
    );
  }),
];
