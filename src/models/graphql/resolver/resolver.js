const User = require("../../user");
const Block = require("../../block");
const Message = require("../../message");
const Balance = require("../../balance");
const Subscription = require("../../subscription");
const Service = require("../../service");
const PushNotif = require("../../pushNotification");
const webpush = require("web-push");
const { config } = require("../../../config/index");
//I ADDED THE FOLLOWING
const AdminBlock = require("../../adminBlock");
const Invoice = require("../../invoice");
const Requset = require("../../request");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports = {
  /*
		find one oneSubscription and list his balance / user / block
		by one query in grapgql
		example for that 
		query{subscription(name:"AAA"){ _id block{ _id name location}}}
  */
  createNewUser: async args => {
    try {
      return await Requset.create(args);
    } catch (e) {
      console.error(e);
      throw error;
    }
  },
  // input user
  // finds him
  // saves in temp var
  // saves him in user collection
  //delete him from request collection
  verifyUser() {},
  oneSubscription: async args => {
    //   const user = User.findOne({email:args.email})
    try {
      const subscription = await Subscription.findOne({ name: args.name })
        .populate("balance")
        .populate("user")
        .populate("block")
        .populate("service")
        .populate("userMesg");
      // .populate({
      //   path: 'user',
      //   populate: {
      //     path: 'userMesg',
      //     populate: {
      //       path: 'sender', // i used this just practice to how deep i can populate
      //     },
      //   },
      // });
      console.log(subscription);
      return subscription;
    } catch (err) {
      console.log(err);
    }
  },
  // find the service and by its name
  oneService: async args => {
    const service = await Service.findOne({ name: args.name }).populate(
      "subscriptionId"
    );
    console.log(service);
    return service;
  },
  //this function to retrive one user information by his Id
  //when he is loged on
  oneUser: async (args, req) => {
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated');
    // }
    try {
      //need change the _id by the req.userId
      const user = await User.findById({
        // _id: "5e32954c2caab0519d885385"
        _id: args.id
      })
        .populate("userMesg")
        .populate({
          path: "userSubscription",
          populate: {
            path: "block"
          }
        });
      return user;
    } catch (err) {
      console.log(err);
      throw new Error("something bad happen here");
    }
  },
  oneBlock: async args => {
    try {
      const block = await Block.findOne({ name: args.name }).populate(
        "userSubscription"
      );
      console.log(block);
      return block;
    } catch (err) {
      console.log(err);
    }
  },
  oneBlockSubs: async args => {
    try {
      const block = await Block.findOne({ name: args.name }).populate(
        "userSubscription"
      );
      console.log(block);
      if (!block) {
        throw new Error("The block doesn't exist ");
      } else {
        return block.userSubscription;
      }
    } catch (err) {
      console.log(err);
    }
  },
  // This function check if the user in frontend is authentcated by the backend or not
  isAuth: (_, req) => {
    return req.userId;
  },
  // This function check if the user is superAdmin or not
  isSuperIsAdmin: async ({ id }) => {
    console.log(id);
    try {
      const user = await User.findById({ _id: id });
      console.log(user);
      return user;
    } catch (err) {}
  },
  // login ////////
  login: async args => {
    const user = await User.findOne({ email: args.userInput.email });
    if (!user) {
      throw new Error(" user does not exist ");
    }
    const isEqual = await bcrypt.compare(
      args.userInput.password,
      user.password
    );
    if (!isEqual) {
      throw new Error(" password is incorrect  ");
    }
    const token = jwt.sign(
      {
        // userId: user._id,
        userId: user.UserId,
        email: user.email,
        isAdmin: user.isAdmin,
        isSuperAdmin: user.isSuperAdmin
      },
      "superpasswordkey",
      { expiresIn: "12h" }
    );

    return {
      userId: user._id,
      token: token,
      tokenExpriration: 12,
      isAdmin: user.isAdmin,
      isSuperAdmin: user.isSuperAdmin
    };
  },
  // create user /////
  createUser: (args, req) => {
    console.log(req.isAuth);
    if (!req.isAuth) {
      throw new Error("Unauthenticated");
    } else if (!req.isAdmin && !req.isSuperAdmin) {
      throw new Error("not allowed to create user with user privilege");
    }

    return User.findOne({ email: args.userInput.email })
      .then(user => {
        if (user) {
          throw new Error("user exists already");
        }
        return bcrypt.hash(args.userInput.password, 10);
      })
      .then(hashedPassword => {
        const user = new User({
          email: args.userInput.email,
          password: hashedPassword
        });
        if (req.isSuperAdmin) {
          user.isAdmin = args.userInput.isAdmin;
        }
        console.log(user);
        return user.save();
      })
      .then(user => {
        return { ...user._doc, password: null };
      })
      .catch(err => {
        throw err;
      });
  },
  // list all the service in the database
  service: async () => {
    const service = await Service.find();
    return service;
  },
  message: async () => {
    try {
      const messages = await Message.find().populate("sender");
      /////////
      messages.forEach(ele => {
        ele.sender.password = "null";
      });
      ////////
      return messages.map(message => {
        return message;
        // return { ...message._doc, sender: { ...message._doc.sender._doc, password: 'null' } };
        // this is another approch that u can do or you can use mehtod forEach
      });
    } catch (err) {
      console.log(err);
    }
  },
  // create block /////
  createBlock: async args => {
    const blockName = await Block.findOne({ name: args.blockInput.name });
    if (blockName) {
      throw new Error("The block name already exsist ");
    }
    const block = new Block({
      name: args.blockInput.name,
      location: args.blockInput.location
    });
    try {
      saveBlock = await block.save();
      return saveBlock;
      //   return { ...saveBlock._doc };
    } catch (err) {
      console.log(err);
    }
  },
  // create meassge ////
  createMessage: async (args, req) => {
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated');
    // }
    //req.userId

    try {
      const subscription = await Subscription.findOne({
        name: args.messageInput.name
      });
      // console.log(subscription);
      const message = new Message({
        message: args.messageInput.message,
        sender: subscription.user
      });
      subscription.userMesg.push(message._id);
      await subscription.save();
      ////////
      try {
        const messageSave = await message.save();
        try {
          const push = await PushNotif.findOne({
            userId: "5e3d4176ff89492ef4c94944"
          });
          // subscription.user
          // res.set("Content-Type", "application/json");

          webpush.setVapidDetails(
            "blocks:Notworking@gmail.com",
            config.webPush.public_key,
            config.webPush.private_key
          );

          const payload = JSON.stringify({
            notification: {
              title: "UNI-BLoCK",
              body: "You Have New Message ",
              icon:
                "https://lh3.googleusercontent.com/proxy/jvefvnD85Iszy5iybynbTaCHx-ZUd7QeVJ-m3jYIdy6ST3uTrBE88ZpvLqLEKmeDoXrWZK7yuM6zw8Wse30_AgyQhMrvyePbo5FMIYqLzAJysjXYcipckAJoNx3GvwJ9xRt_5g"
            }
          });
          Promise.resolve(webpush.sendNotification(push.subNotif, payload));
          // .then(() => {
          //     res.status(200).json({
          //         message: "Message Notification Sent"
          //     });
          // })
          // .catch((err) => {
          //     console.log(err);
          //     res.sendStatus(500);
          // });
        } catch (err) {
          console.log(err, "PUSH ");
        }

        return messageSave;
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  },
  addBalance: async args => {
    const balance = new Balance({
      value: args.value
    });
    try {
      return await balance.save();
    } catch (err) {
      console.log(err);
    }
  },
  //this func add user to Subscription ***** need to work on it more
  addSub: async args => {
    const user = await User.findOne({ email: args.email });
    user.userSubscription.push();
    console.log(user);
    return user;
  },
  createSub: async args => {
    const balance = new Balance({
      value: 0
    });
    const subscription = new Subscription({
      name: args.subInput.name,
      balance: balance._id
    });
    try {
      // serach for the block name to be added to the subscription of the user
      const block = await Block.findOne({ name: args.subInput.block });
      subscription.block = block._id;
      block.userSubscription.push(subscription._id);
      await block.save();
    } catch (err) {
      console.log(err);
    }

    try {
      //find user info by using the email provided in the args the save his _id to the subscripton
      //tbale
      await balance.save();
      const user = await User.findOne({ email: args.subInput.email });
      console.log(user);
      subscription.user = user._id;

      user.userSubscription.push(subscription._id);
      await user.save();
    } catch (err) {
      console.log(err);
    }
    try {
      return await subscription.save();
    } catch (err) {
      throw new Error("not allowed ,duplicate name");
    }
  },
  createService: async args => {
    const service = new Service({
      name: args.name
    });
    try {
      return await service.save();
    } catch (err) {
      console.log(err);
    }
  },
  //add service to subscription
  addSerToSub: async args => {
    const service = await Service.findOne({ name: args.serviceName });
    const subscription = await Subscription.findOne({ name: args.subName });
    service.subscriptionId.push(subscription._id);
    subscription.service.push(service._id);
    try {
      await subscription.save();

      try {
        return await service.save();
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  },
  // add admin to block by his email and the block name

  addAdminToBlock: async args => {
    try {
      const block = await Block.findOne({ name: args.blockName });
      if (!block) {
        throw new Error("The Block name is not an exist  user");
      }
      try {
        const user = await User.findOne({ email: args.email });
        if (!user.isAdmin) {
          throw new Error("The Email Provided is not an Admin user");
        }
        block.blockAdmin = user._id;
        user.adminBlock.push(block._id);
        try {
          await user.save();
          try {
            return await block.save();
          } catch (err) {
            console.log(err);
          }
        } catch (err) {
          console.log(err);
        }
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  },
  adminBlocks: async args => {
    try {
      const user = await User.findOne({ email: args.email }).populate({
        path: "adminBlock",
        populate: {
          path: "userSubscription"
        }
      });
      if (!user.isAdmin) {
        throw new Error("The Email Provided is not an Admin user");
      }
      return user.adminBlock;
    } catch (err) {
      console.log(err);
    }
  }
};
