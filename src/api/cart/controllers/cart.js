"use strict";

/**
 * cart controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::cart.cart", ({ strapi }) => ({
  async find(ctx) {
    try {
      const { email } = ctx.state.user;
      const { id } = ctx.params;
      const data = await strapi.db.query("api::cart.cart").findMany({
        where: { id },
      });
      return { data };
    } catch (error) {
      ctx.response.status = 500;
      return error;
    }
  },
  async create(ctx) {
    try {
      const { email } = ctx.state.user;
      const { id } = ctx.params;
      const res = await strapi.service("api::cart.cart").create({
        data: {
          // @ts-ignore
          ...ctx.request.body.data,
          // userEmail: email,
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
          where: { userEmail: email },
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
