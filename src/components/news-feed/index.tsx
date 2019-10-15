import React, { useEffect } from 'react';
import { AppState } from '../../store';
import { fetchNewsAction, setNewsAction } from '../../store/news/actions';
import { connect } from 'react-redux';
import { NewsState, News } from '../../store/news/types';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { Card, CardContent, CardActions, Button, Typography, Grid, useMediaQuery } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { LoadingState } from '../../store/loading/types';

const styles = {
  root: {
    position: 'relative',
    height: '100%'
  },
  title: {
    marginBottom: '12px !important'
  },
  cardActions: {
    justifyContent: 'flex-end'
  },
  totalNews: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'flex-end',
    '& span': {
      padding: '10px',
      background: 'rgba(0, 0, 0, .08)'
    }
  }
}

interface Props {
  classes: any;
  news: NewsState;
  loading: LoadingState;
  fetchNews: () => Observable<AxiosResponse<any>>;
  setNews: (news: News[]) => void;
}

const NewsFeed = (props: Props) => {
  useEffect(() => {
    props.fetchNews()
      .subscribe(res => {
        let news = res.data.data as News[];
        news = multiplyNews(news, 4);
        props.setNews(news as News[]);
      })
  }, []);

  const xsUp = useMediaQuery('(min-width: 960px)');

  return (
    <Grid container direction="column" wrap="nowrap" spacing={2} className={props.classes.root}>
      {
        props.news &&
          props.news.news.map((news, i) => (
            // key={news.id}
            <Grid item key={i}>
              <Card>
                <CardContent>
                  <Typography className={props.classes.title} variant="h5">
                    { news.title }
                  </Typography>
                  <Typography variant="body2" component="p">
                    { news.text }
                  </Typography>
                </CardContent>
                <CardActions className={props.classes.cardActions}>
                  <Button size="small">Читать</Button>
                </CardActions>
              </Card>
            </Grid>
          ))
      }
      {
        xsUp && props.loading.loadingResourcesCount === 0 && (
          <div className={props.classes.totalNews}>
            <span>
              всего новостей: { props.news.news.length }
            </span>
          </div>
        )
      }
    </Grid>
  )
}

const mapStateToProps = (state: AppState) => ({
  news: state.news,
  loading: state.loading
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchNews: () => dispatch(fetchNewsAction()),
  setNews: (news: News[]) => dispatch(setNewsAction(news))
});

// @ts-ignore
const NewsFeedStyled = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NewsFeed));

export { NewsFeedStyled as NewsFeed }

export const multiplyNews = (news: News[], multiplier: number): News[] => {
  for (let i=1; i<multiplier; i++) {
    news = news.concat(news.slice())
  }

  return news;
}