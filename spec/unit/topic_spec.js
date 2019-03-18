const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const User = require("../../src/db/models").User;

describe("Post", () => {
  beforeEach(done => {
    //#1
    this.topic;
    this.post;
    this.user;

    sequelize.sync({ force: true }).then(res => {
      // #2
      User.create({
        email: "starman@tesla.com",
        password: "Trekkie4lyfe"
      }).then(user => {
        this.user = user; //store the user

        // #3
        Topic.create(
          {
            title: "Expeditions to Alpha Centauri",
            description:
              "A compilation of reports from recent visits to the star system.",

            // #4
            posts: [
              {
                title: "My first visit to Proxima Centauri b",
                body: "I saw some rocks.",
                userId: this.user.id
              }
            ]
          },
          {
            // #5
            include: {
              model: Post,
              as: "posts"
            }
          }
        ).then(topic => {
          this.topic = topic; //store the topic
          this.post = topic.posts[0]; //store the post
          done();
        });
      });
    });
  });

  describe("#create()", () => {
    it("should create a topic object and being stored in the database", done => {
      Topic.create({
        title: "Back to Europe",
        description: "Why and why not?"
      }).then(topic => {
        expect(topic.title).toBe("Back to Europe");
        expect(topic.description).toBe("Why and why not?");
        done();
      });
    });

    it("should not create a topic with missing title, bodyc", done => {
      Topic.create({
        title: "Back to Europe",
        description: "Why and why not?"
      })
        .then(topic => {
          // the code in this block will not be evaluated since the validation error
          // will skip it. Instead, we'll catch the error in the catch block below
          // and set the expectations there

          done();
        })
        .catch(err => {
          expect(err.message).toContain("Topic.title cannot be null");
          expect(err.message).toContain("Topic.description cannot be null");
          done();
        });
    });
  });

  describe("#getPosts()", () => {
    it("should return the associated post", done => {
      this.topic.getPosts().then(associatedPost => {
        expect(associatedPost[0].title).toBe(
          "My first visit to Proxima Centauri b"
        );
        done();
      });
    });
  });
});
