import React, { useState } from 'react';
import Banner from '../HomePage/Banner/Banner';
import Announcements from '../Pages/Announcements/Announcements';

import Posts from '../Pages/Posts/Posts';
import { useSearchParams } from 'react-router-dom';
import PopularDiscussions from '../Pages/PopularDiscussions/PopularDiscussions';
import Testimonials from '../Pages/Testimonials/Testimonials';
import Features from '../Pages/Features/Features';
import Join from '../Pages/Join/Join';

const Home = () => {
    const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const handleSearch = () => {
    if (query.trim()) {
      setSearchParams({ query: encodeURIComponent(query.trim()) });
    }
  };
  const handleTagClick = (tag) => {
    setQuery(tag);
    setSearchParams({ query: encodeURIComponent(tag) });
  };
    return (
        <div>
            <Banner 
            query={query}
            setQuery={setQuery}
            onSearch={handleSearch}
            onTagClick={handleTagClick}/>
            <Posts></Posts> 
            <Announcements> </Announcements>
            <Features></Features>
            <PopularDiscussions></PopularDiscussions>
            <Testimonials></Testimonials>
            <Join></Join>
        </div>
    );
};

export default Home;