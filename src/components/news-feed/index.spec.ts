import { News } from "../../store/news/types"
import { multiplyNews } from "."

it('should miltiply the given array of news', () => {
  const dummyNews: News[] = [
    {
      id: 0,
      text: '',
      title: ''
    },
    {
      id: 1,
      text: '',
      title: ''
    }
  ]

  expect(multiplyNews(dummyNews, 4).length).toBe(16);
})