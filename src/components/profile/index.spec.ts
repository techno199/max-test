import { getSocialLinks } from "."

it('should sort social links. First links must be related to website.', () => {
  const dummyLinks: { link: string; label: string }[] = [
    {
      label: 'web',
      link: 'some link1'
    },
    {
      label: 'whateverlabel',
      link: 'some link2'
    }
  ]

  const sortedLinks = getSocialLinks(dummyLinks);
  expect(sortedLinks[0].label).toBe('web');
})