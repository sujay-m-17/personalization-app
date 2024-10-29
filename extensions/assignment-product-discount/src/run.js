// @ts-check
import { DiscountApplicationStrategy } from "../generated/api";

/**
 * @typedef {import("../generated/api").RunInput} RunInput
 * @typedef {import("../generated/api").Target} Target
 * @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
 */

/**
 * @type {FunctionRunResult}
 */
const EMPTY_DISCOUNT = {
  discountApplicationStrategy: DiscountApplicationStrategy.First,
  discounts: [],
};

/**
 * @param {RunInput} input
 * @returns {FunctionRunResult}
 */

export function run(input) {

  const metaData = JSON.parse(input?.discountNode?.metafield?.value ?? "{}");

  console.log(metaData);

  if (!metaData) {
    console.error("Metafield for quantity discounts not found.");
    return EMPTY_DISCOUNT;
  }

  // Destructure metaData to access the tiers
  const { tiers } = metaData;

  let discounts = [];

  const targets = input.cart.lines

    .filter((line) => 
      line.quantity >= 2 && // Ensure line has at least 2 items, so that it cannot be discounted for a single product
      line.merchandise.__typename === "ProductVariant" && 
      line.merchandise.product.hasAnyTag
    )
    .map((line) => {
      
      let discountValue;
      let discountMessage;
      
      for (const tier of tiers) {
        if (line.quantity >= tier.minQuantity) {
          discountValue = tier.discountValue;
          discountMessage = tier.message;
        }
      }

      return /* @type {Target} */ ({
        cartLine: {
          id: line.id,
          quantity: line.quantity,
        },
        discountMessage,
        discountValue
      });
    });
  
  if (!targets.length) {
    console.error("No cart lines qualify for volume discount.");
    return EMPTY_DISCOUNT;
  }

  targets.forEach((target) => {
    discounts.push({
      targets: {
        cartLine: {
          id: target.cartLine.id,
          quantity: target.cartLine.quantity,
        }
      },
      value: {
        percentage: {
          value: target.discountValue,
        }
      },
      message: target.discountMessage,
    });
  });

  return {
    discounts,
    discountApplicationStrategy: DiscountApplicationStrategy.First,
  };
}
