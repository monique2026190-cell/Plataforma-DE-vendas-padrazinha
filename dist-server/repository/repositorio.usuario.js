import pool from '../db/pool.js';
import { findUserByGoogleIdQuery, createUserQuery, updateUserProfileQuery, findUserByIdQuery } from '../db/queries/usuario.queries.js';
export const findUserById = async (userId) => {
    const client = await pool.connect();
    try {
        const result = await client.query(findUserByIdQuery, [userId]);
        if (result.rows.length > 0) {
            return result.rows[0];
        }
        return null;
    }
    catch (error) {
        console.error('Error in findUserById', { error, userId });
        throw error;
    }
    finally {
        client.release();
    }
};
export const findOrCreateUser = async (googleUser) => {
    const client = await pool.connect();
    try {
        const findUserResult = await client.query(findUserByGoogleIdQuery, [googleUser.sub]);
        if (findUserResult.rows.length > 0) {
            const existingUser = findUserResult.rows[0];
            console.log('User found in database.', { userId: existingUser.id, email: existingUser.email });
            return existingUser;
        }
        console.log('User not found. Creating new user.', { email: googleUser.email });
        const createUserValues = [
            googleUser.sub,
            googleUser.name,
            googleUser.email,
            googleUser.picture,
        ];
        const createUserResult = await client.query(createUserQuery, createUserValues);
        const newUser = createUserResult.rows[0];
        console.log('New user created successfully.', { userId: newUser.id, email: newUser.email });
        return newUser;
    }
    catch (error) {
        console.error('Error in findOrCreateUser', { error });
        throw error;
    }
    finally {
        client.release();
    }
};
export const updateUserProfile = async (userId, nome) => {
    const client = await pool.connect();
    try {
        const values = [nome, userId];
        const result = await client.query(updateUserProfileQuery, values);
        console.log('User profile updated successfully.', { userId, nome });
        return result.rows[0];
    }
    catch (error) {
        console.error('Error updating user profile', { error, userId, nome });
        throw error;
    }
    finally {
        client.release();
    }
};
