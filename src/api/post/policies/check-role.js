"use strict";

/**
 * `check-role` policy
 */

module.exports = (policyContext, config, { strapi }) => {
  // Add your own logic here.
  const { user_role } = config;
  // console.log("STRAPI:", strapi);
  // console.log("CONFIG: ", config);
  const is_Eligible =
    policyContext.state.user && policyContext.state.user.role.name == user_role;
  // strapi.log.info("In is-admin policy.");

  // const canDoSomething = true;

  if (is_Eligible) {
    return true;
  }

  return false;
};
