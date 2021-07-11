import Link from "next/link";
import client from "../client";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);

function urlFor(source) {
  return builder.image(source);
}

const query = `*[_type == "post"]{
  _id,
  title,
  slug,
  mainImage{
    asset->{
    _id,
    url
  }
}
}`;

function Index({ posts }) {
  return (
    <div>
      <h1>blog</h1>
      {posts &&
        posts.map((post) => (
          <Link href={`/post/${post.slug.current}`} key={post.slug.current}>
            <div>
              <div>
                <img src={urlFor(post.mainImage).width(400).url()} alt="" />
              </div>
              <p>{post.title}</p>
              <hr />
            </div>
          </Link>
        ))}
    </div>
  );
}

export const getStaticProps = async () => {
  const posts = await client.fetch(query);
  return {
    props: { posts },
  };
};

export default Index;
