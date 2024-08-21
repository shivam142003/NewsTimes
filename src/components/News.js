import React, { useEffect, useState } from 'react';
import Newsitem from './Newsitem';
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const updatenews = async () => {
    const url = `https://newsapi.org/v2/everything?q=tesla&from=2024-07-21&sortBy=publishedAt&apiKey=8d5f5299fa824747a7b9a6cde044cc18&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    try {
      let data = await fetch(url);
      let parseddata = await data.json();
      setArticles(parseddata.articles);
      setTotalResults(parseddata.totalResults);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    updatenews();
  }, []); // Added page and pageSize to dependencies

  const fetchMoreData = async () => {
    setPage(prevPage => prevPage + 1); // Use functional update to ensure the latest page number
    const nextPage = page + 1;
    const url = `https://newsapi.org/v2/everything?q=tesla&from=2024-07-21&sortBy=publishedAt&apiKey=8d5f5299fa824747a7b9a6cde044cc18&page=${nextPage}&pageSize=${props.pageSize}`;
    try {
      let data = await fetch(url);
      let parseddata = await data.json();
      setArticles(prevArticles => prevArticles.concat(parseddata.articles));
      setTotalResults(parseddata.totalResults);
    } catch (error) {
      console.error("Error fetching more news:", error);
    }
  };

  return (
    <>
      <h1 className='text-center'>NewsTimes</h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults} // Corrected hasMore condition
        loader={<Spinner />}
      >
        <div className='container'>
          <div className='row'>
            {articles.map((element) => (
              <div className='col-md-4' key={element.url}>
                <Newsitem
                  title={element.title ? element.title.slice(0, 44) : ""}
                  description={element.description ? element.description.slice(0, 88) : ""}
                  imageurl={element.urlToImage}
                  newsurl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

export default News;
