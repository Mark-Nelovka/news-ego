import {
  Button,
  Card,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import FormateDate from "helpers/transformDate";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "state/hook";
import { deleteNews, getNews } from "state/news/newsOperations";
import { INews } from "types/news";
import calendar from "assets/images/calendar.svg";

export const Cards = () => {
  const [page, setPage] = useState<number>(1);
  const news = useAppSelector((state) => state.news.data);
  const isLoading = useAppSelector((state) => state.news.isLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getNews(page));
  }, [dispatch, page]);

  return (
    <Container maxWidth="xl">
      <Box sx={{ width: "100%", paddingTop: 2, paddingBottom: 2 }}>
        <Grid container rowSpacing={2.5} columnSpacing={2.5}>
          {news.items.length &&
            news.items.map((worker) => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Cardq {...worker} />
                </Grid>
              );
            })}
        </Grid>
        {news.items.length > 0 && (
          <Box
            sx={{
              textAlign: "center",
              mt: 5,
            }}
          >
            <Button
              disabled={news.items.length === news.totalCount ? true : false}
              onClick={() => setPage((prevState) => (prevState += 1))}
              variant="contained"
              size="small"
              sx={{
                minWidth: 120,
                padding: 1,
              }}
            >
              {isLoading ? (
                <CircularProgress size={18} color="inherit" />
              ) : (
                "More news"
              )}
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

function Cardq({ id, title, imageUrl, publishedAt }: INews) {
  // const [first, setfirst] = useState<number>();
  const dispatch = useAppDispatch();

  return (
    <Card key={id} sx={{ minHeight: 420, position: "relative" }}>
      <Box>
        <img src={imageUrl} width="400" height="217" alt="visual news" />
      </Box>
      <Box padding={2}>
        <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
          <Box>
            <img src={calendar} alt="calendar icon" />
          </Box>
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            {FormateDate(publishedAt)}
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ mb: "auto" }}>
          {title}
        </Typography>
        {/* <Box sx={{ mt: "auto" }}> */}
        <Button
          sx={{ background: "red", position: "absolute", bottom: 10 }}
          variant="contained"
          onClick={() => dispatch(deleteNews(id))}
        >
          Delete
        </Button>
        {/* </Box> */}
      </Box>
    </Card>
  );
}
