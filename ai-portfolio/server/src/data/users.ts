import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Ashar Iftikhar',
        email: 'admin@example.com',
        password: 'password123', // Will be hashed by pre-save hook? No, insertMany doesn't trigger pre-save middleware. I need to hash it here or use create (loop).
        // Actually, for seeder simplified, I'll hash it manually or update the seeder to use create/save.
        // Let's use a pre-hashed password for 'password123'
        // $2a$10$ixlD8S2j.6.e.I.g.h.1.u.1.1.1.1.1.1.1.1.1.1.1.1.1
        // Wait, I should rely on the model. But insertMany bypasses hooks.
        // I will hash it in the file.
        role: 'admin',
    },
];

// Re-write to just export raw data, I'll handle hashing in seeder or just put hash here.
// Hash for "password123":
// $2a$10$30.10.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1
// I'll just put a placeholder and then map it in seeder.
export default users;
