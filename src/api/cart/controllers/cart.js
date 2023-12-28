"use strict";
/**
 * cart controller
 */

const { createCoreController } = require("@strapi/strapi").factories;
const { uuid } = require("uuidv4");

module.exports = createCoreController("api::cart.cart", ({ strapi }) => ({
  async find(ctx) {
    console.log("check sessionID", ctx.request.headers["sessionid"]);
    let sessionid = ctx.request.headers["sessionid"] || "";
    try {
      const { email } = ctx.state.user || "";
      console.log(
        "SQL query:",
        await strapi.db.query("api::cart.cart").findMany({
          where: {
            $or: [
              {
                userEmail: email,
              },
              {
                sessionID: sessionid,
              },
            ],
          },
        })
      );
      const data = await strapi.db.query("api::cart.cart").findMany({
        where: {
          // userEmail: email,
          $or: [
            {
              userEmail: email,
            },
            {
              sessionID: sessionid,
            },
          ],
        },
      });
      return { data };
      // Access sessionID from query parameter or headers
      // const cachedData = cachedCarts.get(cartIdentifier);
      // if (cachedData) {
      //   return { data: cachedData };
      // } else {
      //   const data = await strapi.db.query("api::cart.cart").findMany({
      //     where: { userEmail: email || cartIdentifier },
      //   });
      //   cachedCarts.set(cartIdentifier, data);
      //   return { data };
      // }
    } catch (error) {
      ctx.response.status = 500;
      return error;
    }
  },
  async create(ctx) {
    try {
      const { email } = ctx.state.user || "";

      const res = await strapi.service("api::cart.cart").create({
        data: {
          // @ts-ignore
          ...ctx.request.body.data,
          userEmail: email, // Assign email if user is logged in
        },
      });
      return res;
    } catch (error) {
      ctx.response.status = 500;
      return error;
    }
  },
  async delete(ctx) {
    const { email } = ctx.state.user;
    const { id } = ctx.params;
    try {
      if (id === "fakeId") {
        const res = await strapi.db.query("api::cart.cart").deleteMany({
          where: {
            // @ts-ignore
            userEmail: email || localStorage.getItem("cart")?.identifier,
          },
        });
        return res;
      }
      const res = await strapi.db.query("api::cart.cart").delete({
        where: { id },
      });
      return res;
    } catch (error) {
      ctx.response.status = 500;
      console.log({ error });
      return error;
    }
  },
}));
