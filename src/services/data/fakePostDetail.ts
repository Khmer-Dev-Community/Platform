export const fakePostDetail = {
  id: 'single-post-1',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  username: 's/photography_lover',
  timeAgo: '2 hr ago',
  title: 'Sunrise over Angkor Wat, simply breathtaking!',
  description:
    'Woke up at 4 AM to catch this view, and it was absolutely worth it. The way the light hit the ancient stones was magical. Definitely adding this to my top travel experiences. If you ever get a chance to visit, make sure to catch the sunrise from reflecting ponds for the best view.',
  link: 'https://www.travelguide.com/angkor-wat-guide',
  image: 'https://picsum.photos/seed/angkor-detail/800/600', // Larger image for detail view
  upvotes: 1250,
  comments: 45, // Total comments count
  isFollowing: false,
  detailViews: '5.6K', // New stat for detail page

  // Nested comments data
  discussion: [
    {
      id: 'comment-1',
      avatar: 'https://randomuser.me/api/portraits/women/50.jpg',
      username: 'TravelEnthusiast',
      timeAgo: '1 hr ago',
      content:
        'Absolutely agree! Angkor Wat at sunrise is an experience that stays with you forever. Did you visit Bayon Temple too? Its smiling faces are equally captivating.',
      upvotes: 15,
      replies: [
        {
          id: 'reply-1-1',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg', // Original poster replying
          username: 's/photography_lover',
          timeAgo: '50 min ago',
          content:
            'Yes, I did! Bayon was incredible. The scale of it is just immense. I also loved Ta Prohm with the trees growing through the ruins – felt like an adventure!',
          upvotes: 8,
          replies: [],
        },
        {
          id: 'reply-1-2',
          avatar: 'https://randomuser.me/api/portraits/women/60.jpg',
          username: 'CultureSeeker',
          timeAgo: '40 min ago',
          content:
            "Ta Prohm is definitely iconic! Did you get a chance to explore Banteay Srei? It's smaller but the intricate carvings are stunning.",
          upvotes: 5,
          replies: [],
        },
      ],
    },
    {
      id: 'comment-2',
      avatar: 'https://randomuser.me/api/portraits/men/40.jpg',
      username: 'HistoryBuff',
      timeAgo: '30 min ago',
      content:
        "The architectural genius behind Angkor Wat is truly mind-boggling. It's a testament to ancient Khmer civilization. Thanks for sharing the beautiful photo!",
      upvotes: 10,
      replies: [],
    },
    {
      id: 'comment-3',
      avatar: 'https://randomuser.me/api/portraits/women/70.jpg',
      username: 'Wanderluster',
      timeAgo: '15 min ago',
      content:
        'Your photo makes me want to book a trip right now! What camera did you use to capture this stunning shot?',
      upvotes: 7,
      replies: [],
    },
  ],
}
