import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import React,{useState, useEffect, createRef} from "react";
import classNames from "classnames";
import useStyles from "./styles";
const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop - 50);
function NewsCard({
  article: { description, publishedAt, source, title, url, urlToImage },
  index,
  activeArticle,
}) {
  const classes = useStyles();
  const [elementRefs, setElementRefs] = useState([])
  useEffect(() => {
    setElementRefs(refs => Array(20).fill().map((_, i)=>refs[i] || createRef()))
  }, [])

    useEffect(() => {
      if(index=== activeArticle && elementRefs[activeArticle]){
        scrollToRef(elementRefs[activeArticle]);
      }
    }, [index, activeArticle, elementRefs]);

  return (
    <Card
      ref={elementRefs[index]}
      className={classNames(
        classes.card,
        activeArticle === index ? classes.activeCard : null
      )}
    >
      <CardActionArea href={url} target="_blank">
        <CardMedia
          className={classes.media}
          image={
            urlToImage ||
            "https://cdn.pixabay.com/photo/2017/06/26/19/03/news-2444778_960_720.jpg"
          }
          title={title}
        />
        <div className={classes.details}>
          <Typography gutterBottom variant="body2" component="h2">
            {new Date(publishedAt).toDateString()}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="h2">
            {source.name}
          </Typography>
        </div>
        <Typography
          className={classes.title}
          gutterBottom
          variant="h5"
          color="textSecondary"
        >
          {title}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary">
          <a href={url} target="_blank" rel="noopener noreferrer">
            Learn More
          </a>
        </Button>
        <Typography variant="body2" color="textSecondary" component="p">
          {index + 1}
        </Typography>
      </CardActions>
    </Card>
  );
}

export default NewsCard;
