import React from 'react';

const FeaturedTopic = (props) => {
    return (
      <div className='featured-topic'>
        {/* ==========================Image========================== */}
          <div className='featured-topic-image-box'>
            <a className='featured-topic-link' href={props.link} target="_blank">
              <img className='featured-topic-image' src={props.image}/>
            </a>
          </div>
      </div>
    );
};

export default FeaturedTopic;