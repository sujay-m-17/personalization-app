// @ts-check

/**
 * @typedef {import("../generated/api").RunInput} RunInput
 * @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
 */

/**
 * @type {FunctionRunResult}
 */
const NO_CHANGES = {
  operations: [],
};

/**
 * @param {RunInput} input
 * @returns {FunctionRunResult}
 */
// export function run(input) {
//   const productsData = [];
//   const targets = [];

//   input.cart.lines.forEach((line)=> {
//     if (line.attribute !== null) {
//       let addOnPriceString = line.attribute?.value || "{}";
//       let addOnPrice = parseFloat(addOnPriceString.replace('Rs.', '').trim());
//           let data = {
//               lineId: line.id,
//               quantity: line.quantity,
//               productPrice: JSON.parse(line.cost.amountPerQuantity.amount || "{}"),
//               addOnPrice: addOnPrice
//           };
//           productsData.push(data);
//       }
//   });

//   productsData.forEach((product)=>{
//       product.productPrice += product.addOnPrice;

//       targets.push({
//       update: {
//           cartLineId: product.lineId,
//            price: {
//             adjustment: {
//                   fixedPricePerUnit: {
//                     amount: product.productPrice || 999999,
//                   },
//               },
//           },
//       }
//   });
//   });

//    console.log(targets);

//   return{
//       operations: [...targets]
//   }
// };

export function run(input) {
  const cartLines = input.cart.lines;
  const targetLines = []

  // const targetLines = cartLines.map((line) => ({
  //   cartLineId: line.id,
  //   quantity: line.quantity,
  // }));


  return {
    operations: [...targetLines]
  }
  //   const operations = targetLines.map((line) => ( {
  //     merge: {
  //       cartLines: targetLines,
  //       parentVariantId:
  //         cartLines[0].merchandise.__typename === "ProductVariant"
  //           ? cartLines[0].merchandise.id
  //           : "",
  //       price: {
  //         percentageDecrease: {
  //           value: 50,
  //         },
  //       },
  //     },
  //   },
  //  ));

  // return {
  //   operations: [
  //     {
  //       merge: {
  //         cartLines: targetLines.slice(0, 2),
  //         parentVariantId:
  //           cartLines[0].merchandise.__typename === "ProductVariant"
  //             ? cartLines[0].merchandise.id
  //             : "",
  //         price: {
  //           percentageDecrease: {
  //             value: 50,
  //           },
  //         },
  //       },
  //     },
  //     {
  //       merge: {
  //         cartLines: targetLines.slice(2, 4),
  //         parentVariantId:
  //           cartLines[2].merchandise.__typename === "ProductVariant"
  //             ? cartLines[2].merchandise.id
  //             : "",
  //         price: {
  //           percentageDecrease: {
  //             value: 50,
  //           },
  //         },
  //       },
  //     },
  //   ],
  // };
}
