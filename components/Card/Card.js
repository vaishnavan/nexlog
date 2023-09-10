import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Link from 'next/link';
import { createSlugUrl } from '@/lib/createSlugUrl';
import moment from 'moment';
import { readingTime } from 'reading-time-estimator'
import SearchBar from '../SearchBar/SearchBar';
import { useState, useEffect } from 'react';
import debounce from 'lodash/debounce';


export default function Card({ blogData, hanldeNavigate }) {
    const [searchBlogTitle, setSearchBlogTitle] = useState("")
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const debounceDelay = 500;

    useEffect(() => {
        setFilteredBlogs(blogData);
    }, []);

    const performSearch = (searchBlogTitle) => {
        const filtered = blogData.filter((blog) =>
            blog.blogTitle.toLowerCase().includes(searchBlogTitle.toLowerCase())
        );
        setFilteredBlogs(filtered);
    };

    const debouncedSearch = debounce(performSearch, debounceDelay);

    const handleBlogSearch = (event) => {
        setSearchBlogTitle(event.target.value)
        debouncedSearch(event.target.value);
    }


    return (
        <div>
            {/* search component */}
            <SearchBar handleBlogSearch={handleBlogSearch} searchBlogTitle={searchBlogTitle} />
            <div className='flex flex-col items-center justify-center mt-5'>
                {filteredBlogs.map((item) => {
                    return (
                        <div key={item.blogpostId} onClick={() => hanldeNavigate(item.blogTitle)} className='flex max-[628px]:flex-col dark:dark:bg-[#373737] transition p-[5px] ease-in-out delay-150 hover:-translate-y-0 cursor-pointer hover:scale-110 duration-300 shadow-md rounded-md max-[628px]:max-w-[320px] w-[800px] max-[768px]:w-[520px] mt-5'>
                            <div className=''>
                                <img className='w-[320px] h-[100%] max-[628px]:w-[100%] rounded-tl-md rounded-bl-md' src={item.blogImageUrl} alt='blog image' />
                            </div>
                            <div className='mx-2 w-[450px] max-[628px]:max-w-[300px]  max-[628px]:mt-3'>
                                <h3 className='font-bold'>{item.blogTitle}</h3>
                                <div className='h-[145px] text-ellipsis overflow-clip line-clamp-6'>
                                    {documentToReactComponents(item.blogContent.json)}
                                </div>
                                <div className='flex justify-between items-center mt-5'>
                                    <div>
                                        <span className='text-gray-400'>{moment(item.blogPostedAt).startOf('hour').fromNow()} <div className='w-[3px] h-[20px] mb-[-4px] bg-gray-400 inline-block'></div>  {readingTime(`${documentToReactComponents(item.blogContent.json)}`, 10).text}</span>
                                    </div>
                                    <div className=''>
                                        <Link className='no-underline p-2 text-gray-400 hover:underline' href={`${createSlugUrl(item.blogTitle)}`}>Read More...</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
                {!filteredBlogs.length && <img width="400px"  src='/undraw_not_found.svg' alt='undarw-image' />}
            </div>
            <div className='h-10'>
            </div>
        </div>
    )
}