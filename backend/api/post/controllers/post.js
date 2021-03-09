const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async create(ctx) {
    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      // if (!data || !data.description) {
      //   ctx.throw(400, "Please add some content");
      // }
      // if (!files || !files.length) {
      //   ctx.throw(400, "Please add at least a file");
      // }

      const { user } = ctx.state;
      entity = await strapi.services.post.create(
        { ...data, ...{ likes: 0, author: user } },
        { files }
      );
    } else {
      ctx.throw(400, "You must submit a multipart request");
    }

    return sanitizeEntity(entity, { model: strapi.models.post });
  },
  async update(ctx) {
    const { id } = ctx.params;
    const { user } = ctx.state;

    let entity;
    if (ctx.is("multipart")) {
      ctx.throw(400, "Please only make request with an updated description");
    } else {
      delete ctx.request.body.likes;

      entity = await strapi.services.post.update(
        { id, author: user.id },
        ctx.request.body
      );
    }
    return sanitizeEntity(entity, { model: strapi.models.post });
  },
  async delete(ctx) {
    const { id } = ctx.params;
    const { user } = ctx.state;

    const entity = await strapi.services.post.delete({ id, author: user.id });
    return sanitizeEntity(entity, { model: strapi.models.post });
  },
};
