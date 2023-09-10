import {
  getBlogContentQuery,
  getBlogSlugQuery,
} from "@/graphql/quries/getBlogContentQuery";
import client from "../graphql/client";
import { createSlugUrl } from "@/lib/createSlugUrl";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useRouter } from "next/router";
import moment from "moment";
import Head from "next/head";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export default function BlogDetail({ postDetail }) {
  const [toggleGif, setToggleGif] = useState(false);
  const router = useRouter();

  const handleBack = () => {
    router.push("/");
  };

  const handleGif = () => {
    setToggleGif(true);
  };

  const handlePause = () => {
    setToggleGif(false);
  };

  return (
    <>
      <Head>
        <title>{postDetail.blogTitle}</title>
      </Head>
      <div className="flex justify-center items-center sticky top-0">
        {postDetail.blogpostId && (
          <audio
            onPlay={handleGif}
            onPause={handlePause}
            className="mt-2"
            src={`/audio/${postDetail.blogpostId}.mp3`}
            controls
          />
        )}
      </div>
      <div className="flex flex-col items-center">
        <div className="max-w-[700px] max-[628px]:w-[320px]">
          <div
            onClick={handleBack}
            className="flex justify-between cursor-pointer py-3 mt-3 dark:bg-black px-2 rounded-md text-blue-400"
          >
            <div>
              <ArrowLeftIcon className="h-5 w-5 text-gray-400 dark:text-gray-400  inline-block" />
            </div>
            <div className="dark:text-gray-400 text-gray-400">{` Back to Home`}</div>
          </div>
          <div className="py-2">
            <h2 className="text-gray-400">
              {moment(postDetail.blogPostedAt).format("dddd") +
                " " +
                moment(postDetail.blogPostedAt).format("LL")}
            </h2>
          </div>
          <div className="">
            <div className="mt-3">
              <img src={postDetail.blogImageUrl} alt="image blog" />
            </div>
            <h1 className="pt-5 font-bold">{postDetail.blogTitle}</h1>
            <hr className="mt-3" />
          </div>
          {toggleGif && (
            <div className="right-0 bottom-0 fixed ">
              <img
                className="w-[150px] max-md:w-[100px]"
                width="100px"
                src={"/woman-talking.gif"}
                alt="speaking modal"
              />
            </div>
          )}

          <div className="py-2 text-lg">
            {documentToReactComponents(postDetail.blogContent.json)}
          </div>
          <div className="h-10"></div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps({ params }) {
  const { data } = await client.query({
    query: getBlogContentQuery,
  });

  const postData = data.blogPostCollection.items.find((d) => {
    return createSlugUrl(d.blogTitle) === params.slug;
  });

  return {
    props: {
      postDetail: postData,
    },
  };
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: getBlogSlugQuery,
  });
  const paths = data.blogPostCollection.items.map((slug) => {
    return {
      params: {
        slug: createSlugUrl(slug.blogTitle),
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}
