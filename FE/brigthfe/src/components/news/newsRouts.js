import React from 'react';

import './news.css'
import News from '../news/allNews/news'

class NewsRoute extends React.Component {
    state = {
        expanded: this.props.allNews
    };

    render() {

        return (
            <div className="news-content">
                {this.state.expanded.map((news) => (
                    <News title={news.title}  content={news.content} firsName={news.first_name}/>

                ))}

            </div>
        );
    }
}

export default NewsRoute;