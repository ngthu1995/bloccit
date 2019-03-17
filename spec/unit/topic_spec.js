const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;

describe("Post", () => {
  beforeEach(done => {
    //#1
    this.topic;
    this.post;
    sequelize.sync({ force: true }).then(res => {
      //#2
      Topic.create({
        title: "Adventure to Africa",
        description: "Unknown lands with friendly people"
      })
        .then(topic => {
          this.topic = topic;
          //#3
          Post.create({
            title: "The very first visit",
            body: "I saw some rocks.",
            //#4
            topicId: this.topic.id
          }).then(post => {
            this.post = post;
            done();
          });
        })
        .catch(err => {
          console.log(err);
          done();
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
        expect(associatedPost[0].title).toBe("The very first visit");
        done();
      });
    });
  });
});
