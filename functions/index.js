/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const functions = require("firebase-functions");
const admin = require("firebase-admin");


admin.initializeApp();

exports.signUpWithPhone = functions.https.onCall(async (data, context) => {
    const {phone, password, fullName} = data;

    if (!phone || !password) {
        throw new functions.https.HttpsError(
            "invalid-argument",
            "Phone number and password are required.");
    }

    try {
        const userRecord = await admin.auth().createUser({
            password: password,
            phoneNumber: phone,
            displayName: fullName,
        });
        const token = await admin.auth().createCustomToken(userRecord.uid);
        return {
            success: true,
            message: "User account created successfully",
            uid: userRecord.uid,
            token: token,
        };
    } catch (error) {
        console.error("Error creating user account:", error);
        throw new functions.https.HttpsError(
            "internal",
            "Error creating user account");
    }
});

exports.loginWithPhone = functions.https.onCall(async (data, context) => {
    const {phone, password} = data;

    if (!phone || !password) {
        throw new functions.https.HttpsError(
            "invalid-argument",
            "Phone number and password are required.",
        );
    }

    try {
        // Get the user by phone number
        const userRecord = await admin.auth().getUserByPhoneNumber(phone);
        const token = await admin.auth().createCustomToken(userRecord.uid);
        return {
            success: true,
            token: token,
            uid: userRecord.uid,
        };
    } catch (error) {
        if (error.code === "auth/user-not-found") {
            throw new functions.https.HttpsError(
                "not-found",
                "No user found with this phone number",
            );
        } else {
            console.error("Error in loginWithPhone:", error);
            throw new functions.https.HttpsError(
                "internal",
                "Error authenticating user");
        }
    }
});
