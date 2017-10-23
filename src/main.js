import "./env";
import app from "./app";

import "./models";

const port = process.env.PORT || 7777;
app.set("port", );
export default app.listen(app.get("port"), () => {
  console.log(`Express running → PORT ${port}`);
});
