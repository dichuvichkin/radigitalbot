import chai from "chai";
import chaiHTTP from "chai-http";
import server from "../../src/main";

chai.use(chaiHTTP);
describe("", () => {
  const who = {
    body: {
      message: {
        text: "/whoAmI",
      },
    },
  };
  it("", (done) => {
    chai
      .request(server)
      .post(`/${process.env.TG_TOKEN}`)
      .send(who)
      .end((err, { body }) => {
        console.log(err);
        console.log(body);
        done();
      });
  });
});
