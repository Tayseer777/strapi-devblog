"use strict";

/**
 * post controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::post.post", ({ strapi }) => ({
  // Method 1: Creating an entirely custom action
  async exampleAction(ctx) {
    await strapi.service("api::post.post").exampleService({ myParams: "OK" });

    try {
      ctx.body = "ok";
    } catch (err) {
      ctx.body = err;
    }
  },

  // Method 2: Wrapping a core action (leaves core logic in place)
  //   async find(ctx) {
  //     // some custom logic here
  //     ctx.query = { ...ctx.query, local: "en" };
  //     console.log("CTX: ", ctx.query);

  //     // Calling the default core action
  //     const { data, meta } = await super.find(ctx);

  //     // some more custom logic
  //     meta.date = Date.now();

  //     return { data, meta };
  //   },

  // SOLUTION 1:
  //   async find(ctx) {
  //     // fetch all posts, including premium ones
  //     const { data, meta } = await super.find(ctx);
  //     if (ctx.state.user) {
  //       return { data, meta };
  //     } else {
  //       const filtered = data.filter((post) => !post.attributes.premium);
  //       return { data: filtered, meta };
  //     }
  //   },
  // SOLUTION 1:
  // async find(ctx) {
  //   // if th req is authinticted..
  //   const isRequestingNonPremium = ctx.query.filters.premium == false;
  //   if (ctx.state.user || isRequestingNonPremium) return await super.find(ctx);
  //   // if th req is public..
  //   // calling underlying service with additonal filter param: premium == false
  //   // /posts?filters[premium] = false
  //   const filtered = await strapi
  //     .service("api::post.post")
  //     .find({ filters: { premium: false } });
  //   const sanitizedPosts = await this.sanitizeOutput(filtered, ctx);
  //   return this.transformResponse(sanitizedPosts);
  // },

  // Method 3: Replacing a core action
  async findOne(ctx) {
    const { id } = ctx.params;
    const { query } = ctx;
    // console.log("CTX:: ", ctx);
    // console.log("CTX PARAMS: ", ctx.params);
    // console.log("CTX QUERY: ", ctx.query);

    const entity = await strapi.service("api::post.post").findOne(id, query);
    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    // ctx.send(sanitizedEntity);
    // return sanitizedEntity;

    // console.log("ENTITY:", entity);
    // console.log("SANATIZED:", sanitizedEntity);

    return this.transformResponse(sanitizedEntity);
  },
}));
