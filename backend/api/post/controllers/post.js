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
      entity = await strapi.services.post.create(
        { ...data, likes: 0 },
        { files }
      );
    } else {
      ctx.throw(400, "You must submit a multipart request");
    }

    return sanitizeEntity(entity, { model: strapi.models.post });
  },
};
