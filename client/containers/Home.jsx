import React from 'react';
import FeaturedTopic from '../components/Home/FeaturedTopic.jsx';
import TEMP from '../images/TEMP-TOPIC.png'

const Home = (props) => {
  //for testing
  const propsTopic = [
    ["https://account.arena.net/login",TEMP],
    ["https://account.arena.net/login",TEMP],
    ["https://account.arena.net/login",TEMP],
    ["https://account.arena.net/login",TEMP]
  ]
  const topics = []
  for(let i = 0; i < propsTopic.length;i++){
    topics.push(<FeaturedTopic key={`FeaturedTopic${i}`}
      link={propsTopic[i][0]} 
      image={propsTopic[i][1]} 
      />)
  }
  
  return (
    <div className='main-container'>
      <div className='featured-topic-container'>
        {topics}
      </div>

    </div>
  );
};

export default Home;