import Image from 'next/image';
const BlogDetail = () => {
	const blogData = {
		title: 'Exploring the Beauty of Nature',
		author: 'John Doe',
		date: 'November 30, 2024',
		coverImage:
			'https://lscoecomm.scene7.com/is/image/lscoecomm/24-May-US-%E2%80%93-AAPI-Heritage-Month-Assets_Intro_Media_Overlay?fmt=webp&qlt=70&resMode=sharp2&fit=crop,1&op_usm=0.6,0.6,8&wid=2000&hei=1125', // URL giả
		content: `
      Nature is a powerful and beautiful force that surrounds us in every moment. From the
      majestic mountains to the gentle rivers, the wonders of the natural world inspire and
      humble us. Spending time in nature has been proven to boost our mood, improve mental
      clarity, and even strengthen our immune systems.

      One of the most captivating aspects of nature is its diversity. Each season brings
      new sights, sounds, and smells that captivate the senses. In spring, vibrant flowers
      bloom, while in fall, the leaves turn into a kaleidoscope of warm colors. The soothing
      sound of waves crashing against the shore or the chirping of birds at dawn connects us
      deeply to the environment around us.
    `,
	};

	return (
		<div className="main-blog-detail">
			<header className="blog-title">
				<h1 className="blog-title__main">{blogData.title}</h1>
				<p className="blog-title__meta">
					By <span className="blog-title__author">{blogData.author}</span> |{' '}
					<span className="blog-title__date">{blogData.date}</span>
				</p>
			</header>
			<Image
				width={1000}
				height={1000}
				src={blogData.coverImage}
				alt="Blog Cover"
				className="blog__image"
			/>
			<article className="blog-content-detail">
				{blogData.content.split('\n').map((paragraph, index) => (
					<p
						key={index}
						className="blog-content__paragraph"
					>
						{paragraph}
					</p>
				))}
			</article>
		</div>
	);
};

export default BlogDetail;
