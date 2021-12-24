const Post = require('../.././models/Post');

module.exports = async (req, res) => {
    console.log('getpost');
    try {
        const posts = await Post.find({
            _id: req.params.postid,
        })
            .populate('owner')
            .sort({ _id: -1 });
        return res.send({ success: true, data: posts });
    } catch (err) {
        console.log('err:');
        console.log(err);
        return res.send({ success: false, data: 'Server error' });
    }
};
