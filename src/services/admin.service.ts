import db from '../common/utils/db';

export const getAdmins = async () => await db.select('*').from('users');
