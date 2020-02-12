# UniBlocks BACKEND

Public Local management service that helps you to organize your home with other property owners in your neighborhood for better life quality.
It also connects you with your daily life needs regarding your living place and the services you need in your neighborhood.
also being aware of anything that happens in your building block.

shares work between you and the neighbors at any event that comes up.
[Link our deployed backEnd on Heroku](https://blocks-backend.herokuapp.com)

# Motivation

- Engaged communities
- Community Organisating
- Share with your neighbours
- Services and emergency planning

# Tech/framework used

Built with :

- Express, Node js
- MongoDB, Cloude Mlab
- Angular 8
- typeScript
- CircleCi
- Jasmin Karma Angular / Jest Node
- Mobile Development Progressive Web Apps
- GrapQl

## Development

`node` version `12.0`

The first time, you will need to run

```
npm install
```

Then just start the server with

```
npm start
```

It uses nodemon for livereloading :peace-fingers:

# Utility Services ⚙️

NOTE: You have to be signed in to be able to use these services.

## Email Service 📧

To use the email service :

### API End Point 📡

`POST` `/api/email`

### Email Example Request

```json
{
  "email": "test@test.com",
  "text": "Hello World"
}
```

## SMS Service 📧

### API End Point 📡

Usage :

`POST` `/api/sms`

### SMS Example Request

```json
{
  "receiver": "+21856481323",
  "text": "Hello World"
}
```

## Image Uploader Service 🖼️

### API End Point 📡

Usage :

`POST` `/api/sms`

### Image Uploading Example Request

Allowed phote format are

```js
let options = {
  allowedFormats: ["jpg", "jpeg", "png"]
};
```

```json
{
  "file": "catImage.png"
}
```

# API Validation

By using try catch and async methode to handel internal routing level, so even frontend devs can read what an API endpoint expects without need to writting a documentation that can get outdated quickly.
and this is example of adding a new admin request at the routing .

```js
router.post("/", async (req, res) => {
  try {
    const admin = new Admin(req.body);
    await admin.save();
    const token = await admin.generateAuthToken();
    res.status(201).json({ admin, token });
  } catch (err) {
    res.status(400).send(err);
  }
});
```

**Example error**

```json
{
  "errors": {
    "message": "child \"email\" fails because [\"email\" is required]"
  }
}
```

[Link for github account here](https://github.com/n0tw0rking)

## Status

Project is in planning phase.

# Roadmap

- [ ] API Validation layer
- [ ] Unit tests examples
- [ ] The logging
- [ ] Add agenda dashboard
- [ ] Continuous integration with CircleCI
- [ ] Deploys script and docs with Heroku
- [ ] Integration test with Insomnia
- [ ] Instructions on typescript debugging with VSCode

# FAQ

## The FrontEnd code

Angular is inside the public folder, it has a separate architect, its own package.json file and read me file

## Contact

created by [@OmarBara](https://github.com/OmarBara), [@mohamed-fared,](https://github.com/mohamed-fared), [@AdamMomen](https://github.com/AdamMomen), [@psktcsharp](https://github.com/psktcsharp)
