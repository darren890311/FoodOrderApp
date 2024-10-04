import * as admin from "firebase-admin";
import {onCall, HttpsError} from "firebase-functions/v2/https";

import {createTransport} from "nodemailer";
import {
  calculateOrderSubtotal,
  calculateOrderTotal,
} from "./utils/calculations";
admin.initializeApp();

const transport = createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "9d8a759fe9e2e1",
    pass: "f5d1a22e18ec94",
  },
});
export const placeorder = onCall(async (request) => {
  if (!request.auth) {
    return new HttpsError("failed-precondition", "You are not authorized");
  }

  try {
    const firestore = admin.firestore();
    const lines = request.data.lines;

    if (!lines || !Array.isArray(lines)) {
      throw new HttpsError("invalid-argument", "Order lines are invalid");
    }

    const draft = {
      ...request.data,
      status: "pending",
      subTotal: calculateOrderSubtotal(lines),
      total: calculateOrderTotal(lines, 10),
      pickUpTime: admin.firestore.FieldValue.serverTimestamp(),
      createAt: admin.firestore.FieldValue.serverTimestamp(),
      createdBy: request.auth.uid,
    };

    const order = await firestore.collection("order").add(draft);

    const email = request.data.email;
    const restaurantDoc = await firestore.doc("restaurant/info").get();
    const restaurant = restaurantDoc.data();
    if (restaurant) {
      transport.sendMail({
        to: email,
        subject: `${restaurant.name} - Order: ${order.id}`,
        html: `
            <div>
                <h1>Hi ${draft.firstName}, your order is confirmed.</h1>
                <h2>Restaurant address</h2>
                <p>${restaurant.name}</p>
                <p>${restaurant.address}</p>
                <h2>Order details</h2>
                <ul>
                    ${draft.lines
    .map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (line: any) => `
                    <li>
                    <h3>${line.quantity}x ${line.label}: $${line.price.toFixed(
  2
)}</h3>
                    <ul>
                        ${line.value
    .map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (value: any) => `
                        <li>
                            ${value.variant}: ${
  value.value
} - $${value.price.toFixed(2)}
                        </li>
                                `
    )
    .join("")}
                            </ul>
                        `
    )
    .join("")}
                    </li>
                </ul>
                <p>Sub-total: $${draft.subTotal.toFixed(2)}</p>
                <p>Total: $${draft.total.toFixed(2)}</p>
                <h4>If you need help with anything else, 
                please contact me at (206) 228-7876.</h4>
            </div>
        `,
      });
    }

    return {id: order.id, order: draft};
  } catch (error) {
    console.error("Error placing order:", error);
    throw new HttpsError("internal", "Unable to place the order");
  }
});
