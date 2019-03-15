const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/posts";

const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const Flair = require("../../src/db/models").Flair;

describe("Flair", () => {
  beforeEach(done => {
    this.topic;
    this.post;
    this.flair;

    sequelize.sync({ force: true }).then(res => {
      //#2
      Topic.create({
        title: "Expeditions to Alpha Centauri",
        description:
          "A compilation of reports from recent visits to the star system."
      })
        .then(topic => {
          this.topic = topic;
          //#3
          Post.create({
            title: "My first visit to Proxima Centauri b",
            body: "I saw some rocks.",
            //#4
            topicId: this.topic.id
          }).then(post => {
            this.post = post;
            done();
            Flair.create({
              name: "Science-Fiction",
              color: "blue",
              postId: this.postId
            });
          });
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });
  });
});
