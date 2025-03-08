import React, { useState } from 'react';
import Banner from '../HomePage/Banner/Banner';
import Announcements from '../Pages/Announcements/Announcements';

import Posts from '../Pages/Posts/Posts';
import { useSearchParams } from 'react-router-dom';

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
             <Announcements> </Announcements>
            <Posts></Posts> 

        </div>
    );
};

export default Home;