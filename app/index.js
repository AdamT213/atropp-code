const Express = require('express')
const BodyParser = require('body-parser')
const Fs = require('fs')
const Path = require('path');
const Session = require('express-session')
const Cors = require('cors');
const Multer = require('multer');

require('dotenv').config()

const ENV = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3001;

const MongoStore = require('connect-mongo')(Session);
const MongoClient = require('mongodb').MongoClient;

const url =
  process.env.NODE_ENV === 'production'
    ? `${process.env.MONGODB_URI}`
    : `${process.env.MONGODB_URI}/${process.env.DBNAME}`;

const client = new MongoClient(url, {
  useNewUrlParser: true,
  // useUnifiedTopology: true
});
const connection = client.connect();
exports.client = client;
exports.connection = connection;

const app = Express();
const router = Express.Router()
app.use(
    Cors({
      credentials: true,
      origin:
        process.env.NODE_ENV === 'production'
          ? 'https://atroppcode.adt6261.now.sh'
          : 'http://localhost:5000'
    })
  );

  app.use('/api', router)

  if (ENV === 'production') {
    // Serve static files from the React app
    app.use(Express.static(Path.resolve(__dirname, '../client/public')));
  
    // The "catchall" handler: for any request that doesn't
    // match one above, send back svelte bundle.
    app.get('*', (req, res) => {
      res.sendFile(
        Path.join(__dirname, '../client/public', 'index.html')
      );
    });
  }
  
  exports.up = () => {
    return app.listen(port, () => console.log(`listening on port ${port}!`));
  };

  const storage = Multer.MemoryStorage;

  const upload = Multer({
    storage,
    limits: { fieldSize: 25 * 1024 * 1024 }
  }).any();
  
  const {
    uploadFile, uploadFileAtPath
  } = require('./AWS/requests');

router.post('/savePost', upload, async (req, res, next) => {
    try {
      const { slug, title, meta, postBody } = req.body;
      const image = req.files[0]
      const newPost = {
        slug,
        title,
        meta,
        imageUrl: 'tbd',
        postBodyURL: 'tbd'
      };
      await connection;
      const db = client.db(process.env.DBNAME);
      const posts = db.collection('posts');
      const post = await posts.insertOne(newPost);
      const postId = post.insertedId;
      await Fs.writeFileSync('tmp/postBody.json', postBody, err => {
        if (err) throw err;
      });
      const bodyUpload = await uploadFileAtPath((Path.resolve(__dirname, '../tmp/postBody.json')), postId.toString());
      const imageUpload = await uploadFile(image.buffer, postId.toString())
      await posts.updateOne({_id: postId}, { $set: 
        {imageUrl: `${process.env.S3_BUCKET_URI}/${postId}-img`, postBodyURL: 
      `${process.env.S3_BUCKET_URI}/${postId}`
    }})
      res.sendStatus(200);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  });

  router.get('/postDetails?', async (req, res) => { 
    try { 
      const {slug} = req.query;
      await connection;
      const db = client.db(process.env.DBNAME);
      const posts = db.collection('posts');
      const post  = await posts.findOne({slug})
      return res.status(200).send(post)
    } catch(e) {
      return res.sendStatus(500)
    }
  })

  router.get('/posts?', async (req, res) => { 
    try {
      await connection;
      const db = client.db(process.env.DBNAME);
      const posts = db.collection('posts');
      const details  = await posts.find({}).toArray()
      return res.status(200).send(details)
    } catch(e) {
      return res.sendStatus(500)
    }
  })

  router.get('/resume', async (req, res) => { 
    // res.setHeader('Content-disposition', 'attachment; filename=data.csv');
    res.download('tmp/resume.docx', 'Adam Tropp Resume.csv')
  })