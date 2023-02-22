import { Card, Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import FormateDate from "helpers/transformDate";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "state/hook";
import { getNews } from "state/news/newsOperations";
import { INews } from "types/news";
import calendar from "assets/images/calendar.svg";

export const Cards = () => {
  const news = useAppSelector((state) => state.news.news);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);

  return (
    <Container maxWidth="xl">
      <Box sx={{ width: "100%", paddingTop: 2 }}>
        <Grid container rowSpacing={2.5} columnSpacing={2.5}>
          {news.length &&
            news.map((worker) => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Cardq {...worker} />
                </Grid>
              );
            })}
        </Grid>
      </Box>
    </Container>
  );
};

function Cardq({ id, title, summary, imageUrl, publishedAt }: INews) {
  return (
    <Card key={id} className="cards__list-item">
      <Box>
        <img src={imageUrl} width="400" height="217" alt="visual news" />
      </Box>
      <Box padding={2}>
        <Box display="flex" alignItems="center">
          <Box>
            <img src={calendar} alt="calendar icon" />
          </Box>
          <Typography>{FormateDate(publishedAt)}</Typography>
        </Box>
        <Typography>{title}</Typography>
        <Typography>{summary.slice(0, 100)}...</Typography>
      </Box>
    </Card>
  );
}
