// import fs from 'fs'
import PageTitle from '@/components/PageTitle'
// import generateRss from '@/lib/generate-rss'
// import { formatSlug, getAllFilesFrontMatter, getFileBySlug, getFiles } from '@/lib/mdx'
import { getFileBySlug } from '@/lib/mdx'

const DEFAULT_LAYOUT = 'PostLayout'

export async function getServerSideProps({ params }) {
  // const allPosts = await getAllFilesFrontMatter('blog')
  const res = await fetch(`https://muzmmil207.pythonanywhere.com/posts/${params.slug.join('/')}`)
  const post = await res.json()

  // const postIndex = allPosts.findIndex((post) => formatSlug(post.slug) === params.slug.join('/'))
  const prev = null // allPosts[postIndex + 1] ||
  const next = null // allPosts[postIndex - 1] ||
  const authorList = ['default']
  const authorPromise = authorList.map(async (author) => {
    const authorResults = await getFileBySlug('authors', [author])
    return authorResults.frontMatter
  })
  const authorDetails = await Promise.all(authorPromise)

  // rss
  // if (allPosts.length > 0) {
  //   const rss = generateRss(allPosts)
  //   fs.writeFileSync('./public/feed.xml', rss)
  // }
  return { props: { post, authorDetails, prev, next } }
}

export default function Blog({ post, authorDetails, prev, next }) {
  const mdxSource = post.content
  const toc = []
  const frontMatter = post

  return (
    <>
      {frontMatter.draft !== true ? (
        // <MDXLayoutRenderer
        //   layout={frontMatter.layout || DEFAULT_LAYOUT}
        //   toc={toc}
        //   mdxSource={mdxSource}
        //   frontMatter={frontMatter}
        //   authorDetails={authorDetails}
        //   prev={prev}
        //   next={next}
        // />
        <div style={{ textAlign: "justify" }} dangerouslySetInnerHTML={{ __html: mdxSource }}></div>
      ) : (
        <div className="mt-24 text-center">
          <PageTitle>
            Under Construction{' '}
            <span role="img" aria-label="roadwork sign">
              🚧
            </span>
          </PageTitle>
        </div>
      )}
    </>
  )
}


