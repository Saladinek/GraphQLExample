import { GraphQLPage } from './app.po';

describe('graph-ql App', function() {
  let page: GraphQLPage;

  beforeEach(() => {
    page = new GraphQLPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
