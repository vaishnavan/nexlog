import { getBlogContentQuery } from '@/graphql/quries/getBlogContentQuery';
import client from '../graphql/client'
import { useRouter } from 'next/router';
import { createSlugUrl } from '@/lib/createSlugUrl';
import Head from 'next/head';
import Placeholder from '@/components/Placeholder/Placeholder';
import Card from '@/components/Card/Card';
import { useEffect, useState } from 'react';


export default function HomePage(props) {
  const [blogInfo, setBlogInfo] = useState([])
  const blogData = props.blogData.blogPostCollection.items
  const router = useRouter()

  // set scroll restoration to manual
  useEffect(() => {
    if ('scrollRestoration' in history && history.scrollRestoration !== 'manual') {
      history.scrollRestoration = 'manual';
    }
  }, []);

  // handle and store scroll position
  useEffect(() => {
    const handleRouteChange = () => {
      sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    };
    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events]);

  // restore scroll position
  useEffect(() => {
    if ('scrollPosition' in sessionStorage) {
      window.scrollTo(0, Number(sessionStorage.getItem('scrollPosition')));
      sessionStorage.removeItem('scrollPosition');
    }
  }, []);

  const hanldeNavigate = (title) => {
    const slug = createSlugUrl(title)
    router.push(`${slug}`)
  }

  useEffect(() => {
    setBlogInfo(blogData)
  }, [])

  return (
    <>
      <Head>
        <title>Its works on my machine😂</title>
      </Head>
      {
      blogInfo.length 
      ? 
      <Card blogData={blogInfo} hanldeNavigate={hanldeNavigate} />
      : 
      Array(blogData.length).fill().map((_,ind) => (<Placeholder key={ind} />))
      }
      
    </>
  )
}

export async function getServerSideProps() {
  const { data } = await client.query({
    query: getBlogContentQuery
  })

  return {
    props: {
      blogData: data
    }
  }
}