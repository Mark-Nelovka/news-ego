import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, Container, Grid, Typography, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useAppDispatch, useAppSelector } from "state/hook";
import { deleteNews, getNews } from "state/news/newsOperations";
import { INews } from "types/state";
import FormateDate from "helpers/transformDate";
import { ButtonGen, Loader } from "general";
import calendar from "assets/images/calendar.svg";
import ErrorPage from "pages/ErrorPage/ErrorPage";

const useStyles = makeStyles(() => ({
  buttonMore: {
    minWidth: 120,
    padding: 1,
    minHeight: 30,
  },
  buttonRemove: {
    background: "red",
    "&:hover": {
      background: "#b60707",
    },
    position: "absolute",
    bottom: 10,
  },
}));

export const Cards = () => {
  const { t } = useTranslation("translation");
  const [page, setPage] = useState<number>(1);
  const news = useAppSelector((state) => state.news.data);
  const state = useAppSelector((state) => state.news);
  const dispatch = useAppDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getNews(page));
  }, [dispatch, page]);

  return (
    <Container maxWidth="xl">
      {state.error.message && <ErrorPage />}
      {!state.error.message && (
        <Box width="100%" paddingTop={2} paddingBottom={2}>
          <Grid container rowSpacing={2.5} columnSpacing={2.5}>
            {news.items.length &&
              news.items.map((worker) => {
                return (
                  <Grid key={worker.id} item xs={12} sm={6} md={4} lg={3}>
                    <CardItem {...worker} />
                  </Grid>
                );
              })}
          </Grid>
          {news.items.length > 0 && (
            <Box marginTop={5} textAlign="center">
              <ButtonGen
                disabled={news.items.length === news.totalCount ? true : false}
                onClick={() => setPage((prevState) => (prevState += 1))}
                variant="contained"
                style={classes.buttonMore}
              >
                {state.isLoading ? <Loader size={18} /> : t("button.more")}
              </ButtonGen>
            </Box>
          )}
        </Box>
      )}
    </Container>
  );
};

function CardItem({ id, title, imageUrl, publishedAt }: INews) {
  const { t } = useTranslation("translation");
  const dispatch = useAppDispatch();
  const classes = useStyles();

  return (
    <Card key={id} sx={{ minHeight: 420, position: "relative" }}>
      <Box>
        <img src={imageUrl} width="400" height="217" alt="visual news" />
      </Box>
      <Box padding={2}>
        <Box display="flex" alignItems="center" mb={1}>
          <Box>
            <img src={calendar} alt="calendar icon" />
          </Box>
          <Typography variant="subtitle1" ml={1}>
            {FormateDate(publishedAt)}
          </Typography>
        </Box>
        <Typography variant="body2">{title}</Typography>
        <ButtonGen
          style={classes.buttonRemove}
          variant="contained"
          onClick={() => dispatch(deleteNews(id))}
        >
          {t("button.remove")}
        </ButtonGen>
      </Box>
    </Card>
  );
}
