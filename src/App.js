import React, { useEffect, useState } from "react";

import alanBtn from "@alan-ai/alan-sdk-web";
import NewsCards from "./components/NewsCards/NewsCards";
import useStyles from "./styles";
import wordsToNumbers from "words-to-numbers"
import dotenv from "dotenv";
/**
 *
 * const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop - 80);
 *
 * const myRef = useRef(null);
 *
 *  scrollToRef(myRef);
 *
 * ref={myRef}
 */

 dotenv.config();

function App() {
  const classes = useStyles();
  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);
  // 3. Alan AI Logo Image:
  const alanLogoSrc = "https://alan.app/voice/images/previews/preview.jpg";

  useEffect(() => {
    alanBtn({
      key: process.env.REACT_APP_ALAN_SDK_KEY,
      onCommand: ({ command, articles, number }) => {
        // if(command === "testCommand"){
        //   alert('This code was executed')
        // }
        if (command === "newHeadlines") {
          setNewsArticles(articles);
          setActiveArticle(-1);
          console.log("articles are ", articles);
        } else if (command === "highlight") {
          setActiveArticle((prev) => prev + 1);
        } else if (command === "open") {
          const parsedNumber =
            number.length > 2
              ? wordsToNumbers(number, { fuzzy: true })
              : number;
          const article = articles[parsedNumber-1]
          if(parsedNumber > 20){
            alanBtn().playText('Please try that again.')
          }else if(article){
            window.open(article.url, "_blank");
            alanBtn().playText('Opening the page...')
          }
        }else if (command === "go back") {
          window.history.back()
        }
      },
    });
  }, []);

  // author: "BBC News"
  // content: "image captionAll adult women on the Qatar Airways flight were asked to disembark to be searched, reports said (file photo)
  // ↵Australia says it has raised "grossly disturbing" reports with Qatar that w… [+3713 chars]"
  // description: "Women were examined without consent at a Qatar airport after an abandoned baby was found, witnesses say."
  // publishedAt: "2020-10-26T11:52:15.495573Z"
  // source: {id: "bbc-news", name: "BBC News"}
  // title: "Australia seeks Qatar response after female passengers strip-searched"
  // url: "http://www.bbc.co.uk/news/world-middle-east-54682565"
  // urlToImage: "https://ichef.bbci.co.uk/news/1024/branded_news/FE16/production/_115064056_mediaitem115064052.jpg"

  return (
    <div>
      <div className={classes.logoContainer}>
        <img className={classes.alanLogo} src={alanLogoSrc} alt="alan logo" />
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
    </div>
  );
}

export default App;
