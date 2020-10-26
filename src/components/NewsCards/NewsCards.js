import { Grid, Grow, Typography } from "@material-ui/core";
import React from "react";
import NewsCard from "../NewsCard/NewsCard";
import useStyles from "./styles";

function NewsCards({ articles, activeArticle }) {
  const classes = useStyles();

  //2. Info Cards Array:

  const infoCards = [
    { color: "#00838f", title: "Latest News", text: "Give me the latest news" },
    {
      color: "#1565c0",
      title: "News by Categories",
      info:
        "Business, Entertainment, General, Health, Science, Sports, Technology",
      text: "Give me the latest Technology news",
    },
    {
      color: "#4527a0",
      title: "News by Terms",
      info: "Bitcoin, PlayStation 5, Smartphones, Donald Trump...",
      text: "What's up with PlayStation 5",
    },
    {
      color: "#283593",
      title: "News by Sources",
      info: "CNN, Wired, BBC News, Time, IGN, Buzzfeed, ABC News...",
      text: "Give me the news from CNN",
    },
  ];


  if (!articles.length) {
    return (
      <Grow in>
        <Grid
          className={classes.container}
          container
          alignItems="stretch"
          spacing={3}
        >
          {infoCards.map((infocard) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              className={classes.infoCard}
            >
              <div
                className={classes.card}
                style={{
                  background: infocard.color,
                }}
              >
                <Typography variant="h5" componenet="h5">{infocard.title}</Typography>
                {infocard.info && (
                  <Typography variant="h6" component="h6">
                    <strong>{infocard.title.split(" ")[2]}</strong>:
                    <br />
                    {infocard.info}
                  </Typography>
                )}
                <Typography variant="h6">
                  Try saying <br />
                  <i>{infocard.text}</i>
                </Typography>
              </div>
            </Grid>
          ))}
        </Grid>
      </Grow>
    );
  }
  return (
    <Grow in>
      <Grid
        className={classes.container}
        container
        alignItems="stretch"
        spacing={3}
      >
        {articles.length > 0 &&
          articles.map((article, index) => (
            <Grid
              key={index}
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              style={{ display: "flex" }}
            >
              <NewsCard activeArticle={activeArticle} key={index} article={article} index={index} />
            </Grid>
          ))}
      </Grid>
    </Grow>
  );
}

export default NewsCards;
