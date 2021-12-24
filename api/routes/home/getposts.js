const Post = require('../.././models/Post');
const moment = require('moment');
moment().format();

module.exports = async (req, res) => {
    console.log('getposts');
    try {
        let newPosts = [];
        const posts = await Post.find({ isAdmin: false })
            .populate('owner')
            .sort({ _id: -1 });

        for (let i = 0; i < posts.length; i++) {
            let timeString = 'Just Now';
            let timeDuration = moment.duration(
                Date.now() - posts[i].currentDate
            );
            if (timeDuration.seconds() > 0)
                timeString = timeDuration.seconds().toString() + ' seconds ago';
            if (timeDuration.minutes() > 0)
                timeString = timeDuration.minutes().toString() + ' minutes ago';
            if (timeDuration.hours() > 0)
                timeString = timeDuration.hours().toString() + ' hours ago';
            if (timeDuration.days() > 0)
                timeString = timeDuration.days().toString() + ' days ago';
            if (timeDuration.months() > 0)
                timeString = timeDuration.months().toString() + ' months ago';
            if (timeDuration.years() > 0)
                timeString = timeDuration.years().toString() + ' years ago';

            newPosts[i] = {
                liked: posts[i].liked,
                bookmarked: posts[i].bookmarked,
                comments: posts[i].comments,
                imageLink: posts[i].imageLink,
                question: posts[i].question,
                owner: posts[i].owner,
                isAdmin: posts[i].isAdmin,
                currentDate: posts[i].currentDate,
                postedAgo: timeString,
            };
        }

        return res.send({ success: true, data: newPosts });
    } catch (err) {
        console.log('err:');
        console.log(err);
        return res.send({ success: false, data: 'Server error' });
    }
};
